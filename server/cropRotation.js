/**
 * Crop Rotation & Companion Planting AI
 * Recommends optimal rotation schedules and companion plants.
 */

const ROTATION_DB = {
  rice: {
    name: 'Rice',
    family: 'Poaceae',
    nitrogenFixer: false,
    bestPreceding: ['Pulse', 'Groundnut', 'Soybean', 'Clover', 'Maize'],
    worstPreceding: ['Rice', 'Wheat', 'Sugarcane'],
    bestFollowing: ['Wheat', 'Mustard', 'Vegetables', 'Pulse'],
    worstFollowing: ['Rice', 'Maize'],
    companions: ['Azolla', 'Duckweed', 'Fish', 'Legumes'],
    antagonists: ['Sedge grasses'],
    breakYears: 2,
    soilBenefit: 'High water requirement; benefits from legume preceding crops that fix nitrogen.',
  },
  wheat: {
    name: 'Wheat',
    family: 'Poaceae',
    nitrogenFixer: false,
    bestPreceding: ['Rice', 'Pulse', 'Cotton', 'Fallow'],
    worstPreceding: ['Wheat', 'Barley', 'Sorghum'],
    bestFollowing: ['Rice', 'Cotton', 'Sugarcane', 'Maize'],
    worstFollowing: ['Wheat', 'Barley'],
    companions: ['Chickpea', 'Mustard', 'Clover', 'Alfalfa'],
    antagonists: ['Rye', 'Corn'],
    breakYears: 2,
    soilBenefit: 'Heavy nitrogen feeder; follow with nitrogen-fixing legumes.',
  },
  maize: {
    name: 'Maize',
    family: 'Poaceae',
    nitrogenFixer: false,
    bestPreceding: ['Pulse', 'Groundnut', 'Soybean', 'Fallow'],
    worstPreceding: ['Maize', 'Sorghum'],
    bestFollowing: ['Wheat', 'Mustard', 'Vegetables'],
    worstFollowing: ['Maize', 'Sorghum'],
    companions: ['Beans', 'Squash', 'Sunflower', 'Cucumber'],
    antagonists: ['Tomato', 'Celery'],
    breakYears: 2,
    soilBenefit: 'Deep root system improves soil structure; heavy nitrogen feeder.',
  },
  cotton: {
    name: 'Cotton',
    family: 'Malvaceae',
    nitrogenFixer: false,
    bestPreceding: ['Wheat', 'Pulse', 'Groundnut'],
    worstPreceding: ['Cotton', 'Okra'],
    bestFollowing: ['Wheat', 'Pulse', 'Groundnut'],
    worstFollowing: ['Cotton'],
    companions: ['Clover', 'Marrow', 'Mint'],
    antagonists: ['Tomato', 'Peppers'],
    breakYears: 3,
    soilBenefit: 'Long-duration crop; benefits from pre-crop legumes.',
  },
  tomato: {
    name: 'Tomato',
    family: 'Solanaceae',
    nitrogenFixer: false,
    bestPreceding: ['Legumes', 'Corn', 'Carrots'],
    worstPreceding: ['Tomato', 'Pepper', 'Potato', 'Eggplant'],
    bestFollowing: ['Legumes', 'Leafy greens', 'Root crops'],
    worstFollowing: ['Tomato', 'Pepper', 'Potato'],
    companions: ['Basil', 'Marigold', 'Carrot', 'Parsley'],
    antagonists: ['Cabbage', 'Fennel', 'Corn'],
    breakYears: 3,
    soilBenefit: 'Solanaceous; rotate with non-Solanaceae to prevent soil-borne disease buildup.',
  },
  potato: {
    name: 'Potato',
    family: 'Solanaceae',
    nitrogenFixer: false,
    bestPreceding: ['Legumes', 'Corn', 'Cabbage'],
    worstPreceding: ['Tomato', 'Pepper', 'Eggplant'],
    bestFollowing: ['Legumes', 'Corn', 'Cabbage'],
    worstFollowing: ['Tomato', 'Pepper'],
    companions: ['Beans', 'Corn', 'Marigold', 'Horseradish'],
    antagonists: ['Tomato', 'Sunflower', 'Squash'],
    breakYears: 3,
    soilBenefit: 'Loosens compacted soil; heavy feeder requiring good fertility.',
  },
  sugarcane: {
    name: 'Sugarcane',
    family: 'Poaceae',
    nitrogenFixer: false,
    bestPreceding: ['Pulse', 'Groundnut', 'Fallow'],
    worstPreceding: ['Sugarcane', 'Rice'],
    bestFollowing: ['Pulse', 'Wheat', 'Mustard'],
    worstFollowing: ['Sugarcane'],
    companions: ['Legume intercrops', 'Sweet potato'],
    antagonists: [],
    breakYears: 3,
    soilBenefit: 'Long-duration crop (12-18 months); exhausts soil fertility.',
  },
  banana: {
    name: 'Banana',
    family: 'Musaceae',
    nitrogenFixer: false,
    bestPreceding: ['Pulse', 'Groundnut', 'Vegetables'],
    worstPreceding: ['Banana'],
    bestFollowing: ['Pulse', 'Vegetables', 'Rice'],
    worstFollowing: ['Banana'],
    companions: ['Legumes', 'Sweet potato', 'Taro'],
    antagonists: [],
    breakYears: 4,
    soilBenefit: 'Perennial; soil depleting without organic matter addition.',
  },
  soybean: {
    name: 'Soybean',
    family: 'Fabaceae',
    nitrogenFixer: true,
    bestPreceding: ['Cereals', 'Maize', 'Cotton'],
    worstPreceding: ['Soybean', 'Other legumes'],
    bestFollowing: ['Maize', 'Wheat', 'Rice', 'Cotton'],
    worstFollowing: ['Soybean', 'Groundnut'],
    companions: ['Corn', 'Sorghum', 'Sunflower'],
    antagonists: [],
    breakYears: 2,
    soilBenefit: 'Excellent nitrogen fixer; adds 50-100 kg N/ha to soil.',
  },
  groundnut: {
    name: 'Groundnut',
    family: 'Fabaceae',
    nitrogenFixer: true,
    bestPreceding: ['Cereals', 'Cotton', 'Maize'],
    worstPreceding: ['Groundnut', 'Other legumes'],
    bestFollowing: ['Rice', 'Wheat', 'Maize'],
    worstFollowing: ['Groundnut'],
    companions: ['Maize', 'Cereal crops'],
    antagonists: [],
    breakYears: 2,
    soilBenefit: 'Nitrogen fixer; improves soil fertility for next cereal crop.',
  },
  pulses: {
    name: 'Pulses',
    family: 'Fabaceae',
    nitrogenFixer: true,
    bestPreceding: ['Cereals', 'Cotton', 'Sugarcane'],
    worstPreceding: ['Pulses', 'Groundnut'],
    bestFollowing: ['Rice', 'Wheat', 'Maize', 'Cotton'],
    worstFollowing: ['Pulses'],
    companions: ['Cereals', 'Root crops'],
    antagonists: [],
    breakYears: 2,
    soilBenefit: 'Major nitrogen fixers; restore soil fertility after cereals.',
  },
};

function getRotationData(crop) {
  const key = crop?.toLowerCase();
  if (ROTATION_DB[key]) return ROTATION_DB[key];
  if (key?.includes('pulse')) return ROTATION_DB.pulses;
  return null;
}

export function generateCropRotation(crop, soilType = 'Loamy', climate = 'Tropical') {
  const data = getRotationData(crop);
  if (!data) {
    return { error: `No rotation data available for ${crop}` };
  }

  const rotationSchedule = [
    { season: 'Kharif (Jun-Oct)', crop: data.name, reason: 'Primary crop season' },
    ...data.bestFollowing.slice(0, 2).map((c, i) => ({
      season: `Rabi ${i + 1} (Nov-Mar)`, 
      crop: c, 
      reason: i === 0 ? 'Break crop; prevents disease carryover' : 'Soil recovery crop'
    })),
    ...data.bestPreceding.slice(0, 1).map((c) => ({
      season: 'Next Kharif',
      crop: c,
      reason: 'Pre-crop to restore soil fertility'
    }))
  ];

  const companions = data.companions.map(name => ({
    name,
    benefit: name.toLowerCase().includes('bean') || name.toLowerCase().includes('legum') || name.toLowerCase().includes('clover') || name.toLowerCase().includes('alfalfa')
      ? 'Fixes atmospheric nitrogen; shares nutrients'
      : name.toLowerCase().includes('marigold') || name.toLowerCase().includes('basil')
      ? 'Repels pests; attracts beneficial insects'
      : 'Improves soil structure; provides ground cover'
  }));

  return {
    crop: data.name,
    family: data.family,
    isNitrogenFixer: data.nitrogenFixer,
    breakYears: data.breakYears,
    soilBenefit: data.soilBenefit,
    rotationSchedule,
    bestPreceding: data.bestPreceding,
    worstPreceding: data.worstPreceding,
    bestFollowing: data.bestFollowing,
    companions,
    antagonists: data.antagonists,
    soilType,
    climate,
    tips: [
      `Rotate ${data.name} with crops from different families to prevent disease buildup.`,
      data.nitrogenFixer 
        ? `${data.name} fixes nitrogen — follow with nitrogen-hungry cereals.`
        : `${data.name} is a heavy nitrogen feeder — follow with legumes to restore soil fertility.`,
      `Maintain at least ${data.breakYears}-year break before planting ${data.name} in the same field again.`,
      data.worstPreceding.length > 0 
        ? `Avoid planting ${data.name} after ${data.worstPreceding.join(', ')} — same family diseases persist.`
        : '',
      'Add organic matter (compost, green manure) between rotations to improve soil biology.'
    ].filter(Boolean)
  };
}
