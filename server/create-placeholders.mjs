import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..', 'test-images', 'rice-diseases');

const diseases = [
  { id: 'bakanae', color: '#8B4513', label: 'BAKANAE' },
  { id: 'leaf_scald', color: '#CD853F', label: 'LEAF SCALD' },
  { id: 'neck_blast', color: '#A0522D', label: 'NECK BLAST' },
  { id: 'sheath_rot', color: '#D2691E', label: 'SHEATH ROT' },
  { id: 'stem_rot', color: '#B8860B', label: 'STEM ROT' },
];

for (const d of diseases) {
  for (let i = 1; i <= 5; i++) {
    const outputPath = path.join(baseDir, d.id, `${d.id}_placeholder_${i}.jpg`);
    const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${d.color}"/>
      <text x="200" y="120" text-anchor="middle" font-family="Arial" font-size="28" fill="white" font-weight="bold">${d.label}</text>
      <text x="200" y="160" text-anchor="middle" font-family="Arial" font-size="16" fill="white">Rice Disease</text>
      <text x="200" y="200" text-anchor="middle" font-family="Arial" font-size="14" fill="white">Placeholder - Replace with real image</text>
    </svg>`;
    await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(outputPath);
    console.log(`Created: ${d.id}/${path.basename(outputPath)}`);
  }
}

console.log('All placeholders created');
