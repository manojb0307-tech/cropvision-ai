/**
 * NPK Chlorophyll Scanner
 * Estimates NPK levels from leaf color analysis (image data URL).
 */

export function analyzeNPK(imageDataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const sampleSize = 100;
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const pixels = imageData.data;

      let totalR = 0, totalG = 0, totalB = 0;
      let greenPixels = 0, yellowPixels = 0, brownPixels = 0;
      let darkGreen = 0, lightGreen = 0;
      const pixelCount = pixels.length / 4;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        totalR += r;
        totalG += g;
        totalB += b;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturation = max === 0 ? 0 : (max - min) / max;

        if (g > r && g > b && saturation > 0.2) {
          greenPixels++;
          if (g > 150) darkGreen++;
          else lightGreen++;
        } else if (r > 100 && g > 100 && b < 80) {
          yellowPixels++;
        } else if (r > 80 && g < 80 && b < 60) {
          brownPixels++;
        }
      }

      const avgR = totalR / pixelCount;
      const avgG = totalG / pixelCount;
      const avgB = totalB / pixelCount;
      const greenRatio = greenPixels / pixelCount;
      const darkGreenRatio = darkGreen / pixelCount;
      const yellowRatio = yellowPixels / pixelCount;
      const brownRatio = brownPixels / pixelCount;

      // ExG (Excess Green Index) for chlorophyll
      const exg = (2 * avgG - avgR - avgB) / (avgG + avgR + avgB + 1);
      // VARI (Visible Atmospherically Resistant Index)
      const vari = (avgG - avgR) / (avgG + avgR - avgB + 1);

      // Nitrogen estimation (correlates with green intensity)
      let nitrogen;
      if (darkGreenRatio > 0.4 && exg > 0.1) {
        nitrogen = { level: 'Optimal', value: Math.round(40 + exg * 100), color: 'green', confidence: 85 };
      } else if (lightGreen > darkGreen && greenRatio > 0.3) {
        nitrogen = { level: 'Moderate', value: Math.round(25 + greenRatio * 40), color: 'amber', confidence: 75 };
      } else if (yellowRatio > 0.2) {
        nitrogen = { level: 'Low', value: Math.round(10 + greenRatio * 20), color: 'red', confidence: 70 };
      } else {
        nitrogen = { level: 'Low', value: Math.round(5 + greenRatio * 15), color: 'red', confidence: 65 };
      }

      // Phosphorus estimation (correlates with overall color health)
      let phosphorus;
      const colorHealth = (avgG + avgB) / (avgR + 1);
      if (colorHealth > 1.2 && brownRatio < 0.1) {
        phosphorus = { level: 'Optimal', value: Math.round(30 + colorHealth * 15), color: 'green', confidence: 80 };
      } else if (colorHealth > 0.9) {
        phosphorus = { level: 'Moderate', value: Math.round(15 + colorHealth * 20), color: 'amber', confidence: 70 };
      } else {
        phosphorus = { level: 'Low', value: Math.round(5 + colorHealth * 10), color: 'red', confidence: 65 };
      }

      // Potassium estimation (correlates with leaf edge health)
      let potassium;
      if (brownRatio < 0.05 && greenRatio > 0.5) {
        potassium = { level: 'Optimal', value: Math.round(35 + vari * 20), color: 'green', confidence: 78 };
      } else if (brownRatio < 0.15) {
        potassium = { level: 'Moderate', value: Math.round(15 + greenRatio * 25), color: 'amber', confidence: 68 };
      } else {
        potassium = { level: 'Low', value: Math.round(5 + greenRatio * 10), color: 'red', confidence: 62 };
      }

      const overallHealth = greenRatio > 0.5 ? 'Healthy' : greenRatio > 0.3 ? 'Moderate Stress' : 'Stressed';

      const recommendations = [];
      if (nitrogen.level === 'Low') recommendations.push({ nutrient: 'N', action: 'Apply urea (46-0-0) at 50 kg/ha or use organic neem cake at 250 kg/ha.', urgency: 'High' });
      if (phosphorus.level === 'Low') recommendations.push({ nutrient: 'P', action: 'Apply DAP (18-46-0) at 100 kg/ha or bone meal at 200 kg/ha.', urgency: 'High' });
      if (potassium.level === 'Low') recommendations.push({ nutrient: 'K', action: 'Apply MOP (0-0-60) at 60 kg/ha or wood ash at 150 kg/ha.', urgency: 'Medium' });
      if (nitrogen.level === 'Optimal' && phosphorus.level === 'Optimal' && potassium.level === 'Optimal') {
        recommendations.push({ nutrient: 'All', action: 'NPK levels are balanced. Maintain current nutrition program.', urgency: 'None' });
      }

      resolve({
        nitrogen,
        phosphorus,
        potassium,
        chlorophyll: {
          exg: Math.round(exg * 1000) / 1000,
          vari: Math.round(vari * 1000) / 1000,
          greenRatio: Math.round(greenRatio * 100),
          darkGreenRatio: Math.round(darkGreenRatio * 100),
          yellowRatio: Math.round(yellowRatio * 100),
          brownRatio: Math.round(brownRatio * 100),
          avgRGB: { r: Math.round(avgR), g: Math.round(avgG), b: Math.round(avgB) }
        },
        overallHealth,
        recommendations,
        disclaimer: 'This is an AI estimation based on leaf color analysis. For precise NPK values, use laboratory soil/leaf testing.'
      });
    };
    img.onerror = () => {
      resolve({
        nitrogen: { level: 'Unknown', value: 0, color: 'gray', confidence: 0 },
        phosphorus: { level: 'Unknown', value: 0, color: 'gray', confidence: 0 },
        potassium: { level: 'Unknown', value: 0, color: 'gray', confidence: 0 },
        overallHealth: 'Unable to analyze',
        recommendations: [],
        disclaimer: 'Image could not be analyzed. Please try a clearer leaf photo.'
      });
    };
    img.src = imageDataUrl;
  });
}
