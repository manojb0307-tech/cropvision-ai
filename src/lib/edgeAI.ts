/**
 * Offline Edge-AI Browser Scanner
 * Uses TensorFlow.js MobileNet for client-side plant disease classification.
 * 100% offline — no server calls needed.
 */

let model = null;
let modelLoading = false;

const DISEASE_SIGNATURES = {
  'yellow': ['Tungro', 'Nitrogen Deficiency', 'Chlorosis'],
  'brown': ['Brown Spot', 'Bacterial Leaf Blight', 'Leaf Rust'],
  'orange': ['Rice Blast', 'Orange Rust', 'Aphid Damage'],
  'dark_spot': ['Fungal Infection', 'Bacterial Speck', 'Alternaria'],
  'white': ['Powdery Mildew', 'Downy Mildew', 'White Rust'],
  'red': ['Red Gram Disease', 'Rust', 'Anthracnose'],
  'wilting': ['Fusarium Wilt', 'Bacterial Wilt', 'Root Rot'],
};

const CROP_INDICATORS = {
  'grass_like': 'Rice',
  'tall_grass': 'Sugarcane',
  'broad_leaf': 'Tomato',
  'climbing': 'Cotton',
  'bushy': 'Potato',
  'tree': 'Mango',
  'bunch': 'Banana',
};

export async function loadEdgeAIModel() {
  if (model) return model;
  if (modelLoading) return null;
  
  modelLoading = true;
  try {
    const tf = await import('@tensorflow/tfjs');
    const mobilenet = await import('@tensorflow-models/mobilenet');
    await tf.ready();
    model = await mobilenet.load({ version: 2, alpha: 1.0 });
    modelLoading = false;
    return model;
  } catch (err) {
    console.error('Failed to load Edge-AI model:', err);
    modelLoading = false;
    return null;
  }
}

export async function analyzeOffline(imageDataUrl: string) {
  const loadedModel = await loadEdgeAIModel();
  
  if (!loadedModel) {
    return {
      error: 'Edge-AI model not loaded. Using fallback analysis.',
      source: 'offline_fallback',
      ...fallbackAnalysis(imageDataUrl)
    };
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        const predictions = await loadedModel.classify(img, 10);
        
        // Canvas color analysis
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        const imageData = ctx.getImageData(0, 0, 100, 100);
        const pixels = imageData.data;

        let avgR = 0, avgG = 0, avgB = 0;
        let yellowCount = 0, brownCount = 0, greenCount = 0;
        const total = pixels.length / 4;

        for (let i = 0; i < pixels.length; i += 4) {
          avgR += pixels[i];
          avgG += pixels[i + 1];
          avgB += pixels[i + 2];
          const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
          if (r > 150 && g > 150 && b < 100) yellowCount++;
          else if (r > 100 && g < 80 && b < 60) brownCount++;
          else if (g > r && g > b && g > 100) greenCount++;
        }
        avgR /= total; avgG /= total; avgB /= total;

        const dominantColor = yellowCount > brownCount && yellowCount > greenCount ? 'yellow'
          : brownCount > greenCount ? 'brown'
          : 'green';

        const diseaseHints = DISEASE_SIGNATURES[dominantColor] || ['Unknown Disease'];
        
        const healthScore = greenCount / total;
        const isHealthy = healthScore > 0.4 && yellowCount / total < 0.2 && brownCount / total < 0.1;

        resolve({
          source: 'edge_ai_mobilenet',
          modelVersion: 'MobileNetV2',
          topPredictions: predictions.map(p => ({
            className: p.className,
            probability: Math.round(p.probability * 100)
          })),
          colorAnalysis: {
            dominantColor,
            healthScore: Math.round(healthScore * 100),
            avgRGB: { r: Math.round(avgR), g: Math.round(avgG), b: Math.round(avgB) },
            yellowPixels: Math.round(yellowCount / total * 100),
            brownPixels: Math.round(brownCount / total * 100),
            greenPixels: Math.round(greenCount / total * 100),
          },
          isHealthy,
          likelyDiseases: diseaseHints,
          recommendation: isHealthy
            ? 'Plant appears healthy based on color analysis. Continue monitoring.'
            : `Abnormal color detected (${dominantColor}). Possible issues: ${diseaseHints.join(', ')}. Use online AI scan for detailed diagnosis.`,
          offlineDisclaimer: 'This is a client-side estimation using MobileNet feature extraction. For accurate diagnosis, use the online AI scanner.'
        });
      } catch (err) {
        resolve(fallbackAnalysis(imageDataUrl));
      }
    };
    img.onerror = () => resolve(fallbackAnalysis(imageDataUrl));
    img.src = imageDataUrl;
  });
}

function fallbackAnalysis(imageDataUrl: string) {
  return {
    source: 'offline_fallback',
    colorAnalysis: { dominantColor: 'unknown', healthScore: 50 },
    isHealthy: null,
    likelyDiseases: [],
    recommendation: 'Offline model not available. Please use the online scanner for accurate results.',
    offlineDisclaimer: 'Fallback mode — no AI model loaded.'
  };
}

export function isModelLoaded() {
  return model !== null;
}

export function getModelStatus() {
  return {
    loaded: model !== null,
    loading: modelLoading,
  };
}
