/**
 * AI Organic Recipe Generator
 * Generates organic treatment recipes from common farm ingredients.
 */

const ORGANIC_INGREDIENTS = {
  neem: { name: 'Neem Oil / Neem Leaves', availability: 'Common', cost: 'Low', preparation: 'Crush leaves or dilute oil' },
  cowUrine: { name: 'Cow Urine (Gomutra)', availability: 'Very Common', cost: 'Free', preparation: 'Ferment 7 days' },
  cowDung: { name: 'Cow Dung', availability: 'Very Common', cost: 'Free', preparation: 'Compost or mix with water' },
  garlic: { name: 'Garlic', availability: 'Common', cost: 'Low', preparation: 'Crush and soak' },
  chili: { name: 'Green/Red Chili', availability: 'Common', cost: 'Low', preparation: 'Grind and extract' },
  turmeric: { name: 'Turmeric Powder', availability: 'Common', cost: 'Low', preparation: 'Mix with water' },
  baking_soda: { name: 'Baking Soda', availability: 'Common', cost: 'Low', preparation: 'Dissolve in water' },
  vinegar: { name: 'Vinegar (Acetic Acid)', availability: 'Common', cost: 'Low', preparation: 'Dilute' },
  tobacco: { name: 'Tobacco Powder', availability: 'Moderate', cost: 'Low', preparation: 'Soak and filter' },
  lemon: { name: 'Lemon Juice', availability: 'Common', cost: 'Low', preparation: 'Fresh squeeze' },
  aloeVera: { name: 'Aloe Vera', availability: 'Moderate', cost: 'Low', preparation: 'Extract gel' },
  banana: { name: 'Banana Peel', availability: 'Very Common', cost: 'Free', preparation: 'Compost or blend' },
  eggshell: { name: 'Eggshell Powder', availability: 'Common', cost: 'Free', preparation: 'Dry and grind' },
  woodAsh: { name: 'Wood Ash', availability: 'Common', cost: 'Free', preparation: 'Sieve and mix' },
  buttermilk: { name: 'Buttermilk (Chaas)', availability: 'Common', cost: 'Low', preparation: 'Ferment 24 hours' },
  trichoderma: { name: 'Trichoderma Viride', availability: 'Agri shop', cost: 'Moderate', preparation: 'Multiply in jaggery water' },
  pseudomonas: { name: 'Pseudomonas fluorescens', availability: 'Agri shop', cost: 'Moderate', preparation: 'Mix with talc carrier' },
  beauveria: { name: 'Beauveria Bassiana', availability: 'Agri shop', cost: 'Moderate', preparation: 'Spray conidia suspension' },
  neemCake: { name: 'Neem Cake', availability: 'Agri shop', cost: 'Low', preparation: 'Mix in soil' },
  vermicompost: { name: 'Vermicompost', availability: 'Moderate', cost: 'Low', preparation: 'Apply directly' },
};

const RECIPE_DB = {
  rice_blast: [
    {
      name: 'Garlic-Chili Neem Spray',
      targetDisease: 'Rice Blast',
      ingredients: [
        { name: 'Neem Oil', quantity: '5 ml', preparation: 'Cold-pressed' },
        { name: 'Garlic', quantity: '100g', preparation: 'Crush to paste' },
        { name: 'Green Chili', quantity: '50g', preparation: 'Grind to paste' },
        { name: 'Water', quantity: '10 liters', preparation: 'Clean water' },
      ],
      steps: [
        'Crush garlic and chili into fine paste',
        'Mix neem oil with 1 liter warm water',
        'Add garlic-chili paste and stir well',
        'Add remaining water and mix thoroughly',
        'Strain through muslin cloth',
        'Spray on affected plants in evening',
      ],
      dosage: '5ml/L of water',
      frequency: 'Every 7 days',
      effectiveness: 75,
      cost: '₹50 per hectare',
      notes: 'Apply in evening to avoid leaf burn. Reapply after rain.',
    },
    {
      name: 'Cow Urine - Turmeric Fungicide',
      targetDisease: 'Rice Blast',
      ingredients: [
        { name: 'Cow Urine', quantity: '500 ml', preparation: 'Fermented 7 days' },
        { name: 'Turmeric Powder', quantity: '50g', preparation: 'Pure powder' },
        { name: 'Water', quantity: '10 liters', preparation: 'Clean water' },
      ],
      steps: [
        'Mix turmeric powder with cow urine',
        'Add to 10 liters of water',
        'Stir well and let sit for 2 hours',
        'Strain and spray on plants',
      ],
      dosage: '10ml/L of water',
      frequency: 'Every 10 days',
      effectiveness: 65,
      cost: '₹20 per hectare',
      notes: 'Very economical. Best for preventive application.',
    },
  ],
  bacterial_leaf_blight: [
    {
      name: 'Pseudomonas Biocontrol Spray',
      targetDisease: 'Bacterial Leaf Blight',
      ingredients: [
        { name: 'Pseudomonas fluorescens', quantity: '10g', preparation: 'Talc-based formulation' },
        { name: 'Jaggery', quantity: '10g', preparation: 'Dissolved in water' },
        { name: 'Water', quantity: '10 liters', preparation: 'Non-chlorinated' },
      ],
      steps: [
        'Dissolve jaggery in warm water',
        'Add Pseudomonas and stir well',
        'Let it multiply for 6 hours in shade',
        'Spray on leaf surfaces',
      ],
      dosage: '5g/L of water',
      frequency: 'Every 15 days',
      effectiveness: 70,
      cost: '₹80 per hectare',
      notes: 'Apply early morning or evening. Avoid mixing with chemicals.',
    },
  ],
  brown_spot: [
    {
      name: 'Bordeaux Mixture Spray',
      targetDisease: 'Brown Spot',
      ingredients: [
        { name: 'Copper Sulfate (Blue Vitriol)', quantity: '100g', preparation: 'Dissolve in water' },
        { name: 'Quick Lime', quantity: '100g', preparation: 'Slake with water' },
        { name: 'Water', quantity: '10 liters', preparation: 'Clean water' },
      ],
      steps: [
        'Dissolve copper sulfate in 5 liters warm water (dissolve overnight)',
        'Slake lime in 5 liters water separately',
        'Slowly add copper solution to lime solution (never reverse)',
        'Stir well and check pH (should be alkaline)',
        'Strain and spray immediately',
      ],
      dosage: '10ml/L of water',
      frequency: 'Every 10-14 days',
      effectiveness: 80,
      cost: '₹40 per hectare',
      notes: 'Prepare fresh each time. Test with iron nail — if blue deposit forms, add more lime.',
    },
  ],
  generic: [
    {
      name: 'Multi-Purpose Neem Spray',
      targetDisease: 'General Fungal & Bacterial',
      ingredients: [
        { name: 'Neem Oil', quantity: '5 ml', preparation: 'Cold-pressed' },
        { name: 'Liquid Soap', quantity: '2 ml', preparation: 'Mild soap as emulsifier' },
        { name: 'Water', quantity: '1 liter', preparation: 'Clean water' },
      ],
      steps: [
        'Mix neem oil with liquid soap',
        'Add water gradually while stirring',
        'Shake well before spraying',
        'Apply to both sides of leaves',
      ],
      dosage: '5ml/L of water',
      frequency: 'Every 7-10 days',
      effectiveness: 65,
      cost: '₹30 per hectare',
      notes: 'Works as preventive against most fungal diseases.',
    },
  ],
};

function getRecipesForDisease(diseaseName) {
  const lower = diseaseName.toLowerCase();
  for (const [key, recipes] of Object.entries(RECIPE_DB)) {
    if (key === 'generic') continue;
    if (lower.includes(key.replace(/_/g, ' '))) return recipes;
  }
  return RECIPE_DB.generic;
}

export function generateOrganicRecipe(diseaseName, availableIngredients = []) {
  const recipes = getRecipesForDisease(diseaseName);
  
  const matchedRecipes = recipes.map(recipe => {
    const matchCount = recipe.ingredients.filter(ing => 
      availableIngredients.some(ai => 
        ing.name.toLowerCase().includes(ai.toLowerCase()) || 
        ai.toLowerCase().includes(ing.name.toLowerCase().split(' ')[0])
      )
    ).length;
    return { ...recipe, ingredientMatch: matchCount, totalIngredients: recipe.ingredients.length };
  });

  matchedRecipes.sort((a, b) => b.ingredientMatch - a.ingredientMatch);

  return {
    disease: diseaseName,
    recipes: matchedRecipes,
    generalTips: [
      'Always apply organic sprays in early morning or evening to avoid leaf burn.',
      'Test spray on a small area first before full application.',
      'Reapply after heavy rain — organic sprays wash off easily.',
      'Combine multiple organic methods for best results.',
      'Maintain field hygiene — remove infected plant debris.',
      'Use clean, non-chlorinated water for better microbial survival.',
      'Store prepared solutions in shade; use within 24 hours.',
    ],
    availableIngredients: Object.entries(ORGANIC_INGREDIENTS).map(([key, val]) => ({
      id: key,
      ...val,
      available: availableIngredients.some(ai => 
        val.name.toLowerCase().includes(ai.toLowerCase())
      )
    }))
  };
}
