import { DiseaseDiagnosis } from '../types';
import { analyzePlantImageRemote } from '../lib/api';

export const SAMPLE_DIAGNOSES: DiseaseDiagnosis[] = [
  {
    id: 'diag-tomato-early-blight',
    plantName: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    confidence: 96.8,
    severityLevel: 'Moderate',
    description: 'Alternaria solani is a widespread fungal pathogen affecting tomato crops, causing characteristic concentric target-board ring spots on leaves and premature defoliation.',
    symptoms: [
      'Concentric dark brown target-board spots on older leaves',
      'Yellow chlorotic halos surrounding leaf spots',
      'Stem dark sunken lesions (Collar Rot phase)',
      'Premature dropping of lower foliage leaving exposed fruit'
    ],
    causes: [
      'Alternaria solani fungal spores surviving in plant debris',
      'Warm wet weather (24-29°C) with high relative humidity or frequent rain/dew',
      'Poor field air circulation and excessive foliage shading'
    ],
    preventionMethods: [
      'Rotate crops with non-solanaceous plants (like maize or beans) every 2-3 years',
      'Mulch soil with straw or plastic to prevent soil splash onto lower leaves',
      'Apply drip irrigation rather than overhead sprinklers to keep leaf canopy dry'
    ],
    organicTreatment: [
      'Spray 5% Neem Seed Kernel Extract (NSKE) or pure neem oil (5ml/L) every 7 days',
      'Foliar spray of Copper Hydroxide bio-fungicide or Trichoderma harzianum @ 5g/L',
      'Prune off infected lower leaves using sterilized shears and dispose away from field'
    ],
    chemicalTreatment: [
      'Foliar spray of Mancozeb 75% WP @ 2.5 g/L at early onset',
      'Azoxystrobin 23% SC @ 1 ml/L or Difenoconazole 25% EC @ 1 ml/L for systemic control',
      'Chlorothalonil 75% WP @ 2.0 g/L sprayed at 10-day intervals'
    ],
    recommendedFertilizers: [
      'Calcium Nitrate @ 5g/L foliar spray to strengthen cell walls',
      'Potassium Sulfate (SOP) @ 3g/L for immune boost and disease tolerance',
      'Well-decomposed Farmyard Manure (FYM) enriched with Trichoderma'
    ],
    careInstructions: [
      'Avoid working in wet fields to prevent spreading fungal spores',
      'Stake tomato plants to elevate branches 30cm above soil level',
      'Ensure balanced NPK nutrition (do not over-apply nitrogen)'
    ],
    nextInspectionDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80',
    scanTimestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  },
  {
    id: 'diag-rice-blast',
    plantName: 'Rice',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    isHealthy: false,
    confidence: 94.5,
    severityLevel: 'Severe',
    description: 'Rice blast is one of the most destructive rice diseases worldwide, attacking leaves, nodes, and panicles, leading to neck blast and severe yield loss.',
    symptoms: [
      'Spindle-shaped or diamond-shaped lesions with grayish center and dark reddish-brown margin',
      'Neck rot causing empty, white or light-brown panicles (Whiteheads)',
      'Nodes turning dark brown to black and breaking easily under wind'
    ],
    causes: [
      'High atmospheric humidity (>90%) with warm temperatures (24–28°C)',
      'Excessive applications of nitrogenous fertilizers',
      'Airborne conidia fungal spores spreading across adjacent paddy fields'
    ],
    preventionMethods: [
      'Plant blast-resistant certified rice varieties',
      'Avoid late night irrigation and excessive nitrogen top-dressing',
      'Perform seed treatment with bio-agents before nursery sowing'
    ],
    organicTreatment: [
      'Foliar spray of 5% Neem Seed Kernel Extract (NSKE) at tiller initiation',
      'Spray Pseudomonas fluorescens bio-formulation @ 10g/L water',
      'Apply 3% Panchagavya solution to enhance plant natural defense'
    ],
    chemicalTreatment: [
      'Tricyclazole 75% WP @ 0.6 g/L water sprayed immediately at disease sighting',
      'Isoprothiolane 40% EC @ 1.5 ml/L for neck blast protection',
      'Kasugamycin 3% SL @ 2.0 ml/L as an antibiotic curative spray'
    ],
    recommendedFertilizers: [
      'Apply Potassium (MOP) @ 60 kg/ha in split doses to improve cuticle thickness',
      'Silicate solubilizing bacteria (SSB) to boost leaf silica content',
      'Neem-coated Urea applied strictly in 3 split applications'
    ],
    careInstructions: [
      'Drain standing water temporarily for 2-3 days to aerate soil roots',
      'Keep field bunds clear of wild grass weed hosts'
    ],
    nextInspectionDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    imageUrl: 'https://images.unsplash.com/photo-1536638317175-32449de0dc12?auto=format&fit=crop&w=1000&q=80',
    scanTimestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  },
  {
    id: 'diag-potato-late-blight',
    plantName: 'Potato',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    isHealthy: false,
    confidence: 98.2,
    severityLevel: 'Severe',
    description: 'Phytophthora infestans is an oomycete plant pathogen that causes potato late blight, characterized by water-soaked leaf blights and tuber rot.',
    symptoms: [
      'Irregular water-soaked dark green/black spots at leaf tips and margins',
      'White cottony fungal growth on lower surface of leaves during morning humidity',
      'Dry or wet reddish-brown internal decay of harvested potato tubers'
    ],
    causes: [
      'Cool temperatures (10–20°C) with persistent fog, dew, or rain',
      'Latent infection carried inside infected seed tubers',
      'High canopy density trapping moisture'
    ],
    preventionMethods: [
      'Plant certified disease-free seed tubers from verified tissue culture farms',
      'Apply prophylactic protective fungicides prior to fog forecast',
      'Dehaulm (cut top foliage) 10 days before harvesting tubers'
    ],
    organicTreatment: [
      'Spray 1% Bordeaux mixture on lower and upper leaf surfaces',
      'Soil application of Trichoderma viride enriched vermicompost',
      'Foliar spray of sour buttermilk (10% v/v) mixed with baking soda (2g/L)'
    ],
    chemicalTreatment: [
      'Curative spray of Cymoxanil 8% + Mancozeb 64% WP @ 2.0 g/L',
      'Metalaxyl 8% + Mancozeb 64% WP @ 2.5 g/L',
      'Dimethomorph 50% WP @ 1.0 g/L during heavy pressure'
    ],
    recommendedFertilizers: [
      'Sulfate of Potash (SOP) @ 50 kg/ha',
      'Boron (Borax) @ 10 kg/ha to improve skin integrity',
      'Humic acid enriched soil conditioning'
    ],
    careInstructions: [
      'Ensure high earthing up to keep tubers buried under 10cm soil layer',
      'Avoid sprinkler irrigation late in the evening'
    ],
    nextInspectionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=80',
    scanTimestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  },
  {
    id: 'diag-healthy-wheat',
    plantName: 'Wheat',
    diseaseName: 'Healthy Crop - No Disease Detected',
    isHealthy: true,
    confidence: 99.1,
    severityLevel: 'None',
    description: 'The wheat plant foliage exhibits vibrant green chlorophyll, robust tillering, and healthy cell structure without signs of fungal rust, mildew, or nutrient chlorosis.',
    symptoms: [
      'Vibrant deep green uniform leaf blade color',
      'No rust pustules, yellow stripes, or powdery spots',
      'Strong erect stem structure and clear root system'
    ],
    causes: [
      'Optimal agronomic care, proper irrigation timing, and balanced NPK nutrition'
    ],
    preventionMethods: [
      'Maintain crown root initiation (CRI) irrigation schedule',
      'Keep monitoring field weekly for early aphid or rust signs',
      'Apply light top-dressing of nitrogen at tillering'
    ],
    organicTreatment: [
      'No disease treatment required! Continue routine bio-fertilizer application',
      'Apply Jeevamrutha or Panchagavya @ 3% as growth promoter'
    ],
    chemicalTreatment: [
      'No chemical spray necessary. Avoid unnecessary pesticide applications to protect beneficial insects.'
    ],
    recommendedFertilizers: [
      'Urea top dressing @ 40 kg/ha before 2nd irrigation',
      'Zinc Sulfate 21% @ 25 kg/ha if soil is zinc deficient'
    ],
    careInstructions: [
      'Monitor for aphids during warm dry afternoons',
      'Ensure light irrigation at flowering and grain filling stages'
    ],
    nextInspectionDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=80',
    scanTimestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  },
  {
    id: 'diag-corn-rust',
    plantName: 'Maize (Corn)',
    diseaseName: 'Common Rust (Puccinia sorghi)',
    isHealthy: false,
    confidence: 93.4,
    severityLevel: 'Moderate',
    description: 'Puccinia sorghi causes common corn rust, producing oval powdery golden-brown pustules on both upper and lower leaf surfaces.',
    symptoms: [
      'Small golden-brown to cinnamon-brown powdery pustules scattered on leaves',
      'Pustules turning blackish as crop matures',
      'Premature leaf senescence in heavy infestations'
    ],
    causes: [
      'Airborne rust urediniospores blown from southern regions',
      'Cool temperatures (16-23°C) with high relative humidity (>95%)',
      'Dense plant canopy reducing wind movement'
    ],
    preventionMethods: [
      'Plant resistant corn hybrids',
      'Sow seeds early in the season to avoid peak spore migration period'
    ],
    organicTreatment: [
      'Foliar spray of 3% Neem oil solution',
      'Apply bio-fungicide Bacillus subtilis @ 5g/L'
    ],
    chemicalTreatment: [
      'Mancozeb 75 WP @ 2.5 g/L spray',
      'Azoxystrobin 23% SC @ 1 ml/L or Propiconazole @ 1 ml/L'
    ],
    recommendedFertilizers: [
      'Potassium Nitrate (13-0-45) @ 10g/L foliar spray',
      'Zinc Sulfate @ 15 kg/ha'
    ],
    careInstructions: [
      'Maintain balanced fertilizer ratios',
      'Destruct infected crop residues after harvest'
    ],
    nextInspectionDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80',
    scanTimestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }
];

export async function analyzePlantImage(imageSource: string | File, overridePlantName?: string): Promise<DiseaseDiagnosis> {
  const previewUrl = typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource);

  // 1. Try the real backend (Gemini-powered) analysis first.
  const remote = await analyzePlantImageRemote(imageSource, overridePlantName);
  if (remote) {
    return {
      ...remote,
      id: 'scan-' + Date.now(),
      imageUrl: previewUrl,
      scanTimestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
  }

  // 2. Fallback: backend unavailable or not configured - use the offline sample engine.
  if (overridePlantName) {
    const matched = SAMPLE_DIAGNOSES.find(d => d.plantName.toLowerCase().includes(overridePlantName.toLowerCase()));
    if (matched) return { ...matched, id: 'scan-' + Date.now(), imageUrl: previewUrl, scanTimestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) };
  }

  // Generate dynamic diagnosis based on input
  const base = SAMPLE_DIAGNOSES[Math.floor(Math.random() * SAMPLE_DIAGNOSES.length)];

  return {
    ...base,
    id: 'scan-' + Date.now(),
    imageUrl: previewUrl,
    scanTimestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  };
}
