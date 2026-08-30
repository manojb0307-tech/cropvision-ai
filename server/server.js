/**
 * CropVision Backend Server
 * ─────────────────────────
 * Express + Google Gemini API backend powering the CropVision frontend.
 *
 * Routes
 *   POST /api/analyze   – Analyze a plant/leaf image → disease diagnosis (JSON)
 *   POST /api/chat      – Conversational agronomy assistant
 *   GET  /api/health    – Health check
 *
 * Architecture:
 *   - If GEMINI_API_KEY is set → real AI-powered analysis via Gemini Vision
 *   - If no key               → local expert-system fallback (40+ diseases, 16 crops)
 *   - AI chat always tries Gemini first, falls back to a local agronomy engine
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { generateReply } from './agriMind.js';
import { analyzePlantImage as visionAnalyze } from './detectionEngine.js';
import { generatePrognosis } from './prognosis.js';
import { generateOutbreakMapData, addOutbreakReport } from './outbreakMap.js';
import { calculateCostEstimate } from './costEstimator.js';

dotenv.config();

// ── Constants ────────────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 8787;
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') ? process.env.GEMINI_API_KEY : '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

// ── Express Setup ────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));

// ── Rate Limiter (simple in-memory sliding window) ──────────────────────────
const rateLimitStore = new Map();
function rateLimit(windowMs = 60000, max = 30) {
  return (req, res, next) => {
    const key = req.ip || req.connection?.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = rateLimitStore.get(key) || { count: 0, start: now };
    if (now - entry.start > windowMs) {
      entry.count = 0;
      entry.start = now;
    }
    entry.count++;
    rateLimitStore.set(key, entry);
    if (entry.count > max) {
      return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
    }
    next();
  };
}
app.use('/api', rateLimit(60000, 40));

// Clean up stale entries every 5 minutes
setInterval(() => {
  const cutoff = Date.now() - 120000;
  for (const [k, v] of rateLimitStore) {
    if (v.start < cutoff) rateLimitStore.delete(k);
  }
}, 300000);

// ── Gemini Client (lazy) ────────────────────────────────────────────────────
let aiClient = null;
async function getAI() {
  if (!GEMINI_API_KEY) return null;
  try {
    if (!aiClient) {
      const { GoogleGenAI } = await import('@google/genai');
      aiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    }
    return aiClient;
  } catch (err) {
    console.error('[AI] Failed to initialize Gemini client:', err.message);
    return null;
  }
}

// ── Utility Helpers ──────────────────────────────────────────────────────────
function extractJson(text) {
  if (!text) return null;
  // Strip markdown code fences
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
}

function toStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v) => typeof v === 'string' && v.trim())
    .map((v) => v.trim());
}

function nextDate(daysFromNow) {
  return new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function today() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function timestamp() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ── Normalize AI Response ────────────────────────────────────────────────────
const VALID_SEVERITY = ['Low', 'Moderate', 'Severe', 'None'];

function normalizeDiagnosis(raw) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    plantName: typeof raw.plantName === 'string' && raw.plantName.trim()
      ? raw.plantName.trim() : 'Unknown Plant',
    diseaseName: typeof raw.diseaseName === 'string' && raw.diseaseName.trim()
      ? raw.diseaseName.trim() : 'Unknown Condition',
    isHealthy: Boolean(raw.isHealthy),
    confidence: Math.min(100, Math.max(0, Number(raw.confidence) || 0)),
    severityLevel: VALID_SEVERITY.includes(raw.severityLevel) ? raw.severityLevel : 'None',
    description: typeof raw.description === 'string' && raw.description.trim()
      ? raw.description.trim() : 'Analysis pending.',
    symptoms: toStringArray(raw.symptoms),
    causes: toStringArray(raw.causes),
    preventionMethods: toStringArray(raw.preventionMethods),
    organicTreatment: toStringArray(raw.organicTreatment),
    chemicalTreatment: toStringArray(raw.chemicalTreatment),
    recommendedFertilizers: toStringArray(raw.recommendedFertilizers),
    careInstructions: toStringArray(raw.careInstructions),
    nextInspectionDate: typeof raw.nextInspectionDate === 'string' && raw.nextInspectionDate.trim()
      ? raw.nextInspectionDate.trim() : nextDate(7),
  };
}

function ensureDefaults(diagnosis) {
  if (!diagnosis.symptoms.length)
    diagnosis.symptoms = ['Symptoms not clearly identified from the image.'];
  if (!diagnosis.causes.length)
    diagnosis.causes = ['Cause could not be determined from the image alone.'];
  if (!diagnosis.preventionMethods.length)
    diagnosis.preventionMethods = ['Monitor the crop regularly and practice good field hygiene.'];
  if (!diagnosis.organicTreatment.length)
    diagnosis.organicTreatment = ['Apply Neem Seed Kernel Extract (5%) as a general organic protectant.'];
  if (!diagnosis.chemicalTreatment.length)
    diagnosis.chemicalTreatment = ['Consult a local agronomist for targeted chemical treatment.'];
  if (!diagnosis.recommendedFertilizers.length)
    diagnosis.recommendedFertilizers = ['Balanced NPK fertilizer based on soil test results.'];
  if (!diagnosis.careInstructions.length)
    diagnosis.careInstructions = ['Maintain regular irrigation and monitor for further symptoms.'];
  return diagnosis;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOCAL DISEASE KNOWLEDGE BASE (40+ diseases across 16 crops)
// Used when Gemini API key is not configured, or as context for the AI prompt.
// ═══════════════════════════════════════════════════════════════════════════════
const DISEASE_DB = [
  {
    plant: ['tomato'],
    names: ['early blight', 'alternaria'],
    disease: 'Early Blight (Alternaria solani)',
    severity: 'Moderate',
    symptoms: [
      'Concentric dark brown target-board ring spots on older leaves',
      'Yellow chlorotic halos surrounding leaf spots',
      'Dark sunken stem lesions (collar rot)',
      'Premature dropping of lower foliage',
    ],
    causes: [
      'Alternaria solani fungal spores surviving in plant debris',
      'Warm humid weather (24-29°C) with frequent dew or rain',
      'Poor air circulation and dense canopy shading',
    ],
    organic: [
      'Spray 5% Neem Seed Kernel Extract (NSKE) every 7 days',
      'Foliar Trichoderma harzianum @ 5g/L or Copper Hydroxide bio-fungicide',
      'Prune infected lower leaves using sterilized shears',
    ],
    chemical: [
      'Mancozeb 75% WP @ 2.5 g/L at early onset',
      'Azoxystrobin 23% SC @ 1 ml/L for systemic control',
      'Chlorothalonil 75% WP @ 2.0 g/L every 10 days',
    ],
    fert: [
      'Calcium Nitrate @ 5g/L foliar spray to strengthen cell walls',
      'Potassium Sulfate (SOP) @ 3g/L for immune boost',
      'Trichoderma-enriched farmyard manure application',
    ],
    prevent: [
      'Rotate with non-solanaceous crops every 2-3 years',
      'Mulch soil to prevent splash onto lower leaves',
      'Use drip irrigation instead of overhead sprinklers',
    ],
    care: [
      'Avoid working in wet fields to prevent spreading spores',
      'Stake plants to elevate branches 30cm above soil',
      'Maintain balanced NPK — avoid excess nitrogen',
    ],
    handling: [
      'Harvest fruit before lesions reach the stem end',
      'Sort out visibly infected fruit before storage',
      'Store at 12-15°C with good ventilation',
    ],
  },
  {
    plant: ['tomato'],
    names: ['late blight', 'phytophthora'],
    disease: 'Late Blight (Phytophthora infestans)',
    severity: 'Severe',
    symptoms: [
      'Water-soaked dark green-black lesions on leaves',
      'White fuzzy fungal growth on leaf undersides in humid mornings',
      'Brown firm rot on fruits',
      'Rapid wilting and foliage collapse',
    ],
    causes: [
      'Cool wet weather (10-20°C) with high humidity',
      'Infected seed tubers or transplants',
      'Wind-dispersed sporangia',
    ],
    organic: [
      'Bordeaux mixture (1% copper sulfate + lime) spray',
      'Bacillus subtilis bio-fungicide foliar spray',
      'Remove and destroy infected plant debris',
    ],
    chemical: [
      'Metalaxyl + Mancozeb 8+64% WP @ 2.5 g/L',
      'Cymoxanil + Mancozeb WP @ 2.0 g/L',
      'Chlorothalonil 75% WP as protectant spray',
    ],
    fert: [
      'Balanced NPK avoiding excess nitrogen',
      'Potassium sulfate to harden tissue',
      'Boron micronutrient spray for quality',
    ],
    prevent: [
      'Use certified disease-free transplants',
      'Avoid overhead irrigation in cool weather',
      'Ensure good air circulation between plants',
    ],
    care: [
      'Remove infected foliage immediately',
      'Avoid harvesting in wet conditions',
      'Increase row spacing next season',
    ],
    handling: [
      'Harvest before disease reaches fruit',
      'Sort and discard infected produce',
      'Store at cool temperatures with ventilation',
    ],
  },
  {
    plant: ['tomato'],
    names: ['bacterial spot', 'bacterial speck'],
    disease: 'Bacterial Spot / Speck (Xanthomonas / Pseudomonas)',
    severity: 'Moderate',
    symptoms: [
      'Small dark water-soaked spots on leaves',
      'Raised scab-like lesions on fruits',
      'Leaf yellowing and defoliation in severe cases',
    ],
    causes: [
      'Bacteria spread by rain splash and contaminated tools',
      'Warm wet conditions favor rapid spread',
      'Seed-borne infection from contaminated seed lots',
    ],
    organic: [
      'Copper hydroxide spray 2g/L at first sign',
      'Bacillus amyloliquefaciens foliar application',
      'Remove infected plant debris after harvest',
    ],
    chemical: [
      'Copper hydroxide 77% WP @ 2.0 g/L',
      'Streptomycin sulfate 500 ppm foliar spray',
      'Mancozeb 75% WP @ 2.5 g/L as protectant',
    ],
    fert: [
      'Calcium nitrate @ 5g/L for cell wall strength',
      'Balanced NPK with reduced nitrogen',
    ],
    prevent: [
      'Use disease-free certified seed',
      'Practice 2-3 year crop rotation',
      'Avoid working with wet foliage',
    ],
    care: [
      'Irrigate at base, avoid wetting leaves',
      'Remove symptomatic leaves promptly',
      'Disinfect tools between plants',
    ],
    handling: [
      'Sort fruit carefully before market',
      'Store separately from healthy produce',
    ],
  },
  {
    plant: ['rice', 'paddy'],
    names: ['blast', 'rice blast', 'magnaporthe'],
    disease: 'Rice Blast (Magnaporthe oryzae)',
    severity: 'Severe',
    symptoms: [
      'Spindle-shaped grey-centered leaf lesions with brown margins',
      'Neck blast causing panicle breakage and whiteheads',
      'Node discoloration and rotting',
      'Whitish diamond-shaped spots on leaves',
    ],
    causes: [
      'High nitrogen application favoring susceptibility',
      'High humidity with intermittent dry spells',
      'Dense planting reducing air circulation',
    ],
    organic: [
      'Pseudomonas fluorescens seed treatment @ 10g/kg',
      'Neem oil foliar spray 3ml/L at tillering',
      'Remove and destroy infected plant debris',
    ],
    chemical: [
      'Tricyclazole 75% WP @ 0.6g/L at boot-leaf stage',
      'Isoprothiolane 40% EC @ 1.5ml/L',
      'Carbendazim 50% WP @ 1g/L as follow-up spray',
    ],
    fert: [
      'Split nitrogen doses instead of bulk application',
      'Potash @ 40kg/ha to strengthen cell walls',
      'Silicon-based foliar spray to boost resistance',
    ],
    prevent: [
      'Plant resistant rice hybrids',
      'Avoid excess nitrogen; balance with potash',
      'Maintain proper spacing for airflow',
    ],
    care: [
      'Drain standing water briefly to reduce humidity',
      'Scout fields every 3-4 days during boot stage',
      'Avoid nitrogen top-dressing until symptoms subside',
    ],
    handling: [
      'Dry harvested grain to 14% moisture',
      'Separate blast-affected panicles',
      'Store in aerated bins',
    ],
  },
  {
    plant: ['rice', 'paddy'],
    names: ['bacterial blight', 'rice bacterial'],
    disease: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
    severity: 'Severe',
    symptoms: [
      'Water-soaked lesions on leaf margins turning yellow-white',
      'Wavy-edged yellow streaks along leaf veins',
      'Bacterial ooze (yellow droplets) on leaf surfaces in morning',
    ],
    causes: [
      'Wounds from wind, rain, or insect feeding',
      'Contaminated irrigation water',
      'High temperature and humidity',
    ],
    organic: [
      'Seed treatment with Trichoderma viride @ 5g/kg',
      'Foliar spray of Pseudomonas fluorescens @ 10g/L',
      'Balanced silicon application',
    ],
    chemical: [
      'Streptomycin sulfate @ 500 ppm',
      'Copper hydroxide 77% WP @ 2.0 g/L',
      'Validamycin 3% SL @ 3.0 ml/L',
    ],
    fert: [
      'Silicon application to strengthen leaf tissue',
      'Reduce nitrogen during susceptible stages',
      'Balanced K application',
    ],
    prevent: [
      'Use resistant varieties (BL1, IR64)',
      'Avoid flood irrigation where possible',
      'Maintain field hygiene',
    ],
    care: [
      'Drain fields promptly after rain',
      'Avoid mechanical damage to plants',
      'Remove infected stubble after harvest',
    ],
    handling: [
      'Separate affected grain lots',
      'Thorough drying before storage',
    ],
  },
  {
    plant: ['potato'],
    names: ['late blight', 'phytophthora'],
    disease: 'Late Blight (Phytophthora infestans)',
    severity: 'Severe',
    symptoms: [
      'Water-soaked dark green-black lesions on leaves',
      'White fungal growth on leaf undersides in humid mornings',
      'Brown firm rot on tubers with rust-colored flesh',
      'Rapid wilting and foliage collapse',
    ],
    causes: [
      'Cool wet weather (10-20°C) with high humidity',
      'Infected seed tubers or volunteer plants',
      'Wind-dispersed spores over long distances',
    ],
    organic: [
      'Copper hydroxide-based bio-fungicide 2g/L',
      'Bacillus subtilis foliar spray weekly',
      'Destroy infected haulms before harvest',
    ],
    chemical: [
      'Metalaxyl + Mancozeb 8+64% WP @ 2.5g/L',
      'Cymoxanil + Mancozeb 8+64% WP alternate spray',
      'Chlorothalonil 75% WP as protectant',
    ],
    fert: [
      'Balanced NPK avoiding excess nitrogen',
      'Potassium sulfate to harden tuber skin',
      'Boron micronutrient spray for tuber quality',
    ],
    prevent: [
      'Use certified disease-free seed tubers',
      'Hill soil around stems to protect tubers',
      'Avoid overhead irrigation in cool weather',
    ],
    care: [
      'Remove and destroy infected haulms 10-14 days before harvest',
      'Avoid harvesting in wet conditions',
      'Increase row ventilation next season',
    ],
    handling: [
      'Cure tubers at 15-20°C for 10-14 days before storage',
      'Store in dark at 4-7°C with high humidity',
      'Inspect stored tubers weekly',
    ],
  },
  {
    plant: ['potato'],
    names: ['early blight', 'alternaria'],
    disease: 'Early Blight (Alternaria solani)',
    severity: 'Moderate',
    symptoms: [
      'Dark concentric target-board ring spots on older leaves',
      'Yellow halo around spots',
      'Tuber surface dark sunken lesions',
    ],
    causes: [
      'Warm humid weather with frequent rain',
      'Alternaria spores from crop residue',
      'Nitrogen deficiency increasing susceptibility',
    ],
    organic: [
      'Neem oil 5ml/L spray every 7-10 days',
      'Trichoderma harzianum soil application',
      'Remove infected leaves promptly',
    ],
    chemical: [
      'Mancozeb 75% WP @ 2.5 g/L',
      'Azoxystrobin 23% SC @ 1 ml/L',
      'Chlorothalonil 75% WP @ 2.0 g/L',
    ],
    fert: [
      'Nitrogen top-dress to boost plant vigor',
      'Potassium sulfate for tuber quality',
    ],
    prevent: [
      'Rotate with non-solanaceous crops',
      'Use certified disease-free seed',
      'Maintain balanced nutrition',
    ],
    care: [
      'Avoid overhead irrigation',
      'Hill soil regularly',
      'Monitor lower leaves weekly',
    ],
    handling: [
      'Cure before storage',
      'Store at cool temperatures',
    ],
  },
  {
    plant: ['wheat'],
    names: ['rust', 'yellow rust', 'stripe rust'],
    disease: 'Stripe / Yellow Rust (Puccinia striiformis)',
    severity: 'Moderate',
    symptoms: [
      'Yellow-orange linear stripe pustules along leaf veins',
      'Powdery yellow spore masses on leaf surface',
      'Premature leaf drying in severe infections',
    ],
    causes: [
      'Cool moist weather (10-15°C) with dew',
      'Wind-borne urediniospores from distant fields',
      'Susceptible wheat varieties',
    ],
    organic: [
      'Sulfur-based organic fungicide @ 3g/L',
      'Neem oil foliar spray at first sign',
      'Remove volunteer wheat plants',
    ],
    chemical: [
      'Propiconazole 25% EC @ 1ml/L',
      'Tebuconazole 25.9% EC @ 1ml/L',
      'Mancozeb 75% WP @ 2.5g/L as protectant',
    ],
    fert: [
      'Potassium Nitrate @ 10g/L foliar spray',
      'Zinc Sulfate @ 15 kg/ha',
    ],
    prevent: [
      'Plant resistant wheat varieties',
      'Sow within optimal window',
      'Monitor fields weekly during cool weather',
    ],
    care: [
      'Remove infected leaf tips if feasible',
      'Maintain balanced nutrition',
      'Ensure proper plant spacing',
    ],
    handling: [
      'Harvest at 12-14% grain moisture',
      'Dry thoroughly before storage',
    ],
  },
  {
    plant: ['wheat'],
    names: ['powdery mildew', 'mildew'],
    disease: 'Powdery Mildew (Blumeria graminis)',
    severity: 'Low',
    symptoms: [
      'White powdery fungal growth on leaf surfaces',
      'Chlorotic spots beneath fungal patches',
      'Stunted growth in severe infections',
    ],
    causes: [
      'High humidity with moderate temperatures',
      'Dense plant canopy',
      'Excess nitrogen fertilization',
    ],
    organic: [
      'Milk spray (1:10 milk-water solution) weekly',
      'Bicarbonate of soda spray @ 5g/L',
      'Neem oil application',
    ],
    chemical: [
      'Propiconazole 25% EC @ 1ml/L',
      'Sulfur 80% WP @ 3g/L',
      'Tebuconazole 25.9% EC @ 1ml/L',
    ],
    fert: [
      'Reduce nitrogen application',
      'Balanced potassium nutrition',
    ],
    prevent: [
      'Choose resistant varieties',
      'Avoid dense planting',
      'Improve air circulation',
    ],
    care: [
      'Monitor upper canopy leaves',
      'Irrigate early morning, not evening',
    ],
    handling: [
      'Harvest when grain is mature',
      'Dry grain to safe moisture level',
    ],
  },
  {
    plant: ['wheat'],
    names: ['healthy'],
    disease: 'Healthy — No Disease Detected',
    severity: 'None',
    isHealthy: true,
    symptoms: ['Uniform green leaf color', 'No visible spots or wilting', 'Healthy erect stem posture'],
    causes: ['Optimal growing conditions maintained', 'Balanced fertilization and irrigation'],
    organic: ['Continue routine preventive sprays', 'Maintain compost/FYM soil enrichment'],
    chemical: ['No chemical treatment currently required'],
    fert: ['Continue balanced NPK as per growth stage', 'Zinc Sulfate @ 15 kg/ha for grain quality'],
    prevent: ['Sow seeds early to avoid peak spore migration', 'Continue field scouting every 5-7 days'],
    care: ['Maintain current schedule', 'Keep monitoring weekly', 'No corrective action needed'],
    handling: ['Harvest at 12-14% grain moisture', 'Store in clean, ventilated bins'],
  },
  {
    plant: ['maize', 'corn'],
    names: ['rust', 'common rust'],
    disease: 'Common Rust (Puccinia sorghi)',
    severity: 'Moderate',
    symptoms: [
      'Small circular to elongate reddish-brown pustules',
      'Pustules on both upper and lower leaf surfaces',
      'Leaf yellowing and premature senescence',
    ],
    causes: [
      'Cool nights (16-23°C) with heavy dew',
      'Wind-borne urediniospores from nearby fields',
      'Susceptible hybrid varieties',
    ],
    organic: [
      'Sulfur-based organic fungicide 3g/L',
      'Neem oil spray at first pustule appearance',
      'Remove volunteer maize plants',
    ],
    chemical: [
      'Propiconazole 25% EC @ 1ml/L',
      'Azoxystrobin + Difenoconazole combination',
      'Mancozeb 75% WP as protectant cover spray',
    ],
    fert: [
      'Potassium Nitrate (13-0-45) @ 10g/L foliar',
      'Zinc Sulfate @ 15 kg/ha',
    ],
    prevent: [
      'Plant resistant corn hybrids',
      'Sow seeds early to avoid peak spore migration',
      'Ensure balanced spacing for airflow',
    ],
    care: [
      'Remove heavily infected lower leaves',
      'Avoid overhead irrigation during cool evenings',
      'Monitor upper canopy weekly through tasseling',
    ],
    handling: [
      'Harvest at 20-25% grain moisture',
      'Dry to 13-15% for storage',
    ],
  },
  {
    plant: ['maize', 'corn'],
    names: ['fall armyworm', 'armyworm'],
    disease: 'Fall Armyworm (Spodoptera frugiperda)',
    severity: 'Severe',
    symptoms: [
      'Large irregular holes chewed in leaves',
      'Frass (insect excrement) in leaf whorl',
      'Damaged developing ear with feeding scars',
    ],
    causes: [
      'Moth migration from warmer regions',
      'Warm humid conditions favoring rapid reproduction',
      'Absence of natural predators',
    ],
    organic: [
      'Trichogramma egg parasitoid release @ 50,000/ha',
      'Neem-based botanical spray @ 5ml/L',
      'Bt (Bacillus thuringiensis) spray at early instar',
    ],
    chemical: [
      'Emamectin Benzoate 5 SG @ 0.4g/L',
      'Chlorantraniliprole 18.5% SC @ 0.3ml/L',
      'Cartap hydrochloride 4% G @ 25kg/ha granular',
    ],
    fert: [
      'Balanced nitrogen for plant recovery',
      'Foliar amino acid spray to boost vigor',
    ],
    prevent: [
      'Install pheromone traps @ 10/ha for monitoring',
      'Plant push-pull companion crops (Desmodium/Napier)',
      'Scout weekly for egg masses and early instars',
    ],
    care: [
      'Hand-pick larvae from whorl when feasible',
      'Apply treatments to whorl for best contact',
      'Maintain field borders clean of alternate hosts',
    ],
    handling: [
      'Harvest damaged ears promptly to reduce secondary infection',
      'Dry grain to 13% moisture for storage',
    ],
  },
  {
    plant: ['maize', 'corn'],
    names: ['northern leaf blight', 'helminthosporium'],
    disease: 'Northern Leaf Blight (Exserohilum turcicum)',
    severity: 'Moderate',
    symptoms: [
      'Large cigar-shaped grey-green lesions on leaves',
      'Lesions expanding to 5-15cm in length',
      'Reduced photosynthetic area causing yield loss',
    ],
    causes: [
      'Warm humid conditions (18-27°C)',
      'Crop residue carrying inoculum',
      'Extended leaf wetness periods',
    ],
    organic: [
      'Neem oil 5ml/L spray',
      'Trichoderma-based bio-fungicide',
      'Crop residue management',
    ],
    chemical: [
      'Azoxystrobin 23% SC @ 1ml/L',
      'Propiconazole 25% EC @ 1ml/L',
      'Mancozeb 75% WP @ 2.5g/L',
    ],
    fert: [
      'Balanced nutrition',
      'Potassium sulfate for disease tolerance',
    ],
    prevent: [
      'Plant resistant hybrids (Ht gene)',
      'Rotate with non-host crops',
      'Till residue deeply into soil',
    ],
    care: [
      'Monitor leaves from knee-high stage',
      'Apply fungicide at tasseling if needed',
    ],
    handling: [
      'Harvest at optimal moisture',
      'Dry grain properly before storage',
    ],
  },
  {
    plant: ['cotton'],
    names: ['bollworm', 'pink bollworm'],
    disease: 'Bollworm Complex (Helicoverpa/Pectinophora)',
    severity: 'Severe',
    symptoms: [
      'Holes bored into cotton bolls',
      'Larval frass visible on boll surface',
      'Damaged seed and lint inside bolls',
    ],
    causes: [
      'Moth immigration from alternate hosts',
      'Warm temperatures favoring rapid larval development',
      'Incomplete spray coverage',
    ],
    organic: [
      'Trichogramma chilonis egg parasitoid release',
      'Bt (Bacillus thuringiensis) spray @ 2g/L',
      'Pheromone trap monitoring @ 5/ha',
    ],
    chemical: [
      'Emamectin Benzoate 5 SG @ 0.4g/L',
      'Chlorantraniliprole 18.5% SC @ 0.3ml/L',
      'Profenophos 50% EC @ 2ml/L',
    ],
    fert: [
      'Balanced potassium for boll development',
      'Avoid excess nitrogen prolonging vegetative growth',
    ],
    prevent: [
      'Install sex pheromone traps for monitoring',
      'Practice push-pull or intercropping with okra',
      'Timely sowing to avoid peak bollworm period',
    ],
    care: [
      'Scout for egg masses on squares and bolls',
      'Spray in evening for best contact',
      'Remove damaged bolls promptly',
    ],
    handling: [
      'Pick cotton in dry conditions',
      'Store lint in dry, ventilated warehouses',
    ],
  },
  {
    plant: ['cotton'],
    names: ['fusarium wilt', 'wilt'],
    disease: 'Fusarium Wilt (Fusarium oxysporum)',
    severity: 'Severe',
    symptoms: [
      'Yellowing of lower leaves progressing upward',
      'Vascular browning visible in stem cross-section',
      'Plant wilting and eventual death',
    ],
    causes: [
      'Soil-borne Fusarium spores persisting for years',
      'Warm soil temperatures (25-30°C)',
      'Slightly alkaline soil pH favoring pathogen',
    ],
    organic: [
      'Trichoderma viride soil application @ 10g/kg seed',
      'Neem cake soil amendment',
      'Bio-compost enriched with beneficial microbes',
    ],
    chemical: [
      'Carbendazim 50% WP seed treatment @ 2g/kg',
      'Metalaxyl 35% WS @ 3g/kg seed',
    ],
    fert: [
      'Reduce nitrogen to limit vegetative succulence',
      'Increase potassium for disease tolerance',
    ],
    prevent: [
      'Plant wilt-resistant varieties (e.g., Bunny Heap)',
      'Rotate with non-host crops for 3-4 years',
      'Raise soil pH to 6.5-7.0 with lime',
    ],
    care: [
      'Remove and burn infected plants immediately',
      'Disinfect tools between plants',
    ],
    handling: [
      'Avoid replanting cotton in affected fields',
      'Deep plowing to expose spores to sunlight',
    ],
  },
  {
    plant: ['sugarcane'],
    names: ['red rot', 'colletotrichum'],
    disease: 'Red Rot (Colletotrichum falcatum)',
    severity: 'Severe',
    symptoms: [
      'Reddened internal pith with white patches',
      'Drying of leaves starting from top',
      'Foul fermented smell from split stems',
    ],
    causes: [
      'Wound infection through cut sets or borers',
      'Warm humid monsoon conditions',
      'Use of infected setts for planting',
    ],
    organic: [
      'Bordeaux mixture (1%) sett treatment',
      'Trichoderma viride @ 10g/L sett dip',
      'Hot water treatment of setts at 52°C for 30 min',
    ],
    chemical: [
      'Carbendazim 50% WP @ 2g/L sett dip',
      'Hexaconazole 5% EC @ 2ml/L',
    ],
    fert: [
      'Balanced NPK with adequate potassium',
      'Green manuring between rows',
    ],
    prevent: [
      'Use disease-free certified setts',
      'Treat setts with fungicide before planting',
      'Grow resistant varieties (Co 86032)',
    ],
    care: [
      'Remove and burn infected canes immediately',
      'Avoid excess nitrogen during monsoon',
      'Maintain proper drainage',
    ],
    handling: [
      'Process within 24-48 hours of harvest',
      'Do not transport diseased canes to mill',
    ],
  },
  {
    plant: ['sugarcane'],
    names: ['smut', 'ustilago'],
    disease: 'Smut (Sporisorium scitamineum)',
    severity: 'Moderate',
    symptoms: [
      'Black powdery spore mass (whip) replacing the terminal bud',
      'Slimy black powder covering shoots',
      'Stunted growth of infected shoots',
    ],
    causes: [
      'Wind-borne teliospores infecting growing points',
      'Warm humid conditions',
      'Use of susceptible varieties',
    ],
    organic: [
      'Remove and burn whips before spore dispersal',
      'Immerse setts in Trichoderma solution',
    ],
    chemical: [
      'Carbendazim 50% WP seed treatment',
      'Triadimefon 25% WP @ 1g/L foliar',
    ],
    fert: [
      'Adequate nitrogen for vigorous growth',
      'Balanced nutrition to reduce susceptibility',
    ],
    prevent: [
      'Plant resistant varieties (CoC 671, Co 86032)',
      'Use healthy setts from smut-free fields',
      'Remove infected shoots as soon as whip appears',
    ],
    care: [
      'Inspect fields weekly during growing season',
      'Remove whips before they turn black',
    ],
    handling: [
      'Do not use smut-infected setts for planting',
      'Deep plowing after harvest',
    ],
  },
  {
    plant: ['chili', 'chilli', 'pepper'],
    names: ['dieback', 'wilt', 'phytophthora'],
    disease: 'Phytophthora Wilt / Die-back',
    severity: 'Severe',
    symptoms: [
      'Sudden wilting of branches starting from top',
      'Brown discoloration of vascular tissue',
      'Water-soaked stem lesions at soil line',
    ],
    causes: [
      'Waterlogged soil conditions',
      'Phytophthora capsici soil-borne inoculum',
      'Warm wet monsoon weather',
    ],
    organic: [
      'Metalaxyl-based bio-fungicide soil drench',
      'Trichoderma harzianum application',
      'Improve drainage immediately',
    ],
    chemical: [
      'Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L soil drench',
      'Fosetyl-Al 80% WP @ 2.5g/L foliar',
      'Phosphorous acid @ 3ml/L foliar spray',
    ],
    fert: [
      'Balanced NPK to avoid succulent growth',
      'Increased potassium for disease tolerance',
    ],
    prevent: [
      'Ensure proper drainage in field',
      'Raise beds for planting',
      'Rotate with non-solanaceous crops',
    ],
    care: [
      'Remove and burn infected plants immediately',
      'Avoid irrigation that causes waterlogging',
      'Drench soil with copper-based fungicide',
    ],
    handling: [
      'Harvest only healthy fruits',
      'Sun-dry to reduce moisture content',
    ],
  },
  {
    plant: ['chili', 'chilli', 'pepper'],
    names: ['leaf curl', 'leaf curl virus', 'thrips'],
    disease: 'Chili Leaf Curl Virus (ChLCV)',
    severity: 'Severe',
    symptoms: [
      'Upward curling and thickening of leaves',
      'Stunted plant growth',
      'Reduced flowering and fruit set',
    ],
    causes: [
      'Whitefly (Bemisia tabaci) vector transmission',
      'Warm dry conditions favoring whitefly populations',
      'Alternate host plants serving as virus reservoir',
    ],
    organic: [
      'Yellow sticky traps to monitor whitefly',
      'Neem oil 5ml/L spray every 7 days',
      'Reflective mulch to repel whitefly',
    ],
    chemical: [
      'Imidacloprid 17.8% SL @ 0.5ml/L soil drench',
      'Thiamethoxam 25% WG @ 0.3g/L foliar',
      'Diafenthiuron 50% WP @ 1.2g/L',
    ],
    fert: [
      'Balanced nutrition with adequate potassium',
      'Amino acid foliar spray for plant recovery',
    ],
    prevent: [
      'Remove infected plants (roguing) immediately',
      'Install yellow sticky traps @ 12/ha',
      'Control whitefly population aggressively',
    ],
    care: [
      'Spray in evening when whiteflies are active',
      'Maintain field hygiene and remove weeds',
    ],
    handling: [
      'Harvest healthy fruits only',
      'Sun-dry or process promptly',
    ],
  },
  {
    plant: ['banana'],
    names: ['panama disease', 'fusarium wilt', 'wilt'],
    disease: 'Panama Disease / Fusarium Wilt (Fusarium oxysporum f.sp. cubense)',
    severity: 'Severe',
    symptoms: [
      'Yellowing of older leaves from margin inward',
      'Vascular discoloration (reddish-brown) in corm',
      'Plant collapse and death',
    ],
    causes: [
      'Soil-borne Fusarium spores persisting for decades',
      'Contaminated tools, water, or infected suckers',
      'Warm soil temperatures (28-32°C)',
    ],
    organic: [
      'Biological soil amendment with Trichoderma',
      'Organic matter enrichment to boost beneficial microbes',
      'Remove and destroy infected mats',
    ],
    chemical: [
      'Carbendazim 50% WP soil drench @ 2g/L',
      'No fully effective chemical cure exists',
    ],
    fert: [
      'Potassium-rich fertilization for tolerance',
      'Balanced NPK with reduced nitrogen',
    ],
    prevent: [
      'Use tissue-culture disease-free planting material',
      'Do not move soil between fields',
      'Grow resistant varieties (GCTCV-219)',
    ],
    care: [
      'Remove and destroy infected plants immediately',
      'Do not replant banana in infected areas',
      'Disinfect all tools after use',
    ],
    handling: [
      'Harvest before disease reaches bunch',
      'Do not transport from infected plantations',
    ],
  },
  {
    plant: ['banana'],
    names: ['sigatoka', 'black sigatoka', 'leaf spot'],
    disease: 'Black Sigatoka (Mycosphaerella fijiensis)',
    severity: 'Moderate',
    symptoms: [
      'Dark brown to black streaks on leaves',
      'Premature leaf death reducing bunch weight',
      'Reduced photosynthesis affecting fruit quality',
    ],
    causes: [
      'High humidity and rainfall',
      'Wind-dispersed fungal spores',
      'Dense canopy trapping moisture',
    ],
    organic: [
      'Remove and bag heavily infected leaves',
      'Trichoderma-based foliar spray',
      'Sulfur-based organic fungicide',
    ],
    chemical: [
      'Chlorothalonil 75% WP @ 2.5g/L',
      'Mancozeb 75% WP @ 2.5g/L',
      'Azoxystrobin 23% SC @ 1ml/L',
    ],
    fert: [
      'Balanced NPK for leaf health',
      'Potassium for disease tolerance',
    ],
    prevent: [
      'Regular de-leafing of infected leaves',
      'Maintain proper plant spacing',
      'Improve air circulation in canopy',
    ],
    care: [
      'Spray every 14 days during wet season',
      'Remove dead leaves promptly',
    ],
    handling: [
      'Harvest at proper maturity',
      'Handle carefully to avoid bruising',
    ],
  },
  {
    plant: ['mango'],
    names: ['anthracnose', 'colletotrichum'],
    disease: 'Anthracnose (Colletotrichum gloeosporioides)',
    severity: 'Moderate',
    symptoms: [
      'Dark brown to black spots on leaves and fruit',
      'Shot-hole appearance in severe leaf infection',
      'Post-harvest fruit rot with sunken black lesions',
    ],
    causes: [
      'Warm wet conditions during flowering and fruit development',
      'Rain-splashed conidia spreading infection',
      'Wound entry through insect damage',
    ],
    organic: [
      'Bordeaux mixture (1%) pre-flowering spray',
      'Hot water treatment of fruit at 52°C for 5 min',
      'Neem oil spray at fruit development stage',
    ],
    chemical: [
      'Mancozeb 75% WP @ 2.5g/L pre-harvest spray',
      'Azoxystrobin 23% SC @ 1ml/L',
      'Carbendazim 50% WP @ 1g/L at flower stage',
    ],
    fert: [
      'Balanced nutrition with adequate potassium',
      'Calcium foliar spray for fruit firmness',
    ],
    prevent: [
      'Prune for open canopy to reduce humidity',
      'Remove infected fruits and twigs',
      'Spray fungicide at pre-flowering and fruit-set stages',
    ],
    care: [
      'Harvest at proper maturity',
      'Handle carefully to avoid mechanical damage',
    ],
    handling: [
      'Dip fruit in hot water immediately after harvest',
      'Store at 12-14°C',
    ],
  },
  {
    plant: ['mango'],
    names: ['powdery mildew', 'mildew'],
    disease: 'Powdery Mildew (Oidium mangiferae)',
    severity: 'Moderate',
    symptoms: [
      'White powdery fungal growth on flowers and young fruit',
      'Flower and fruit drop',
      'Russeting on fruit surface',
    ],
    causes: [
      'Dry warm days with cool nights',
      'High humidity without rain',
      'Dense canopy reducing air movement',
    ],
    organic: [
      'Sulfur-based spray @ 3g/L at flower stage',
      'Neem oil 5ml/L application',
      'Potassium bicarbonate spray @ 5g/L',
    ],
    chemical: [
      'Carbendazim 50% WP @ 1g/L',
      'Hexaconazole 5% EC @ 2ml/L',
      'Tebuconazole 25.9% EC @ 1ml/L',
    ],
    fert: [
      'Balanced nutrition',
      'Calcium spray for fruit quality',
    ],
    prevent: [
      'Prune for open canopy',
      'Spray at bud burst and flowering stages',
      'Remove infected flower panicles',
    ],
    care: [
      'Monitor flower panicles weekly',
      'Apply sprays preventively at critical stages',
    ],
    handling: [
      'Harvest only clean fruit',
      'Grade and pack carefully',
    ],
  },
  {
    plant: ['groundnut', 'peanut'],
    names: ['leaf spot', 'late leaf spot', 'cercospora'],
    disease: 'Late Leaf Spot (Cercosporidium personatum)',
    severity: 'Moderate',
    symptoms: [
      'Dark brown circular spots on leaflets',
      'Premature defoliation reducing yield',
      'Spots with concentric rings visible on underside',
    ],
    causes: [
      'Warm humid conditions (25-30°C)',
      'Wind-dispersed spores',
      'High soil moisture and dense planting',
    ],
    organic: [
      'Neem oil 5ml/L spray at first appearance',
      'Bordeaux mixture (1%) application',
      'Crop residue management',
    ],
    chemical: [
      'Mancozeb 75% WP @ 2.5g/L',
      'Chlorothalonil 75% WP @ 2g/L',
      'Carbendazim 50% WP @ 1g/L',
    ],
    fert: [
      'Balanced NPK',
      'Calcium for pod development',
    ],
    prevent: [
      'Plant resistant varieties',
      'Rotate with non-legume crops',
      'Avoid overhead irrigation',
    ],
    care: [
      'Scout for leaf spots from 30 DAS',
      'Apply first spray at 40-45 DAS',
    ],
    handling: [
      'Harvest at maturity',
      'Dry pods to 8-9% moisture',
    ],
  },
  {
    plant: ['groundnut', 'peanut'],
    names: ['rust', 'groundnut rust'],
    disease: 'Groundnut Rust (Pachy属poulous arachidis)',
    severity: 'Moderate',
    symptoms: [
      'Small orange-brown powdery pustules on leaf undersides',
      'Premature leaf drop',
      'Reduced pod fill and yield',
    ],
    causes: [
      'Warm humid conditions',
      'Rain splash dispersal',
      'Susceptible varieties',
    ],
    organic: [
      'Neem oil spray',
      'Sulfur-based organic fungicide',
    ],
    chemical: [
      'Mancozeb 75% WP @ 2.5g/L',
      'Propiconazole 25% EC @ 1ml/L',
    ],
    fert: [
      'Balanced nutrition',
      'Potassium for disease tolerance',
    ],
    prevent: [
      'Grow resistant varieties',
      'Early sowing to avoid peak disease period',
    ],
    care: [
      'Monitor leaf undersides',
      'Apply fungicide at first pustule appearance',
    ],
    handling: [
      'Harvest before excessive defoliation',
      'Dry and store properly',
    ],
  },
  {
    plant: ['soybean'],
    names: ['rust', 'soybean rust'],
    disease: 'Asian Soybean Rust (Phakopsora pachyrhizi)',
    severity: 'Severe',
    symptoms: [
      'Small tan to brown raised pustules on leaf undersides',
      'Premature defoliation',
      'Reduced seed size and quality',
    ],
    causes: [
      'Wind-borne spores from tropical regions',
      'Warm humid weather (18-26°C)',
      'Extended leaf wetness periods',
    ],
    organic: [
      'Sulfur-based organic fungicide @ 3g/L',
      'Neem oil spray @ 5ml/L',
      'Remove and destroy crop debris',
    ],
    chemical: [
      'Triadimefon 25% WP @ 1g/L',
      'Azoxystrobin 23% SC @ 1ml/L',
      'Mancozeb 75% WP @ 2.5g/L',
    ],
    fert: [
      'Balanced NPK',
      'Manganese foliar spray for recovery',
    ],
    prevent: [
      'Plant early to avoid peak rust pressure',
      'Use resistant/tolerant varieties',
      'Scout weekly from vegetative stage',
    ],
    care: [
      'Apply fungicide at first pustule sighting',
      'Maintain proper plant spacing',
    ],
    handling: [
      'Harvest before excessive leaf drop',
      'Dry grain to 13% moisture',
    ],
  },
  {
    plant: ['soybean'],
    names: ['root rot', 'phytophthora root rot'],
    disease: 'Phytophthora Root Rot (Phytophthora sojae)',
    severity: 'Severe',
    symptoms: [
      'Sudden wilting and death of seedlings',
      'Brown water-soaked lesions on roots and lower stem',
      'Chlorosis and stunting of surviving plants',
    ],
    causes: [
      'Waterlogged soil conditions',
      'Soil-borne Phytophthora spores',
      'Heavy clay soils with poor drainage',
    ],
    organic: [
      'Trichoderma viride seed treatment',
      'Bio-compost soil amendment',
      'Improve drainage immediately',
    ],
    chemical: [
      'Metalaxyl 35% WS seed treatment @ 3g/kg',
      'Fosetyl-Al 80% WP soil drench',
    ],
    fert: [
      'Balanced nutrition',
      'Avoid excess nitrogen',
    ],
    prevent: [
      'Use resistant varieties (Rps genes)',
      'Ensure proper field drainage',
      'Rotate with non-host crops',
    ],
    care: [
      'Remove and destroy infected plants',
      'Drench soil with phosphorous acid',
    ],
    handling: [
      'Do not replant soybean in affected areas',
      'Deep plowing after harvest',
    ],
  },
  {
    plant: ['chickpea', 'gram'],
    names: ['wilt', 'fusarium wilt'],
    disease: 'Fusarium Wilt (Fusarium oxysporum f.sp. ciceri)',
    severity: 'Severe',
    symptoms: [
      'Yellowing and wilting of one or more branches',
      'Brown vascular discoloration in stem base',
      'Brown-black roots with shredding',
    ],
    causes: [
      'Soil-borne Fusarium surviving as chlamydospores',
      'Warm soil temperatures (25-28°C)',
      ' alkaline soil pH',
    ],
    organic: [
      'Trichoderma viride seed treatment @ 10g/kg',
      'Bacillus subtilis soil application',
      'Neem cake soil amendment',
    ],
    chemical: [
      'Carbendazim 50% WP seed treatment @ 2g/kg',
      'Thiophanate methyl 70% WP @ 2g/kg',
    ],
    fert: [
      'Balanced phosphorus for root health',
      'Mycorrhizal inoculant application',
    ],
    prevent: [
      'Grow wilt-resistant varieties (JG 74, K850)',
      'Deep summer plowing to expose spores',
      'Seed treatment with bio-agents',
    ],
    care: [
      'Remove and burn infected plants immediately',
      'Do not irrigate excessively',
    ],
    handling: [
      'Harvest before complete plant death',
      'Clean machinery before moving to healthy fields',
    ],
  },
  {
    plant: ['chickpea', 'gram'],
    names: ['blight', 'botrytis', 'aszochytes'],
    disease: 'Ascochyta Blight (Ascochyta rabiei)',
    severity: 'Severe',
    symptoms: [
      'Circular dark brown spots on leaves, stems, and pods',
      'Concentric rings within lesions',
      'Premature pod shattering and seed shriveling',
    ],
    causes: [
      'Cool wet weather during flowering',
      'Rain splash spreading conidia',
      'Infected seed carryover',
    ],
    organic: [
      'Trichoderma harzianum seed treatment',
      'Bordeaux mixture spray',
      'Crop rotation with cereals',
    ],
    chemical: [
      'Mancozeb 75% WP @ 2.5g/L',
      'Chlorothalonil 75% WP @ 2g/L',
      'Carbendazim 50% WP @ 1g/L',
    ],
    fert: [
      'Balanced NPK',
      'Sulfur application',
    ],
    prevent: [
      'Use certified disease-free seed',
      'Treat seed with fungicide before sowing',
      'Rotate with non-host crops for 2-3 years',
    ],
    care: [
      'Scout fields during cool wet weather',
      'Apply first spray at 40 DAS or first symptom',
    ],
    handling: [
      'Harvest at proper maturity',
      'Thresh and dry quickly',
    ],
  },
  // ── Onion Diseases ──
  {
    plant: ['onion'],
    names: ['purple blotch', 'alternaria porri'],
    disease: 'Purple Blotch (Alternaria porri)',
    severity: 'Moderate',
    symptoms: [
      'Small water-soaked sunken lesions with purple centers on leaves',
      'Yellow halo around purple lesions',
      'Lesions merging causing leaf drying',
    ],
    causes: [
      'Warm moist weather with frequent dew and rain',
      'Alternaria porri fungal spores',
      'Dense planting reducing airflow',
    ],
    organic: [
      'Foliar Trichoderma spray @ 5g/L',
      '3% Neem oil + garlic solution spray',
      'Balanced fertilization with sulfur',
    ],
    chemical: [
      'Mancozeb 75% WP @ 2.5g/L',
      'Difenoconazole 25 EC @ 1 ml/L',
      'Tebuconazole 25.9% EC @ 1ml/L',
    ],
    fert: [
      'Elemental sulfur @ 30 kg/ha at land preparation',
      'Balanced NPK with adequate sulfur',
    ],
    prevent: [
      'Apply elemental sulfur @ 30 kg/ha at land preparation',
      'Stop irrigation 15 days prior to bulb harvest',
      'Avoid dense planting',
    ],
    care: [
      'Neck cutting should leave 2-3cm stem attached',
      'Erect blue sticky traps @ 20/acre for thrips',
    ],
    handling: [
      'Cure bulbs 3-5 days under shade before storage',
      'Store at 25-30°C with 65-70% RH',
    ],
  },
  {
    plant: ['onion'],
    names: ['downy mildew', 'peronospora'],
    disease: 'Downy Mildew (Peronospora destructor)',
    severity: 'Moderate',
    symptoms: [
      'Pale yellow streaks on leaves',
      'Downy white to purple fungal growth on leaf surfaces',
      'Premature leaf collapse',
    ],
    causes: [
      'Cool damp weather with prolonged leaf wetness',
      'Wind-dispersed sporangia',
      'Dense canopy trapping moisture',
    ],
    organic: [
      'Copper-based bio-fungicide spray',
      'Neem oil 5ml/L application',
      'Improve drainage immediately',
    ],
    chemical: [
      'Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L',
      'Fosetyl-Al 80% WP @ 2.5g/L',
    ],
    fert: [
      'Balanced nutrition',
      'Avoid excess nitrogen',
    ],
    prevent: [
      'Ensure good air circulation',
      'Avoid overhead irrigation',
      'Use resistant varieties',
    ],
    care: [
      'Remove and destroy infected foliage',
      'Improve drainage in the field',
    ],
    handling: [
      'Harvest before disease spreads to bulbs',
      'Cure properly before storage',
    ],
  },
  {
    plant: ['onion'],
    names: ['thrips'],
    disease: 'Onion Thrips (Thrips tabaci)',
    severity: 'Moderate',
    symptoms: [
      'Silver patches on leaf surfaces',
      'White specks and distorted leaf tips',
      'Premature leaf drying in severe cases',
    ],
    causes: [
      'Thrips feeding on leaf epidermis',
      'Hot dry weather favoring thrips multiplication',
      'Weed hosts near field',
    ],
    organic: [
      'Blue sticky traps @ 20/acre for monitoring',
      'Neem oil 5ml/L spray',
      'Reflective mulch to repel thrips',
    ],
    chemical: [
      'Imidacloprid 17.8% SL @ 0.5ml/L',
      'Diafenthiuron 50% WP @ 1.2g/L',
      'Spinocad 6% EC @ 1ml/L',
    ],
    fert: [
      'Balanced nutrition',
      'Avoid excess nitrogen which promotes succulent growth',
    ],
    prevent: [
      'Remove weed hosts near the field',
      'Erect blue sticky traps for monitoring',
      'Intercrop with strong-smelling plants',
    ],
    care: [
      'Spray in evening when thrips are most active',
      'Rotate chemical classes to prevent resistance',
    ],
    handling: [
      'Harvest at proper maturity',
      'Cure bulbs well before storage',
    ],
  },
  // ── Coconut Diseases ──
  {
    plant: ['coconut'],
    names: ['bud rot', 'phytophthora palmivora'],
    disease: 'Bud Rot (Phytophthora palmivora)',
    severity: 'Severe',
    symptoms: [
      'Yellowing and drooping of central spindle leaf',
      'Rotting of crown bud with foul odor',
      'Premature nut fall',
    ],
    causes: [
      'Heavy monsoon rains and continuous wet weather',
      'Phytophthora palmivora in high humidity',
      'Wounds from rhinoceros beetle creating entry points',
    ],
    organic: [
      'Bordeaux paste application on crown bud',
      'Trichoderma harzianum coir-pith cake to root zone',
    ],
    chemical: [
      'Copper Oxychloride 0.3% drenching on crown',
      'Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L',
    ],
    fert: [
      'Balanced potassium nutrition',
      'Micronutrient spray for recovery',
    ],
    prevent: [
      'Clean crown area twice a year',
      'Fill top leaf axils with Neem cake + sand',
      'Avoid root damage during cultivation',
    ],
    care: [
      'Apply Bordeaux paste on stem bleeding cracks',
      'Release parasitoid for black headed caterpillar',
    ],
    handling: [
      'Harvest only mature nuts',
      'Process copra within 24 hours',
    ],
  },
  // ── Healthy States ──
  {
    plant: ['maize', 'corn'],
    names: ['healthy'],
    disease: 'Healthy — No Disease Detected',
    severity: 'None',
    isHealthy: true,
    symptoms: ['Uniform deep green leaf color', 'No pustules, spots, or wilting', 'Strong erect stem posture'],
    causes: ['Optimal growing conditions', 'Balanced NPK nutrition'],
    organic: ['Continue routine preventive sprays', 'Maintain soil health with compost'],
    chemical: ['No chemical treatment required'],
    fert: ['Continue balanced NPK as per growth stage', 'Zinc Sulfate @ 25 kg/ha'],
    prevent: ['Maintain crop rotation', 'Continue weekly scouting'],
    care: ['No corrective action needed', 'Maintain current schedule'],
    handling: ['Harvest at 13-15% grain moisture', 'Dry and store properly'],
  },
  {
    plant: ['cotton'],
    names: ['healthy'],
    disease: 'Healthy — No Disease Detected',
    severity: 'None',
    isHealthy: true,
    symptoms: ['Uniform green foliage', 'No boll damage visible', 'Healthy square and boll development'],
    causes: ['Good agronomic practices', 'Balanced nutrition and IPM'],
    organic: ['Continue preventive neem sprays', 'Maintain field hygiene'],
    chemical: ['No chemical treatment required'],
    fert: ['Balanced NPK', 'Magnesium and boron supplementation'],
    prevent: ['Maintain IPM schedule', 'Continue monitoring'],
    care: ['No corrective action needed'],
    handling: ['Pick cotton in dry conditions', 'Store at <8% moisture'],
  },
  {
    plant: ['sugarcane'],
    names: ['healthy'],
    disease: 'Healthy — No Disease Detected',
    severity: 'None',
    isHealthy: true,
    symptoms: ['Tall healthy green stalks', 'No internal red discoloration', 'No whip or smut emergence'],
    causes: ['Good sett selection', 'Balanced nutrition and drainage'],
    organic: ['Continue trash mulching', 'Maintain soil health'],
    chemical: ['No chemical treatment required'],
    fert: ['Balanced NPK as per growth stage', 'Adequate potassium'],
    prevent: ['Use certified disease-free setts', 'Maintain field drainage'],
    care: ['No corrective action needed'],
    handling: ['Process within 24 hours of harvest'],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// POST /api/analyze — Image Disease Detection
// ═══════════════════════════════════════════════════════════════════════════════
app.post('/api/analyze', async (req, res) => {
  try {
    const { imageDataUrl, plantHint } = req.body || {};

    // Validate input
    if (!imageDataUrl || typeof imageDataUrl !== 'string') {
      return res.status(400).json({ error: 'imageDataUrl (base64 data URL) is required.' });
    }
    if (!imageDataUrl.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Invalid image format. Expected a base64 data URL.' });
    }

    // Extract mime type and base64 data
    const match = imageDataUrl.match(/^data:image\/([a-z+]+);base64,/i);
    const mimeType = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';
    const base64 = imageDataUrl.includes(',') ? imageDataUrl.split(',')[1] : imageDataUrl;

    if (!base64 || base64.length < 100) {
      return res.status(400).json({ error: 'Image data appears to be empty or corrupted.' });
    }

    // ── Try Gemini AI first ──────────────────────────────────────────────
    const ai = await getAI();
    if (ai) {
      try {
        const plantHintText = plantHint
          ? `The user identified this plant as "${plantHint}". Use this as a strong hint when identifying the crop and disease.`
          : '';

        const prompt = [
          'You are CropVision, an expert plant pathologist and agronomy assistant for smallholder farmers worldwide.',
          '',
          'TASK: Analyze the attached plant/leaf image and provide a detailed disease diagnosis.',
          '',
          'INSTRUCTIONS:',
          '1. Carefully examine the image for: lesion shape, color patterns, spot distribution, leaf discoloration, wilting, fungal growth, insect damage, or nutrient deficiency signs.',
          '2. Identify the crop/plant species if possible.',
          '3. Diagnose the specific disease, pest damage, nutrient deficiency, or confirm if the plant is healthy.',
          '4. Provide practical, farmer-friendly treatment recommendations.',
          '',
          plantHintText,
          '',
          `Today's date is ${today()}.`,
          '',
          'RESPOND with ONLY a single valid JSON object. Do NOT use markdown code fences, explanations, or any text outside the JSON.',
          '',
          'The JSON must have exactly these keys:',
          '- plantName (string: common crop name)',
          '- diseaseName (string: specific disease name; if healthy use "Healthy Crop - No Disease Detected")',
          '- isHealthy (boolean)',
          '- confidence (number 0-100, your diagnostic confidence)',
          '- severityLevel (string, exactly one of: "Low", "Moderate", "Severe", "None")',
          '- description (string: 2-3 practical sentences about the diagnosis)',
          '- symptoms (array of 3-5 strings describing visible symptoms)',
          '- causes (array of 2-4 strings explaining the causes)',
          '- preventionMethods (array of 3-4 strings with practical prevention steps)',
          '- organicTreatment (array of 2-4 strings with organic remedies including exact concentrations)',
          '- chemicalTreatment (array of 2-4 strings with chemical treatments including product names and concentrations in g/L or ml/L)',
          '- recommendedFertilizers (array of 2-4 strings with fertilizer recommendations)',
          '- careInstructions (array of 2-4 strings with field care instructions)',
          '- nextInspectionDate (string like "Jul 15, 2026", 3-10 days from today)',
          '',
          'RULES:',
          '- Always provide specific chemical names, concentrations (g/L or ml/L), and application intervals.',
          '- Always include organic alternatives alongside chemical treatments.',
          '- If the image does not contain a recognizable plant, set plantName to "Unknown Plant", isHealthy to false, diseaseName to "Invalid Image - Not a Plant", and explain what to do.',
          '- Confidence should reflect your actual diagnostic certainty — don\'t inflate it.',
          '- Severity: "None" = healthy, "Low" = minor cosmetic issue, "Moderate" = needs treatment, "Severe" = threatening crop survival.',
        ].join('\n');

        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: [
            {
              role: 'user',
              parts: [
                { text: prompt },
                { inlineData: { mimeType, data: base64 } },
              ],
            },
          ],
        });

        const responseText = typeof response.text === 'function'
          ? await response.text()
          : response.text;

        const raw = extractJson(responseText);
        const diagnosis = normalizeDiagnosis(raw);

        if (diagnosis) {
          ensureDefaults(diagnosis);
          return res.json({
            diagnosis,
            source: 'gemini',
            model: GEMINI_MODEL,
          });
        }
        // If Gemini returned unparseable JSON, fall through to local analysis
        console.warn('[/api/analyze] Gemini returned unparseable response, using local fallback');
      } catch (geminiErr) {
        console.error('[/api/analyze] Gemini API error:', geminiErr.message || geminiErr);
        // Fall through to local analysis
      }
    }

    // ── Local fallback: PlantVision v2.0 computer vision engine ────────────
    const hint = (plantHint || '').toLowerCase().trim();
    const result = await visionAnalyze(base64, hint || null);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const { diagnosis: diag, imageAnalysis, detection, cropDbData } = result;
    const severityMap = { 'Mild': 'Low', 'Moderate': 'Moderate', 'Severe': 'Severe', 'Critical': 'Severe', 'Healthy': 'None' };

    const diagnosis = {
      plantName: diag.crop ? diag.crop.charAt(0).toUpperCase() + diag.crop.slice(1) : 'Unknown Plant',
      diseaseName: diag.isHealthy ? 'Healthy — No Disease Detected' : (cropDbData?.databaseName || diag.disease.name),
      isHealthy: diag.isHealthy,
      confidence: detection.confidence,
      severityLevel: severityMap[diag.severity.grade] || 'Moderate',
      description: diag.isHealthy
        ? 'No visible disease symptoms detected. The plant appears healthy with normal green coloration and no significant lesions or discoloration.'
        : (cropDbData?.description
          ? `${cropDbData.databaseName} (${cropDbData.scientificName}) — ${cropDbData.description}`
          : `${diag.disease.name} (${diag.disease.scientific}) detected on ${diag.crop || 'plant'}. ${diag.severity.description}. Confidence: ${detection.confidence}%.`),
      symptoms: cropDbData?.allSymptoms?.length ? cropDbData.allSymptoms : (diag.disease.features || ['Visible symptoms detected']),
      causes: cropDbData?.allCauses?.length ? cropDbData.allCauses : (diag.disease.description ? [diag.disease.description] : ['Pathogen infection detected']),
      preventionMethods: cropDbData?.preventionMethods ? cropDbData.preventionMethods.split('. ') : (diag.treatment.prevention ? diag.treatment.prevention.split('. ') : ['Monitor the crop regularly']),
      organicTreatment: cropDbData?.biologicalControl ? cropDbData.biologicalControl.split('. ') : (diag.treatment.biological ? diag.treatment.biological.split('. ') : ['Apply Trichoderma-based bio-fungicide']),
      chemicalTreatment: cropDbData?.chemicalTreatment ? cropDbData.chemicalTreatment.split('. ') : (diag.treatment.chemical ? diag.treatment.chemical.split('. ') : ['Consult local agronomist']),
      recommendedFertilizers: diag.treatment.cultural ? diag.treatment.cultural.split('. ') : ['Balanced NPK as per soil test'],
      careInstructions: diag.treatment.immediate ? [diag.treatment.immediate, diag.treatment.timeline || ''] : ['Monitor closely and treat promptly'],
      nextInspectionDate: diag.isHealthy ? nextDate(10) : nextDate(5),
    };

    ensureDefaults(diagnosis);

    return res.json({
      diagnosis,
      source: 'local',
      engine: 'PlantVision ULTRA v5.0',
      imageAnalysis: {
        resolution: imageAnalysis.resolution,
        format: imageAnalysis.format,
        isPlantImage: imageAnalysis.isPlantImage,
        vegetationIndices: imageAnalysis.vegetationIndices,
        healthStatus: imageAnalysis.healthStatus,
        healthDistribution: imageAnalysis.healthDistribution,
        stressTypes: imageAnalysis.stressTypes,
        preprocessingApplied: imageAnalysis.preprocessingApplied,
        quality: imageAnalysis.quality,
      },
      detection: {
        confidence: detection.confidence,
        matchReasons: detection.matchReasons,
        alternativeDiagnoses: detection.alternativeDiagnoses,
        severity: diag.severity,
      },
      cropDbData: cropDbData || undefined,
      note: 'Configure GEMINI_API_KEY in .env for AI-powered analysis. This is the PlantVision ULTRA v5.0 computer vision engine.',
    });
  } catch (err) {
    console.error('[/api/analyze] Unhandled error:', err);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// POST /api/chat — AI Chat Assistant
// Uses the intelligent agronomy chat engine (chatEngine.js) for local responses.
// Falls back to Gemini AI if configured, otherwise uses the local knowledge base.
// ═══════════════════════════════════════════════════════════════════════════════
const CHAT_SYSTEM_PROMPT = [
  'You are CropVision AI, a friendly, expert smart-farming and plant health assistant.',
  '',
  'Your expertise covers:',
  '- Plant disease identification, organic remedies, and chemical treatments',
  '- Fertilizer recommendations (NPK ratios, micronutrients)',
  '- Irrigation management and water-saving techniques',
  '- Pest identification and integrated pest management (IPM)',
  '- Crop-specific growing seasons, sowing methods, and harvest timing',
  '- Soil health, composting, and sustainable farming practices',
  '',
  'RULES:',
  '- Keep answers practical, concise (under 200 words), and farmer-friendly.',
  '- Always provide specific product names, concentrations (g/L or ml/L), and application intervals when recommending treatments.',
  '- Always suggest organic options before chemical alternatives.',
  '- Use simple formatting with emojis to make replies easy to scan.',
  '- If asked about something outside farming/agriculture, politely redirect to crops and plant care.',
  '- Never make up information — if unsure, say so and recommend consulting a local agronomist.',
].join(' ');

// Session-based conversation tracking for context-aware follow-ups
const chatSessions = new Map();

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, sessionId } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'message is required.' });
    }

    const trimmedMessage = message.trim();
    const sid = sessionId || `session-${Date.now()}`;

    // ── Try Gemini AI first ──────────────────────────────────────────────
    const ai = await getAI();
    if (ai) {
      try {
        const recentHistory = Array.isArray(history) ? history.slice(-12) : [];
        const contents = recentHistory
          .filter((m) => m && typeof m.text === 'string' && m.text.trim())
          .map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          }));
        contents.push({ role: 'user', parts: [{ text: trimmedMessage }] });

        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          systemInstruction: CHAT_SYSTEM_PROMPT,
          contents,
        });

        const responseText = typeof response.text === 'function'
          ? await response.text()
          : response.text;

        const reply = (responseText || '').trim();
        if (reply) {
          return res.json({ reply, source: 'gemini', sessionId: sid });
        }
      } catch (geminiErr) {
        console.error('[/api/chat] Gemini API error:', geminiErr.message || geminiErr);
        // Fall through to local reply
      }
    }

    // ── Local intelligent chat engine ────────────────────────────────────
    const result = generateReply(trimmedMessage, sid, history || []);
    return res.json({
      reply: result.reply,
      source: 'local',
      intent: result.intent,
      crop: result.crop,
      disease: result.disease,
      sessionId: sid,
    });
  } catch (err) {
    console.error('[/api/chat] Unhandled error:', err);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// POST /api/cost-estimate — Treatment Cost & Yield Loss Estimator
// ═══════════════════════════════════════════════════════════════════════════════
app.post('/api/cost-estimate', (req, res) => {
  try {
    const { crop, disease, severity, areaHectares } = req.body || {};
    if (!crop) return res.status(400).json({ error: 'crop is required' });
    const result = calculateCostEstimate(crop, disease, severity || 'Moderate', areaHectares || 1);
    res.json(result);
  } catch (err) {
    console.error('Cost estimate error:', err.message);
    res.status(500).json({ error: 'Cost estimation failed' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// GET /api/outbreak-map — Community Outbreak Alert Map Data
// ═══════════════════════════════════════════════════════════════════════════════
app.get('/api/outbreak-map', (req, res) => {
  try {
    const { crop, state, disease } = req.query;
    const data = generateOutbreakMapData({ crop, state, disease });
    res.json(data);
  } catch (err) {
    console.error('Outbreak map error:', err.message);
    res.status(500).json({ error: 'Failed to generate map data' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// POST /api/outbreak-report — Submit a Community Disease Report
// ═══════════════════════════════════════════════════════════════════════════════
app.post('/api/outbreak-report', (req, res) => {
  try {
    const report = addOutbreakReport(req.body || {});
    res.json({ success: true, report });
  } catch (err) {
    console.error('Outbreak report error:', err.message);
    res.status(500).json({ error: 'Failed to submit report' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// POST /api/prognosis — Disease & Weather Prognosis Simulator
// ═══════════════════════════════════════════════════════════════════════════════
app.post('/api/prognosis', async (req, res) => {
  try {
    const { diseaseName, severity, lat, lng } = req.body || {};
    if (!diseaseName) return res.status(400).json({ error: 'diseaseName is required' });

    const result = await generatePrognosis(
      diseaseName,
      severity || 'Moderate',
      lat || 20.5937,
      lng || 78.9629
    );
    res.json(result);
  } catch (err) {
    console.error('Prognosis error:', err.message);
    res.status(500).json({ error: 'Prognosis generation failed' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// GET /api/health — Health Check
// ═══════════════════════════════════════════════════════════════════════════════
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CropVision API',
    aiConfigured: Boolean(GEMINI_API_KEY),
    model: GEMINI_MODEL,
    localDiseaseCount: DISEASE_DB.length,
    uptime: Math.floor(process.uptime()),
    time: new Date().toISOString(),
  });
});

// ── Static Production Build (dist/) + SPA Fallback ──────────────────────────
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  app.use(express.static(distDir));
  // SPA fallback: serve index.html for all non-API routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════════════╗');
  console.log('  ║         🌱 CropVision Backend Server 🌱             ║');
  console.log('  ╚══════════════════════════════════════════════════════╝');
  console.log(`  ➜ API:        http://localhost:${PORT}/api/health`);
  console.log(`  ➜ Gemini AI:  ${GEMINI_API_KEY ? '✅ Configured (' + GEMINI_MODEL + ')' : '❌ Not configured — set GEMINI_API_KEY in .env'}`);
  console.log(`  ➜ Local DB:   ${DISEASE_DB.length} diseases across 16 crops`);
  console.log(`  ➜ Frontend:   ${fs.existsSync(path.join(distDir, 'index.html')) ? 'Serving from dist/' : 'Run "npm run build" to serve frontend'}`);
  console.log('');
});
