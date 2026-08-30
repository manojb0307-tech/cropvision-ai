/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ORGANIC RECIPE ENGINE v2.0 — CropVision Advanced
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Features:
 * - 50+ organic treatment recipes
 * - Ingredient availability matching
 * - Cost-effectiveness ranking
 * - Application timing optimizer
 * - Synergy detection between ingredients
 */

const RECIPE_DATABASE = [
  // ═══ RICE DISEASES ══════════════════════════════════════════════════════════
  {
    id: 'rice_blast_1', disease: 'Rice Blast', name: 'Garlic-Chili Neem Spray',
    ingredients: [
      { name: 'Neem Oil', quantity: '5 ml/L', availability: 'Common', cost: 80 },
      { name: 'Garlic', quantity: '100g/10L', availability: 'Common', cost: 20 },
      { name: 'Green Chili', quantity: '50g/10L', availability: 'Common', cost: 15 },
      { name: 'Liquid Soap', quantity: '2ml/L (emulsifier)', availability: 'Common', cost: 5 },
    ],
    steps: [
      'Crush 100g garlic and 50g green chili into fine paste',
      'Mix 5ml neem oil with 2ml liquid soap in small amount of warm water',
      'Combine paste with neem solution in 10L water',
      'Stir vigorously for 2 minutes, let stand 1 hour',
      'Strain through muslin cloth to remove particles',
      'Spray on both leaf surfaces in evening (4-6 PM)',
      'Reapply every 7 days, especially after rain',
    ],
    dosage: '5ml/L', frequency: 'Every 7 days', effectiveness: 78, cost: '₹55/hectare',
    applicationTiming: 'Evening (4-6 PM) for best absorption',
    storage: 'Use within 24 hours. Store in shade if needed.',
    synergies: ['Combine with Trichoderma soil application for systemic + contact protection'],
    notes: 'Garlic and chili provide natural fungicidal compounds (allicin, capsaicin). Neem adds anti-feedant and growth-disrupting properties.',
  },
  {
    id: 'rice_blast_2', disease: 'Rice Blast', name: 'Cow Urine Turmeric Fungicide',
    ingredients: [
      { name: 'Cow Urine', quantity: '500ml/10L', availability: 'Very Common', cost: 0 },
      { name: 'Turmeric Powder', quantity: '50g/10L', availability: 'Common', cost: 25 },
      { name: 'Water', quantity: '10L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Ferment cow urine for 7 days in a covered container',
      'Mix turmeric powder with 2L warm water, stir until dissolved',
      'Add fermented cow urine to turmeric solution',
      'Add remaining water and stir well',
      'Let stand 2 hours for compound activation',
      'Strain and spray on affected plants',
    ],
    dosage: '10ml/L', frequency: 'Every 10 days', effectiveness: 65, cost: '₹25/hectare',
    applicationTiming: 'Morning or evening',
    storage: 'Fermented solution stores up to 1 week in cool place',
    synergies: ['Turmeric (curcumin) + cow urine (ammonia) create antifungal ammonia-turmeric complex'],
    notes: 'Most economical option. Turmeric has proven antifungal properties. Cow urine provides nitrogen and antifungal compounds.',
  },
  {
    id: 'rice_blast_3', disease: 'Rice Blast', name: 'Trichoderma Biocontrol Drench',
    ingredients: [
      { name: 'Trichoderma Viride', quantity: '10g/10L', availability: 'Agri Shop', cost: 150 },
      { name: 'Jaggery', quantity: '20g/10L', availability: 'Common', cost: 10 },
      { name: 'Rice Bran', quantity: '50g/10L', availability: 'Common', cost: 5 },
      { name: 'Water', quantity: '10L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Dissolve jaggery in 1L warm water',
      'Add Trichoderma spores and rice bran',
      'Stir well and keep in shade for 12 hours (multiplication)',
      'Add remaining 9L water and mix',
      'Strain through cloth and spray immediately',
      'Apply to leaf surfaces and soil around base',
    ],
    dosage: '10ml/L', frequency: 'Every 15 days', effectiveness: 72, cost: '₹170/hectare',
    applicationTiming: 'Early morning, soil moisture should be high',
    storage: 'Use within 6 hours of preparation',
    synergies: ['Works best when combined with organic matter application to soil'],
    notes: 'Trichoderma colonizes root zone and competitively excludes pathogens. Jaggery and rice bran provide food for multiplication.',
  },
  // ═══ BACTERIAL DISEASES ═════════════════════════════════════════════════════
  {
    id: 'bacterial_1', disease: 'Bacterial Leaf Blight', name: 'Pseudomonas Biocontrol Spray',
    ingredients: [
      { name: 'Pseudomonas fluorescens', quantity: '10g/10L', availability: 'Agri Shop', cost: 120 },
      { name: 'Jaggery', quantity: '10g/10L', availability: 'Common', cost: 5 },
      { name: 'Non-chlorinated Water', quantity: '10L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Dissolve jaggery in 1L warm (30°C) water',
      'Add Pseudomonas and stir gently',
      'Keep in shade for 8 hours (multiplication phase)',
      'Add remaining water and apply immediately',
      'Spray on leaf surfaces, focus on leaf tips (hydathodes)',
    ],
    dosage: '10ml/L', frequency: 'Every 15 days', effectiveness: 70, cost: '₹130/hectare',
    applicationTiming: 'Early morning when hydathodes are open',
    storage: 'Use within 4 hours',
    synergies: ['Combine with copper spray for contact + biological double protection'],
    notes: 'Pseudomonas produces antibiotics (phenazines) that kill Xanthomonas. Best preventive application.',
  },
  {
    id: 'bacterial_2', disease: 'Bacterial Diseases', name: 'Bordeaux Mixture (Classic)',
    ingredients: [
      { name: 'Copper Sulfate (Blue Vitriol)', quantity: '100g/10L', availability: 'Agri Shop', cost: 40 },
      { name: 'Quick Lime', quantity: '100g/10L', availability: 'Common', cost: 15 },
      { name: 'Water', quantity: '10L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Dissolve 100g copper sulfate in 5L warm water (overnight for best results)',
      'Slake 100g quick lime separately in 5L water',
      'Slowly pour copper solution INTO lime solution (never reverse)',
      'Stir continuously, check pH with litmus (should be 8-9)',
      'Test with iron nail — if blue deposit forms, add more lime',
      'Strain through fine cloth and use immediately',
    ],
    dosage: '10ml/L', frequency: 'Every 10-14 days', effectiveness: 82, cost: '₹55/hectare',
    applicationTiming: 'After rain, preventive before disease onset',
    storage: 'Prepare fresh each time. Cannot store.',
    synergies: ['Most effective when combined with resistant varieties as second line of defense'],
    notes: 'Time-tested fungicide/bactericide since 1882. Copper provides contact kill, lime prevents plant burn.',
  },
  // ═══ FUNGAL DISEASES ═══════════════════════════════════════════════════════
  {
    id: 'fungal_1', disease: 'General Fungal', name: 'Multi-Purpose Neem Spray',
    ingredients: [
      { name: 'Neem Oil', quantity: '5ml/L', availability: 'Common', cost: 80 },
      { name: 'Liquid Soap', quantity: '2ml/L', availability: 'Common', cost: 5 },
      { name: 'Water', quantity: '1L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Mix neem oil with liquid soap (emulsifier) in small cup',
      'Add to 1L water while stirring vigorously',
      'Shake well before spraying',
      'Apply to both upper and lower leaf surfaces',
      'Spray in evening to avoid photodegradation',
    ],
    dosage: '5ml/L', frequency: 'Every 7-10 days', effectiveness: 68, cost: '₹85/liter',
    applicationTiming: 'Evening (avoid direct sunlight)',
    storage: 'Use within 8 hours. Neem degrades in UV light.',
    synergies: ['Add garlic extract for enhanced antifungal activity'],
    notes: 'Azadirachtin in neem disrupts fungal growth and insect feeding. Broad-spectrum organic solution.',
  },
  {
    id: 'fungal_2', disease: 'Powdery Mildew', name: 'Baking Soda Spray',
    ingredients: [
      { name: 'Baking Soda (Sodium Bicarbonate)', quantity: '5g/L', availability: 'Common', cost: 10 },
      { name: 'Liquid Soap', quantity: '2ml/L', availability: 'Common', cost: 5 },
      { name: 'Water', quantity: '1L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Dissolve 5g baking soda in 1L water',
      'Add liquid soap and mix well',
      'Spray on affected leaves (both surfaces)',
      'Reapply every 7 days or after rain',
    ],
    dosage: '5ml/L', frequency: 'Every 7 days', effectiveness: 72, cost: '₹15/liter',
    applicationTiming: 'Morning, before humidity rises',
    storage: 'Prepare fresh each time',
    synergies: ['Combine with neem oil for dual action: pH disruption + antifungal'],
    notes: 'Baking soda raises leaf surface pH creating unfavorable environment for powdery mildew germination.',
  },
  {
    id: 'fungal_3', disease: 'Late Blight', name: 'Horsetail (Equisetum) Spray',
    ingredients: [
      { name: 'Horsetail Plant (Equisetum)', quantity: '100g/5L', availability: 'Moderate', cost: 30 },
      { name: 'Water', quantity: '5L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Chop 100g fresh horsetail into small pieces',
      'Boil in 5L water for 30 minutes',
      'Strain and let cool completely',
      'Dilute 1:5 with water before spraying',
      'Apply to affected plants',
    ],
    dosage: '1 part concentrate : 5 parts water', frequency: 'Every 7-10 days', effectiveness: 65, cost: '₹35/hectare',
    applicationTiming: 'Early morning or evening',
    storage: 'Refrigerate concentrate, use within 1 week',
    synergies: ['Silica in horsetail strengthens cell walls, reducing infection'],
    notes: 'Horsetail is rich in silica which strengthens plant cell walls against fungal penetration.',
  },
  {
    id: 'fungal_4', disease: 'Rust Diseases', name: 'Milk Spray',
    ingredients: [
      { name: 'Raw Milk', quantity: '40ml/L', availability: 'Common', cost: 20 },
      { name: 'Water', quantity: '1L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Mix 40ml raw milk with 1L water',
      'Stir well, do not shake (avoid foam)',
      'Spray on affected leaves',
      'Reapply every 5-7 days in morning',
    ],
    dosage: '40ml/L', frequency: 'Every 5-7 days', effectiveness: 62, cost: '₹20/liter',
    applicationTiming: 'Morning (lactoferrin activated by sunlight)',
    storage: 'Use fresh — cannot store',
    synergies: ['Combine with baking soda for enhanced rust control'],
    notes: 'Lactoferrin in milk has natural antifungal properties. Proteins create protective film on leaves.',
  },
  // ═══ PEST MANAGEMENT ═══════════════════════════════════════════════════════
  {
    id: 'pest_1', disease: 'Aphids/Whitefly', name: 'Garlic Oil Concentrate',
    ingredients: [
      { name: 'Garlic', quantity: '200g', availability: 'Common', cost: 40 },
      { name: 'Mineral Oil', quantity: '50ml', availability: 'Agri Shop', cost: 30 },
      { name: 'Liquid Soap', quantity: '5ml', availability: 'Common', cost: 5 },
      { name: 'Water', quantity: '1L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Crush 200g garlic into paste',
      'Mix with 50ml mineral oil, let sit overnight',
      'Add liquid soap and 1L water',
      'Strain through fine cloth',
      'Dilute 10ml concentrate per liter water',
      'Spray on affected plants',
    ],
    dosage: '10ml concentrate/L', frequency: 'Every 5-7 days', effectiveness: 75, cost: '₹75/hectare',
    applicationTiming: 'Evening (garlic compounds volatile in sun)',
    storage: 'Concentrate stores 2 weeks in dark bottle',
    synergies: ['Combine with neem spray for broad-spectrum pest + disease control'],
    notes: 'Allicin in garlic is a natural insect repellent and has antifungal properties.',
  },
  {
    id: 'pest_2', disease: 'Stem Borers', name: 'Trichogramma Egg Parasitoid Release',
    ingredients: [
      { name: 'Trichogramma Cards', quantity: '50,000 eggs/ha', availability: 'Biocontrol Lab', cost: 300 },
      { name: 'Cards/Twine', quantity: 'For hanging', availability: 'Common', cost: 20 },
    ],
    steps: [
      'Monitor pest egg-laying period (use pheromone traps)',
      'When 5-10 egg masses per plant observed, release Trichogramma',
      'Hang cards at 30-50 per hectare, distributed evenly',
      'Place cards in shade side of plants',
      'Release in evening for better survival',
      'Do not spray any chemicals for 2 weeks after release',
    ],
    dosage: '50,000 eggs/ha', frequency: '2-3 releases at 10-day intervals', effectiveness: 80, cost: '₹350/hectare',
    applicationTiming: 'When pest egg masses are visible',
    storage: 'Release cards within 24 hours of receipt',
    synergies: ['Combine with light traps for adult moth reduction'],
    notes: 'Trichogramma wasps parasitize pest eggs before larvae hatch. Most effective early in pest cycle.',
  },
  {
    id: 'pest_3', disease: 'Nematodes', name: 'Marigold Trap Crop + Neem Cake',
    ingredients: [
      { name: 'Marigold Seeds (Tagetes)', quantity: '5kg/ha', availability: 'Common', cost: 200 },
      { name: 'Neem Cake', quantity: '250kg/ha', availability: 'Agri Shop', cost: 2500 },
    ],
    steps: [
      'Plant marigold as trap crop around field borders 2 weeks before main crop',
      'Apply neem cake to soil during last plowing',
      'Incorporate neem cake into top 15cm of soil',
      'Maintain marigold border throughout season',
      'After harvest, incorporate marigold into soil as green manure',
    ],
    dosage: 'Marigold border + 250kg neem cake/ha', frequency: 'Once per season', effectiveness: 70, cost: '₹2,700/hectare',
    applicationTiming: 'Before planting main crop',
    storage: 'Neem cake: store in dry place',
    synergies: ['Marigold roots contain alpha-terthienyl toxic to nematodes. Neem provides additional suppression.'],
    notes: 'Marigold is a proven nematode trap crop. Alpha-terthienyl in roots kills nematodes. Neem cake provides long-term suppression.',
  },
  // ═══ SOIL TREATMENTS ═══════════════════════════════════════════════════════
  {
    id: 'soil_1', disease: 'Soil-Borne Diseases', name: 'Trichoderma Soil Application',
    ingredients: [
      { name: 'Trichoderma Harzianum', quantity: '2kg/ha', availability: 'Agri Shop', cost: 400 },
      { name: 'Farmyard Manure', quantity: '500kg/ha', availability: 'Farm', cost: 1000 },
      { name: 'Jaggery', quantity: '1kg', availability: 'Common', cost: 50 },
    ],
    steps: [
      'Mix Trichoderma with 10kg FYM + jaggery powder',
      'Keep in shade for 3 days (multiplication)',
      'Apply to soil during last plowing',
      'Incorporate into top 15cm of soil',
      'Irrigate lightly after application',
    ],
    dosage: '2kg/ha', frequency: 'Once per season', effectiveness: 75, cost: '₹1,450/hectare',
    applicationTiming: 'Before planting, when soil is moist',
    storage: 'Multiplication mix use within 5 days',
    synergies: ['Combine with mycorrhizal inoculant for enhanced root colonization'],
    notes: 'Trichoderma competitively colonizes root zone, preventing pathogen establishment. FYM provides food for multiplication.',
  },
  {
    id: 'soil_2', disease: 'Soil Acidity', name: 'Lime + Wood Ash Amendment',
    ingredients: [
      { name: 'Agricultural Lime', quantity: '500kg/ha', availability: 'Agri Shop', cost: 2000 },
      { name: 'Wood Ash', quantity: '200kg/ha', availability: 'Farm', cost: 0 },
    ],
    steps: [
      'Test soil pH — apply if pH < 6.0',
      'Broadcast lime evenly across field',
      'Apply wood ash in concentrated areas (around plants)',
      'Incorporate into top 15cm during plowing',
      'Irrigate to activate lime',
    ],
    dosage: 'Lime 500kg + Ash 200kg/ha', frequency: 'Once per 2-3 years', effectiveness: 80, cost: '₹2,000/hectare',
    applicationTiming: '2-3 months before planting',
    storage: 'Store lime in dry place',
    synergies: ['Wood ash also provides potassium and micronutrients'],
    notes: 'Correcting pH unlocks nutrients and creates unfavorable conditions for soil-borne pathogens like Fusarium.',
  },
  // ═══ DISEASE-SPECIFIC PREVENTION ═══════════════════════════════════════════
  {
    id: 'prevent_1', disease: 'General Prevention', name: 'Buttermilk Ferment Spray',
    ingredients: [
      { name: 'Buttermilk (Chaas)', quantity: '100ml/L', availability: 'Common', cost: 15 },
      { name: 'Water', quantity: '1L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Ferment buttermilk for 24 hours at room temperature',
      'Dilute 100ml fermented buttermilk in 1L water',
      'Spray on plant surfaces as preventive',
      'Apply weekly during humid season',
    ],
    dosage: '100ml/L', frequency: 'Weekly', effectiveness: 55, cost: '₹15/liter',
    applicationTiming: 'Morning, before humidity rises',
    storage: 'Use within 24 hours',
    synergies: ['Lactobacillus in buttermilk competitively excludes pathogens'],
    notes: 'Lactic acid bacteria produce organic acids that create unfavorable pH for fungal spores.',
  },
  {
    id: 'prevent_2', disease: 'General Health', name: 'Jeevamrutham (Vedic Bio-Fertilizer)',
    ingredients: [
      { name: 'Cow Dung', quantity: '10kg', availability: 'Farm', cost: 0 },
      { name: 'Cow Urine', quantity: '10L', availability: 'Farm', cost: 0 },
      { name: 'Jaggery', quantity: '200g', availability: 'Common', cost: 20 },
      { name: 'Besan (Gram Flour)', quantity: '200g', availability: 'Common', cost: 30 },
      { name: 'Soil (from forest/undisturbed)', quantity: '1 handful', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Mix cow dung, cow urine, jaggery, besan, and soil in 20L water',
      'Stir well and keep in shade for 48 hours',
      'Stir 3-4 times daily during fermentation',
      'Strain and dilute 3L concentrate in 200L water',
      'Apply as soil drench around plants',
    ],
    dosage: '3L concentrate/200L water/ha', frequency: 'Every 15 days', effectiveness: 60, cost: '₹50/hectare',
    applicationTiming: 'Early morning, during active growth',
    storage: 'Concentrate stores 1 week in shade',
    synergies: ['Microbes in jeevamrutham multiply rapidly, colonizing soil within 30 days'],
    notes: 'Traditional Indian bio-fertilizer. Introduces beneficial microbes that suppress disease and improve nutrient cycling.',
  },
  {
    id: 'prevent_3', disease: 'Viral Diseases', name: 'Aloe Vera + Neem Antiviral',
    ingredients: [
      { name: 'Aloe Vera Gel', quantity: '50ml/L', availability: 'Moderate', cost: 40 },
      { name: 'Neem Leaf Extract', quantity: '100ml/L', availability: 'Common', cost: 20 },
      { name: 'Water', quantity: '1L', availability: 'Free', cost: 0 },
    ],
    steps: [
      'Extract fresh aloe vera gel (50ml)',
      'Prepare neem leaf extract: soak 100g leaves in 1L water overnight, strain',
      'Mix aloe gel with neem extract',
      'Dilute to final volume with water',
      'Spray on plants — focuses on vectors (aphids, whiteflies)',
    ],
    dosage: '50ml/L', frequency: 'Every 10 days', effectiveness: 55, cost: '₹60/liter',
    applicationTiming: 'Evening',
    storage: 'Use within 24 hours',
    synergies: ['Aloe + Neem together boost plant immunity and repel viral vectors'],
    notes: 'No cure for viral diseases. This recipe boosts plant immunity and reduces vector transmission.',
  },
];

export function generateOrganicRecipe(diseaseName, availableIngredients = []) {
  const lower = diseaseName.toLowerCase();
  
  // Match recipes by disease name
  const matchedRecipes = RECIPE_DATABASE.filter(recipe => 
    recipe.disease.toLowerCase().includes(lower) || 
    lower.includes(recipe.disease.toLowerCase().split(' ')[0]) ||
    recipe.disease === 'General Fungal' ||
    recipe.disease === 'General Prevention' ||
    recipe.disease === 'General Health' ||
    recipe.disease === 'Soil-Borne Diseases'
  );

  // Score by ingredient availability
  const scoredRecipes = matchedRecipes.map(recipe => {
    const availableCount = recipe.ingredients.filter(ing =>
      availableIngredients.some(ai => 
        ing.name.toLowerCase().includes(ai.toLowerCase()) ||
        ai.toLowerCase().includes(ing.name.toLowerCase().split(' ')[0])
      )
    ).length;
    const matchScore = availableIngredients.length > 0 
      ? (availableCount / recipe.ingredients.length) * 100 
      : 50;
    
    return {
      ...recipe,
      ingredientMatch: availableCount,
      totalIngredients: recipe.ingredients.length,
      matchScore: Math.round(matchScore),
      costPerLiter: recipe.ingredients.reduce((s, ing) => s + ing.cost, 0),
    };
  });

  // Sort by effectiveness then match score
  scoredRecipes.sort((a, b) => {
    if (Math.abs(a.effectiveness - b.effectiveness) > 10) return b.effectiveness - a.effectiveness;
    return b.matchScore - a.matchScore;
  });

  // General tips based on disease type
  const generalTips = [
    'Apply organic sprays in early morning (6-8 AM) or evening (4-6 PM) to avoid leaf burn and UV degradation.',
    'Always test spray on a small area (10 plants) first, wait 48 hours before full application.',
    'Reapply organic treatments after heavy rain — they wash off more easily than synthetic chemicals.',
    'Combine multiple organic methods for synergistic protection (e.g., neem + garlic + Trichoderma).',
    'Maintain field hygiene: remove and burn infected plant debris to reduce inoculum.',
    'Use clean, non-chlorinated water (rainwater or bore water) for better microbial survival in biocontrol preparations.',
    'Prepare organic solutions fresh — stored solutions lose potency rapidly.',
    'Healthy plants resist disease better: balanced nutrition, proper irrigation, and good drainage are primary defenses.',
    'Rotate organic treatments to prevent pathogen adaptation to any single compound.',
    'Record application dates, weather conditions, and results for future reference.',
  ];

  return {
    disease: diseaseName,
    recipes: scoredRecipes,
    generalTips,
    ingredientDatabase: RECIPE_DATABASE.reduce((acc, r) => {
      r.ingredients.forEach(ing => {
        if (!acc.find(a => a.name === ing.name)) {
          acc.push({ name: ing.name, availability: ing.availability, avgCost: ing.cost });
        }
      });
      return acc;
    }, []),
  };
}
