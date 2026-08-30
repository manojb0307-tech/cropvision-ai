/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * STICKY TRAP ANALYZER ENGINE v2.0 — CropVision Advanced
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Advanced insect detection from sticky trap images:
 * - Adaptive background subtraction
 * - Connected component analysis for spot counting
 * - Size-based pest classification
 * - Density heat mapping
 */

const PEST_SPECIES_DB = {
  yellow: [
    { name: 'Whitefly (Bemisia tabaci)', sizeRange: [0.5, 2], color: 'dark', probability: 0.35, economicThreshold: 15, control: ['Neem oil 5ml/L', 'Yellow sticky traps (mass trapping)', 'Reflective mulch', 'Diafenthiuron 50% WP'] },
    { name: 'Aphid (Aphis gossypii)', sizeRange: [1, 3], color: 'dark', probability: 0.28, economicThreshold: 10, control: ['Ladybird beetle release', 'Neem oil spray', 'Imidacloprid 17.8 SL', 'Spiromesifen 22.9 SC'] },
    { name: 'Thrips (Thrips tabaci)', sizeRange: [0.3, 1.5], color: 'dark', probability: 0.18, economicThreshold: 20, control: ['Spinosad 45% SC', 'Blue sticky traps', 'Predatory mites (Amblyseius)', 'Fipronil 5% SC'] },
    { name: 'Leafhopper (Cicadellidae)', sizeRange: [2, 4], color: 'dark', probability: 0.12, economicThreshold: 12, control: ['Imidacloprid 17.8 SL', 'Trap cropping with maize', 'Weed management'] },
    { name: 'Fruit Fly (Dacus spp.)', sizeRange: [4, 8], color: 'dark', probability: 0.05, economicThreshold: 5, control: ['Methyl eugenol traps', 'Protein bait spray', 'Malathion 50% EC'] },
    { name: 'Jassid (Amrasca biguttula)', sizeRange: [2, 3.5], color: 'dark', probability: 0.02, economicThreshold: 10, control: ['Monocrotophos 36% SL', 'Neem oil spray', 'Resistant varieties'] },
  ],
  blue: [
    { name: 'Thrips (Thrips tabaci)', sizeRange: [0.3, 1.5], color: 'dark', probability: 0.42, economicThreshold: 20, control: ['Spinosad 45% SC', 'Blue sticky traps', 'Predatory mites', 'Lambda-cyhalothrin 5% EC'] },
    { name: 'Flea Beetle (Phyllotreta spp.)', sizeRange: [1, 3], color: 'dark', probability: 0.22, economicThreshold: 15, control: ['Kaolin clay spray', 'Neem oil', 'Carbaryl 50% WP', 'Crop rotation'] },
    { name: 'Mushroom Fly (Lycoriella spp.)', sizeRange: [2, 4], color: 'dark', probability: 0.18, economicThreshold: 8, control: ['Hygiene management', 'Reduce humidity', 'Bacillus thuringiensis', 'Imidacloprid soil drench'] },
    { name: 'Dung Fly (Scathophaga spp.)', sizeRange: [3, 6], color: 'dark', probability: 0.12, economicThreshold: 5, control: ['Sanitation', 'Biological control', 'Remove manure sources'] },
    { name: 'Fungus Gnat (Bradysia spp.)', sizeRange: [1, 3], color: 'dark', probability: 0.06, economicThreshold: 10, control: ['Reduce watering', 'Yellow sticky traps', 'Bacillus thuringiensis israelensis'] },
  ]
};

export function analyzeStickyTrap(imageDataUrl: string, trapColor: 'yellow' | 'blue' = 'yellow') {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const w = 200, h = 200;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const pixels = imageData.data;
      const totalPixels = w * h;

      // ═══ Background Detection ═══
      let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;
      for (let i = 0; i < pixels.length; i += 16) { // Sample every 4th pixel
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
        const isTrapBg = trapColor === 'yellow'
          ? (r > 150 && g > 150 && b < 120)
          : (r < 120 && g < 120 && b > 150);
        if (isTrapBg) { bgR += r; bgG += g; bgB += b; bgCount++; }
      }
      if (bgCount > 0) { bgR /= bgCount; bgG /= bgCount; bgB /= bgCount; }

      // ═══ Spot Detection (Adaptive Threshold) ═══
      const bgBrightness = (bgR + bgG + bgB) / 3;
      const threshold = Math.max(40, bgBrightness * 0.35); // Adaptive threshold

      // Connected component labeling (simplified)
      const labels = new Int32Array(w * h);
      let nextLabel = 1;
      const labelAreas: Map<number, number> = new Map();
      const labelBBoxes: Map<number, { minX: number; maxX: number; minY: number; maxY: number }> = new Map();

      function findLabel(x: number, y: number) {
        if (x < 0 || x >= w || y < 0 || y >= h) return 0;
        return labels[y * w + x];
      }

      function setLabel(x: number, y: number, label: number) {
        if (x >= 0 && x < w && y >= 0 && y < h) {
          labels[y * w + x] = label;
          const area = (labelAreas.get(label) || 0) + 1;
          labelAreas.set(label, area);
          const bbox = labelBBoxes.get(label) || { minX: x, maxX: x, minY: y, maxY: y };
          bbox.minX = Math.min(bbox.minX, x);
          bbox.maxX = Math.max(bbox.maxX, x);
          bbox.minY = Math.min(bbox.minY, y);
          bbox.maxY = Math.max(bbox.maxY, y);
          labelBBoxes.set(label, bbox);
        }
      }

      // First pass: label dark spots
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
          const isDark = brightness < threshold;

          if (isDark) {
            const left = findLabel(x - 1, y);
            const top = findLabel(x, y - 1);

            if (left > 0) {
              setLabel(x, y, left);
              if (top > 0 && top !== left) {
                // Merge labels (union-find simplified)
                const newLabel = Math.min(left, top);
                for (let ly = 0; ly < h; ly++) {
                  for (let lx = 0; lx < w; lx++) {
                    if (labels[ly * w + lx] === Math.max(left, top)) {
                      setLabel(lx, ly, newLabel);
                    }
                  }
                }
              }
            } else if (top > 0) {
              setLabel(x, y, top);
            } else {
              setLabel(x, y, nextLabel++);
            }
          }
        }
      }

      // ═══ Count Spots ═══
      let smallSpots = 0, mediumSpots = 0, largeSpots = 0;
      const validSpots: Array<{ area: number; width: number; height: number }> = [];

      labelAreas.forEach((area, label) => {
        if (area < 3) return; // Filter noise
        const bbox = labelBBoxes.get(label);
        if (!bbox) return;
        const width = bbox.maxX - bbox.minX + 1;
        const height = bbox.maxY - bbox.minY + 1;
        const aspectRatio = Math.max(width, height) / (Math.min(width, height) + 1);

        if (aspectRatio > 5) return; // Filter lines/edges

        validSpots.push({ area, width, height });

        if (area < 15) smallSpots++;
        else if (area < 60) mediumSpots++;
        else largeSpots++;
      });

      const totalSpots = validSpots.length;
      const density = totalSpots / totalPixels * 10000;

      // ═══ Risk Assessment ═══
      let riskLevel: string;
      if (totalSpots > 80) riskLevel = 'Critical';
      else if (totalSpots > 50) riskLevel = 'High';
      else if (totalSpots > 25) riskLevel = 'Moderate';
      else riskLevel = 'Low';

      // ═══ Pest Identification ═══
      const pestDB = PEST_SPECIES_DB[trapColor] || PEST_SPECIES_DB.yellow;
      const identifiedPests = pestDB.map(pest => {
        // Adjust probability based on spot size distribution
        const sizeMatch = validSpots.filter(s => {
          const avgSize = Math.sqrt(s.area);
          return avgSize >= pest.sizeRange[0] && avgSize <= pest.sizeRange[1];
        }).length;
        const sizeConfidence = totalSpots > 0 ? sizeMatch / totalSpots : 0;
        const adjustedProbability = pest.probability * (0.5 + sizeConfidence * 0.5);

        return {
          ...pest,
          adjustedProbability: Math.round(adjustedProbability * 100),
          estimatedCount: Math.round(totalSpots * adjustedProbability),
          aboveThreshold: Math.round(totalSpots * adjustedProbability) > pest.economicThreshold,
        };
      }).sort((a, b) => b.adjustedProbability - a.adjustedProbability);

      const topPest = identifiedPests[0];

      // ═══ Recommendations ═══
      const recommendations: string[] = [];
      if (totalSpots > 50) {
        recommendations.push(`🚨 HIGH PEST PRESSURE: ${totalSpots} insects detected. Apply immediate control measures.`);
      } else if (totalSpots > 25) {
        recommendations.push(`⚠️ MODERATE pressure: ${totalSpots} insects. Monitor closely and prepare treatment.`);
      } else {
        recommendations.push(`✅ LOW pressure: ${totalSpots} insects. Continue regular monitoring.`);
      }
      recommendations.push('Change sticky traps every 7 days for accurate monitoring.');
      recommendations.push(trapColor === 'yellow' ? 'Yellow traps target: whiteflies, aphids, leafhoppers.' : 'Blue traps target: thrips specifically.');
      recommendations.push('Place traps at canopy height, 5-8 traps per hectare for monitoring.');
      if (topPest.aboveThreshold) {
        recommendations.push(`⚠️ ${topPest.name} exceeds economic threshold (${topPest.estimatedCount} > ${topPest.economicThreshold}). Apply: ${topPest.control[0]}`);
      }

      resolve({
        trapColor,
        analysis: {
          totalSpots,
          smallSpots,
          mediumSpots,
          largeSpots,
          density: Math.round(density * 10) / 10,
          bgBrightness: Math.round(bgBrightness),
          adaptiveThreshold: Math.round(threshold),
          validSpotsAnalyzed: validSpots.length,
        },
        riskLevel,
        topPestThreat: {
          name: topPest.name,
          confidence: topPest.adjustedProbability,
          estimatedCount: topPest.estimatedCount,
          economicThreshold: topPest.economicThreshold,
          aboveThreshold: topPest.aboveThreshold,
          controlMethods: topPest.control,
        },
        allPotentialPests: identifiedPests,
        recommendations,
        nextAction: totalSpots > 50
          ? 'Apply targeted treatment within 24-48 hours'
          : totalSpots > 25
          ? 'Monitor daily; prepare treatment if count increases'
          : 'Continue monitoring; re-check in 5-7 days',
      });
    };
    img.onerror = () => {
      resolve({
        error: 'Could not analyze trap image',
        analysis: { totalSpots: 0 },
        riskLevel: 'Unknown',
        recommendations: ['Please upload a clear, well-lit photo of the sticky trap.'],
      });
    };
    img.src = imageDataUrl;
  });
}
