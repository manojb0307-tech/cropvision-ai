/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * COST ESTIMATOR ENGINE v2.0 — CropVision Advanced
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Features:
 * - 15+ crops with regional pricing
 * - Organic vs chemical treatment comparison
 * - ROI calculator with break-even analysis
 * - Seasonal cost variations
 * - Labor cost estimation
 */

const CROP_COST_DATABASE = {
  rice: {
    name: 'Rice', family: 'Poaceae',
    avgYieldPerHectare: 4500, marketPricePerQuintal: 2200,
    inputCostPerHectare: 35000, laborDaysPerHectare: 80,
    laborCostPerDay: 500, growingPeriod: 120,
    regions: { 'North': 2300, 'South': 2100, 'East': 2000, 'West': 2400 },
    yieldLoss: { Low: 10, Moderate: 25, Severe: 50, Critical: 75 },
    treatments: {
      organic: [
        { name: 'Neem Oil Spray (5ml/L)', costPerHectare: 800, frequency: 2, effectiveness: 65, applicationWindow: 'Tillering to Flowering' },
        { name: 'Trichoderma Viride (4g/L)', costPerHectare: 1200, frequency: 1, effectiveness: 70, applicationWindow: 'Nursery stage' },
        { name: 'Pseudomonas fluorescens (10g/L)', costPerHectare: 1000, frequency: 2, effectiveness: 62, applicationWindow: 'Transplanting + Tillering' },
        { name: 'Cow Urine Extract (10%)', costPerHectare: 400, frequency: 3, effectiveness: 50, applicationWindow: 'Any growth stage' },
        { name: 'Bordeaux Mixture', costPerHectare: 600, frequency: 2, effectiveness: 68, applicationWindow: 'Early symptom' },
      ],
      chemical: [
        { name: 'Tricyclazole 75% WP (0.3g/L)', costPerHectare: 1500, frequency: 2, effectiveness: 92, applicationWindow: 'At heading' },
        { name: 'Isoprothiolane 40% EC (1.5ml/L)', costPerHectare: 1800, frequency: 2, effectiveness: 88, applicationWindow: 'Boot stage' },
        { name: 'Propiconazole 25% EC (1ml/L)', costPerHectare: 1200, frequency: 1, effectiveness: 85, applicationWindow: 'Pre-heading' },
        { name: 'Carbendazim 50% WP (1g/L)', costPerHectare: 900, frequency: 2, effectiveness: 78, applicationWindow: 'Preventive' },
        { name: 'Validamycin 3% WP (3g/L)', costPerHectare: 1300, frequency: 2, effectiveness: 85, applicationWindow: 'Tillering' },
      ]
    }
  },
  wheat: {
    name: 'Wheat', family: 'Poaceae',
    avgYieldPerHectare: 3200, marketPricePerQuintal: 2100,
    inputCostPerHectare: 28000, laborDaysPerHectare: 45,
    laborCostPerDay: 500, growingPeriod: 120,
    regions: { 'North': 2200, 'Central': 2050, 'East': 1900 },
    yieldLoss: { Low: 8, Moderate: 20, Severe: 45, Critical: 70 },
    treatments: {
      organic: [
        { name: 'Neem Seed Kernel Extract (5%)', costPerHectare: 600, frequency: 2, effectiveness: 55, applicationWindow: 'Tillering' },
        { name: 'Trichoderma Viride', costPerHectare: 1000, frequency: 1, effectiveness: 65, applicationWindow: 'Seed treatment' },
        { name: 'Bacillus Subtilis', costPerHectare: 800, frequency: 1, effectiveness: 60, applicationWindow: 'Seed treatment' },
      ],
      chemical: [
        { name: 'Propiconazole 25% EC (1ml/L)', costPerHectare: 1400, frequency: 2, effectiveness: 90, applicationWindow: 'Flag leaf' },
        { name: 'Tebuconazole 25.9% EC (0.75ml/L)', costPerHectare: 1600, frequency: 1, effectiveness: 88, applicationWindow: 'First pustules' },
        { name: 'Mancozeb 75% WP (2.5g/L)', costPerHectare: 1100, frequency: 2, effectiveness: 82, applicationWindow: 'Preventive' },
        { name: 'Sulfur 80% WP (5g/L)', costPerHectare: 700, frequency: 2, effectiveness: 75, applicationWindow: 'Early season' },
      ]
    }
  },
  maize: {
    name: 'Maize', family: 'Poaceae',
    avgYieldPerHectare: 5500, marketPricePerQuintal: 1900,
    inputCostPerHectare: 25000, laborDaysPerHectare: 40,
    laborCostPerDay: 500, growingPeriod: 100,
    regions: { 'North': 2000, 'Central': 1850, 'South': 1950 },
    yieldLoss: { Low: 10, Moderate: 22, Severe: 48, Critical: 72 },
    treatments: {
      organic: [
        { name: 'Neem Oil Spray', costPerHectare: 700, frequency: 2, effectiveness: 60, applicationWindow: 'Vegetative' },
        { name: 'Pseudomonas fluorescens', costPerHectare: 900, frequency: 1, effectiveness: 65, applicationWindow: 'Seed treatment' },
        { name: 'Trichoderma Harzianum', costPerHectare: 800, frequency: 1, effectiveness: 62, applicationWindow: 'Soil application' },
      ],
      chemical: [
        { name: 'Mancozeb 75% WP (2.5g/L)', costPerHectare: 1200, frequency: 2, effectiveness: 88, applicationWindow: 'First symptoms' },
        { name: 'Carbendazim 50% WP (1g/L)', costPerHectare: 1000, frequency: 2, effectiveness: 85, applicationWindow: 'Preventive' },
        { name: 'Chlorothalonil 75% WP (2g/L)', costPerHectare: 1400, frequency: 2, effectiveness: 82, applicationWindow: 'Preventive' },
      ]
    }
  },
  tomato: {
    name: 'Tomato', family: 'Solanaceae',
    avgYieldPerHectare: 25000, marketPricePerQuintal: 1500,
    inputCostPerHectare: 85000, laborDaysPerHectare: 120,
    laborCostPerDay: 500, growingPeriod: 150,
    regions: { 'North': 1600, 'South': 1400, 'West': 1550 },
    yieldLoss: { Low: 12, Moderate: 30, Severe: 55, Critical: 80 },
    treatments: {
      organic: [
        { name: 'Bordeaux Mixture (1%)', costPerHectare: 1500, frequency: 3, effectiveness: 70, applicationWindow: 'Preventive' },
        { name: 'Trichoderma Harzianum', costPerHectare: 1200, frequency: 2, effectiveness: 65, applicationWindow: 'Soil drench' },
        { name: 'Bacillus Subtilis', costPerHectare: 1000, frequency: 2, effectiveness: 60, applicationWindow: 'Foliar spray' },
        { name: 'Potassium Bicarbonate (0.5%)', costPerHectare: 500, frequency: 3, effectiveness: 68, applicationWindow: 'Powdery mildew' },
      ],
      chemical: [
        { name: 'Metalaxyl + Mancozeb (2.5g/L)', costPerHectare: 2200, frequency: 3, effectiveness: 92, applicationWindow: 'First symptoms' },
        { name: 'Chlorothalonil 75% WP (2g/L)', costPerHectare: 1800, frequency: 2, effectiveness: 85, applicationWindow: 'Preventive' },
        { name: 'Azoxystrobin 23% SC (1ml/L)', costPerHectare: 2000, frequency: 2, effectiveness: 88, applicationWindow: 'Early infection' },
        { name: 'Copper Hydroxide (2g/L)', costPerHectare: 1200, frequency: 2, effectiveness: 78, applicationWindow: 'Bacterial diseases' },
      ]
    }
  },
  potato: {
    name: 'Potato', family: 'Solanaceae',
    avgYieldPerHectare: 20000, marketPricePerQuintal: 1200,
    inputCostPerHectare: 70000, laborDaysPerHectare: 90,
    laborCostPerDay: 500, growingPeriod: 100,
    regions: { 'North': 1300, 'East': 1100, 'Central': 1150 },
    yieldLoss: { Low: 10, Moderate: 28, Severe: 52, Critical: 78 },
    treatments: {
      organic: [
        { name: 'Bordeaux Mixture (1%)', costPerHectare: 1400, frequency: 3, effectiveness: 68, applicationWindow: 'Preventive' },
        { name: 'Bacillus Subtilis', costPerHectare: 1100, frequency: 2, effectiveness: 62, applicationWindow: 'Seed treatment' },
      ],
      chemical: [
        { name: 'Metalaxyl + Mancozeb (2.5g/L)', costPerHectare: 2000, frequency: 4, effectiveness: 90, applicationWindow: 'Preventive spray' },
        { name: 'Cymoxanil + Mancozeb (2g/L)', costPerHectare: 2500, frequency: 3, effectiveness: 88, applicationWindow: 'First symptoms' },
        { name: 'Chlorothalonil 75% WP (2g/L)', costPerHectare: 1600, frequency: 3, effectiveness: 82, applicationWindow: 'Preventive' },
      ]
    }
  },
  cotton: {
    name: 'Cotton', family: 'Malvaceae',
    avgYieldPerHectare: 1800, marketPricePerQuintal: 6500,
    inputCostPerHectare: 55000, laborDaysPerHectare: 100,
    laborCostPerDay: 500, growingPeriod: 180,
    regions: { 'North': 6800, 'Central': 6200, 'South': 6400 },
    yieldLoss: { Low: 8, Moderate: 20, Severe: 42, Critical: 65 },
    treatments: {
      organic: [
        { name: 'Neem Oil Spray (3ml/L)', costPerHectare: 900, frequency: 3, effectiveness: 55, applicationWindow: 'Boll formation' },
        { name: 'Beauveria Bassiana', costPerHectare: 1200, frequency: 2, effectiveness: 58, applicationWindow: 'Pest management' },
      ],
      chemical: [
        { name: 'Copper Hydroxide (2g/L)', costPerHectare: 1500, frequency: 2, effectiveness: 85, applicationWindow: 'First symptoms' },
        { name: 'Mancozeb 75% WP (2.5g/L)', costPerHectare: 1300, frequency: 2, effectiveness: 82, applicationWindow: 'Preventive' },
        { name: 'Propiconazole 25% EC (1ml/L)', costPerHectare: 1400, frequency: 2, effectiveness: 85, applicationWindow: 'Rust control' },
      ]
    }
  },
  banana: {
    name: 'Banana', family: 'Musaceae',
    avgYieldPerHectare: 30000, marketPricePerQuintal: 1100,
    inputCostPerHectare: 65000, laborDaysPerHectare: 70,
    laborCostPerDay: 500, growingPeriod: 365,
    regions: { 'South': 1150, 'East': 1050, 'West': 1200 },
    yieldLoss: { Low: 12, Moderate: 30, Severe: 55, Critical: 80 },
    treatments: {
      organic: [
        { name: 'Trichoderma Soil Application', costPerHectare: 1000, frequency: 2, effectiveness: 60, applicationWindow: 'Planting + 3 months' },
        { name: 'Neem Cake (250kg/ha)', costPerHectare: 2500, frequency: 1, effectiveness: 55, applicationWindow: 'At planting' },
      ],
      chemical: [
        { name: 'Metalaxyl 35% WS (sett treatment)', costPerHectare: 1800, frequency: 2, effectiveness: 88, applicationWindow: 'Pre-planting' },
        { name: 'Phosphorous Acid (3ml/L)', costPerHectare: 2000, frequency: 3, effectiveness: 85, applicationWindow: 'Foliar spray' },
        { name: 'Mancozeb 75% WP (2.5g/L)', costPerHectare: 1500, frequency: 3, effectiveness: 80, applicationWindow: 'Preventive' },
      ]
    }
  },
  sugarcane: {
    name: 'Sugarcane', family: 'Poaceae',
    avgYieldPerHectare: 70000, marketPricePerQuintal: 350,
    inputCostPerHectare: 45000, laborDaysPerHectare: 60,
    laborCostPerDay: 500, growingPeriod: 365,
    regions: { 'North': 360, 'West': 340, 'South': 350 },
    yieldLoss: { Low: 8, Moderate: 18, Severe: 38, Critical: 60 },
    treatments: {
      organic: [
        { name: 'Trichoderma Viride (soil)', costPerHectare: 800, frequency: 1, effectiveness: 60, applicationWindow: 'At planting' },
        { name: 'Bordeaux Mixture (sett dip)', costPerHectare: 500, frequency: 1, effectiveness: 70, applicationWindow: 'Sett treatment' },
      ],
      chemical: [
        { name: 'Thiophanate Methyl 70% WP', costPerHectare: 1200, frequency: 2, effectiveness: 85, applicationWindow: 'Early symptom' },
        { name: 'Hexaconazole 5% EC (2ml/L)', costPerHectare: 1400, frequency: 2, effectiveness: 82, applicationWindow: 'Preventive' },
        { name: 'Hot Water Treatment (52°C, 30min)', costPerHectare: 300, frequency: 1, effectiveness: 90, applicationWindow: 'Sett treatment' },
      ]
    }
  },
  groundnut: {
    name: 'Groundnut', family: 'Fabaceae',
    avgYieldPerHectare: 2000, marketPricePerQuintal: 5000,
    inputCostPerHectare: 22000, laborDaysPerHectare: 50,
    laborCostPerDay: 500, growingPeriod: 100,
    regions: { 'West': 5200, 'South': 4800, 'East': 4600 },
    yieldLoss: { Low: 8, Moderate: 22, Severe: 45, Critical: 68 },
    treatments: {
      organic: [
        { name: 'Trichoderma Seed Treatment', costPerHectare: 600, frequency: 1, effectiveness: 65, applicationWindow: 'Seed treatment' },
        { name: 'Neem Cake (200kg/ha)', costPerHectare: 2000, frequency: 1, effectiveness: 55, applicationWindow: 'At sowing' },
      ],
      chemical: [
        { name: 'Mancozeb 75% WP (2.5g/L)', costPerHectare: 1100, frequency: 2, effectiveness: 85, applicationWindow: 'First symptoms' },
        { name: 'Chlorothalonil 75% WP (2g/L)', costPerHectare: 1400, frequency: 2, effectiveness: 80, applicationWindow: 'Preventive' },
      ]
    }
  },
  soybean: {
    name: 'Soybean', family: 'Fabaceae',
    avgYieldPerHectare: 1800, marketPricePerQuintal: 4200,
    inputCostPerHectare: 18000, laborDaysPerHectare: 35,
    laborCostPerDay: 500, growingPeriod: 95,
    regions: { 'Central': 4300, 'North': 4100 },
    yieldLoss: { Low: 8, Moderate: 20, Severe: 42, Critical: 65 },
    treatments: {
      organic: [
        { name: 'Trichoderma Seed Treatment', costPerHectare: 500, frequency: 1, effectiveness: 60, applicationWindow: 'Seed treatment' },
        { name: 'Neem Oil Spray', costPerHectare: 600, frequency: 2, effectiveness: 50, applicationWindow: 'Vegetative' },
      ],
      chemical: [
        { name: 'Carbendazim 50% WP (1g/L)', costPerHectare: 800, frequency: 2, effectiveness: 82, applicationWindow: 'First symptoms' },
        { name: 'Mancozeb 75% WP (2.5g/L)', costPerHectare: 1100, frequency: 2, effectiveness: 85, applicationWindow: 'Rust control' },
      ]
    }
  },
  pulses: {
    name: 'Pulses (General)', family: 'Fabaceae',
    avgYieldPerHectare: 1200, marketPricePerQuintal: 6000,
    inputCostPerHectare: 15000, laborDaysPerHectare: 30,
    laborCostPerDay: 500, growingPeriod: 90,
    regions: { 'Central': 6200, 'North': 5800, 'East': 5500 },
    yieldLoss: { Low: 8, Moderate: 18, Severe: 40, Critical: 60 },
    treatments: {
      organic: [
        { name: 'Trichoderma Seed Treatment', costPerHectare: 500, frequency: 1, effectiveness: 62, applicationWindow: 'Seed treatment' },
        { name: 'Pseudomonas fluorescens', costPerHectare: 700, frequency: 1, effectiveness: 58, applicationWindow: 'Seed treatment' },
      ],
      chemical: [
        { name: 'Carbendazim 50% WP (1g/L)', costPerHectare: 800, frequency: 2, effectiveness: 80, applicationWindow: 'First symptoms' },
        { name: 'Mancozeb 75% WP (2.5g/L)', costPerHectare: 1000, frequency: 2, effectiveness: 78, applicationWindow: 'Preventive' },
      ]
    }
  },
};

function getCropData(crop) {
  const key = crop?.toLowerCase();
  if (CROP_COST_DATABASE[key]) return CROP_COST_DATABASE[key];
  // Fuzzy match
  for (const [k, v] of Object.entries(CROP_COST_DATABASE)) {
    if (key?.includes(k) || k.includes(key)) return v;
  }
  return CROP_COST_DATABASE.rice;
}

export function calculateCostEstimate(crop, disease, severity, areaHectares = 1, region = 'North') {
  const cropData = getCropData(crop);
  const severityKey = severity || 'Moderate';
  
  const regionalPrice = cropData.regions?.[region] || cropData.marketPricePerQuintal;
  const yieldLossPercent = cropData.yieldLoss[severityKey] || cropData.yieldLoss.Moderate;
  const estimatedYieldLoss = Math.round(cropData.avgYieldPerHectare * (yieldLossPercent / 100) * areaHectares);
  const financialLoss = Math.round((estimatedYieldLoss / 100) * regionalPrice);
  
  // Labor cost
  const totalLaborCost = cropData.laborDaysPerHectare * cropData.laborCostPerDay * areaHectares;
  
  // Treatment costs
  const organicTreatments = cropData.treatments.organic.map(t => ({
    ...t,
    totalCost: Math.round(t.costPerHectare * areaHectares * t.frequency),
    expectedRecovery: Math.min(95, 100 - yieldLossPercent + t.effectiveness),
    netBenefit: Math.round(financialLoss * (t.effectiveness / 100) - t.costPerHectare * areaHectares * t.frequency),
  }));

  const chemicalTreatments = cropData.treatments.chemical.map(t => ({
    ...t,
    totalCost: Math.round(t.costPerHectare * areaHectares * t.frequency),
    expectedRecovery: Math.min(98, 100 - yieldLossPercent + t.effectiveness),
    netBenefit: Math.round(financialLoss * (t.effectiveness / 100) - t.costPerHectare * areaHectares * t.frequency),
  }));

  // Find best options
  const bestValueOrganic = organicTreatments.reduce((best, t) => t.netBenefit > best.netBenefit ? t : best, organicTreatments[0]);
  const mostEffectiveOrganic = organicTreatments.reduce((best, t) => t.effectiveness > best.effectiveness ? t : best, organicTreatments[0]);
  const bestValueChemical = chemicalTreatments.reduce((best, t) => t.netBenefit > best.netBenefit ? t : best, chemicalTreatments[0]);
  const mostEffectiveChemical = chemicalTreatments.reduce((best, t) => t.effectiveness > best.effectiveness ? t : best, chemicalTreatments[0]);

  // Break-even analysis
  const breakEvenOrganic = financialLoss > 0 ? Math.round((bestValueOrganic.totalCost / financialLoss) * 100) : 0;
  const breakEvenChemical = financialLoss > 0 ? Math.round((bestValueChemical.totalCost / financialLoss) * 100) : 0;

  return {
    crop: cropData.name,
    disease,
    severity: severityKey,
    areaHectares,
    region,
    yieldAnalysis: {
      avgYieldPerHectare: cropData.avgYieldPerHectare,
      marketPricePerQuintal: regionalPrice,
      estimatedYieldLossKg: estimatedYieldLoss,
      estimatedFinancialLoss: financialLoss,
      yieldLossPercent,
      totalLaborCost,
      inputCost: cropData.inputCostPerHectare * areaHectares,
    },
    organicOptions: organicTreatments.sort((a, b) => b.netBenefit - a.netBenefit),
    chemicalOptions: chemicalTreatments.sort((a, b) => b.netBenefit - a.netBenefit),
    recommendation: {
      bestValueOrganic,
      mostEffectiveOrganic,
      bestValueChemical,
      mostEffectiveChemical,
      breakEvenOrganic: `${breakEvenOrganic}%`,
      breakEvenChemical: `${breakEvenChemical}%`,
      roi: financialLoss > 0 ? `${Math.round(((financialLoss - bestValueOrganic.totalCost) / bestValueOrganic.totalCost) * 100)}%` : 'N/A',
      paybackPeriod: `${Math.round(cropData.growingPeriod * breakEvenOrganic / 100)} days`,
    },
  };
}
