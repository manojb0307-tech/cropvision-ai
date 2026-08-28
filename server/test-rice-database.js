/**
 * Rice Disease Database Query Tester
 * Tests various queries on the rice disease database
 */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'test-images', 'rice_diseases.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

console.log('=== Rice Disease Database Query Tester ===\n');

// 1. List all diseases with summary
console.log('1. DISEASE SUMMARY:');
console.log('=' .repeat(80));
const diseases = db.prepare('SELECT * FROM v_disease_summary').all();
console.table(diseases);

// 2. Get detailed info for Rice Blast
console.log('\n2. RICE BLAST DETAILS:');
console.log('=' .repeat(80));
const riceBlast = db.prepare(`
  SELECT * FROM v_disease_details WHERE id = 'rice_blast'
`).get();
console.log(`Name: ${riceBlast.name}`);
console.log(`Scientific Name: ${riceBlast.scientific_name}`);
console.log(`Category: ${riceBlast.category}`);
console.log(`Severity: ${riceBlast.severity}`);
console.log(`Description: ${riceBlast.description}`);
console.log(`\nSymptoms:\n${riceBlast.all_symptoms}`);
console.log(`\nCauses:\n${riceBlast.all_causes}`);
console.log(`\nChemical Treatment:\n${riceBlast.chemical_treatment}`);
console.log(`\nPrevention:\n${riceBlast.prevention_methods}`);

// 3. Get all images for a specific disease
console.log('\n3. BACTERIAL LEAF BLIGHT IMAGES:');
console.log('=' .repeat(80));
const blbImages = db.prepare(`
  SELECT file_name, file_size, format 
  FROM images 
  WHERE disease_id = 'bacterial_leaf_blight' 
  LIMIT 10
`).all();
console.table(blbImages);

// 4. Count images by disease category
console.log('\n4. IMAGES BY DISEASE CATEGORY:');
console.log('=' .repeat(80));
const categoryStats = db.prepare(`
  SELECT 
    d.category,
    COUNT(DISTINCT d.id) as disease_count,
    COUNT(i.id) as image_count
  FROM diseases d
  LEFT JOIN images i ON d.id = i.disease_id AND i.is_valid = 1
  GROUP BY d.category
  ORDER BY image_count DESC
`).all();
console.table(categoryStats);

// 5. Get diseases by severity
console.log('\n5. DISEASES BY SEVERITY:');
console.log('=' .repeat(80));
const severityStats = db.prepare(`
  SELECT 
    severity,
    GROUP_CONCAT(name, ', ') as diseases
  FROM diseases
  GROUP BY severity
  ORDER BY 
    CASE severity
      WHEN 'critical' THEN 1
      WHEN 'severe' THEN 2
      WHEN 'moderate' THEN 3
      WHEN 'low' THEN 4
      WHEN 'none' THEN 5
    END
`).all();
console.table(severityStats);

// 6. Search for diseases affecting leaves
console.log('\n6. DISEASES AFFECTING LEAVES:');
console.log('=' .repeat(80));
const leafDiseases = db.prepare(`
  SELECT id, name, category, severity
  FROM diseases
  WHERE affected_parts LIKE '%leaf%'
  ORDER BY severity
`).all();
console.table(leafDiseases);

// 7. Get treatment options for all diseases
console.log('\n7. CHEMICAL TREATMENTS FOR ALL DISEASES:');
console.log('=' .repeat(80));
const treatments = db.prepare(`
  SELECT 
    d.name as disease,
    t.treatment_text as treatment
  FROM diseases d
  JOIN treatments t ON d.id = t.disease_id
  WHERE t.treatment_type = 'chemical'
  ORDER BY d.name
`).all();
treatments.forEach(t => {
  console.log(`\n${t.disease}:`);
  console.log(`  ${t.treatment}`);
});

// 8. Database statistics
console.log('\n8. DATABASE STATISTICS:');
console.log('=' .repeat(80));
const stats = db.prepare(`
  SELECT 
    (SELECT COUNT(*) FROM diseases) as total_diseases,
    (SELECT COUNT(*) FROM images WHERE is_valid = 1) as total_images,
    (SELECT COUNT(*) FROM symptoms) as total_symptoms,
    (SELECT COUNT(*) FROM causes) as total_causes,
    (SELECT COUNT(*) FROM treatments) as total_treatments,
    (SELECT COUNT(DISTINCT category) FROM diseases) as disease_categories,
    (SELECT SUM(file_size) FROM images WHERE is_valid = 1) / 1024 / 1024 as total_size_mb
`).get();
console.log(stats);

db.close();
console.log('\n=== All queries executed successfully! ===');
