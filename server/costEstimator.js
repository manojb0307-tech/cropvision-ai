/**
 * Treatment Cost & Yield Loss Estimator
 * Provides cost analysis for organic & chemical treatments, and yield loss projections.
 */

const CROP_COST_DATA = {
  rice: {
    name: 'Rice',
    avgYieldPerHectare: 4500,
    marketPricePerQuintal: 2200,
    inputCostPerHectare: 35000,
    treatments: {
      organic: [
        { name: 'Neem Oil Spray', costPerHectare: 800, frequency: 2, effectiveness: 65 },
        { name: 'Trichoderma Application', costPerHectare: 1200, frequency: 1, effectiveness: 70 },
        { name: 'Pseudomonas Biocontrol', costPerHectare: 1000, frequency: 2, effectiveness: 60 },
        { name: 'Cow Urine Extract', costPerHectare: 400, frequency: 3, effectiveness: 50 },
      ],
      chemical: [
        { name: 'Tricyclazole 75% WP', costPerHectare: 1500, frequency: 2, effectiveness: 90 },
        { name: 'Isoprothiolane 40% EC', costPerHectare: 1800, frequency: 2, effectiveness: 88 },
        { name: 'Propiconazole 25% EC', costPerHectare: 1200, frequency: 1, effectiveness: 85 },
        { name: 'Carbendazim 50% WP', costPerHectare: 900, frequency: 2, effectiveness: 80 },
      ]
    },
    yieldLoss: { Low: 10, Moderate: 25, Severe: 50, Critical: 75 }
  },
  wheat: {
    name: 'Wheat',
    avgYieldPerHectare: 3200,
    marketPricePerQuintal: 2100,
    inputCostPerHectare: 28000,
    treatments: {
      organic: [
        { name: 'Neem Seed Kernel Extract', costPerHectare: 600, frequency: 2, effectiveness: 55 },
        { name: 'Trichoderma Viride', costPerHectare: 1000, frequency: 1, effectiveness: 65 },
      ],
      chemical: [
        { name: 'Propiconazole 25% EC', costPerHectare: 1400, frequency: 2, effectiveness: 90 },
        { name: 'Tebuconazole 25.9% EC', costPerHectare: 1600, frequency: 1, effectiveness: 88 },
        { name: 'Mancozeb 75% WP', costPerHectare: 1100, frequency: 2, effectiveness: 82 },
      ]
    },
    yieldLoss: { Low: 8, Moderate: 20, Severe: 45, Critical: 70 }
  },
  maize: {
    name: 'Maize',
    avgYieldPerHectare: 5500,
    marketPricePerQuintal: 1900,
    inputCostPerHectare: 25000,
    treatments: {
      organic: [
        { name: 'Neem Oil Spray', costPerHectare: 700, frequency: 2, effectiveness: 60 },
        { name: 'Pseudomonas fluorescens', costPerHectare: 900, frequency: 1, effectiveness: 65 },
      ],
      chemical: [
        { name: 'Mancozeb 75% WP', costPerHectare: 1200, frequency: 2, effectiveness: 88 },
        { name: 'Carbendazim 50% WP', costPerHectare: 1000, frequency: 2, effectiveness: 85 },
      ]
    },
    yieldLoss: { Low: 10, Moderate: 22, Severe: 48, Critical: 72 }
  },
  tomato: {
    name: 'Tomato',
    avgYieldPerHectare: 25000,
    marketPricePerQuintal: 1500,
    inputCostPerHectare: 85000,
    treatments: {
      organic: [
        { name: 'Bordeaux Mixture', costPerHectare: 1500, frequency: 3, effectiveness: 70 },
        { name: 'Trichoderma Harzianum', costPerHectare: 1200, frequency: 2, effectiveness: 65 },
      ],
      chemical: [
        { name: 'Metalaxyl + Mancozeb', costPerHectare: 2200, frequency: 3, effectiveness: 92 },
        { name: 'Chlorothalonil 75% WP', costPerHectare: 1800, frequency: 2, effectiveness: 85 },
      ]
    },
    yieldLoss: { Low: 12, Moderate: 30, Severe: 55, Critical: 80 }
  },
  potato: {
    name: 'Potato',
    avgYieldPerHectare: 20000,
    marketPricePerQuintal: 1200,
    inputCostPerHectare: 70000,
    treatments: {
      organic: [
        { name: 'Bordeaux Mixture', costPerHectare: 1400, frequency: 3, effectiveness: 68 },
        { name: 'Bacillus Subtilis', costPerHectare: 1100, frequency: 2, effectiveness: 62 },
      ],
      chemical: [
        { name: 'Metalaxyl + Mancozeb', costPerHectare: 2000, frequency: 4, effectiveness: 90 },
        { name: 'Cymoxanil + Mancozeb', costPerHectare: 2500, frequency: 3, effectiveness: 88 },
      ]
    },
    yieldLoss: { Low: 10, Moderate: 28, Severe: 52, Critical: 78 }
  },
  cotton: {
    name: 'Cotton',
    avgYieldPerHectare: 1800,
    marketPricePerQuintal: 6500,
    inputCostPerHectare: 55000,
    treatments: {
      organic: [
        { name: 'Neem Oil Spray', costPerHectare: 900, frequency: 3, effectiveness: 55 },
      ],
      chemical: [
        { name: 'Copper Hydroxide', costPerHectare: 1500, frequency: 2, effectiveness: 85 },
        { name: 'Mancozeb 75% WP', costPerHectare: 1300, frequency: 2, effectiveness: 82 },
      ]
    },
    yieldLoss: { Low: 8, Moderate: 20, Severe: 42, Critical: 65 }
  },
  banana: {
    name: 'Banana',
    avgYieldPerHectare: 30000,
    marketPricePerQuintal: 1100,
    inputCostPerHectare: 65000,
    treatments: {
      organic: [
        { name: 'Trichoderma Application', costPerHectare: 1000, frequency: 2, effectiveness: 60 },
      ],
      chemical: [
        { name: 'Metalaxyl 35% WS', costPerHectare: 1800, frequency: 2, effectiveness: 88 },
        { name: 'Phosphorous Acid', costPerHectare: 2000, frequency: 3, effectiveness: 85 },
      ]
    },
    yieldLoss: { Low: 12, Moderate: 30, Severe: 55, Critical: 80 }
  },
  sugarcane: {
    name: 'Sugarcane',
    avgYieldPerHectare: 70000,
    marketPricePerQuintal: 350,
    inputCostPerHectare: 45000,
    treatments: {
      organic: [
        { name: 'Trichoderma Viride', costPerHectare: 800, frequency: 1, effectiveness: 60 },
      ],
      chemical: [
        { name: 'Thiophanate Methyl', costPerHectare: 1200, frequency: 2, effectiveness: 85 },
        { name: 'Hexaconazole 5% EC', costPerHectare: 1400, frequency: 2, effectiveness: 82 },
      ]
    },
    yieldLoss: { Low: 8, Moderate: 18, Severe: 38, Critical: 60 }
  }
};

function getCropData(crop) {
  const key = crop?.toLowerCase();
  if (CROP_COST_DATA[key]) return CROP_COST_DATA[key];
  return CROP_COST_DATA.rice;
}

export function calculateCostEstimate(crop, disease, severity, areaHectares = 1) {
  const cropData = getCropData(crop);
  const severityKey = severity || 'Moderate';
  
  const yieldLossPercent = cropData.yieldLoss[severityKey] || cropData.yieldLoss.Moderate;
  const estimatedYieldLoss = Math.round(cropData.avgYieldPerHectare * (yieldLossPercent / 100) * areaHectares);
  const financialLoss = Math.round((estimatedYieldLoss / 100) * cropData.marketPricePerQuintal);

  const organicTreatments = cropData.treatments.organic.map(t => ({
    ...t,
    totalCost: t.costPerHectare * areaHectares * t.frequency,
    expectedRecovery: Math.min(95, 100 - yieldLossPercent + t.effectiveness)
  }));

  const chemicalTreatments = cropData.treatments.chemical.map(t => ({
    ...t,
    totalCost: t.costPerHectare * areaHectares * t.frequency,
    expectedRecovery: Math.min(98, 100 - yieldLossPercent + t.effectiveness)
  }));

  const cheapestOrganic = organicTreatments.reduce((min, t) => t.totalCost < min.totalCost ? t : min, organicTreatments[0]);
  const mostEffectiveOrganic = organicTreatments.reduce((max, t) => t.effectiveness > max.effectiveness ? t : max, organicTreatments[0]);
  const cheapestChemical = chemicalTreatments.reduce((min, t) => t.totalCost < min.totalCost ? t : min, chemicalTreatments[0]);
  const mostEffectiveChemical = chemicalTreatments.reduce((max, t) => t.effectiveness > max.effectiveness ? t : max, chemicalTreatments[0]);

  const roi = financialLoss > 0 ? Math.round(((financialLoss - cheapestOrganic.totalCost) / cheapestOrganic.totalCost) * 100) : 0;

  return {
    crop: cropData.name,
    disease,
    severity: severityKey,
    areaHectares,
    yieldAnalysis: {
      avgYieldPerHectare: cropData.avgYieldPerHectare,
      marketPricePerQuintal: cropData.marketPricePerQuintal,
      estimatedYieldLossKg: estimatedYieldLoss,
      estimatedFinancialLoss: financialLoss,
      yieldLossPercent
    },
    organicOptions: organicTreatments,
    chemicalOptions: chemicalTreatments,
    recommendation: {
      bestValue: cheapestOrganic,
      mostEffective: mostEffectiveChemical,
      chemicalBestValue: cheapestChemical,
      roi: `${roi}%`,
      inputCostPerHectare: cropData.inputCostPerHectare,
      totalInputCost: cropData.inputCostPerHectare * areaHectares
    }
  };
}
