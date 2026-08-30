/**
 * Disease & Weather Prognosis Simulator
 * Simulates disease progression over 7-14 days using weather forecasts.
 * Uses Open-Meteo API (free, no key required).
 */

const DISEASE_MODELS = {
  rice_blast: {
    name: 'Rice Blast',
    baseSpreadRate: 0.15,
    humidityFactor: 1.8,
    tempOptimal: [25, 28],
    tempFactor: 1.5,
    rainFactor: 1.3,
    severityMultiplier: { Low: 0.5, Moderate: 1.0, Severe: 1.5 },
    maxDamage: 0.85,
    symptoms: ['Spindle-shaped lesions', 'Neck blast', 'Leaf death', 'Panicle sterility'],
    untreatedOutcome: 'Up to 80% yield loss if untreated. Disease spreads to neighboring plants within 3-5 days.',
    treatedOutcome: 'With Tricyclazole treatment, spread stops within 3-5 days. 90%+ yield saved.'
  },
  bacterial_leaf_blight: {
    name: 'Bacterial Leaf Blight',
    baseSpreadRate: 0.12,
    humidityFactor: 1.6,
    tempOptimal: [25, 30],
    tempFactor: 1.4,
    rainFactor: 1.8,
    severityMultiplier: { Low: 0.4, Moderate: 1.0, Severe: 1.6 },
    maxDamage: 0.75,
    symptoms: ['Yellow leaf stripes', 'Leaf tip drying', 'Bacterial ooze', 'Whole leaf death'],
    untreatedOutcome: 'Leaves dry completely within 7-10 days. 60-70% yield loss possible.',
    treatedOutcome: 'Copper-based spray stops progression. 80%+ yield saved with early treatment.'
  },
  brown_spot: {
    name: 'Brown Spot',
    baseSpreadRate: 0.10,
    humidityFactor: 1.4,
    tempOptimal: [20, 25],
    tempFactor: 1.2,
    rainFactor: 1.2,
    severityMultiplier: { Low: 0.3, Moderate: 0.8, Severe: 1.3 },
    maxDamage: 0.60,
    symptoms: ['Circular brown spots', 'Yellow halo', 'Leaf yellowing', 'Grain discoloration'],
    untreatedOutcome: 'Spots coalesce, leaves die. 40-50% yield loss. Indicates poor soil health.',
    treatedOutcome: 'Mancozeb application controls spread. Soil amendment prevents recurrence.'
  },
  tungro: {
    name: 'Rice Tungro',
    baseSpreadRate: 0.18,
    humidityFactor: 1.2,
    tempOptimal: [25, 30],
    tempFactor: 1.6,
    rainFactor: 1.0,
    severityMultiplier: { Low: 0.5, Moderate: 1.0, Severe: 1.8 },
    maxDamage: 0.80,
    symptoms: ['Yellow-orange leaves', 'Stunted growth', 'Reduced tillering', 'Empty grains'],
    untreatedOutcome: 'Spreads via leafhoppers to nearby fields. 70-80% yield loss within 2 weeks.',
    treatedOutcome: 'Imidacloprid controls leafhopper vector. Resistant varieties prevent future infection.'
  },
  sheath_blight: {
    name: 'Sheath Blight',
    baseSpreadRate: 0.14,
    humidityFactor: 2.0,
    tempOptimal: [28, 32],
    tempFactor: 1.3,
    rainFactor: 1.5,
    severityMultiplier: { Low: 0.4, Moderate: 1.0, Severe: 1.5 },
    maxDamage: 0.70,
    symptoms: ['Irregular gray lesions', 'Sheath rotting', 'Plant lodging', 'Panicle damage'],
    untreatedOutcome: 'Lesions spread to leaf blades. Plant lodging in severe cases. 50-60% yield loss.',
    treatedOutcome: 'Validamycin controls spread. Reduce nitrogen and maintain proper water levels.'
  },
  neck_blast: {
    name: 'Neck Blast',
    baseSpreadRate: 0.16,
    humidityFactor: 1.7,
    tempOptimal: [25, 28],
    tempFactor: 1.4,
    rainFactor: 1.3,
    severityMultiplier: { Low: 0.5, Moderate: 1.2, Severe: 1.8 },
    maxDamage: 0.90,
    symptoms: ['Blackened panicle neck', 'Panicle breakage', 'Empty grains', 'Gray lesions'],
    untreatedOutcome: 'Complete grain failure. Panicles break at neck. Near 100% loss in affected panicles.',
    treatedOutcome: 'Tricyclazole at heading stage prevents infection. 85%+ yield saved.'
  },
  wheat_yellow_rust: {
    name: 'Wheat Yellow Rust',
    baseSpreadRate: 0.13,
    humidityFactor: 1.5,
    tempOptimal: [12, 20],
    tempFactor: 1.3,
    rainFactor: 1.4,
    severityMultiplier: { Low: 0.4, Moderate: 1.0, Severe: 1.6 },
    maxDamage: 0.70,
    symptoms: ['Yellow stripe patterns', 'Chlorotic leaves', 'Spore pustules', 'Leaf drying'],
    untreatedOutcome: 'Rust spreads rapidly in cool, humid conditions. 50-60% yield loss.',
    treatedOutcome: 'Propiconazole stops spread within 5-7 days. Early spraying critical.'
  },
  late_blight_tomato: {
    name: 'Tomato Late Blight',
    baseSpreadRate: 0.20,
    humidityFactor: 2.2,
    tempOptimal: [18, 24],
    tempFactor: 1.5,
    rainFactor: 2.0,
    severityMultiplier: { Low: 0.5, Moderate: 1.2, Severe: 2.0 },
    maxDamage: 0.95,
    symptoms: ['Water-soaked lesions', 'White fuzzy growth', 'Brown patches', 'Fruit rot'],
    untreatedOutcome: 'Devastating — can destroy entire field in 5-7 days. 90-100% loss possible.',
    treatedOutcome: 'Metalaxyl + Mancozeb controls outbreak. Remove infected plants immediately.'
  },
  generic_fungal: {
    name: 'Fungal Disease',
    baseSpreadRate: 0.10,
    humidityFactor: 1.5,
    tempOptimal: [22, 28],
    tempFactor: 1.2,
    rainFactor: 1.3,
    severityMultiplier: { Low: 0.3, Moderate: 0.8, Severe: 1.3 },
    maxDamage: 0.60,
    symptoms: ['Spots on leaves', 'Discoloration', 'Reduced vigor', 'Premature drying'],
    untreatedOutcome: 'Moderate spread over 2 weeks. 30-40% yield reduction.',
    treatedOutcome: 'Broad-spectrum fungicide controls spread. Good cultural practices prevent recurrence.'
  }
};

function getDiseaseModel(diseaseName) {
  const lower = diseaseName.toLowerCase();
  for (const [key, model] of Object.entries(DISEASE_MODELS)) {
    if (lower.includes(key.replace(/_/g, ' ')) || lower.includes(model.name.toLowerCase())) {
      return model;
    }
  }
  return DISEASE_MODELS.generic_fungal;
}

async function fetchWeatherForecast(lat, lng) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,precipitation_sum,weathercode&timezone=auto&forecast_days=14`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function simulateProgression(model, weather, severity) {
  const mult = model.severityMultiplier[severity] || 1.0;
  const days = [];

  let untreatedHealth = 100;
  let treatedHealth = 100;

  for (let i = 0; i < 14; i++) {
    const temp = weather?.daily?.temperature_2m_max?.[i] ?? 25;
    const humidity = weather?.daily?.relative_humidity_2m_max?.[i] ?? 70;
    const rain = weather?.daily?.precipitation_sum?.[i] ?? 0;

    let tempMult = 1.0;
    if (temp >= model.tempOptimal[0] && temp <= model.tempOptimal[1]) {
      tempMult = model.tempFactor;
    } else {
      const dist = Math.min(Math.abs(temp - model.tempOptimal[0]), Math.abs(temp - model.tempOptimal[1]));
      tempMult = Math.max(0.3, 1.0 - dist * 0.05);
    }

    const humidMult = humidity > 80 ? model.humidityFactor : humidity > 60 ? model.humidityFactor * 0.7 : 0.5;
    const rainMult = rain > 5 ? model.rainFactor : rain > 1 ? model.rainFactor * 0.6 : 0.8;

    const dailySpread = model.baseSpreadRate * mult * tempMult * humidMult * rainMult;
    untreatedHealth = Math.max(100 - model.maxDamage * 100, untreatedHealth - dailySpread * 100);
    treatedHealth = Math.max(20, treatedHealth - dailySpread * 100 * 0.05);

    const weatherCode = weather?.daily?.weathercode?.[i] ?? 0;
    const condition = weatherCode <= 1 ? 'Clear' : weatherCode <= 3 ? 'Cloudy' : weatherCode <= 49 ? 'Fog' : weatherCode <= 69 ? 'Rain' : weatherCode <= 79 ? 'Snow' : 'Storm';

    days.push({
      day: i + 1,
      date: weather?.daily?.time?.[i] ?? `Day ${i + 1}`,
      temperature: temp,
      humidity,
      rainfall: rain,
      condition,
      untreatedHealth: Math.round(untreatedHealth * 10) / 10,
      treatedHealth: Math.round(treatedHealth * 10) / 10,
      spreadRisk: dailySpread > 0.15 ? 'High' : dailySpread > 0.08 ? 'Moderate' : 'Low'
    });
  }

  return days;
}

export async function generatePrognosis(diseaseName, severity, lat, lng) {
  const model = getDiseaseModel(diseaseName);
  const weather = await fetchWeatherForecast(lat, lng);
  
  const progression = simulateProgression(model, weather, severity);
  
  const untreatedEnd = progression[progression.length - 1].untreatedHealth;
  const treatedEnd = progression[progression.length - 1].treatedHealth;
  
  const avgTemp = progression.reduce((s, d) => s + d.temperature, 0) / 14;
  const avgHumidity = progression.reduce((s, d) => s + d.humidity, 0) / 14;
  const totalRain = progression.reduce((s, d) => s + d.rainfall, 0);
  const highRiskDays = progression.filter(d => d.spreadRisk === 'High').length;

  let overallRisk;
  if (highRiskDays >= 7) overallRisk = 'Critical';
  else if (highRiskDays >= 4) overallRisk = 'High';
  else if (highRiskDays >= 2) overallRisk = 'Moderate';
  else overallRisk = 'Low';

  return {
    disease: model.name,
    severity,
    overallRisk,
    weatherSummary: {
      avgTemperature: Math.round(avgTemp * 10) / 10,
      avgHumidity: Math.round(avgHumidity * 10) / 10,
      totalRainfall: Math.round(totalRain * 10) / 10,
      highRiskDays
    },
    untreated: {
      finalHealth: Math.round(untreatedEnd * 10) / 10,
      yieldLoss: Math.round((100 - untreatedEnd)),
      outcome: model.untreatedOutcome
    },
    treated: {
      finalHealth: Math.round(treatedEnd * 10) / 10,
      yieldSaved: Math.round((100 - untreatedEnd) - (100 - treatedEnd)),
      outcome: model.treatedOutcome
    },
    symptoms: model.symptoms,
    progression
  };
}
