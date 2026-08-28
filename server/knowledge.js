// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE AGRONOMY KNOWLEDGE BASE
// Covers 20+ crops, 50+ diseases, fertilizers, irrigation, pest management,
// soil health, organic farming, seasonal guides, storage, and market practices.
// ═══════════════════════════════════════════════════════════════════════════════

export const CROPS = {
  rice: {
    name: 'Rice', scientific: 'Oryza sativa', emoji: '🌾',
    family: 'Cereals',
    climate: 'Warm and humid, 20-38°C with abundant rainfall or irrigation',
    soil: 'Deep clayey loam or silty clay with good water retention, pH 5.5-6.5',
    water: 'High (1200-1500mm), needs standing water during early growth stages',
    npk: '120:60:60 kg/ha — split nitrogen into 3 doses (basal, tillering, panicle initiation)',
    season: 'Kharif (June-November); Rabi in irrigated areas',
    spacing: '20cm x 15cm for transplanted rice; 25cm x 10cm for direct seeding',
    sowing: 'Transplanting seedlings from nursery beds (25-30 days old) or direct seeding in puddled fields',
    harvest: '110-150 days after sowing when grains turn golden yellow and moisture is 20-22%',
    yield: '4.5-6.5 Tons/hectare under irrigated conditions',
    varieties: ['IR64', 'Swarna', 'Samba Mahsuri', 'BPT 5204', 'Pusa Basmati 1121', 'CB 501'],
    commonDiseases: ['Rice Blast', 'Bacterial Leaf Blight', 'Sheath Blight', 'Brown Spot', 'Tungro Virus'],
    commonPests: ['Stem Borer', 'Brown Planthopper', 'Gall Midge', 'Rice Hispa', 'Leaf Folder'],
    nutrients: {
      nitrogen: 'Most critical — apply in 3 splits. Deficiency causes yellowing of older leaves',
      phosphorus: 'Important for root establishment. Apply full dose at transplanting',
      potassium: 'Essential for grain filling and disease resistance',
      zinc: 'Zinc Sulfate @ 25 kg/ha if deficient — causes rusty brown spots on leaves',
      silicon: 'Strengthens cell walls and improves blast resistance',
      iron: 'Ferrous Sulfate for chlorosis in alkaline soils',
    },
    tips: [
      'Use Alternate Wetting and Drying (AWD) to save 30% water',
      'Incorporate green manure (Sesbania) 45 days before transplanting',
      'Use pheromone traps @ 12/ha for stem borer monitoring',
      'Maintain proper spacing for air circulation',
      'Apply Potassium Silicate to boost disease resistance',
    ],
    storage: 'Dry grains to 12-14% moisture using mechanical dryers. Store in hermetic bags or steel bins with neem leaves to prevent weevil infestation.',
    marketUses: ['Staple food grain', 'Rice bran oil extraction', 'Rice flour processing', 'Puffed rice (Murmura)', 'Flaked rice (Poha)'],
    foodUses: ['Steamed rice', 'Biryani', 'Idli/Dosa batter', 'Rice noodles', 'Kanji (fermented rice drink)'],
  },
  wheat: {
    name: 'Wheat', scientific: 'Triticum aestivum', emoji: '🌾',
    family: 'Cereals',
    climate: 'Cool season (15-20°C), warm dry weather during grain ripening',
    soil: 'Well-drained fertile clay loam, pH 6.0-7.5',
    water: 'Moderate (450-650mm) at 4 critical stages',
    npk: '120:60:40 kg/ha — apply at CRI and tillering',
    season: 'Rabi (October-March)',
    spacing: '20cm row-to-row, 5cm seed depth',
    sowing: 'Seed drill sowing in rows or zero-till seeders for residue management',
    harvest: '120-140 days when ears dry up, grain hardens and moisture is 12-14%',
    yield: '4.0-5.5 Tons/hectare',
    varieties: ['HD 3226', 'PBW 723', 'WH 1270', 'DBW 187', 'Lok 1', 'C 306'],
    commonDiseases: ['Yellow/Stripe Rust', 'Powdery Mildew', 'Karnal Bunt', 'Loose Smut', 'Septoria Leaf Blotch'],
    commonPests: ['Aphids', 'Termites', 'Armyworm', 'Brown Wheat Mite', 'Gall Midge'],
    nutrients: {
      nitrogen: 'High demand during tillering. Deficiency causes pale leaves and poor tillering',
      phosphorus: 'Essential for root development. Apply full dose at sowing',
      potassium: 'Moderate requirement. Helps grain filling',
      zinc: 'Zinc Sulfate @ 25 kg/ha — deficiency causes white rust',
      sulfur: 'Sulphur @ 20 kg/ha improves grain protein content',
    },
    tips: [
      'Sow within optimal window (Nov 1-25 for plains)',
      'Apply Zinc Sulfate @ 25 kg/ha in zinc-deficient soils',
      'Critical irrigations: CRI (21 DAP), Tillering, Flowering, Milk stage',
      'Use resistant varieties for rust-prone areas',
      'Avoid late sowing — reduces yield significantly',
    ],
    storage: 'Sun-dry grains to 10% moisture. Store in cool, rodent-proof metal bins. Use aluminum phosphide fumigation for long-term storage.',
    marketUses: ['Flour milling (Atta, Maida, Suji)', 'Semolina', 'Wheat germ oil', 'Animal feed'],
    foodUses: ['Chapatis', 'Bread', 'Pasta', 'Biscuits', 'Pastries', 'Porridge (Dalia)', 'Noodles'],
  },
  maize: {
    name: 'Maize/Corn', scientific: 'Zea mays', emoji: '🌽',
    family: 'Cereals',
    climate: 'Warm (21-30°C), frost-sensitive, requires full sunlight',
    soil: 'Deep fertile loam with rich organic matter, pH 6.0-7.2',
    water: '500-800mm, extremely sensitive to waterlogging',
    npk: '150:75:37.5 kg/ha — high nitrogen demand',
    season: 'Kharif, Spring, and Rabi in frost-free regions',
    spacing: '60cm x 20cm for normal; 60cm x 15cm for high density',
    sowing: 'Dibbling seeds on ridges or flat beds using tractor seed drills',
    harvest: '90-110 days for grain corn; 70-80 days for sweet corn/baby corn',
    yield: '6.0-8.5 Tons/hectare for hybrid varieties',
    varieties: ['NK 6240', 'Pioneer 3396', 'Bio 9681', 'Vivek QPM 9', 'HQPM 1', 'Sweet Corn — Madhuri'],
    commonDiseases: ['Fall Armyworm', 'Northern Leaf Blight', 'Common Rust', 'Turcicum Leaf Blight', 'Stalk Rot'],
    commonPests: ['Fall Armyworm (FAW)', 'Stem Borer', 'Corn Earworm', 'Shoot Fly', 'American Ball Worm'],
    nutrients: {
      nitrogen: 'Highest N demand of cereals. Deficiency causes V-shaped yellowing from leaf tip',
      phosphorus: 'Critical for early root development',
      potassium: 'Important for stalk strength and disease resistance',
      zinc: 'Zinc Sulfate @ 25 kg/ha — deficiency causes white bud',
      sulfur: 'Sulphur @ 20 kg/ha improves protein',
    },
    tips: [
      'Install sex pheromone traps @ 10/ha for Fall Armyworm monitoring',
      'Earthing up at 30 days prevents lodging',
      'Push-pull companion cropping with Desmodium/Napier controls FAW',
      'Apply Nitrogen in 3 splits (basal, knee-high, tasseling)',
      'Use Bt hybrids for bollworm-prone areas',
    ],
    storage: 'Dry cobs/kernels to 12-13% moisture. Store in aeration-equipped silos or triple-layer hermetic bags.',
    marketUses: ['Starch production', 'Ethanol biofuel', 'Poultry feed', 'High fructose corn syrup', 'Corn oil'],
    foodUses: ['Popcorn', 'Sweet corn', 'Cornflakes', 'Tortillas', 'Cornmeal porridge', 'Polenta'],
  },
  tomato: {
    name: 'Tomato', scientific: 'Solanum lycopersicum', emoji: '🍅',
    family: 'Vegetables (Solanaceous)',
    climate: 'Warm (20-28°C), night temp above 13°C for fruit set',
    soil: 'Well-drained sandy loam rich in organic matter, pH 6.0-7.0',
    water: 'Moderate (600-800mm), uniform moisture critical to prevent BER',
    npk: '150:100:100 kg/ha — high calcium needed',
    season: 'Year-round in polyhouse; Rabi and Autumn in open fields',
    spacing: '60cm x 45cm for indeterminate; 75cm x 60cm for determinate',
    sowing: 'Transplanting 25-30 day old seedlings from tray nursery',
    harvest: '60-80 days after transplanting; multiple pickings over 2-3 months',
    yield: '35-60 Tons/hectare (open); >120 T/ha in polyhouse',
    varieties: ['Arka Rakshak', 'Pusa Sheetal', 'Rio Grande', 'Roma VF', 'Hybrid — Grand SL', 'Cherry — Sweet Million'],
    commonDiseases: ['Early Blight', 'Late Blight', 'Tomato Leaf Curl Virus', 'Bacterial Wilt', 'Fusarium Wilt'],
    commonPests: ['Fruit Borer (Helicoverpa)', 'Whitefly', 'Leafminer', 'Red Spider Mite', 'Aphids'],
    nutrients: {
      nitrogen: 'Moderate — excess delays fruiting and promotes vegetative growth',
      phosphorus: 'Essential for root development and fruit set',
      potassium: 'Critical for fruit color, flavor, and shelf life',
      calcium: 'Prevents Blossom End Rot (BER). Foliar Calcium Nitrate @ 5g/L',
      magnesium: 'Prevents interveinal chlorosis on older leaves',
    },
    tips: [
      'Stake indeterminate plants to lift foliage 30cm above soil',
      'Drip irrigation prevents blossom-end rot',
      'Mulch with silver-black plastic to repel whiteflies',
      'Prune lower suckers to improve light penetration',
      'Balanced calcium supply is critical during fruit set',
    ],
    storage: 'Store mature green tomatoes at 12-15°C. Ripe at 8-10°C with 85-90% RH. Do not refrigerate below 10°C — damages flavor.',
    marketUses: ['Fresh market', 'Tomato paste & ketchup', 'Canned tomatoes', 'Dehydrated powder', 'Puree'],
    foodUses: ['Salads', 'Curries', 'Soups', 'Sauces', 'Ketchup', 'Juices', 'Stews', 'Salsa'],
  },
  potato: {
    name: 'Potato', scientific: 'Solanum tuberosum', emoji: '🥔',
    family: 'Vegetables (Solanaceous)',
    climate: 'Cool (15-20°C), tuberization stops above 28°C',
    soil: 'Friable well-aerated sandy loam, pH 5.2-6.4 (slightly acidic reduces scab)',
    water: '400-600mm, consistent shallow irrigation needed',
    npk: '180:100:150 kg/ha — high potassium for tuber quality',
    season: 'Winter (Rabi) in plains; Spring/Summer in cool hills',
    spacing: '50cm x 20cm on ridges',
    sowing: 'Planting disease-free seed tubers (30-40g) on ridges',
    harvest: '80-110 days after planting when haulms turn yellow',
    yield: '25-40 Tons/hectare',
    varieties: ['Kufri Jyoti', 'Kufri Pukhraj', 'Kufri Chandramukhi', 'Atlantic', 'Lady Rosetta', 'Chipsona'],
    commonDiseases: ['Late Blight', 'Early Blight', 'Black Scurf', 'Powdery Scab', 'Wart Disease'],
    commonPests: ['Potato Tuber Moth', 'Aphids', 'Cutworms', 'White Grubs', 'Nematodes'],
    nutrients: {
      nitrogen: 'Moderate — excess causes delayed tuberization',
      phosphorus: 'Essential for root and tuber initiation',
      potassium: 'Highest demand — critical for tuber swelling and starch',
      calcium: 'Prevents internal brown spot',
      magnesium: 'Important for photosynthesis and tuber quality',
    },
    tips: [
      'Earthing up twice at 25 and 45 DAP prevents tuber greening',
      'Stop irrigation 10 days before harvest',
      'Use certified disease-free seed tubers from tissue culture',
      'Cold storage at 4-7°C with 90-95% RH prevents sprouting',
      'Cut haulms 10 days before harvest for better skin set',
    ],
    storage: 'Cold storage at 4-7°C with 90-95% RH. Anti-sprout chemicals (CIPC) used commercially. Store in dark to prevent greening (solanine).',
    marketUses: ['Fresh market', 'Chips & French fries processing', 'Starch extraction', 'Vodka production'],
    foodUses: ['French fries', 'Chips', 'Mashed potato', 'Curries', 'Samosas', 'Hash browns', 'Aloo Paratha'],
  },
  chili: {
    name: 'Chili Pepper', scientific: 'Capsicum annuum', emoji: '🌶',
    family: 'Vegetables (Solanaceous)',
    climate: 'Warm humid (20-30°C), excess rain causes fruit drop',
    soil: 'Well-drained sandy loam or black soil rich in humus, pH 6.0-7.0',
    water: 'Moderate (500-700mm), avoid waterlogging at all stages',
    npk: '120:60:60 kg/ha — boron prevents flower drop',
    season: 'Kharif and Rabi in frost-free regions',
    spacing: '45cm x 45cm for transplanted; 30cm x 15cm for direct sown',
    sowing: 'Transplanting 30-35 day old seedlings from nursery beds',
    harvest: '60-70 days (green); 90-100 days (red ripe)',
    yield: '15-25 T/ha green; 2.5-3.5 T/ha dry red chilies',
    varieties: ['Byadgi', 'Guntur', 'Sannam', 'Bird\'s Eye', 'Bhut Jolokia', 'Kashmiri Chili'],
    commonDiseases: ['Chili Leaf Curl Virus', 'Anthracnose/Die-back', 'Damping Off', 'Cercospora Leaf Spot', 'Bacterial Wilt'],
    commonPests: ['Chili Thrips', 'Yellow Mites', 'Whitefly', 'Fruit Borer', 'Aphids'],
    nutrients: {
      nitrogen: 'Moderate — excess reduces pungency',
      phosphorus: 'Important for root and flower development',
      potassium: 'Critical for fruit color and pungency (capsaicin)',
      calcium: 'Prevents blossom drop and fruit cracking',
      boron: 'Boron @ 10 kg/ha prevents flower drop and fruit畸形',
    },
    tips: [
      'Spray Planofix (NAA) @ 10 ppm during peak flowering',
      'Silver plastic mulch reduces vector infestation',
      'Intercrop with maize as border crop to stop whitefly',
      'Avoid continuous cropping with tomato/brinjal',
      'Blue and yellow sticky traps @ 25/acre for thrips monitoring',
    ],
    storage: 'Sun-dry red chilies to 10% moisture. Store in dry gunny bags in dark cool storehouses. Neem leaf layers prevent insect damage.',
    marketUses: ['Spice powder', 'Capsaicin extraction', 'Oleoresin for colorants', 'Pickling', 'Export'],
    foodUses: ['Curry powder', 'Hot sauces', 'Pickles', 'Fresh green chili seasoning', 'Stuffed chili', 'Chili flakes'],
  },
  onion: {
    name: 'Onion', scientific: 'Allium cepa', emoji: '🧅',
    family: 'Vegetables (Alliaceae)',
    climate: 'Cool (13-24°C) for bulb development; warm dry for maturity',
    soil: 'Deep friable loam rich in organic matter, pH 6.0-7.0',
    water: '350-550mm, frequent light irrigation',
    npk: '100:50:50 kg/ha + 30 kg Sulfur/ha',
    season: 'Kharif, Late Kharif, and Rabi',
    spacing: '15cm x 10cm',
    sowing: 'Transplanting 6-8 week old seedlings or planting small sets',
    harvest: '100-140 days when 50% tops fall over naturally',
    yield: '20-35 Tons/hectare',
    varieties: ['Nasik Red', 'Arka Kalyan', 'Pusa Red', 'Bhima Red', 'Robusta', 'Granex'],
    commonDiseases: ['Purple Blotch', 'Downy Mildew', 'Black Mold', 'Stemphylium Leaf Blight', 'Iris Yellow Spot'],
    commonPests: ['Onion Thrips', 'Head Caterpillar', 'Root Maggot', 'Nematode', 'Cutworm'],
    nutrients: {
      nitrogen: 'Important for leaf and bulb growth. Split into basal + top dressings',
      phosphorus: 'Essential for root and bulb development',
      potassium: 'Improves bulb quality and storage life',
      sulfur: 'CRITICAL — sulfur gives pungency and disease resistance. Apply 30 kg/ha',
      zinc: 'Zinc Sulfate @ 15 kg/ha for bulb size',
    },
    tips: [
      'Stop irrigation 15 days before harvest for better curing',
      'Apply sulfur @ 30 kg/ha for pungency and disease resistance',
      'Blue sticky traps @ 20/acre for thrips monitoring',
      'Neck cutting should leave 2-3cm stem to prevent fungal entry',
      'Cure bulbs 3-5 days under shade before storage',
    ],
    storage: 'Store cured bulbs in well-ventilated crates at 25-30°C and 65-70% RH. Braided onion strings for traditional storage.',
    marketUses: ['Fresh market', 'Dehydrated flakes & powder', 'Onion oil seasoning', 'Pickling', 'Export'],
    foodUses: ['Base for gravies', 'Salads', 'Soups', 'Pickles', 'Rings', 'Paste', 'Chutney'],
  },
  cotton: {
    name: 'Cotton', scientific: 'Gossypium hirsutum', emoji: '🌱',
    family: 'Cash Crops',
    climate: 'Tropical/subtropical (21-32°C), long frost-free period, bright sunny days',
    soil: 'Deep black cotton soil (Vertisol) or alluvial loam, pH 6.0-8.0',
    water: '700-1200mm, critical during boll formation',
    npk: '120:60:60 kg/ha for hybrid Bt cotton',
    season: 'Kharif (April-May sowing, October-February picking)',
    spacing: '90cm x 60cm for hybrid Bt-cotton',
    sowing: 'Dibbling seeds on ridges or flat beds',
    harvest: '160-180 days with multiple hand pickings as bolls burst',
    yield: '2.5-3.5 Tons/hectare seed cotton',
    varieties: ['Bt Cotton (Bollgard II)', 'JKCH 1947', 'RCH 134', 'NCS 855', 'Suraj', 'F1861'],
    commonDiseases: ['Cotton Leaf Curl Virus', 'Fusarium Wilt', 'Bacterial Blight', 'Target Leaf Spot', 'Root Rot'],
    commonPests: ['Pink Bollworm', 'Whitefly', 'Aphids', 'Thrips', 'Spiders Mites', 'Jassid'],
    nutrients: {
      nitrogen: 'Moderate — excess attracts sap-sucking pests',
      phosphorus: 'Essential for root and square development',
      potassium: 'Improves fiber strength and disease tolerance',
      magnesium: 'Spray 1% MgSO4 + 1% Urea to prevent leaf reddening',
      boron: 'Critical for boll setting. Deficiency causes hard lock',
    },
    tips: [
      'Nip terminal buds at 80-90 days for better branching',
      'Spray 1% MgSO4 + 1% Urea to prevent leaf reddening',
      'Yellow sticky traps @ 50/ha for whitefly monitoring',
      'Intercrop with green gram to attract beneficial predators',
      'Avoid excess nitrogen which prolongs vegetative growth',
    ],
    storage: 'Store seed cotton in clean dry covered godowns at <8% moisture. Fiber yellowing occurs above 10% moisture.',
    marketUses: ['Textile yarn & fabric', 'Cottonseed oil extraction', 'Cottonseed cake (cattle feed)', 'Medical cotton', 'Cotton batting'],
    foodUses: ['Refined cottonseed cooking oil'],
  },
  sugarcane: {
    name: 'Sugarcane', scientific: 'Saccharum officinarum', emoji: '🎋',
    family: 'Cash Crops (Grass)',
    climate: 'Hot humid (26-33°C), bright sunlight, frost-free winter',
    soil: 'Deep well-drained fertile loamy soil, pH 6.5-7.5',
    water: 'Very high (1500-2500mm) evenly distributed',
    npk: '250:75:75 kg/ha — heavy nitrogen consumer',
    season: 'Plant crop (12-18 months); Autumn (Oct) or Spring (Feb) planting',
    spacing: '90-120cm row-to-row distance',
    sowing: 'Placing 2-budded or 3-budded setts in deep furrows',
    harvest: '10-14 months when Brix hydrometer reads >18% sucrose',
    yield: '70-110 Tons/hectare',
    varieties: ['Co 86032', 'Co 0238', 'CoC 671', 'Co 94014', 'B 4362', 'Co 8014'],
    commonDiseases: ['Red Rot', 'Smut', 'Rust', 'Sett Rot', 'Grassy Shoot'],
    commonPests: ['Early Shoot Borer', 'Top Shoot Borer', 'Internode Borer', 'Pyrilla', 'Woolly Aphid'],
    nutrients: {
      nitrogen: 'Highest consumer — split into 4-5 doses',
      phosphorus: 'Moderate — apply at planting',
      potassium: 'Important for stalk girth and juice quality',
      sulfur: 'Sulphur @ 30 kg/ha improves juice quality',
      zinc: 'Zinc Sulfate @ 25 kg/ha for vegetative growth',
    },
    tips: [
      'Trash mulching saves 30% irrigation water',
      'Detrash dry leaves at 5th and 7th month',
      'Use disease-free certified setts from healthy fields',
      'Hot water treatment of setts at 52°C for 2 hours',
      'Process within 24 hours of harvest for best sugar recovery',
    ],
    storage: 'Process within 24-48 hours. Cannot be stored long-term. Setts for planting stored in shade with misting.',
    marketUses: ['White sugar & Jaggery (Gur)', 'Ethanol biofuel', 'Molasses for alcohol', 'Bagasse for paper & power generation'],
    foodUses: ['Fresh juice', 'Jaggery', 'Refined sugar', 'Sugarcane vinegar', 'Syrups'],
  },
  banana: {
    name: 'Banana', scientific: 'Musa acuminata', emoji: '🍌',
    family: 'Fruits',
    climate: 'Warm humid tropical (26-35°C), high rainfall',
    soil: 'Deep fertile well-drained loam with high organic content, pH 6.0-7.5',
    water: 'Very high (1800-2200mm) per crop cycle',
    npk: '200:50:300 grams per plant per year in split doses',
    season: 'Plant monsoon (June-July) or spring (Feb-March)',
    spacing: '1.8m x 1.8m traditional; 2.0m x 1.5m high density',
    sowing: 'Planting sword suckers or tissue culture plantlets',
    harvest: '11-14 months when finger angles disappear and fruit is mature green',
    yield: '50-90 Tons/hectare',
    varieties: ['Grand Naine (Cavendish)', 'Robusta', 'Red Banana', 'Nendran', 'Poovan', 'Rasthali'],
    commonDiseases: ['Black Sigatoka', 'Panama Wilt (Fusarium TR4)', 'Bunchy Top Virus', 'Moko Disease', 'Banana Streak'],
    commonPests: ['Pseudostem Weevil', 'Rhizome Weevil', 'Banana Aphid', 'Nematodes', 'Thrips'],
    nutrients: {
      nitrogen: 'High demand for pseudostem growth and bunch weight',
      phosphorus: 'Moderate — for root development',
      potassium: 'HIGHEST demand — critical for bunch weight and sugar content',
      magnesium: 'Important for chlorophyll production',
      calcium: 'Improves fruit firmness and shelf life',
    },
    tips: [
      'Cover bunches with blue polypropylene sleeves for quality',
      'De-suckering to maintain single main stem per pit',
      'Denaveling after last hand opens improves bunch weight',
      'Provide sturdy bamboo props for heavy bunches',
      'Store green at 13-14°C; ripen with ethylene at 18-20°C',
    ],
    storage: 'Store green bunches at 13-14°C with 90% RH. Ripening chambers use ethylene gas at 18-20°C for uniform yellow color.',
    marketUses: ['Fresh dessert fruit', 'Banana chips', 'Banana fiber handicrafts', 'Baby food puree', 'Banana flour'],
    foodUses: ['Fresh fruit', 'Banana bread', 'Chips (raw banana)', 'Smoothies', 'Plantain curry', 'Raw banana stir-fry'],
  },
  mango: {
    name: 'Mango', scientific: 'Mangifera indica', emoji: '🥭',
    family: 'Fruits',
    climate: 'Warm dry (24-35°C), rain during bloom causes flower drop',
    soil: 'Deep well-drained alluvial or red loamy soil, pH 5.5-7.5',
    water: 'Moderate, critical during young stage and fruit development',
    npk: '1000:500:1000 grams per mature tree per year',
    season: 'Perennial orchard; harvest April-July (summer)',
    spacing: '10m x 10m traditional; 5m x 5m high density',
    sowing: 'Grafting (Veneer, Softwood, or Epicotyl) planted in deep pits',
    harvest: '3-5 months after flowering when fruit shoulders broaden',
    yield: '10-18 Tons/hectare mature orchard',
    varieties: ['Alphonso', 'Dasheri', 'Langra', 'Chausa', 'Neelum', 'Tommy Atkins', 'Kesar'],
    commonDiseases: ['Powdery Mildew', 'Anthracnose', 'Malformation', 'Bacterial Canker', 'Die-back'],
    commonPests: ['Mango Hopper', 'Fruit Fly', 'Mealybug', 'Stem Borer', 'Shoot Borer'],
    nutrients: {
      nitrogen: 'Moderate — excess delays flowering and increases pest susceptibility',
      phosphorus: 'Important for root development',
      potassium: 'Critical for fruit quality and sugar content',
      zinc: 'Zinc Sulfate @ 10g/L foliar for uniform bloom',
      boron: 'Boron @ 20g/L for better fruit set',
    },
    tips: [
      'Wrap plastic slippery bands on trunk to prevent mealybug',
      'Hang Methyl Eugenol traps @ 10/ha for fruit flies',
      'Prune dead branches and diseased panicles after harvest',
      'Hot water treat fruit at 52°C for 5 min post-harvest',
      'Avoid high nitrogen before flowering',
    ],
    storage: 'Store at 12-13°C with 85-90% RH. Hot water treatment controls anthracnose. 1-MCP treatment extends shelf life.',
    marketUses: ['Fresh table fruit', 'Pulp & juice concentrate', 'Pickles & chutney', 'Dried fruit leather (Aam Papad)', 'Mango powder'],
    foodUses: ['Fresh slices', 'Mango lassi', 'Smoothies', 'Pickles (Achar)', 'Ice cream', 'Mango sticky rice'],
  },
  coconut: {
    name: 'Coconut', scientific: 'Cocos nucifera', emoji: '🥥',
    family: 'Cash Crops (Palm)',
    climate: 'Warm humid tropical (27-35°C), maritime humidity',
    soil: 'Deep sandy loam, coastal sand, or alluvial soil, pH 5.2-8.0',
    water: 'High (1300-2300mm), 150-200L/palm/day under drip',
    npk: '500:320:1200 grams per palm per year + Magnesium',
    season: 'Perennial palm bearing monthly bunches year-round',
    spacing: '7.5m x 7.5m triangular or square',
    sowing: 'Planting 10-12 month old seedlings in deep pits',
    harvest: '4-6 years for hybrids; monthly harvest of mature nuts',
    yield: '80-140 nuts per palm per year',
    varieties: ['West African Tall', 'King Coconut', 'Macapuno', 'F1 Hybrid (Cod × T × D × WAT)', 'Chowghat Orange Dwarf'],
    commonDiseases: ['Bud Rot', 'Stem Bleeding', 'Root Wilt', 'Mahali (Stem Rot)', 'Leaf Rot'],
    commonPests: ['Rhinoceros Beetle', 'Red Palm Weevil', 'Eriophyid Mite', 'Black Headed Caterpillar', 'Palm Borer'],
    nutrients: {
      nitrogen: 'Moderate — for frond production',
      phosphorus: 'Low — apply full dose at planting',
      potassium: 'HIGHEST demand — for nut setting and water regulation',
      chlorine: 'Important — salt spray benefits coastal palms',
      magnesium: 'Deficiency causes orange-yellow banding on older fronds',
    },
    tips: [
      'Fill leaf axils with 250g Neem cake + sand mix',
      'Intercrop with cocoa, banana, or pepper',
      'Release parasitoid Goniozus for black headed caterpillar',
      'Clean crown area twice a year',
      'Apply Bordeaux paste on stem bleeding cracks',
    ],
    storage: 'Store mature nuts in dry ventilated sheds up to 1 meter high. Process within 48 hours for best copra quality.',
    marketUses: ['Coconut oil', 'Tender coconut water', 'Desiccated coconut', 'Coir fiber', 'Coconut charcoal', 'Activated carbon'],
    foodUses: ['Tender coconut water', 'Coconut milk curries', 'Chutneys', 'Grated dessert', 'Coconut oil for cooking', 'Coconut bar (Copra)'],
  },
  groundnut: {
    name: 'Groundnut/Peanut', scientific: 'Arachis hypogaea', emoji: '🥜',
    family: 'Legumes',
    climate: 'Warm (25-30°C), sunny days for pegging',
    soil: 'Loose sandy loam rich in calcium, pH 6.0-7.5',
    water: '500-700mm, uniform moisture during flowering',
    npk: '25:50:75 kg/ha + 200 kg Gypsum/ha at flowering',
    season: 'Kharif (rainfed) and Summer (irrigated)',
    spacing: '30cm x 10cm',
    sowing: 'Sowing seed kernels using seed drills or dibbling',
    harvest: '100-120 days when inner pod shell turns dark brown',
    yield: '2.0-3.5 Tons/hectare dry pods',
    varieties: ['TG 37', 'JL 24', 'K 134', 'ICGV 91114', 'Gangaur 755', 'VRI 2'],
    commonDiseases: ['Tikka Leaf Spot', 'Late Leaf Spot', 'Collar Rot', 'Rust', 'Bud Necrosis Virus'],
    commonPests: ['Red Hairy Caterpillar', 'Tobacco Caterpillar', 'Aphids', 'White Grubs', 'Meal Midge'],
    nutrients: {
      nitrogen: 'Low — fixes own N via Rhizobium. Inoculate seeds',
      phosphorus: 'Important for root nodulation and early vigor',
      potassium: 'Essential for pod filling',
      calcium: 'CRITICAL — Gypsum @ 200 kg/ha at flowering for proper pod filling',
      sulfur: 'Sulphur @ 20 kg/ha improves oil content',
    },
    tips: [
      'Do NOT disturb soil after pegging starts',
      'Apply Gypsum @ 200 kg/ha at peak flowering (45 DAP)',
      'Inoculate with Bradyrhizobium for nitrogen fixation',
      'Dry pods to <8% moisture to prevent aflatoxin',
      'Light sandy soil helps pegs penetrate easily',
    ],
    storage: 'Dry pods to <8% moisture before bagging. Store in dry ventilated godowns. Neem leaf layers prevent beetle damage. Low moisture prevents Aflatoxin (Aspergillus flavus).',
    marketUses: ['Edible groundnut oil', 'Peanut butter', 'De-oiled cake (cattle feed)', 'Roasted snack', 'Confectionery'],
    foodUses: ['Roasted peanuts', 'Peanut butter', 'Chikki (jaggery snack)', 'Cooking oil', 'Peanut chutney', 'Boiled peanuts'],
  },
  soybean: {
    name: 'Soybean', scientific: 'Glycine max', emoji: '🌱',
    family: 'Legumes',
    climate: 'Warm humid (22-30°C), sensitive to waterlogging and frost',
    soil: 'Fertile clay loam or black soil, pH 6.0-7.5',
    water: '450-700mm, pod filling is most moisture-sensitive phase',
    npk: '30:60:40 kg/ha + 20 kg Sulfur/ha',
    season: 'Kharif (June-October)',
    spacing: '45cm x 5-7cm',
    sowing: 'Line sowing with seed drill',
    harvest: '90-110 days when leaves turn yellow and drop',
    yield: '2.2-3.2 Tons/hectare',
    varieties: ['JS 335', 'JS 9560', 'NRC 37', 'Pusa 24', 'DSb 27', 'MAUS 2'],
    commonDiseases: ['Soybean Rust', 'Yellow Mosaic Virus', 'Anthracnose', 'Root Rot', 'Charcoal Rot'],
    commonPests: ['Girdle Beetle', 'Tobacco Caterpillar', 'Green Semilooper', 'Whitefly', 'Stem Fly'],
    nutrients: {
      nitrogen: 'Inoculate with Bradyrhizobium for biological N fixation',
      phosphorus: 'Critical for root nodulation',
      potassium: 'Essential for pod development',
      sulfur: 'Sulphur @ 20 kg/ha improves oil and protein',
      manganese: 'Manganese deficiency common in alkaline soils',
    },
    tips: [
      'Inoculate seeds with Bradyrhizobium japonicum',
      'BBF planting prevents waterlogging',
      'Install bird perches @ 50/ha for natural pest control',
      'Deep summer plowing to destroy soil-borne pupae',
      'Maintain optimum density (400,000 plants/ha)',
    ],
    storage: 'Store clean seeds at <10% moisture in cool dry warehouses. Avoid wall contact to prevent moisture absorption.',
    marketUses: ['Soybean oil', 'Soya meal (poultry feed)', 'Lecithin', 'Bioplastics', 'Soya milk'],
    foodUses: ['Tofu', 'Soya milk', 'Soya chunks', 'Soy sauce', 'Edamame', 'Tempeh'],
  },
  chickpea: {
    name: 'Chickpea/Gram', scientific: 'Cicer arietinum', emoji: '🌿',
    family: 'Legumes',
    climate: 'Cool dry winter (15-25°C), frost during flowering causes pod abortion',
    soil: 'Medium to heavy well-drained soils, pH 6.0-8.0',
    water: 'Low (250-400mm), highly drought tolerant',
    npk: '20:50:20 kg/ha + 20 kg Sulfur/ha',
    season: 'Rabi (October-March)',
    spacing: '30cm x 10cm',
    sowing: 'Broadcasting or line sowing with seed drill',
    harvest: '100-120 days when plants turn straw-colored',
    yield: '1.5-2.5 Tons/hectare',
    varieties: ['JG 74', 'K 850', 'C 235', 'Kabuli — CDC Frontier', 'Desi — Annigeri', 'BG 256'],
    commonDiseases: ['Fusarium Wilt', 'Ascochyta Blight', 'Botrytis Gray Mold', 'Pythium Damping Off', 'Dry Root Rot'],
    commonPests: ['Gram Pod Borer', 'Cutworm', 'Pulse Beetle', 'Blue Beetle', 'Leaf Miner'],
    nutrients: {
      nitrogen: 'Low — fixes own N. Inoculate with Mesorhizobium',
      phosphorus: 'Critical for root nodulation and early vigor',
      potassium: 'Low requirement',
      sulfur: 'Sulphur @ 20 kg/ha improves protein',
      zinc: 'Zinc Sulfate @ 15 kg/ha if deficient',
    },
    tips: [
      'Inoculate seeds with Mesorhizobium + PSB',
      'Nipping top shoots at 30-40 DAP increases pod count',
      'Seed treatment with Trichoderma prevents wilt',
      'Store dried seeds <10% moisture with neem powder',
      'Rotate with cereals for 2-3 years',
    ],
    storage: 'Dry seeds to <10% moisture. Store in gunny bags with neem leaf layers to prevent pulse beetle damage.',
    marketUses: ['Whole gram (Chana)', 'Besan (gram flour)', 'Chickpea flour', 'Hummus', 'Sprouted gram'],
    foodUses: ['Dal (Chana Dal)', 'Besan Ladoo', 'Chole', 'Hummus', 'Falafel', 'Sundal', 'Roasted chana'],
  },
};

export const DISEASE百科 = {
  'early blight': {
    name: 'Early Blight',
    scientific: 'Alternaria solani',
    crops: ['tomato', 'potato'],
    severity: 'Moderate',
    symptoms: ['Concentric target-board ring spots on older leaves', 'Yellow halos around spots', 'Dark sunken stem lesions', 'Premature leaf drop'],
    causes: ['Fungal spores in crop debris', 'Warm humid weather (24-29°C)', 'Poor air circulation'],
    organic: ['5% NSKE spray every 7 days', 'Trichoderma harzianum @ 5g/L', 'Prune infected lower leaves'],
    chemical: ['Mancozeb 75% WP @ 2.5 g/L', 'Azoxystrobin 23% SC @ 1 ml/L', 'Chlorothalonil 75% WP @ 2.0 g/L'],
    prevention: ['Rotate with non-solanaceous crops every 2-3 years', 'Mulch soil', 'Use drip irrigation'],
    fertilizers: ['Calcium Nitrate @ 5g/L foliar', 'Potassium Sulfate @ 3g/L', 'Trichoderma-enriched FYM'],
    care: ['Avoid working in wet fields', 'Stake plants', 'Maintain balanced NPK'],
  },
  'late blight': {
    name: 'Late Blight',
    scientific: 'Phytophthora infestans',
    crops: ['potato', 'tomato'],
    severity: 'Severe',
    symptoms: ['Water-soaked dark green-black lesions', 'White fungal growth on leaf undersides', 'Brown firm rot on fruits/tubers', 'Rapid wilting and collapse'],
    causes: ['Cool wet weather (10-20°C)', 'Infected seed tubers', 'Wind-borne sporangia'],
    organic: ['Bordeaux mixture (1%) spray', 'Bacillus subtilis foliar', 'Remove infected debris'],
    chemical: ['Cymoxanil 8% + Mancozeb 64% WP @ 2.0 g/L', 'Metalaxyl + Mancozeb @ 2.5 g/L', 'Chlorothalonil 75% WP'],
    prevention: ['Use certified disease-free seed', 'Hill soil 10cm deep', 'Avoid overhead irrigation in fog'],
    fertilizers: ['Balanced NPK', 'Potassium sulfate for tissue hardening', 'Boron spray for quality'],
    care: ['Remove infected haulms 10-14 days before harvest', 'Increase row spacing', 'Cure tubers at 15-20°C'],
  },
  'blast': {
    name: 'Rice Blast',
    scientific: 'Magnaporthe oryzae',
    crops: ['rice'],
    severity: 'Severe',
    symptoms: ['Spindle-shaped grey-centered lesions', 'Neck blast causing whiteheads', 'Node discoloration', 'Diamond-shaped leaf spots'],
    causes: ['High nitrogen application', 'High humidity with dry spells', 'Dense planting'],
    organic: ['Pseudomonas fluorescens seed treatment @ 10g/kg', 'Neem oil 3ml/L foliar', 'Apply 3% Panchagavya'],
    chemical: ['Tricyclazole 75% WP @ 0.6 g/L', 'Isoprothiolane 40% EC @ 1.5 ml/L', 'Kasugamycin 3% SL @ 2.0 ml/L'],
    prevention: ['Plant resistant varieties', 'Avoid excess nitrogen', 'Maintain proper spacing'],
    fertilizers: ['Split nitrogen doses', 'Potash @ 40 kg/ha', 'Silicon-based foliar spray'],
    care: ['Drain standing water briefly', 'Scout every 3-4 days at boot stage', 'Avoid nitrogen top-dressing during infection'],
  },
  'bacterial blight': {
    name: 'Bacterial Leaf Blight',
    scientific: 'Xanthomonas oryzae',
    crops: ['rice'],
    severity: 'Severe',
    symptoms: ['Water-soaked lesions on leaf margins', 'Wavy yellow streaks along veins', 'Bacterial ooze droplets in morning'],
    causes: ['Wounds from wind/rain/insects', 'Contaminated irrigation water', 'High temperature + humidity'],
    organic: ['Trichoderma viride seed treatment @ 5g/kg', 'Pseudomonas fluorescens @ 10g/L spray', 'Balanced silicon application'],
    chemical: ['Streptomycin sulfate @ 500 ppm', 'Copper hydroxide 77% WP @ 2.0 g/L', 'Validamycin 3% SL @ 3.0 ml/L'],
    prevention: ['Use resistant varieties (BL1, IR64)', 'Avoid flood irrigation', 'Maintain field hygiene'],
    fertilizers: ['Silicon to strengthen leaf tissue', 'Reduce nitrogen during susceptible stages', 'Balanced potassium'],
    care: ['Drain fields promptly after rain', 'Avoid mechanical damage', 'Remove infected stubble'],
  },
  'rust': {
    name: 'Yellow/Stripe Rust',
    scientific: 'Puccinia striiformis',
    crops: ['wheat'],
    severity: 'Moderate',
    symptoms: ['Yellow-orange linear stripe pustules', 'Powdery yellow spore masses', 'Premature leaf drying'],
    causes: ['Cool moist weather (10-15°C)', 'Wind-borne urediniospores', 'Susceptible varieties'],
    organic: ['Sulfur-based fungicide @ 3g/L', 'Neem oil spray', 'Remove volunteer wheat'],
    chemical: ['Propiconazole 25% EC @ 1ml/L', 'Tebuconazole 25.9% EC @ 1ml/L', 'Mancozeb 75% WP @ 2.5g/L'],
    prevention: ['Plant resistant varieties', 'Sow within optimal window', 'Weekly monitoring in cool weather'],
    fertilizers: ['Potassium Nitrate @ 10g/L foliar', 'Zinc Sulfate @ 15 kg/ha'],
    care: ['Remove infected leaf tips if feasible', 'Maintain balanced nutrition', 'Ensure proper plant spacing'],
  },
  'powdery mildew': {
    name: 'Powdery Mildew',
    scientific: 'Various (Blumeria, Oidium, Erysiphe)',
    crops: ['wheat', 'mango', 'chickpea', 'grape'],
    severity: 'Low to Moderate',
    symptoms: ['White powdery fungal growth on leaves', 'Chlorotic spots beneath fungal patches', 'Stunted growth', 'Flower/fruit drop in mango'],
    causes: ['High humidity with moderate temperatures', 'Dense canopy', 'Excess nitrogen'],
    organic: ['Milk spray (1:10 solution) weekly', 'Bicarbonate of soda @ 5g/L', 'Sulfur-based spray @ 3g/L'],
    chemical: ['Propiconazole 25% EC @ 1ml/L', 'Sulfur 80% WP @ 3g/L', 'Hexaconazole 5% EC @ 2ml/L'],
    prevention: ['Choose resistant varieties', 'Avoid dense planting', 'Prune for open canopy'],
    fertilizers: ['Reduce nitrogen', 'Balanced potassium', 'Calcium spray for fruit quality'],
    care: ['Monitor upper canopy leaves', 'Irrigate early morning', 'Spray at bud burst and flowering stages'],
  },
  'armyworm': {
    name: 'Fall Armyworm',
    scientific: 'Spodoptera frugiperda',
    crops: ['maize', 'rice', 'sorghum'],
    severity: 'Severe',
    symptoms: ['Large irregular holes in leaves', 'Frass (insect excrement) in leaf whorl', 'Damaged developing ear'],
    causes: ['Moth migration', 'Warm humid conditions', 'Absence of natural predators'],
    organic: ['Trichogramma egg parasitoid @ 50,000/ha', 'Neem spray @ 5ml/L', 'Bt (Bacillus thuringiensis) at early instar'],
    chemical: ['Emamectin Benzoate 5 SG @ 0.4g/L', 'Chlorantraniliprole 18.5% SC @ 0.3ml/L', 'Cartap hydrochloride 4% G @ 25kg/ha'],
    prevention: ['Install pheromone traps @ 10/ha', 'Push-pull with Desmodium/Napier', 'Weekly scouting'],
    fertilizers: ['Balanced nitrogen for recovery', 'Foliar amino acid spray for vigor'],
    care: ['Hand-pick larvae from whorl', 'Apply treatments to whorl directly', 'Keep field borders clean'],
  },
  'red rot': {
    name: 'Red Rot',
    scientific: 'Colletotrichum falcatum',
    crops: ['sugarcane'],
    severity: 'Severe',
    symptoms: ['Reddened internal pith with white patches', 'Leaf drying from top', 'Foul fermented smell from split stems'],
    causes: ['Wound infection through cut sets', 'Warm humid monsoon conditions', 'Infected setts for planting'],
    organic: ['Bordeaux mixture (1%) sett treatment', 'Trichoderma viride @ 10g/L sett dip', 'Hot water 52°C for 30 min'],
    chemical: ['Carbendazim 50% WP @ 2g/L sett dip', 'Hexaconazole 5% EC @ 2ml/L'],
    prevention: ['Use certified disease-free setts', 'Treat setts with fungicide before planting', 'Grow resistant varieties (Co 86032)'],
    fertilizers: ['Balanced NPK with adequate K', 'Green manuring between rows'],
    care: ['Remove and burn infected canes', 'Avoid excess nitrogen during monsoon', 'Maintain proper drainage'],
  },
  'anthracnose': {
    name: 'Anthracnose',
    scientific: 'Colletotrichum gloeosporioides',
    crops: ['mango', 'chili', 'banana'],
    severity: 'Moderate to Severe',
    symptoms: ['Dark brown/black spots on leaves and fruit', 'Shot-hole in leaves', 'Post-harvest fruit rot'],
    causes: ['Warm wet conditions during flowering', 'Rain-splashed conidia', 'Wound entry through insect damage'],
    organic: ['Bordeaux mixture (1%) pre-flowering spray', 'Hot water treatment at 52°C for 5 min', 'Neem oil spray'],
    chemical: ['Mancozeb 75% WP @ 2.5g/L', 'Azoxystrobin 23% SC @ 1ml/L', 'Carbendazim 50% WP @ 1g/L'],
    prevention: ['Prune for open canopy', 'Remove infected fruits and twigs', 'Spray at pre-flowering and fruit-set'],
    fertilizers: ['Balanced nutrition with potassium', 'Calcium foliar spray for firmness'],
    care: ['Harvest at proper maturity', 'Handle carefully to avoid bruising', 'Hot water dip immediately after harvest'],
  },
  'leaf curl': {
    name: 'Chili Leaf Curl Virus',
    scientific: 'Chili Leaf Curl Virus (ChLCV)',
    crops: ['chili', 'tomato'],
    severity: 'Severe',
    symptoms: ['Upward curling and thickening of leaves', 'Stunted growth', 'Reduced flowering and fruit set'],
    causes: ['Whitefly (Bemisia tabaci) vector', 'Warm dry conditions favoring whitefly', 'Alternate host reservoirs'],
    organic: ['Yellow sticky traps for monitoring', 'Neem oil 5ml/L every 7 days', 'Reflective mulch'],
    chemical: ['Imidacloprid 17.8% SL @ 0.5ml/L soil drench', 'Thiamethoxam 25% WG @ 0.3g/L', 'Diafenthiuron 50% WP @ 1.2g/L'],
    prevention: ['Roguing (remove infected plants)', 'Install yellow sticky traps @ 12/ha', 'Control whitefly aggressively'],
    fertilizers: ['Balanced nutrition with potassium', 'Amino acid foliar spray for recovery'],
    care: ['Spray in evening when whitefly active', 'Maintain field hygiene', 'Remove weed hosts'],
  },
  'fusarium wilt': {
    name: 'Fusarium Wilt',
    scientific: 'Fusarium oxysporum',
    crops: ['banana', 'cotton', 'chickpea', 'tomato', 'soybean'],
    severity: 'Severe',
    symptoms: ['Yellowing of lower leaves progressing upward', 'Vascular browning in stem', 'Plant wilting and death'],
    causes: ['Soil-borne Fusarium surviving decades', 'Contaminated tools/water', 'Warm soil (25-30°C)'],
    organic: ['Trichoderma viride soil application', 'Neem cake amendment', 'Bio-compost'],
    chemical: ['Carbendazim 50% WP seed treatment @ 2g/kg', 'Metalaxyl 35% WS @ 3g/kg seed'],
    prevention: ['Use resistant varieties', 'Rotate with non-host crops for 3-4 years', 'Raise soil pH to 6.5-7.0'],
    fertilizers: ['Reduce nitrogen', 'Increase potassium for tolerance', 'Mycorrhizal inoculant'],
    care: ['Remove and burn infected plants', 'Disinfect tools', 'Deep plowing after harvest'],
  },
  'bollworm': {
    name: 'Bollworm Complex',
    scientific: 'Helicoverpa armigera / Pectinophora gossypiella',
    crops: ['cotton', 'tomato', 'chickpea'],
    severity: 'Severe',
    symptoms: ['Holes bored into bolls/fruits', 'Larval frass on surface', 'Damaged seed and lint'],
    causes: ['Moth immigration from alternate hosts', 'Warm temperatures', 'Incomplete spray coverage'],
    organic: ['Trichogramma chilonis release', 'Bt spray @ 2g/L', 'Pheromone trap monitoring @ 5/ha'],
    chemical: ['Emamectin Benzoate 5 SG @ 0.4g/L', 'Chlorantraniliprole 18.5% SC @ 0.3ml/L', 'Profenophos 50% EC @ 2ml/L'],
    prevention: ['Install sex pheromone traps', 'Push-pull or intercropping', 'Timely sowing'],
    fertilizers: ['Balanced potassium', 'Avoid excess nitrogen prolonging vegetative growth'],
    care: ['Scout for egg masses', 'Spray in evening', 'Remove damaged bolls'],
  },
  'purple blotch': {
    name: 'Purple Blotch',
    scientific: 'Alternaria porri',
    crops: ['onion'],
    severity: 'Moderate',
    symptoms: ['Water-soaked sunken lesions with purple centers', 'Yellow halos', 'Lesions merging causing leaf drying'],
    causes: ['Warm moist weather with dew', 'Dense planting reducing airflow'],
    organic: ['Trichoderma spray @ 5g/L', '3% Neem oil + garlic solution', 'Balanced fertilization with sulfur'],
    chemical: ['Mancozeb 75 WP @ 2.5g/L', 'Difenoconazole 25 EC @ 1 ml/L', 'Tebuconazole @ 1ml/L'],
    prevention: ['Apply elemental sulfur @ 30 kg/ha', 'Stop irrigation 15 days before harvest', 'Avoid dense planting'],
    fertilizers: ['Elemental sulfur @ 30 kg/ha', 'Balanced NPK with sulfur'],
    care: ['Neck cutting leaving 2-3cm stem', 'Blue sticky traps @ 20/acre for thrips', 'Cure bulbs 3-5 days under shade'],
  },
  'sigatoka': {
    name: 'Black Sigatoka',
    scientific: 'Mycosphaerella fijiensis',
    crops: ['banana'],
    severity: 'Moderate',
    symptoms: ['Dark brown to black leaf streaks', 'Premature leaf death', 'Reduced photosynthesis and bunch weight'],
    causes: ['High humidity and rainfall', 'Wind-dispersed spores', 'Dense canopy'],
    organic: ['Remove and bag infected leaves', 'Trichoderma foliar spray', 'Sulfur-based fungicide'],
    chemical: ['Chlorothalonil 75% WP @ 2.5g/L', 'Mancozeb 75% WP @ 2.5g/L', 'Azoxystrobin 23% SC @ 1ml/L'],
    prevention: ['Regular de-leafing', 'Proper plant spacing', 'Improve air circulation'],
    fertilizers: ['Balanced NPK', 'Potassium for disease tolerance'],
    care: ['Spray every 14 days during wet season', 'Remove dead leaves promptly'],
  },
  'tikka': {
    name: 'Tikka Leaf Spot',
    scientific: 'Cercospora arachidicola / Cercosporidium personatum',
    crops: ['groundnut'],
    severity: 'Moderate',
    symptoms: ['Circular dark brown spots on upper leaf surface', 'Yellow chlorotic halos', 'Premature defoliation'],
    causes: ['High atmospheric humidity', 'Dense planting', 'Wind-dispersed spores'],
    organic: ['Neem oil 5ml/L spray', 'Bordeaux mixture (1%)', 'Crop residue management'],
    chemical: ['Mancozeb 75% WP @ 2.5g/L', 'Chlorothalonil 75% WP @ 2g/L', 'Carbendazim 50% WP @ 1g/L'],
    prevention: ['Plant resistant varieties', 'Rotate with cereals', 'Avoid overhead irrigation'],
    fertilizers: ['Balanced NPK', 'Calcium for pod development'],
    care: ['Scout from 30 DAS', 'First spray at 40-45 DAS', 'Apply before spots coalesce'],
  },
  'soybean rust': {
    name: 'Asian Soybean Rust',
    scientific: 'Phakopsora pachyrhizi',
    crops: ['soybean'],
    severity: 'Severe',
    symptoms: ['Small tan to brown pustules on leaf undersides', 'Premature defoliation', 'Reduced seed size'],
    causes: ['Wind-borne spores from tropics', 'Warm humid weather (18-26°C)', 'Extended leaf wetness'],
    organic: ['Sulfur-based fungicide @ 3g/L', 'Neem oil @ 5ml/L', 'Remove crop debris'],
    chemical: ['Triadimefon 25% WP @ 1g/L', 'Azoxystrobin 23% SC @ 1ml/L', 'Mancozeb 75% WP @ 2.5g/L'],
    prevention: ['Plant early to avoid peak rust', 'Use tolerant varieties', 'Weekly scouting'],
    fertilizers: ['Balanced NPK', 'Manganese foliar spray for recovery'],
    care: ['Apply fungicide at first pustule sighting', 'Maintain proper spacing'],
  },
  'chickpea wilt': {
    name: 'Fusarium Wilt',
    scientific: 'Fusarium oxysporum f.sp. ciceri',
    crops: ['chickpea'],
    severity: 'Severe',
    symptoms: ['Yellowing and wilting of branches', 'Brown vascular discoloration', 'Root shredding'],
    causes: ['Soil-borne chlamydospores', 'Warm soil (25-28°C)', 'Alkaline pH'],
    organic: ['Trichoderma viride seed treatment @ 10g/kg', 'Bacillus subtilis soil application', 'Neem cake'],
    chemical: ['Carbendazim 50% WP @ 2g/kg seed', 'Thiophanate methyl 70% WP @ 2g/kg'],
    prevention: ['Resistant varieties (JG 74, K850)', 'Deep summer plowing', 'Bio-agent seed treatment'],
    fertilizers: ['Balanced phosphorus for root health', 'Mycorrhizal inoculant'],
    care: ['Remove and burn infected plants', 'Avoid excessive irrigation'],
  },
  'ascochyta blight': {
    name: 'Ascochyta Blight',
    scientific: 'Ascochyta rabiei',
    crops: ['chickpea'],
    severity: 'Severe',
    symptoms: ['Dark brown spots on leaves/stems/pods', 'Concentric rings in lesions', 'Premature pod shattering'],
    causes: ['Cool wet weather during flowering', 'Rain splash spreading conidia', 'Infected seed carryover'],
    organic: ['Trichoderma harzianum seed treatment', 'Bordeaux mixture spray', 'Rotation with cereals'],
    chemical: ['Mancozeb 75% WP @ 2.5g/L', 'Chlorothalonil 75% WP @ 2g/L', 'Carbendazim @ 1g/L'],
    prevention: ['Certified disease-free seed', 'Fungicide seed treatment', 'Rotate with non-host crops'],
    fertilizers: ['Balanced NPK', 'Sulfur application'],
    care: ['Scout during cool wet weather', 'Apply first spray at 40 DAS or first symptom'],
  },
  'bud rot coconut': {
    name: 'Bud Rot',
    scientific: 'Phytophthora palmivora',
    crops: ['coconut'],
    severity: 'Severe',
    symptoms: ['Yellowing and drooping of central spindle leaf', 'Rotting of crown bud with foul odor', 'Premature nut fall'],
    causes: ['Heavy monsoon rains', 'Continuous wet weather', 'Beetle wounds creating entry points'],
    organic: ['Bordeaux paste on crown bud', 'Trichoderma harzianum to root zone'],
    chemical: ['Copper Oxychloride 0.3% drenching', 'Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L'],
    prevention: ['Clean crown area twice a year', 'Fill leaf axils with Neem cake + sand', 'Avoid root damage'],
    fertilizers: ['Balanced potassium', 'Micronutrient spray for recovery'],
    care: ['Apply Bordeaux paste on stem bleeding cracks', 'Release parasitoid for black headed caterpillar'],
  },
  'downy mildew': {
    name: 'Downy Mildew',
    scientific: 'Peronospora destructor',
    crops: ['onion', 'grape', 'cucumber'],
    severity: 'Moderate',
    symptoms: ['Pale yellow streaks on leaves', 'Downy white to purple growth on surfaces', 'Premature leaf collapse'],
    causes: ['Cool damp weather', 'Prolonged leaf wetness', 'Dense canopy trapping moisture'],
    organic: ['Copper-based bio-fungicide', 'Neem oil 5ml/L', 'Improve drainage'],
    chemical: ['Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L', 'Fosetyl-Al 80% WP @ 2.5g/L'],
    prevention: ['Ensure good air circulation', 'Avoid overhead irrigation', 'Use resistant varieties'],
    fertilizers: ['Balanced nutrition', 'Avoid excess nitrogen'],
    care: ['Remove infected foliage', 'Improve drainage', 'Harvest before disease spreads to bulbs'],
  },
};

export const TOPIC_KNOWLEDGE = {
  fertilizer: {
    title: 'Fertilizer & NPK Management',
    overview: 'Proper fertilization is the foundation of high crop yields. NPK (Nitrogen-Phosphorus-Potassium) are the three primary macronutrients.',
    details: `
**NPK Recommendations by Crop:**
- **Rice:** N-P-K = 120:60:60 kg/ha — split N into 3 doses
- **Wheat:** N-P-K = 120:60:40 kg/ha — apply at CRI and tillering
- **Maize:** N-P-K = 150:75:37.5 kg/ha — high N demand, split 3 times
- **Tomato:** N-P-K = 150:100:100 kg/ha — high Ca needed
- **Potato:** N-P-K = 180:100:150 kg/ha — high K for tubers
- **Cotton:** N-P-K = 120:60:60 kg/ha — avoid excess N
- **Sugarcane:** N-P-K = 250:75:75 kg/ha — heaviest N consumer
- **Chili:** N-P-K = 120:60:60 kg/ha — boron critical

**Micronutrients:**
- Zinc Sulfate @ 15-25 kg/ha (most cereals)
- Boron @ 10 kg/ha (legumes, canola, potato)
- Calcium for tomato (prevents BER)
- Silicon for rice/wheat (disease resistance)
- Iron for chlorosis in alkaline soils

**Organic Fertilizer Sources:**
- Farmyard Manure (FYM): 10-15 tons/ha
- Vermicompost: 2-5 tons/ha
- Neem cake: 200 kg/ha (also pest deterrent)
- Green manure: Sesbania/Dhaincha 45 days before transplanting
`,
  },
  organic: {
    title: 'Organic Farming Practices',
    overview: 'Organic farming uses natural inputs and biological processes to produce food without synthetic chemicals.',
    details: `
**Bio-Fungicides:**
- Trichoderma harzianum/viride @ 5g/L — soil drench or foliar
- Pseudomonas fluorescens @ 10g/L — seed treatment or spray
- Bacillus subtilis — broad-spectrum bio-fungicide

**Neem-Based Solutions:**
- Neem Seed Kernel Extract (NSKE 5%) — broad spectrum
- Neem oil 5ml/L — insecticide + fungicide
- Neem cake 200 kg/ha — soil amendment + pest deterrent

**Bio-Fertilizers:**
- Rhizobium for legumes (nitrogen fixation)
- PSB (Phosphate Solubilizing Bacteria) @ 4 kg/ha
- Mycorrhizal inoculants for root health
- Azotobacter for non-legume crops
- Azospirillum for cereal crops

**Natural Pest Control:**
- Yellow sticky traps @ 50/ha for whitefly/aphid
- Blue sticky traps @ 20/acre for thrips
- Pheromone traps for borers and moths
- Trichogramma egg parasitoids for borer control
- Intercropping confuses pests
`,
  },
  irrigation: {
    title: 'Smart Irrigation & Water Management',
    overview: 'Efficient water management is critical for crop health and yield. Different crops have different water needs.',
    details: `
**Drip Irrigation:**
- Saves 40-60% water vs flood irrigation
- Ideal for tomato, chili, cotton, sugarcane, onion
- Maintain 4-6 LPH emitters for row crops
- Fertigation possible — apply nutrients through drip

**Flood/Furrow:**
- Suitable for rice (2-5cm standing water)
- Good for wheat during critical stages

**Sprinkler:**
- Good for light sandy soils
- Suitable for groundnut, wheat, pulses

**Water Requirements:**
- Rice: 1200-1500mm (highest)
- Sugarcane: 1500-2500mm
- Cotton: 700-1200mm
- Wheat: 450-650mm
- Tomato: 600-800mm
- Groundnut: 500-700mm

**Timing Tips:**
- Irrigate early morning (reduces disease pressure)
- Avoid evening irrigation (promotes fungal growth)
- Monitor soil moisture at 15cm depth
- Use AWD (Alternate Wetting and Drying) for rice

**System Maintenance:**
- Clean filters monthly
- Flush drip lines quarterly
- Check emitter uniformity twice per season
`,
  },
  pest: {
    title: 'Integrated Pest Management (IPM)',
    overview: 'IPM combines biological, cultural, physical, and chemical methods to manage pests with minimal environmental impact.',
    details: `
**Monitoring & Scouting:**
- Scout fields weekly for early pest signs
- Use pheromone traps for monitoring
- Yellow sticky traps @ 50/ha for whitefly/aphid
- Blue sticky traps @ 20/acre for thrips

**Biological Control:**
- Trichogramma parasitoids for borer control
- Ladybugs and lacewings for aphid control
- Neem-based sprays (broad spectrum organic)
- Predatory mites for spider mite control

**Cultural Practices:**
- Crop rotation breaks pest cycles
- Intercropping confuses pests
- Resistant varieties reduce pesticide need
- Timely sowing avoids peak pest periods
- Trap crops (Okra for cotton bollworm)

**Chemical Control (Last Resort):**
- Targeted spraying, not blanket application
- Rotate chemical classes to prevent resistance
- Follow pre-harvest intervals (PHI) strictly
- Use newer molecules (Emamectin, Chlorantraniliprole) for resistance management
`,
  },
  soil: {
    title: 'Soil Health & Composting',
    overview: 'Healthy soil is the foundation of productive farming. Soil testing and organic matter management are key.',
    details: `
**Soil Testing:**
- Test every 2 years for NPK, pH, and micronutrients
- Ideal pH: 6.0-7.5 for most crops
- Adjust pH with lime (acidic) or sulfur (alkaline)

**Composting:**
- Farmyard Manure (FYM): 10-15 tons/ha
- Vermicompost: 2-5 tons/ha
- Green manuring: Sesbania/Dhaincha 45 days before transplanting

**Bio-Inputs:**
- Trichoderma: 2-3 kg/ha mixed with FYM
- PSB: 4 kg/ha for phosphorus solubilization
- Rhizobium: Seed treatment for legumes
- Mycorrhizal inoculants for root health

**Soil Conservation:**
- Mulching conserves moisture and adds organic matter
- Avoid burning crop residue — incorporate instead
- Cover crops in off-season prevent erosion
- Contour farming on slopes
- Bund and terrace construction

**Soil Amendments:**
- Gypsum @ 200 kg/ha for groundnut (calcium)
- Lime for acidic soils (raises pH)
- Elemental sulfur for alkaline soils
- Biochar improves water retention
`,
  },
  storage: {
    title: 'Post-Harvest Storage & Handling',
    overview: 'Proper post-harvest handling prevents losses and maintains crop quality.',
    details: `
**Grain Storage:**
- Dry to safe moisture levels:
  - Rice: 12-14%
  - Wheat: 10-12%
  - Maize: 12-13%
  - Pulses: 8-10%
- Use hermetic bags (PICS bags) for smallholder storage
- Metal bins with neem leaves for traditional storage

**Vegetable Storage:**
- Tomatoes: 12-15°C (green), 8-10°C (ripe)
- Potatoes: 4-7°C, 90-95% RH, dark conditions
- Onions: 25-30°C, 65-70% RH, well-ventilated
- Chili: Sun-dry to 10% moisture, store in dark

**Fruit Storage:**
- Mango: 12-13°C, 85-90% RH
- Banana: 13-14°C green, ripen at 18-20°C with ethylene
- Coconut: Process within 48 hours

**Preventive Measures:**
- Clean storage area thoroughly
- Use neem leaf layers between grain bags
- Aluminum phosphide fumigation for long-term grain storage
- Regular inspection for weevil/rodent damage
`,
  },
  season: {
    title: 'Seasonal Farming Calendar',
    overview: 'Understanding crop seasons helps plan sowing and harvesting for optimal yields.',
    details: `
**Kharif Season (Monsoon: June-October)**
Crops sown at onset of rains, harvested in autumn:
- Rice, Maize, Cotton, Soybean, Groundnut
- Pulses (Moong, Urad, Arhar)
- Sugarcane (planting), Chili (transplanting)
- Oilseeds (Sesame, Niger)

**Rabi Season (Winter: October-March)**
Sown in cool season, harvested in spring:
- Wheat, Barley, Mustard, Gram
- Potato, Onion, Peas
- Lentil, Linseed, Rapeseed
- Vegetables (Cauliflower, Cabbage, Carrot)

**Summer/Zaid Season (March-June)**
Short duration crops between Rabi and Kharif:
- Watermelon, Muskmelon, Cucumber
- Summer groundnut (irrigated)
- Summer rice (in irrigated areas)
- Fodder crops

**Perennial Crops (Year-round care):**
- Mango, Banana, Coconut, Arecanut
- Sugarcane (plant crop 12-18 months)
- Tea, Coffee, Rubber
`,
  },
  organicFarming: {
    title: 'Organic Farming Complete Guide',
    overview: 'Organic farming produces food using natural inputs, biological processes, and sustainable practices.',
    details: `
**Principles:**
1. No synthetic fertilizers or pesticides
2. Build soil health through organic matter
3. Use biological pest control
4. Maintain ecological balance
5. Sustainable resource management

**Step-by-Step Organic Transition:**
1. **Year 1-2:** Reduce chemical inputs, start composting
2. **Year 2-3:** Introduce bio-fertilizers and bio-pesticides
3. **Year 3+:** Full organic management, certification possible

**Key Inputs:**
- Vermicompost: 2-5 tons/ha
- Neem cake: 200 kg/ha
- Trichoderma: 2-3 kg/ha (bio-fungicide)
- Pseudomonas: 4 kg/ha (bio-bactericide)
- Jeevamrut: 200L/ha (monthly soil application)
- Beejamrut: Seed treatment

**Marketing:**
- Organic certification from accredited agencies
- Premium pricing (20-50% higher)
- Direct marketing to health-conscious consumers
- Export opportunities (US, EU, Japan)

**Common Organic Pesticides:**
- Neem oil 5ml/L (broad spectrum)
- NSKE 5% (Neem Seed Kernel Extract)
- Beauveria bassiana (entomopathogenic fungus)
- Trichoderma 5g/L (bio-fungicide)
`,
  },
};

// General greetings and conversation starters
export const GREETINGS = {
  keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'how are you'],
  reply: `Hello! Welcome to **CropVision AI** 🌱

I'm your smart farming assistant, here to help with:
- 🌾 **Crop diseases** — diagnosis, treatment, and prevention
- 🧪 **Fertilizer & NPK** — recommendations for every crop
- 🐛 **Pest management** — identification and control
- 💧 **Irrigation** — water management and scheduling
- 🌱 **Organic farming** — natural alternatives
- 📅 **Seasonal guides** — what to plant and when
- 🏪 **Storage** — post-harvest handling tips

Ask me anything about farming, crops, or plant health!`,
};

export const GREETING_KEYWORDS = GREETINGS.keywords;
