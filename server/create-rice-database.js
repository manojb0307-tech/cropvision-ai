/**
 * Rice Disease Database Creator
 * Creates a comprehensive SQLite database with multiple tables for rice diseases
 */

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'test-images', 'rice_diseases.db');
const IMAGES_DIR = path.join(__dirname, '..', 'test-images', 'rice-diseases');

// ══════════════════════════════════════════════════════════════════════════════
// RICE DISEASE KNOWLEDGE BASE
// ══════════════════════════════════════════════════════════════════════════════

const RICE_DISEASES = [
  {
    id: 'rice_blast',
    name: 'Rice Blast',
    scientific_name: 'Magnaporthe oryzae',
    category: 'fungal',
    description: 'Most destructive rice disease worldwide. Causes diamond-shaped lesions on leaves, neck blast on panicles.',
    severity: 'severe',
    affected_parts: 'leaves, neck, nodes, panicle',
    favorable_conditions: 'High humidity (>90%), temperature 25-28°C, low nitrogen, intermittent rain',
    symptoms: [
      'Diamond or spindle-shaped lesions with gray center and brown border',
      'Lesions may coalesce to kill entire leaf',
      'Neck blast causes blackening of panicle neck',
      'Node blast causes lodging of stems'
    ],
    causes: [
      'Fungus Magnaporthe oryzae (Pyricularia oryzae)',
      'Spores spread by wind and water splash',
      'Survives on infected straw and seed',
      'Favored by high humidity and moderate temperature'
    ],
    treatments: {
      immediate: 'Remove and burn infected plants. Reduce nitrogen application.',
      chemical: 'Tricyclazole 75% WP (0.6 g/L) or Isoprothiolane 40% EC (1.5 mL/L). Carbendazim 50% WP (1 g/L).',
      biological: 'Pseudomonas fluorescens (10 g/L). Trichoderma viride (4 g/kg soil).',
      cultural: 'Avoid excess nitrogen. Maintain optimal planting density. Use resistant varieties.',
      prevention: 'Use resistant varieties (BRRI dhan28, BRRI dhan29). Balanced fertilization. Seed treatment with Tricyclazole.',
      timeline: 'Spray at booting stage and panicle initiation. Repeat after 10 days if needed.'
    },
    image_count: 0
  },
  {
    id: 'bacterial_leaf_blight',
    name: 'Bacterial Leaf Blight',
    scientific_name: 'Xanthomonas oryzae pv. oryzae',
    category: 'bacterial',
    description: 'Major bacterial disease causing yellowing and drying of leaf tips and margins.',
    severity: 'severe',
    affected_parts: 'leaves, leaf sheath',
    favorable_conditions: 'Warm temperature (25-30°C), high humidity, heavy rain, flooding',
    symptoms: [
      'Yellow to white stripes along leaf margins and tips',
      'Lesions expand inward from leaf tips',
      'Bacterial ooze (yellow droplets) on leaf surface',
      'Whole leaf dries and turns straw color'
    ],
    causes: [
      'Bacterium Xanthomonas oryzae pv. oryzae',
      'Enters through wounds and natural openings',
      'Spread by wind-driven rain and contaminated water',
      'Survives on seeds and crop debris'
    ],
    treatments: {
      immediate: 'Remove infected leaf tips. Drain excess water from field.',
      chemical: 'Copper hydroxide (3 g/L) or Streptocycline (500 ppm). Bordeaux mixture (1%).',
      biological: 'Pseudomonas fluorescens. Bacillus amyloliquefaciens.',
      cultural: 'Avoid water stagnation. Balanced fertilization. Use resistant varieties.',
      prevention: 'Use resistant varieties. Seed treatment with Streptocycline. Avoid flood irrigation.',
      timeline: 'Spray at onset of symptoms. Repeat after 10 days.'
    },
    image_count: 0
  },
  {
    id: 'brown_spot',
    name: 'Brown Spot',
    scientific_name: 'Bipolaris oryzae',
    category: 'fungal',
    description: 'Common fungal disease causing brown spots on leaves. Indicator of poor soil health.',
    severity: 'moderate',
    affected_parts: 'leaves, grains',
    favorable_conditions: 'Poor soil fertility, low temperature (20-25°C), high humidity',
    symptoms: [
      'Circular to oval brown spots with yellow halo',
      'Spots may coalesce forming large irregular patches',
      'Severely infected leaves turn yellow and dry',
      'Grains may be discolored and lightweight'
    ],
    causes: [
      'Fungus Bipolaris oryzae (Helminthosporium oryzae)',
      'Favored by nutrient-deficient soils',
      'Spread by wind and water splash',
      'Survives on seeds and crop residues'
    ],
    treatments: {
      immediate: 'Remove affected leaves. Improve soil fertility.',
      chemical: 'Carbendazim 50% WP (1 g/L) or Mancozeb 75% WP (2.5 g/L).',
      biological: 'Pseudomonas fluorescens. Trichoderma viride.',
      cultural: 'Balanced fertilization. Maintain optimal water levels. Use quality seed.',
      prevention: 'Use quality seed. Balanced soil fertility. Maintain proper water management.',
      timeline: 'Spray at tillering and panicle stages.'
    },
    image_count: 0
  },
  {
    id: 'sheath_blight',
    name: 'Sheath Blight',
    scientific_name: 'Rhizoctonia solani',
    category: 'fungal',
    description: 'Major fungal disease affecting leaf sheaths, causing large irregular lesions.',
    severity: 'severe',
    affected_parts: 'leaf sheath, stem',
    favorable_conditions: 'High humidity (>95%), temperature 28-32°C, dense planting, high nitrogen',
    symptoms: [
      'Large irregular grayish-green lesions on leaf sheath',
      'Lesions turn brown with age',
      'Lesions may extend to leaf blades',
      'Severe infection causes plant lodging'
    ],
    causes: [
      'Fungus Rhizoctonia solani',
      'Survives in soil as sclerotia',
      'Favored by dense planting and high nitrogen',
      'Spread by water splash and direct contact'
    ],
    treatments: {
      immediate: 'Drain field water. Remove affected sheaths.',
      chemical: 'Validamycin 3% SL (10 mL/L) or Tricyclazole (0.6 g/L). Carbendazim (1 g/L).',
      biological: 'Trichoderma viride. Bacillus subtilis.',
      cultural: 'Reduce nitrogen. Maintain moderate water level. Avoid dense planting.',
      prevention: 'Balanced fertilization. Proper water management. Use resistant varieties.',
      timeline: 'Spray at tillering stage. Repeat after 15 days.'
    },
    image_count: 0
  },
  {
    id: 'tungro',
    name: 'Rice Tungro',
    scientific_name: 'Rice Tungro Bacilliform Virus (RTBV) & Spherical Virus (RTSV)',
    category: 'viral',
    description: 'Viral disease transmitted by green leafhopper, causing yellowing and stunting.',
    severity: 'severe',
    affected_parts: 'leaves, whole plant',
    favorable_conditions: 'Warm temperature (25-30°C), high leafhopper population',
    symptoms: [
      'Yellow-orange discoloration of leaves',
      'Stunted plant growth',
      'Reduced tillering',
      'Grains may be empty or partially filled'
    ],
    causes: [
      'Rice Tungro Bacilliform Virus (RTBV) and Rice Tungro Spherical Virus (RTSV)',
      'Transmitted by green leafhopper (Nephotettix virescens)',
      'Spread during vector feeding',
      'No seed transmission'
    ],
    treatments: {
      immediate: 'Remove infected plants. Control leafhopper vector.',
      chemical: 'Imidacloprid 17.8% SL (0.5 mL/L) for leafhopper control.',
      biological: 'Conservation of natural predators. Pardosa pseudoannulata (wolf spider).',
      cultural: 'Synchronous planting. Remove infected plants early. Use resistant varieties.',
      prevention: 'Use resistant varieties. Control leafhopper early. Avoid planting near infected fields.',
      timeline: 'Monitor leafhopper. Spray at first appearance.'
    },
    image_count: 0
  },
  {
    id: 'narrow_brown_spot',
    name: 'Narrow Brown Spot',
    scientific_name: 'Cercospora oryzae',
    category: 'fungal',
    description: 'Fungal disease causing narrow brown lesions on rice leaves.',
    severity: 'moderate',
    affected_parts: 'leaves',
    favorable_conditions: 'High humidity, temperature 25-30°C, poor soil fertility',
    symptoms: [
      'Narrow, elongated brown lesions on leaves',
      'Lesions may be 1-5 mm wide and up to 20 mm long',
      'Severe infection causes leaf drying',
      'Spots may appear in rows along leaf veins'
    ],
    causes: [
      'Fungus Cercospora oryzae',
      'Favored by poor soil fertility',
      'Spread by wind and water splash',
      'Survives on crop residues'
    ],
    treatments: {
      immediate: 'Remove affected leaves. Improve soil fertility.',
      chemical: 'Mancozeb 75% WP (2.5 g/L) or Carbendazim (1 g/L).',
      biological: 'Trichoderma viride. Bacillus subtilis.',
      cultural: 'Balanced fertilization. Maintain proper water management.',
      prevention: 'Balanced soil fertility. Use resistant varieties.',
      timeline: 'Spray at first sign of disease.'
    },
    image_count: 0
  },
  {
    id: 'neck_blast',
    name: 'Neck Blast',
    scientific_name: 'Magnaporthe oryzae',
    category: 'fungal',
    description: 'Severe form of blast affecting the panicle neck, causing grain filling failure.',
    severity: 'critical',
    affected_parts: 'panicle neck, grains',
    favorable_conditions: 'High humidity, moderate temperature, wind during heading',
    symptoms: [
      'Blackening of panicle neck',
      'Panicles break at the neck',
      'Grains are empty or partially filled',
      'Neck may show grayish lesions'
    ],
    causes: [
      'Same fungus as rice blast (Magnaporthe oryzae)',
      'Infection occurs during heading stage',
      'Spread by wind-borne spores',
      'Favored by humid weather during flowering'
    ],
    treatments: {
      immediate: 'Remove and burn infected panicles. Reduce nitrogen.',
      chemical: 'Tricyclazole (0.6 g/L) or Isoprothiolane (1.5 mL/L).',
      biological: 'Pseudomonas fluorescens.',
      cultural: 'Balanced fertilization. Proper water management.',
      prevention: 'Use resistant varieties. Timely spraying at heading stage.',
      timeline: 'Spray at panicle initiation and heading stages.'
    },
    image_count: 0
  },
  {
    id: 'leaf_scald',
    name: 'Leaf Scald',
    scientific_name: 'Rhizoctonia oryzae-sativae',
    category: 'fungal',
    description: 'Fungal disease causing scald-like lesions on rice leaves.',
    severity: 'moderate',
    affected_parts: 'leaves',
    favorable_conditions: 'High humidity, temperature 25-30°C',
    symptoms: [
      'Water-soaked lesions that turn brown',
      'Lesions may have wavy margins',
      'Affected leaves dry from tips downward',
      'Severe infection causes leaf death'
    ],
    causes: [
      'Fungus Rhizoctonia oryzae-sativae',
      'Favored by high humidity',
      'Spread by water splash',
      'Survives on crop debris'
    ],
    treatments: {
      immediate: 'Remove affected leaves. Improve air circulation.',
      chemical: 'Mancozeb (2.5 g/L) or Carbendazim (1 g/L).',
      biological: 'Trichoderma viride.',
      cultural: 'Proper spacing. Avoid overhead irrigation.',
      prevention: 'Use resistant varieties. Maintain proper plant spacing.',
      timeline: 'Spray at first sign of disease.'
    },
    image_count: 0
  },
  {
    id: 'sheath_rot',
    name: 'Sheath Rot',
    scientific_name: 'Sarocladium oryzae',
    category: 'fungal',
    description: 'Fungal disease affecting leaf sheaths, causing rotting and discoloration.',
    severity: 'moderate',
    affected_parts: 'leaf sheath',
    favorable_conditions: 'High humidity, temperature 28-32°C',
    symptoms: [
      'Oval to irregular lesions on leaf sheath',
      'Lesions turn brown with gray center',
      'Sheath may rot and collapse',
      'Affected panicles may not emerge properly'
    ],
    causes: [
      'Fungus Sarocladium oryzae',
      'Favored by high humidity and warm temperature',
      'Spread by water splash',
      'Survives on seeds and crop residues'
    ],
    treatments: {
      immediate: 'Remove affected sheaths. Improve drainage.',
      chemical: 'Carbendazim (1 g/L) or Mancozeb (2.5 g/L).',
      biological: 'Trichoderma viride. Bacillus subtilis.',
      cultural: 'Proper water management. Balanced fertilization.',
      prevention: 'Use disease-free seed. Maintain proper field hygiene.',
      timeline: 'Spray at tillering and booting stages.'
    },
    image_count: 0
  },
  {
    id: 'false_smut',
    name: 'False Smut',
    scientific_name: 'Ustilaginoidea virens',
    category: 'fungal',
    description: 'Fungal disease causing smut balls on rice panicles.',
    severity: 'moderate',
    affected_parts: 'panicle, grains',
    favorable_conditions: 'High humidity, temperature 25-30°C, heavy rainfall during flowering',
    symptoms: [
      'Orange to green smut balls replacing grains',
      'Smut balls are powdery when mature',
      'Affected panicles are distorted',
      'Grains are replaced by fungal mass'
    ],
    causes: [
      'Fungus Ustilaginoidea virens',
      'Infection occurs during flowering',
      'Spread by wind-borne spores',
      'Favored by high humidity during heading'
    ],
    treatments: {
      immediate: 'Remove and destroy affected panicles.',
      chemical: 'Propiconazole (1 mL/L) or Carbendazim (1 g/L).',
      biological: 'Trichoderma viride.',
      cultural: 'Balanced nitrogen. Proper water management.',
      prevention: 'Avoid excess nitrogen. Spray fungicide at booting stage.',
      timeline: 'Spray at booting stage and early heading.'
    },
    image_count: 0
  },
  {
    id: 'stem_rot',
    name: 'Stem Rot',
    scientific_name: 'Magnaporthe salvinii',
    category: 'fungal',
    description: 'Fungal disease causing rotting of rice stems.',
    severity: 'severe',
    affected_parts: 'stem, leaf sheath',
    favorable_conditions: 'High humidity, temperature 28-32°C, standing water',
    symptoms: [
      'Dark brown to black lesions on stems',
      'Stems may break at infected nodes',
      'Affected plants may lodge',
      'Internal stem tissue shows blackening'
    ],
    causes: [
      'Fungus Magnaporthe salvinii',
      'Favored by standing water and high humidity',
      'Survives in soil and crop debris',
      'Spread by water splash'
    ],
    treatments: {
      immediate: 'Drain field water. Remove infected plants.',
      chemical: 'Carbendazim (1 g/L) or Mancozeb (2.5 g/L).',
      biological: 'Trichoderma viride.',
      cultural: 'Proper drainage. Balanced fertilization.',
      prevention: 'Maintain proper water management. Use resistant varieties.',
      timeline: 'Apply preventive spray during vegetative stage.'
    },
    image_count: 0
  },
  {
    id: 'bakanae',
    name: 'Bakanae (Foot Rot)',
    scientific_name: 'Fusarium fujikuroi',
    category: 'fungal',
    description: 'Fungal disease causing abnormal elongation of rice plants.',
    severity: 'moderate',
    affected_parts: 'whole plant, seedling',
    favorable_conditions: 'Warm temperature (25-30°C), high humidity',
    symptoms: [
      'Abnormal elongation of seedlings',
      'Pale green to yellow leaves',
      'Plants may die at seedling stage',
      'Affected plants produce fewer tillers'
    ],
    causes: [
      'Fungus Fusarium fujikuroi',
      'Seed-borne pathogen',
      'Favored by warm and humid conditions',
      'Survives on seeds and in soil'
    ],
    treatments: {
      immediate: 'Remove and destroy affected seedlings.',
      chemical: 'Carbendazim seed treatment (2 g/kg seed).',
      biological: 'Trichoderma viride seed treatment.',
      cultural: 'Use disease-free seed. Seed treatment before sowing.',
      prevention: 'Treat seeds with fungicide. Use certified disease-free seed.',
      timeline: 'Treat seeds before sowing.'
    },
    image_count: 0
  },
  {
    id: 'leaf_smut',
    name: 'Leaf Smut',
    scientific_name: 'Entyloma oryzae',
    category: 'fungal',
    description: 'Fungal disease causing small black spots on rice leaves.',
    severity: 'low',
    affected_parts: 'leaves',
    favorable_conditions: 'High humidity, moderate temperature',
    symptoms: [
      'Small, round, black spots on leaves',
      'Spots may be 1-3 mm in diameter',
      'Spots may coalesce in severe infection',
      'Affected leaves may dry prematurely'
    ],
    causes: [
      'Fungus Entyloma oryzae',
      'Favored by high humidity',
      'Spread by wind and water splash',
      'Survives on crop debris'
    ],
    treatments: {
      immediate: 'Remove affected leaves.',
      chemical: 'Mancozeb (2.5 g/L).',
      biological: 'Trichoderma viride.',
      cultural: 'Balanced fertilization. Proper water management.',
      prevention: 'Use resistant varieties. Maintain field hygiene.',
      timeline: 'Spray at first sign of disease.'
    },
    image_count: 0
  },
  {
    id: 'healthy',
    name: 'Healthy Rice',
    scientific_name: 'Oryza sativa',
    category: 'healthy',
    description: 'Normal healthy rice plant with no disease symptoms.',
    severity: 'none',
    affected_parts: 'none',
    favorable_conditions: 'Optimal growing conditions',
    symptoms: [
      'Uniform green coloration',
      'No spots or lesions on leaves',
      'Normal plant height and tillering',
      'Healthy grain filling'
    ],
    causes: [],
    treatments: {
      immediate: 'No treatment needed.',
      chemical: 'No chemicals required.',
      biological: 'Maintain beneficial insect habitat.',
      cultural: 'Continue good agricultural practices.',
      prevention: 'Regular monitoring. Balanced fertilization.',
      timeline: 'Weekly visual inspection recommended.'
    },
    image_count: 0
  }
];

// ══════════════════════════════════════════════════════════════════════════════
// DATABASE CREATION
// ══════════════════════════════════════════════════════════════════════════════

function createDatabase() {
  // Remove existing database
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
    console.log('Removed existing database');
  }

  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // ════════════════════════════════════════════════════════════════════════════
  // TABLE 1: diseases - Main disease information
  // ════════════════════════════════════════════════════════════════════════════
  db.exec(`
    CREATE TABLE diseases (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      scientific_name TEXT,
      category TEXT CHECK(category IN ('fungal', 'bacterial', 'viral', 'nematode', 'physiological', 'healthy')),
      description TEXT,
      severity TEXT CHECK(severity IN ('low', 'moderate', 'severe', 'critical', 'none')),
      affected_parts TEXT,
      favorable_conditions TEXT,
      image_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // ════════════════════════════════════════════════════════════════════════════
  // TABLE 2: images - Image file information
  // ════════════════════════════════════════════════════════════════════════════
  db.exec(`
    CREATE TABLE images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_id TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_size INTEGER,
      width INTEGER,
      height INTEGER,
      format TEXT,
      source TEXT,
      license TEXT,
      is_valid BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
    )
  `);

  // ════════════════════════════════════════════════════════════════════════════
  // TABLE 3: symptoms - Disease symptoms
  // ════════════════════════════════════════════════════════════════════════════
  db.exec(`
    CREATE TABLE symptoms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_id TEXT NOT NULL,
      symptom_text TEXT NOT NULL,
      severity_level INTEGER CHECK(severity_level BETWEEN 1 AND 5),
      affected_stage TEXT,
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
    )
  `);

  // ════════════════════════════════════════════════════════════════════════════
  // TABLE 4: causes - Disease causes
  // ════════════════════════════════════════════════════════════════════════════
  db.exec(`
    CREATE TABLE causes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_id TEXT NOT NULL,
      cause_text TEXT NOT NULL,
      pathogen_type TEXT,
      transmission_mode TEXT,
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
    )
  `);

  // ════════════════════════════════════════════════════════════════════════════
  // TABLE 5: treatments - Treatment methods
  // ════════════════════════════════════════════════════════════════════════════
  db.exec(`
    CREATE TABLE treatments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_id TEXT NOT NULL,
      treatment_type TEXT CHECK(treatment_type IN ('immediate', 'chemical', 'biological', 'cultural', 'prevention', 'timeline')),
      treatment_text TEXT NOT NULL,
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
    )
  `);

  // ════════════════════════════════════════════════════════════════════════════
  // TABLE 6: rice_varieties - Affected rice varieties
  // ════════════════════════════════════════════════════════════════════════════
  db.exec(`
    CREATE TABLE rice_varieties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT CHECK(type IN ('indica', 'japonica', 'hybrid', 'local')),
      resistance_level TEXT CHECK(resistance_level IN ('susceptible', 'moderate', 'resistant', 'highly_resistant')),
      origin TEXT,
      maturity_days INTEGER
    )
  `);

  // ════════════════════════════════════════════════════════════════════════════
  // TABLE 7: disease_variety_resistance - Disease resistance per variety
  // ════════════════════════════════════════════════════════════════════════════
  db.exec(`
    CREATE TABLE disease_variety_resistance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_id TEXT NOT NULL,
      variety_id INTEGER NOT NULL,
      resistance_level TEXT CHECK(resistance_level IN ('susceptible', 'moderate', 'resistant', 'highly_resistant')),
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE,
      FOREIGN KEY (variety_id) REFERENCES rice_varieties(id) ON DELETE CASCADE
    )
  `);

  // ════════════════════════════════════════════════════════════════════════════
  // TABLE 8: image_metadata - Additional image analysis data
  // ════════════════════════════════════════════════════════════════════════════
  db.exec(`
    CREATE TABLE image_metadata (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_id INTEGER NOT NULL,
      metadata_key TEXT NOT NULL,
      metadata_value TEXT,
      FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
    )
  `);

  // Create indexes for faster queries
  db.exec(`
    CREATE INDEX idx_images_disease ON images(disease_id);
    CREATE INDEX idx_symptoms_disease ON symptoms(disease_id);
    CREATE INDEX idx_causes_disease ON causes(disease_id);
    CREATE INDEX idx_treatments_disease ON treatments(disease_id);
    CREATE INDEX idx_disease_category ON diseases(category);
    CREATE INDEX idx_disease_severity ON diseases(severity);
  `);

  console.log('Database schema created successfully');
  return db;
}

// ══════════════════════════════════════════════════════════════════════════════
// DATA POPULATION
// ══════════════════════════════════════════════════════════════════════════════

function populateDatabase(db) {
  // Insert diseases
  const insertDisease = db.prepare(`
    INSERT INTO diseases (id, name, scientific_name, category, description, severity, affected_parts, favorable_conditions)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertSymptom = db.prepare(`
    INSERT INTO symptoms (disease_id, symptom_text, severity_level)
    VALUES (?, ?, ?)
  `);

  const insertCause = db.prepare(`
    INSERT INTO causes (disease_id, cause_text, pathogen_type)
    VALUES (?, ?, ?)
  `);

  const insertTreatment = db.prepare(`
    INSERT INTO treatments (disease_id, treatment_type, treatment_text)
    VALUES (?, ?, ?)
  `);

  // Insert all diseases
  const insertAll = db.transaction(() => {
    for (const disease of RICE_DISEASES) {
      // Insert disease
      insertDisease.run(
        disease.id,
        disease.name,
        disease.scientific_name,
        disease.category,
        disease.description,
        disease.severity,
        disease.affected_parts,
        disease.favorable_conditions
      );

      // Insert symptoms
      for (let i = 0; i < disease.symptoms.length; i++) {
        insertSymptom.run(disease.id, disease.symptoms[i], Math.min(5, i + 2));
      }

      // Insert causes
      for (const cause of disease.causes) {
        insertCause.run(disease.id, cause, disease.category);
      }

      // Insert treatments
      if (disease.treatments) {
        for (const [type, text] of Object.entries(disease.treatments)) {
          insertTreatment.run(disease.id, type, text);
        }
      }
    }
  });

  insertAll();
  console.log(`Inserted ${RICE_DISEASES.length} diseases with symptoms, causes, and treatments`);
}

// ══════════════════════════════════════════════════════════════════════════════
// IMAGE SCANNING AND IMPORT
// ══════════════════════════════════════════════════════════════════════════════

function scanAndImportImages(db) {
  const insertImage = db.prepare(`
    INSERT INTO images (disease_id, file_path, file_name, file_size, format, source, license, is_valid)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const updateDiseaseCount = db.prepare(`
    UPDATE diseases SET image_count = ? WHERE id = ?
  `);

  let totalImages = 0;

  // Scan each disease directory
  const diseaseDirs = fs.readdirSync(IMAGES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const dirName of diseaseDirs) {
    const diseaseId = dirName;
    const dirPath = path.join(IMAGES_DIR, dirName);

    // Check if this disease exists in our database
    const disease = db.prepare('SELECT id FROM diseases WHERE id = ?').get(diseaseId);
    if (!disease) {
      console.log(`Skipping unknown disease directory: ${dirName}`);
      continue;
    }

    // Scan for image files
    const files = fs.readdirSync(dirPath)
      .filter(f => /\.(jpg|jpeg|png|gif|bmp)$/i.test(f));

    let validCount = 0;

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const fileStats = fs.statSync(filePath);

      // Check if it's a valid image by reading first few bytes
      const buffer = Buffer.alloc(4);
      const fd = fs.openSync(filePath, 'r');
      fs.readSync(fd, buffer, 0, 4, 0);
      fs.closeSync(fd);

      const header = buffer.toString('hex');
      const isValid = header.startsWith('ffd8ff') || header.startsWith('89504e47');

      if (isValid) {
        insertImage.run(
          diseaseId,
          filePath,
          file,
          fileStats.size,
          path.extname(file).slice(1).toLowerCase(),
          'UCI ML Repository / Roboflow Universe / Wikimedia Commons',
          'CC BY 4.0 / Public Domain',
          1
        );
        validCount++;
        totalImages++;
      }
    }

    // Update disease image count
    updateDiseaseCount.run(validCount, diseaseId);
    console.log(`${diseaseId}: ${validCount} valid images`);
  }

  console.log(`\nTotal images imported: ${totalImages}`);
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEWS FOR EASY QUERYING
// ══════════════════════════════════════════════════════════════════════════════

function createViews(db) {
  // View: Disease summary with image count
  db.exec(`
    CREATE VIEW IF NOT EXISTS v_disease_summary AS
    SELECT 
      d.id,
      d.name,
      d.scientific_name,
      d.category,
      d.severity,
      d.affected_parts,
      COUNT(DISTINCT i.id) as image_count,
      COUNT(DISTINCT s.id) as symptom_count,
      COUNT(DISTINCT c.id) as cause_count
    FROM diseases d
    LEFT JOIN images i ON d.id = i.disease_id AND i.is_valid = 1
    LEFT JOIN symptoms s ON d.id = s.disease_id
    LEFT JOIN causes c ON d.id = c.disease_id
    GROUP BY d.id
    ORDER BY d.category, d.name
  `);

  // View: Disease details with all information
  db.exec(`
    CREATE VIEW IF NOT EXISTS v_disease_details AS
    SELECT 
      d.*,
      GROUP_CONCAT(DISTINCT s.symptom_text) as all_symptoms,
      GROUP_CONCAT(DISTINCT c.cause_text) as all_causes,
      GROUP_CONCAT(DISTINCT t_chemical.treatment_text) as chemical_treatment,
      GROUP_CONCAT(DISTINCT t_biological.treatment_text) as biological_treatment,
      GROUP_CONCAT(DISTINCT t_prevention.treatment_text) as prevention_methods
    FROM diseases d
    LEFT JOIN symptoms s ON d.id = s.disease_id
    LEFT JOIN causes c ON d.id = c.disease_id
    LEFT JOIN treatments t_chemical ON d.id = t_chemical.disease_id AND t_chemical.treatment_type = 'chemical'
    LEFT JOIN treatments t_biological ON d.id = t_biological.disease_id AND t_biological.treatment_type = 'biological'
    LEFT JOIN treatments t_prevention ON d.id = t_prevention.disease_id AND t_prevention.treatment_type = 'prevention'
    GROUP BY d.id
  `);

  // View: Images with disease info
  db.exec(`
    CREATE VIEW IF NOT EXISTS v_images_with_disease AS
    SELECT 
      i.*,
      d.name as disease_name,
      d.category as disease_category,
      d.severity as disease_severity
    FROM images i
    JOIN diseases d ON i.disease_id = d.id
    WHERE i.is_valid = 1
    ORDER BY d.name, i.file_name
  `);

  console.log('Database views created successfully');
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ══════════════════════════════════════════════════════════════════════════════

console.log('=== Rice Disease Database Creator ===\n');

const db = createDatabase();
populateDatabase(db);
scanAndImportImages(db);
createViews(db);

// Print summary
console.log('\n=== Database Summary ===');
const stats = db.prepare(`
  SELECT 
    (SELECT COUNT(*) FROM diseases) as total_diseases,
    (SELECT COUNT(*) FROM images WHERE is_valid = 1) as total_images,
    (SELECT COUNT(*) FROM symptoms) as total_symptoms,
    (SELECT COUNT(*) FROM causes) as total_causes,
    (SELECT COUNT(*) FROM treatments) as total_treatments
`).get();

console.log(`Total diseases: ${stats.total_diseases}`);
console.log(`Total images: ${stats.total_images}`);
console.log(`Total symptoms: ${stats.total_symptoms}`);
console.log(`Total causes: ${stats.total_causes}`);
console.log(`Total treatments: ${stats.total_treatments}`);
console.log(`\nDatabase saved to: ${DB_PATH}`);

db.close();
