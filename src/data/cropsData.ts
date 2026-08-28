import { Crop } from '../types';

export const CROPS_DATA: Crop[] = [
  {
    id: 'rice',
    name: 'Rice',
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1750557352837-70fe7f5dac0d?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Essential cereal grain serving as the primary staple food for over half of the global population.',
    category: 'Cereals',
    scientificName: 'Oryza sativa',
    commonName: 'Rice, Paddy',
    suitableRegions: ['South Asia', 'Southeast Asia', 'East Asia', 'Tropical & Subtropical Plains', 'River Basins'],
    climate: 'Warm and humid, average temperature 20°C to 38°C, requiring abundant sunlight.',
    soilType: 'Deep clayey loam or silt clay with good water retention and pH 5.5 - 6.5.',
    waterRequirement: 'High water requirement (1200 - 1500 mm), needs standing water during early growth.',
    fertilizerRecommendation: 'N:P:K ratio of 120:60:60 kg/ha applied in split doses.',
    nutrientRequirements: 'Nitrogen for vegetative growth, Phosphorus for root establishment, Potassium for grain filling & disease resistance.',
    growingSeason: 'Kharif (Monsoon) season: June to November; Rabi in irrigated zones.',
    sowingMethod: 'Transplanting seedlings from nursery beds or direct seeding in puddled fields.',
    plantSpacing: '20 cm x 15 cm (Line spacing x Plant spacing)',
    harvestTime: '110 to 150 days after sowing when grains turn golden yellow.',
    averageYield: '4.5 to 6.5 Tons per Hectare under irrigated conditions.',
    commonDiseasesList: [
      {
        name: 'Rice Blast (Magnaporthe oryzae)',
        symptoms: ['Spindle-shaped lesions with dark brown borders and grayish center on leaves', 'Node rotting and neck blast causing whiteheads'],
        causes: ['Fungal spores airborne under high humidity (>90%) and mild temperature (24-28°C)'],
        prevention: ['Use resistant varieties', 'Avoid excessive nitrogen fertilization', 'Treat seeds before sowing'],
        organicTreatment: ['Spray Neem seed kernel extract (NSKE 5%) or Pseudomonas fluorescens'],
        chemicalTreatment: ['Spray Tricyclazole 75 WP @ 0.6g/L or Isoprothiolane 40 EC']
      },
      {
        name: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
        symptoms: ['Water-soaked lesions turning yellow-white along leaf margins', 'Bacterial ooze droplets in early morning'],
        causes: ['Bacterial infection favored by high humidity, rainfall, and leaf injury'],
        prevention: ['Maintain proper drainage', 'Avoid clipping leaf tips during transplanting'],
        organicTreatment: ['Foliar application of fresh cow dung slurry supernatant'],
        chemicalTreatment: ['Spray Copper Oxychloride @ 2.5g/L mixed with Streptocycline @ 0.1g/L']
      }
    ],
    diseaseSymptoms: [
      'Spindle-shaped spots on leaves',
      'Water-soaked yellow margins',
      'Brown spots on glumes',
      'Stunted seedling growth',
      'Blackish rotting at collar'
    ],
    diseaseCauses: [
      'Excessive nitrogenous fertilizers',
      'High ambient humidity and persistent dew drops',
      'Poor field drainage and waterlogging',
      'Infected seed materials'
    ],
    preventionMethods: [
      'Seed treatment with Trichoderma viride @ 10g/kg',
      'Maintain balanced NPK fertilizer management',
      'Adopt SRI (System of Rice Intensification) spacing',
      'Destroy crop residue after harvest'
    ],
    organicTreatment: [
      'Apply Pseudomonas fluorescens bio-agent @ 10g/L',
      'Foliar spray of 5% Neem Seed Kernel Extract (NSKE)',
      'Incorporate Panchagavya @ 3% in field water'
    ],
    chemicalTreatment: [
      'Spray Tricyclazole 75% WP @ 0.6g per liter water',
      'Apply Hexaconazole 5% EC @ 2ml/L for sheath blight',
      'Copper Hydroxide 77% WP @ 2g/L for bacterial blight'
    ],
    commonPests: ['Stem Borer', 'Brown Plant Hopper (BPH)', 'Gall Midge', 'Rice Hispa', 'Leaf Folder'],
    farmingTips: [
      'Incorporate green manure crops like Sesbania 45 days prior to transplanting',
      'Maintain alternate wetting and drying (AWD) to save water and prevent root rot',
      'Use pheromone traps @ 12/ha to monitor stem borer activity'
    ],
    storageMethods: ['Dry grains to below 12% moisture level before storage in hermetic bags or steel bins with neem leaves.'],
    marketUses: ['Staple grain consumption', 'Rice bran oil extraction', 'Rice flour processing', 'Animal fodder (straw)'],
    foodUses: ['Steamed rice, Biryani, Idli/Dosa batter, Puffed rice, Flaked rice (Poha), Rice noodles']
  },
  {
    id: 'wheat',
    name: 'Wheat',
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Major cool-season cereal grain rich in carbohydrates and gluten for bakery products.',
    category: 'Cereals',
    scientificName: 'Triticum aestivum',
    commonName: 'Wheat, Bread Wheat',
    suitableRegions: ['Temperate & Subtropical plains', 'Indo-Gangetic Plains', 'North America', 'Eastern Europe'],
    climate: 'Cool growing season (15°C to 20°C) with warm dry weather during grain ripening.',
    soilType: 'Well-drained fertile clay loam or loamy soil with neutral pH (6.0 - 7.5).',
    waterRequirement: 'Moderate water requirement (450 - 650 mm) distributed across critical stages.',
    fertilizerRecommendation: 'N:P:K ratio of 120:60:40 kg/ha.',
    nutrientRequirements: 'High nitrogen demand during tillering; zinc deficiency causes interveinal chlorosis.',
    growingSeason: 'Rabi (Winter) season: Sown in October-November and harvested in March-April.',
    sowingMethod: 'Seed drill sowing in rows or zero-till seeders.',
    plantSpacing: '20 cm row-to-row spacing, 5 cm seed depth.',
    harvestTime: '120 to 140 days after sowing when ears dry up and grain hardens.',
    averageYield: '4.0 to 5.5 Tons per Hectare.',
    commonDiseasesList: [
      {
        name: 'Yellow Rust / Stripe Rust (Puccinia striiformis)',
        symptoms: ['Bright yellow pustules arranged in linear stripes along leaf veins'],
        causes: ['Cool moist temperatures (10-15°C) and wind-blown fungal spores'],
        prevention: ['Grow resistant cultivars', 'Timely early winter sowing'],
        organicTreatment: ['Foliar spray of garlic extract + sour buttermilk'],
        chemicalTreatment: ['Spray Propiconazole 25% EC @ 1 ml/L water']
      }
    ],
    diseaseSymptoms: [
      'Yellow/brown pustules on leaf blades',
      'Powdery white growth on leaves and stems',
      'Black spots on ears (Karnal Bunt)',
      'Premature drying of leaf tips'
    ],
    diseaseCauses: [
      'Cool temperatures with high relative humidity',
      'Over-dense seed sowing reducing airflow',
      'Wind-dispersed fungal urediniospores'
    ],
    preventionMethods: [
      'Seed treatment with Carboxin @ 2g/kg seed',
      'Adopt crop rotation with legumes',
      'Ensure balanced potassium fertilization'
    ],
    organicTreatment: [
      'Spray sour buttermilk solution (10% v/v)',
      'Bio-fungicide Trichoderma harzianum soil application'
    ],
    chemicalTreatment: [
      'Propiconazole 25 EC @ 1 ml/L',
      'Tebuconazole 250 EC @ 1.25 ml/L at first disease appearance'
    ],
    commonPests: ['Aphids', 'Termites', 'Armyworm', 'Brown Wheat Mite'],
    farmingTips: [
      'Irrigate at critical stages: Crown Root Initiation (21 DAP), Tillering, Flowering, and Milk stage',
      'Apply Zinc Sulfate @ 25 kg/ha in zinc-deficient soils'
    ],
    storageMethods: ['Sun-dry grains to 10% moisture and store in cool, rodent-proof metal bins with aluminium phosphide fumigation.'],
    marketUses: ['Flour milling (Atta, Maida, Suji)', 'Semolina', 'Wheat germ oil', 'Livestock feed'],
    foodUses: ['Chapatis, Bread, Pasta, Biscuits, Pastries, Porridge (Dalia)']
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    icon: '🌽',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Versatile cereal known as the "Queen of Cereals", used for food, biofuel, and industrial starch.',
    category: 'Cereals',
    scientificName: 'Zea mays',
    commonName: 'Maize, Corn',
    suitableRegions: ['Tropical, Subtropical, and Warm Temperate zones globally'],
    climate: 'Warm weather crop (21°C to 30°C), highly frost-sensitive.',
    soilType: 'Deep, fertile, well-drained loamy soil with rich organic matter and pH 6.0 - 7.2.',
    waterRequirement: '500 - 800 mm water required, extremely sensitive to waterlogging.',
    fertilizerRecommendation: 'N:P:K ratio of 150:75:37.5 kg/ha.',
    nutrientRequirements: 'Requires high nitrogen and zinc; critical phosphorus during early root development.',
    growingSeason: 'Kharif, Spring, and Rabi in frost-free regions.',
    sowingMethod: 'Dibbling seeds on ridges or flat beds using tractor seed drills.',
    plantSpacing: '60 cm between rows x 20 cm between plants.',
    harvestTime: '90 to 110 days for grain corn; 70-80 days for sweet corn/baby corn.',
    averageYield: '6.0 to 8.5 Tons per Hectare for hybrid varieties.',
    commonDiseasesList: [
      {
        name: 'Turcicum Leaf Blight (Exserohilum turcicum)',
        symptoms: ['Long, elliptical, tan/grayish leaf lesions'],
        causes: ['High humidity and moderate temperatures (18-27°C)'],
        prevention: ['Use disease-tolerant hybrids', 'Clear field stubbles'],
        organicTreatment: ['Foliar spray of Trichoderma formulation'],
        chemicalTreatment: ['Mancozeb 75 WP @ 2.5 g/L or Azoxystrobin']
      }
    ],
    diseaseSymptoms: [
      'Elliptical grayish-tan spots on leaves',
      'Pustules of reddish-brown rust on upper leaf surface',
      'Rotting stalk joints and breaking stems'
    ],
    diseaseCauses: [
      'High humidity during tassel and silk stage',
      'Monoculture maize farming without rotation',
      'Infected crop residues left in field'
    ],
    preventionMethods: [
      'Crop rotation with legumes like soybean or cowpea',
      'Use certified disease-resistant hybrids',
      'Proper spacing to ensure sunlight penetration'
    ],
    organicTreatment: [
      'Neem oil spray (3% concentration)',
      'Bio-control using Bacillus subtilis'
    ],
    chemicalTreatment: [
      'Mancozeb 75 WP @ 2.5g/L water',
      'Azoxystrobin 23% SC @ 1 ml/L for comprehensive leaf spot control'
    ],
    commonPests: ['Fall Armyworm (FAW)', 'Stem Borer', 'Corn Earworm', 'Shoot Fly'],
    farmingTips: [
      'Install sex pheromone traps @ 10/ha for Fall Armyworm early detection',
      'Earthing up at 30 days protects plants from lodging during high winds'
    ],
    storageMethods: ['Dry cobs/kernels to 12% moisture; store in aeration-equipped silos or airtight triple-layer bags.'],
    marketUses: ['Starch production', 'Ethanol biofuel', 'Poultry feed', 'High fructose corn syrup'],
    foodUses: ['Popcorn, Sweet corn, Cornflakes, Tortillas, Corn oil, Cornmeal porridge']
  },
  {
    id: 'cotton',
    name: 'Cotton',
    icon: '🌱',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Premier natural fiber crop driving the global textile industry and oilseed meal.',
    category: 'Cash Crops',
    scientificName: 'Gossypium hirsutum',
    commonName: 'Cotton, White Gold',
    suitableRegions: ['Black soil tracts of India', 'US Cotton Belt', 'China', 'Pakistan', 'Egypt'],
    climate: 'Tropical to subtropical with long frost-free periods (21°C to 32°C) and bright sunny days.',
    soilType: 'Deep black cotton soils (Vertisols) or alluvial loams with good drainage and pH 6.0 - 8.0.',
    waterRequirement: '700 - 1200 mm water required, irrigation critical during boll formation.',
    fertilizerRecommendation: 'N:P:K ratio of 120:60:60 kg/ha for hybrid cotton.',
    nutrientRequirements: 'Magnesium and boron are vital to prevent leaf reddening and boll drop.',
    growingSeason: 'Kharif crop: April-May sowing and October-February picking.',
    sowingMethod: 'Dibbling seeds on ridges or flat beds.',
    plantSpacing: '90 cm x 60 cm for hybrid Bt-cotton.',
    harvestTime: '160 to 180 days with multiple hand-pickings as bolls burst open.',
    averageYield: '2.5 to 3.5 Tons per Hectare seed cotton.',
    commonDiseasesList: [
      {
        name: 'Cotton Leaf Curl Virus (CLCuV)',
        symptoms: ['Upward cupping of leaves, vein thickening, and enations on undersides'],
        causes: ['Transmitted by Whitefly insect vector (Bemisia tabaci)'],
        prevention: ['Control whitefly vector', 'Remove weed hosts'],
        organicTreatment: ['Yellow sticky traps (50/ha) + Neem oil spray'],
        chemicalTreatment: ['Imidacloprid 17.8 SL @ 0.5 ml/L for whitefly control']
      }
    ],
    diseaseSymptoms: [
      'Upward leaf curling and thickened veins',
      'Black powdery mold on leaves (Sooty mold)',
      'Wilting and drooping of full plants',
      'Reddening of upper leaves'
    ],
    diseaseCauses: [
      'Whitefly infestation transmitting geminivirus',
      'Root rot fungi in heavy waterlogged soils',
      'Magnesium deficiency causing foliar reddening'
    ],
    preventionMethods: [
      'Grow Bt-cotton hybrids resistant to bollworms',
      'Intercrop with green gram or cowpea to attract beneficial predators',
      'Avoid excess nitrogen which attracts sap-sucking pests'
    ],
    organicTreatment: [
      'Spray 5% NSKE (Neem Seed Kernel Extract)',
      'Erect yellow sticky traps @ 50 per hectare'
    ],
    chemicalTreatment: [
      'Diafenthiuron 50 WP @ 1g/L for whiteflies and mites',
      'Carbendazim 50 WP @ 1g/L root drenching for vascular wilt'
    ],
    commonPests: ['Pink Bollworm', 'Whitefly', 'Aphids', 'Thrips', 'Spider Mites'],
    farmingTips: [
      'Nip terminal buds at 80-90 days to encourage horizontal branch growth and boll setting',
      'Spray 1% Magnesium Sulfate + 1% Urea to prevent leaf reddening'
    ],
    storageMethods: ['Store seed cotton in clean, dry covered godowns with <8% moisture to prevent fiber yellowing.'],
    marketUses: ['Textile yarn & fabric manufacturing', 'Cottonseed oil extraction', 'Cottonseed cake for livestock feed', 'Absorbent medical cotton'],
    foodUses: ['Refined cottonseed cooking oil']
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    icon: '🎋',
    image: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Tall perennial grass grown for sucrose-rich stalks used for sugar and ethanol production.',
    category: 'Cash Crops',
    scientificName: 'Saccharum officinarum',
    commonName: 'Sugarcane, Ganna',
    suitableRegions: ['Tropical belt', 'Subtropical river plains', 'Brazil', 'India', 'Thailand'],
    climate: 'Hot humid climate (26°C to 33°C) with bright sunlight and frost-free winter.',
    soilType: 'Deep, well-drained fertile loamy soils with pH 6.5 - 7.5.',
    waterRequirement: 'High water demand (1500 - 2500 mm) evenly distributed throughout growth.',
    fertilizerRecommendation: 'N:P:K ratio of 250:75:75 kg/ha.',
    nutrientRequirements: 'Heavy nitrogen consumer for vegetative canopy and stalk girth.',
    growingSeason: 'Plant crop (12-18 months duration); Autumn sowing (Oct) or Spring sowing (Feb).',
    sowingMethod: 'Placing 2-budded or 3-budded setts in deep furrows.',
    plantSpacing: '90 cm to 120 cm row-to-row distance.',
    harvestTime: '10 to 14 months after planting when Brix hydrometer reads >18% sucrose.',
    averageYield: '70 to 110 Tons per Hectare.',
    commonDiseasesList: [
      {
        name: 'Red Rot (Colletotrichum falcatum)',
        symptoms: ['Third/fourth leaf turns yellow and dries up, red lesions inside stalk with sour smell'],
        causes: ['Fungal pathogen spreading via infected setts and irrigation water'],
        prevention: ['Use certified disease-free setts', 'Hot water sett treatment at 50°C for 2 hrs'],
        organicTreatment: ['Sett treatment with Trichoderma viride'],
        chemicalTreatment: ['Carbendazim 50 WP sett dip @ 2g/L']
      }
    ],
    diseaseSymptoms: [
      'Reddish discoloration of internal stalk pith with white transverse patches',
      'Whip-like black powdery structure emerging from central whorl (Smut)',
      'Yellowing and drying of leaf margins'
    ],
    diseaseCauses: [
      'Infected cane setts used for propagation',
      'Waterlogging in low-lying fields',
      'Ratoon cropping without field sanitation'
    ],
    preventionMethods: [
      'Heat treatment of cane setts prior to planting',
      'Grow red rot resistant varieties like Co 0238 / Co 86032',
      'Avoid ratoon crop if plant crop suffered from red rot'
    ],
    organicTreatment: [
      'Apply bio-agent Trichoderma harzianum @ 5 kg/ha mixed with FYM',
      'Spray Panchagavya @ 3% on crop canopy'
    ],
    chemicalTreatment: [
      'Sett soaking in Carbendazim 0.1% solution for 15 mins before planting',
      'Propiconazole 25 EC @ 1ml/L spray for rust and smut'
    ],
    commonPests: ['Early Shoot Borer', 'Top Shoot Borer', 'Internode Borer', 'Pyrilla', 'Woolly Aphid'],
    farmingTips: [
      'Trash mulching between rows saves up to 30% irrigation water and suppresses weeds',
      'Detrash lower dry leaves at 5th and 7th month to improve aeration and sugar accumulation'
    ],
    storageMethods: ['Milled within 24 hours of harvest to prevent sucrose inversion into reducing sugars.'],
    marketUses: ['White sugar & Jaggery (Gur) production', 'Ethanol biofuel blending', 'Molasses for alcohol', 'Bagasse paper & power generation'],
    foodUses: ['Fresh sugarcane juice, Jaggery, Refined sugar, Syrups']
  },
  {
    id: 'tomato',
    name: 'Tomato',
    icon: '🍅',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'High-value horticultural vegetable crop packed with lycopene, vitamins, and antioxidants.',
    category: 'Vegetables',
    scientificName: 'Solanum lycopersicum',
    commonName: 'Tomato, Tamatar',
    suitableRegions: ['Subtropical and temperate zones, greenhouse/polyhouse worldwide'],
    climate: 'Warm season crop (20°C to 28°C), night temperature above 13°C required for fruit set.',
    soilType: 'Well-drained sandy loam rich in organic matter with pH 6.0 - 7.0.',
    waterRequirement: 'Moderate (600 - 800 mm), requires uniform moisture to prevent blossom end rot.',
    fertilizerRecommendation: 'N:P:K ratio of 150:100:100 kg/ha.',
    nutrientRequirements: 'High calcium needed to prevent blossom end rot; potassium for vibrant fruit color.',
    growingSeason: 'Year-round under protected cultivation; Rabi and Autumn in open fields.',
    sowingMethod: 'Transplanting 25-30 day old seedlings from tray nursery.',
    plantSpacing: '60 cm x 45 cm for indeterminate cultivars.',
    harvestTime: '60 to 80 days after transplanting; multiple pickings over 2-3 months.',
    averageYield: '35 to 60 Tons per Hectare in open field; >120 T/ha in polyhouses.',
    commonDiseasesList: [
      {
        name: 'Early Blight (Alternaria solani)',
        symptoms: ['Concentric target-board ring spots on lower older leaves with yellow halo'],
        causes: ['High humidity and alternating wet/dry weather conditions'],
        prevention: ['Crop rotation with non-solanaceous crops', 'Mulching soil'],
        organicTreatment: ['Foliar copper hydroxide spray or Neem oil 3%'],
        chemicalTreatment: ['Mancozeb 75 WP @ 2.5g/L or Chlorothalonil']
      },
      {
        name: 'Tomato Leaf Curl Virus (ToLCV)',
        symptoms: ['Severe upward curling, stunting, and puckering of young leaves'],
        causes: ['Transmitted by Bemisia tabaci whitefly vector'],
        prevention: ['Use insect net nurseries', 'Grow tolerant F1 hybrids'],
        organicTreatment: ['Sticky yellow traps + Neem seed extract spray'],
        chemicalTreatment: ['Imidacloprid 200 SL @ 0.4 ml/L for vector management']
      }
    ],
    diseaseSymptoms: [
      'Concentric ring spots on leaves (Target spots)',
      'Dark sunken rotting spots at blossom end of fruit',
      'Curled, leathery small leaves with yellowing',
      'Water-soaked lesions on stems and green fruit'
    ],
    diseaseCauses: [
      'Alternaria solani fungal spores in high humidity',
      'Calcium deficiency causing Blossom End Rot',
      'Whitefly vector spreading Tomato Leaf Curl Virus'
    ],
    preventionMethods: [
      'Stake indeterminate plants using bamboo poles to lift foliage off ground',
      'Drip irrigation to keep foliage dry',
      'Foliar spray of Calcium Nitrate @ 5g/L during fruit set'
    ],
    organicTreatment: [
      'Spray copper-based bio-fungicide or Trichoderma',
      'Foliar application of fermented cow milk whey (10% v/v)'
    ],
    chemicalTreatment: [
      'Spray Azoxystrobin + Difenoconazole @ 1 ml/L',
      'Mancozeb 75% WP @ 2.5 g/L at 10-day intervals'
    ],
    commonPests: ['Fruit Borer (Helicoverpa armigera)', 'Whitefly', 'Leafminer', 'Red Spider Mite'],
    farmingTips: [
      'Mulch with silver-black plastic sheet to conserve water and repel whiteflies',
      'Prune lower suckers to improve light penetration and fruit size'
    ],
    storageMethods: ['Store mature green tomatoes at 12-15°C; ripe tomatoes at 8-10°C with high RH (85-90%).'],
    marketUses: ['Fresh market retail', 'Tomato paste & ketchup processing', 'Canned peeled tomatoes', 'Dehydrated powder'],
    foodUses: ['Salads, Curries, Soups, Sauces, Ketchup, Juices, Stews']
  },
  {
    id: 'potato',
    name: 'Potato',
    icon: '🥔',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'World\'s fourth-largest food crop producing high-energy starchy underground tubers.',
    category: 'Vegetables',
    scientificName: 'Solanum tuberosum',
    commonName: 'Potato, Aloo',
    suitableRegions: ['Temperate zones, cool tropical highlands, Indo-Gangetic plains'],
    climate: 'Cool climate crop (15°C to 20°C); tuberization stops above 28°C.',
    soilType: 'Friable, well-aerated sandy loam with pH 5.2 - 6.4 (slightly acidic reduces scab).',
    waterRequirement: '400 - 600 mm water, requires consistent shallow irrigation.',
    fertilizerRecommendation: 'N:P:K ratio of 180:100:150 kg/ha.',
    nutrientRequirements: 'High potassium requirement for tuber swelling and dry matter starch accumulation.',
    growingSeason: 'Winter (Rabi) season in plains; Spring/Summer in cool hills.',
    sowingMethod: 'Planting disease-free seed tubers on ridges.',
    plantSpacing: '50 cm x 20 cm (Ridge to Ridge x Tuber to Tuber).',
    harvestTime: '80 to 110 days after planting when haulms turn yellow.',
    averageYield: '25 to 40 Tons per Hectare.',
    commonDiseasesList: [
      {
        name: 'Late Blight (Phytophthora infestans)',
        symptoms: ['Water-soaked dark lesions on leaf tips/margins with white mildew on underside in wet weather'],
        causes: ['Cool, foggy humid conditions (10-20°C and RH >90%)'],
        prevention: ['Plant certified seed tubers', 'Prophylactic fungicide spray before fog'],
        organicTreatment: ['Bordeaux mixture 1% spray'],
        chemicalTreatment: ['Cymoxanil + Mancozeb @ 2g/L or Metalaxyl + Mancozeb']
      }
    ],
    diseaseSymptoms: [
      'Blackish water-soaked spots on leaves',
      'White cottony fungal growth on lower leaf surface',
      'Brown decay and dry rot inside tubers',
      'Black scabs on tuber skin'
    ],
    diseaseCauses: [
      'Cool temperatures combined with high atmospheric humidity or heavy fog',
      'Infected seed tubers carrying latent Phytophthora pathogen',
      'Excessive overhead sprinkler irrigation'
    ],
    preventionMethods: [
      'Use disease-free seed tubers from certified tissue culture sources',
      'Earthing up properly to cover developing tubers under 10 cm soil cover',
      'Cut Haulms (dehaulming) 10 days before harvesting tubers'
    ],
    organicTreatment: [
      'Spray 1% Bordeaux mixture on leaves',
      'Apply Trichoderma viride enriched compost to soil'
    ],
    chemicalTreatment: [
      'Prophylactic spray of Mancozeb 75 WP @ 2.5 g/L',
      'Curative spray of Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L'
    ],
    commonPests: ['Potato Tuber Moth (PTM)', 'Aphids', 'Cutworms', 'White Grubs'],
    farmingTips: [
      'Perform earthing up twice at 25 and 45 days after planting to prevent greening of tubers from sunlight',
      'Destroy weed hosts belonging to Solanaceae family'
    ],
    storageMethods: ['Cold storage at 4°C to 7°C with 90-95% RH to prevent sprouting and rot.'],
    marketUses: ['Fresh vegetable market', 'Potato chips & French fries processing', 'Starch & alcohol extraction'],
    foodUses: ['French fries, Chips, Mashed potato, Curries, Samosas, Hash browns']
  },
  {
    id: 'chili',
    name: 'Chili Pepper',
    icon: '🌶',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Pungent spice crop rich in capsaicin, Vitamin C, and natural oleoresins.',
    category: 'Vegetables',
    scientificName: 'Capsicum annuum',
    commonName: 'Chili, Red Pepper, Mirchi',
    suitableRegions: ['Tropical and Subtropical regions globally'],
    climate: 'Warm humid climate (20°C to 30°C); excessive rain causes fruit drop.',
    soilType: 'Well-drained sandy loam or black soil rich in humus with pH 6.0 - 7.0.',
    waterRequirement: 'Moderate (500 - 700 mm); waterlogging causes damping off.',
    fertilizerRecommendation: 'N:P:K ratio of 120:60:60 kg/ha.',
    nutrientRequirements: 'Boron application prevents flower drop; potassium improves spice pungency and color.',
    growingSeason: 'Kharif and Rabi in frost-free regions.',
    sowingMethod: 'Transplanting 30-35 day old seedlings from nursery beds.',
    plantSpacing: '45 cm x 45 cm.',
    harvestTime: '60-70 days after transplanting for green chilies; 90-100 days for red chilies.',
    averageYield: '15 to 25 Tons/ha green chilies; 2.5 to 3.5 Tons/ha dry red chilies.',
    commonDiseasesList: [
      {
        name: 'Chili Leaf Curl Virus (ChLCV)',
        symptoms: ['Upward curling of leaf margins, puckering, reduced leaf size, and bushiness'],
        causes: ['Whitefly (Bemisia tabaci) vector transmission'],
        prevention: ['Use net barrier in nursery', 'Erect yellow sticky traps'],
        organicTreatment: ['Spray 5% NSKE + Neem oil'],
        chemicalTreatment: ['Spray Acetamiprid 20 SP @ 0.2g/L or Fipronil @ 1.5ml/L']
      }
    ],
    diseaseSymptoms: [
      'Leaf curling and crowding of top branches (Murda disease)',
      'Sunken circular black spots on pods (Anthracnose / Dieback)',
      'Rotting at base of stem in young seedlings (Damping off)'
    ],
    diseaseCauses: [
      'Thrips and Mites causing downward leaf curling',
      'Whiteflies spreading Chili Leaf Curl Virus',
      'Colletotrichum capsici fungal pathogen causing fruit rot'
    ],
    preventionMethods: [
      'Seed treatment with Thiram or Trichoderma @ 4g/kg',
      'Intercrop with maize or sorghum as border crops to stop whiteflies',
      'Avoid continuous cropping of pepper/tomato'
    ],
    organicTreatment: [
      'Spray sour buttermilk + fermented neem leaf decoction',
      'Apply blue and yellow sticky traps @ 25 each per acre'
    ],
    chemicalTreatment: [
      'Spray Azoxystrobin 23% SC @ 1 ml/L for Anthracnose fruit rot',
      'Spray Spiromesifen 22.9% SC @ 1 ml/L for chili mites'
    ],
    commonPests: ['Chili Thrips (Scirtothrips dorsalis)', 'Yellow Mites', 'Whitefly', 'Fruit Borer'],
    farmingTips: [
      'Spray Planofix (NAA) @ 10 ppm during peak flowering to prevent flower drop',
      'Provide silver plastic mulching to reduce vector infestation and retain soil moisture'
    ],
    storageMethods: ['Sun-dry red chilies to 10% moisture and store in dry gunny bags in dark cool storehouses.'],
    marketUses: ['Spice powder', 'Capsaicin extraction for pharmaceuticals', 'Chili oleoresin for colorants', 'Pickling'],
    foodUses: ['Curry spice powder, Hot sauces, Pickles, Fresh green chili seasoning']
  },
  {
    id: 'onion',
    name: 'Onion',
    icon: '🧅',
    image: 'https://images.unsplash.com/photo-1536235551740-15dc337df024?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Essential bulb vegetable containing sulfur compounds that impart distinct flavor and aroma.',
    category: 'Vegetables',
    scientificName: 'Allium cepa',
    commonName: 'Onion, Pyaz',
    suitableRegions: ['Temperate and Subtropical regions globally'],
    climate: 'Cool temperature (13-24°C) for bulb development; warm dry weather for bulb maturity.',
    soilType: 'Deep friable loamy soil rich in organic matter with pH 6.0 - 7.0.',
    waterRequirement: '350 - 550 mm water; requires frequent light irrigation.',
    fertilizerRecommendation: 'N:P:K ratio of 100:50:50 kg/ha + 30 kg/ha Sulfur.',
    nutrientRequirements: 'Sulfur is crucial for characteristic pungency and storage shelf life.',
    growingSeason: 'Kharif, Late Kharif, and Rabi seasons.',
    sowingMethod: 'Transplanting 6-8 week old seedlings or planting small sets.',
    plantSpacing: '15 cm x 10 cm.',
    harvestTime: '100 to 140 days after transplanting when 50% tops fall over.',
    averageYield: '20 to 35 Tons per Hectare.',
    commonDiseasesList: [
      {
        name: 'Purple Blotch (Alternaria porri)',
        symptoms: ['Small water-soaked sunken lesions with purple centers on leaves and seed stalks'],
        causes: ['Warm moist weather with frequent dew and rain'],
        prevention: ['Balanced fertilization with sulfur', 'Avoid dense planting'],
        organicTreatment: ['Foliar Trichoderma spray + bio-sulfur'],
        chemicalTreatment: ['Spray Mancozeb 75 WP @ 2.5g/L or Tebuconazole @ 1ml/L']
      }
    ],
    diseaseSymptoms: [
      'Purple spots with yellow halo on leaves',
      'Pale yellow streaks and downy white growth (Downy Mildew)',
      'Black powdery mold on neck and scales during storage (Black Mold)'
    ],
    diseaseCauses: [
      'Alternaria porri fungal pathogen in rainy conditions',
      'Aspergillus niger fungal spores in hot humid storage',
      'Thrips infestation causing silver patches'
    ],
    preventionMethods: [
      'Apply elemental sulfur @ 30 kg/ha at land preparation',
      'Stop irrigation 15 days prior to bulb harvest',
      'Thorough field curing for 3-5 days under shade after harvest'
    ],
    organicTreatment: [
      'Foliar spray of 3% Neem oil + garlic solution',
      'Trichoderma viride application @ 5 g/L'
    ],
    chemicalTreatment: [
      'Spray Difenoconazole 25 EC @ 1 ml/L',
      'Mancozeb 75 WP @ 2.5 g/L mixed with sticker agent'
    ],
    commonPests: ['Onion Thrips (Thrips tabaci)', 'Head Caterpillar', 'Root Maggot'],
    farmingTips: [
      'Neck cutting should leave 2-3 cm stem attached to prevent fungal entry into bulb',
      'Erect blue sticky traps @ 20/acre for thrips monitoring'
    ],
    storageMethods: ['Store cured bulbs in well-ventilated wooden crates or traditional thatched structures at 25-30°C and 65-70% RH.'],
    marketUses: ['Fresh culinary vegetable', 'Dehydrated onion flakes & powder', 'Oil seasoning', 'Pickling'],
    foodUses: ['Sautéed base for gravies, Salads, Soups, Pickles, Rings']
  },
  {
    id: 'banana',
    name: 'Banana',
    icon: '🍌',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'High-energy tropical fruit crop produced from large herbaceous flowering plants.',
    category: 'Fruits',
    scientificName: 'Musa acuminata',
    commonName: 'Banana, Plantain, Kela',
    suitableRegions: ['Humid tropical lowlands', 'India', 'Ecuador', 'Philippines', 'Brazil'],
    climate: 'Warm humid tropical climate (26°C to 35°C), requires high rainfall or heavy irrigation.',
    soilType: 'Deep, fertile well-drained loamy soil with high organic content and pH 6.0 - 7.5.',
    waterRequirement: 'Very high (1800 - 2200 mm) per annual crop cycle.',
    fertilizerRecommendation: 'N:P:K ratio of 200:50:300 grams per plant per year applied in split doses.',
    nutrientRequirements: 'Extremely high potassium demand for fruit bunch weight and sugar content.',
    growingSeason: 'Planting during monsoon (June-July) or spring (Feb-March).',
    sowingMethod: 'Planting sword suckers or tissue culture banana plantlets.',
    plantSpacing: '1.8 m x 1.8 m or 2.0 m x 1.5 m under high density.',
    harvestTime: '11 to 14 months after planting when angles on fingers disappear.',
    averageYield: '50 to 90 Tons per Hectare.',
    commonDiseasesList: [
      {
        name: 'Sigatoka Leaf Spot (Mycosphaerella musicola)',
        symptoms: ['Small pale yellow spots turning into dark brown necrotic streaks with yellow halos'],
        causes: ['High humidity, rainfall, and wind-blown spores'],
        prevention: ['Remove affected lower leaves', 'Ensure proper field drainage'],
        organicTreatment: ['Foliar spray of mineral oil or Neem extract'],
        chemicalTreatment: ['Spray Propiconazole @ 1ml/L or Carbendazim @ 1g/L']
      },
      {
        name: 'Panama Wilt / Fusarium Wilt (Fusarium oxysporum f. sp. cubense TR4)',
        symptoms: ['Yellowing of lower leaves, longitudinal splitting of pseudostem base, internal vascular discoloration'],
        causes: ['Soil-borne fungal pathogen invading roots'],
        prevention: ['Use disease-free tissue culture plants', 'Avoid soil movement from infected fields'],
        organicTreatment: ['Soil drenching with Pseudomonas fluorescens and Trichoderma'],
        chemicalTreatment: ['Injecting 2% Carbendazim solution into pseudostem']
      }
    ],
    diseaseSymptoms: [
      'Yellow leaf margins drying into brown streaks (Sigatoka)',
      'Splitting of pseudostem base and vascular browning (Panama Wilt)',
      'Bunchy rosette appearance of leaves at top (Bunchy Top Virus)'
    ],
    diseaseCauses: [
      'Mycosphaerella fungal spores spreading in rain splash',
      'Fusarium oxysporum soil-borne fungus surviving decades',
      'Banana Aphid (Pentalonia nigronervosa) transmitting Bunchy Top Virus'
    ],
    preventionMethods: [
      'Plant certified tissue culture plantlets tested free of viruses',
      'De-suckering regularly to maintain single main stem per pit',
      'Provide sturdy bamboo props to support heavy bunches'
    ],
    organicTreatment: [
      'Soil application of Trichoderma viride @ 25g/plant',
      'Foliar spray of 1% petroleum spray oil'
    ],
    chemicalTreatment: [
      'Spray Propiconazole 25 EC @ 1 ml/L for Sigatoka',
      'Inject 3 ml of 2% Carbendazim into pseudostem at 45cm height'
    ],
    commonPests: ['Banana Pseudostem Weevil', 'Rhizome Weevil', 'Banana Aphid', 'Nematodes'],
    farmingTips: [
      'Cover developing fruit bunches with blue perforated polypropylene sleeves to boost skin quality and prevent insect damage',
      'Denaveling (removing male flower bud) after last hand opens improves bunch weight'
    ],
    storageMethods: ['Store harvested green bunches at 13-14°C with 90% RH; ethylene ripening chambers at 18-20°C.'],
    marketUses: ['Fresh dessert fruit', 'Banana chips processing', 'Banana fiber handicrafts', 'Baby food puree'],
    foodUses: ['Fresh fruit, Banana bread, Chips, Smoothies, Plantain curries, Raw banana stir-fry']
  },
  {
    id: 'mango',
    name: 'Mango',
    icon: '🥭',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Regarded as the "King of Fruits", a succulent stone fruit prized for rich aroma and flavor.',
    category: 'Fruits',
    scientificName: 'Mangifera indica',
    commonName: 'Mango, Aam',
    suitableRegions: ['Tropical and Subtropical lowlands worldwide'],
    climate: 'Warm dry weather during flowering (24°C to 35°C); rain during bloom causes flower drop.',
    soilType: 'Deep, well-drained alluvial or red loamy soil with pH 5.5 - 7.5.',
    waterRequirement: 'Moderate; critical during young stage and fruit development.',
    fertilizerRecommendation: 'N:P:K ratio of 1000:500:1000 grams per mature tree per year.',
    nutrientRequirements: 'Potassium and micronutrients (Boron, Zinc) applied post-harvest for uniform bloom.',
    growingSeason: 'Perennial orchard; main harvest season summer (April to July).',
    sowingMethod: 'Grafting (Veneer, Softwood, or Epicotyl grafting) planted in deep pits.',
    plantSpacing: '10 m x 10 m traditional; 5 m x 5 m high density planting.',
    harvestTime: '3 to 5 months after flowering when fruit shoulders broaden and skin turns yellowish.',
    averageYield: '10 to 18 Tons per Hectare mature orchard.',
    commonDiseasesList: [
      {
        name: 'Powdery Mildew (Oidium mangiferae)',
        symptoms: ['White powdery fungal coating on panicles, young leaves, and developing fruitlets'],
        causes: ['Cool nights and warm humid days during panicle emergence'],
        prevention: ['Prune dense canopy for light aeration', 'Monitor panicles'],
        organicTreatment: ['Spray Wettable Sulfur @ 3g/L or Neem oil'],
        chemicalTreatment: ['Hexaconazole 5 EC @ 1ml/L or Karathane']
      },
      {
        name: 'Anthracnose (Colletotrichum gloeosporioides)',
        symptoms: ['Dark brown blights on leaves, panicle wither, tear-stain black lesions on maturing fruit'],
        causes: ['High rainfall and high humidity during fruit set'],
        prevention: ['Post-harvest hot water fruit treatment at 52°C for 5 mins'],
        organicTreatment: ['Foliar spray of Trichoderma formulation'],
        chemicalTreatment: ['Spray Copper Oxychloride @ 3g/L or Carbendazim']
      }
    ],
    diseaseSymptoms: [
      'White powdery coating on flowers causing blossom drop',
      'Black sunken tear-stain spots on fruit skin',
      'Malformation of panicles turning into compact bunchy mass (Mango Malformation)'
    ],
    diseaseCauses: [
      'Oidium mangiferae fungal spores blown by wind during bloom',
      'Colletotrichum fungus spreading during monsoon rains',
      'Eriophyid mites transmitting Mango Malformation'
    ],
    preventionMethods: [
      'Prune dead branches and diseased panicles after harvest',
      'Smudge orchards or maintain light trap monitoring for hoppers',
      'Avoid high nitrogen application prior to flowering'
    ],
    organicTreatment: [
      'Spray Wettable Sulfur 80 WP @ 3 g/L',
      'Foliar neem oil spray (5 ml/L) mixed with liquid soap'
    ],
    chemicalTreatment: [
      'Spray Hexaconazole 5% EC @ 1 ml/L at panicle emergence',
      'Carbendazim 50 WP @ 1g/L for anthracnose prevention'
    ],
    commonPests: ['Mango Hopper (Idioscopus spp.)', 'Fruit Fly', 'Mealybug', 'Bark Eating Caterpillar'],
    farmingTips: [
      'Wrap plastic slippery bands around tree trunk at 1m height to prevent mealybug nymphs from crawling up',
      'Hang Methyl Eugenol pheromone traps @ 10/ha to trap male fruit flies'
    ],
    storageMethods: ['Store harvested fruit at 12-13°C with 85-90% RH; dip in hot water (52°C) for 5 minutes to control anthracnose.'],
    marketUses: ['Fresh table fruit', 'Pulp & juice concentrate', 'Mango pickle & chutney', 'Dried fruit leather (Aam Papad)'],
    foodUses: ['Fresh slice, Mango lassi, Smoothies, Pickles, Ice creams, Desserts']
  },
  {
    id: 'coconut',
    name: 'Coconut',
    icon: '🥥',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'The "Tree of Life", a coastal palm providing water, oil, copra, fiber, and timber.',
    category: 'Cash Crops',
    scientificName: 'Cocos nucifera',
    commonName: 'Coconut, Nariyal',
    suitableRegions: ['Coastal tropical belts', 'South India', 'Indonesia', 'Philippines', 'Sri Lanka'],
    climate: 'Warm humid tropical climate (27°C to 35°C) with high sunshine and maritime humidity.',
    soilType: 'Deep sandy loams, coastal sands, or alluvial soils with good drainage and pH 5.2 - 8.0.',
    waterRequirement: 'High (1300 - 2300 mm) evenly distributed; requires 150-200 L/palm/day under drip.',
    fertilizerRecommendation: 'N:P:K ratio of 500:320:1200 grams per palm per year + Magnesium.',
    nutrientRequirements: 'High requirement for Potassium and Chlorine (salt) for water regulation and nut setting.',
    growingSeason: 'Perennial palm bearing monthly bunches year-round after maturity.',
    sowingMethod: 'Planting selected 10-12 month old tall or hybrid coconut seedlings in deep pits.',
    plantSpacing: '7.5 m x 7.5 m in triangular or square pattern.',
    harvestTime: '4 to 6 years after planting for hybrids; monthly harvesting of mature nuts.',
    averageYield: '80 to 140 nuts per palm per year.',
    commonDiseasesList: [
      {
        name: 'Bud Rot (Phytophthora palmivora)',
        symptoms: ['Yellowing and drooping of central spindle leaf, rotting of crown bud with foul odor'],
        causes: ['Heavy monsoon rains, continuous wet weather, and high relative humidity'],
        prevention: ['Clear crown before monsoon', 'Apply fungicide paste on central bud'],
        organicTreatment: ['Bordeaux paste application on crown bud'],
        chemicalTreatment: ['Copper Oxychloride 0.3% drenching on crown']
      }
    ],
    diseaseSymptoms: [
      'Spear leaf turns yellow and wilts with rotten base',
      'Outer fronds droop and hang around trunk (Stem Bleeding / Crown Rot)',
      'Premature nut fall and button shedding'
    ],
    diseaseCauses: [
      'Phytophthora palmivora fungus in monsoon moisture',
      'Thielaviopsis paradoxa fungus causing stem bleeding through trunk cracks',
      'Rhinoceros beetle damages spindle leaf creating entry holes for rot'
    ],
    preventionMethods: [
      'Clean crown area twice a year before pre-monsoon and post-monsoon',
      'Fill top leaf axils with 250g Neem cake + sand mixture',
      'Avoid root damage during inter-cultivation'
    ],
    organicTreatment: [
      'Apply Trichoderma harzianum coir-pith cake to root zone',
      'Apply Bordeaux paste (10%) on stem bleeding cracks'
    ],
    chemicalTreatment: [
      'Root feeding with Hexaconazole 2% solution (15 ml in 100 ml water)',
      'Copper Hydroxide 77% WP @ 2g/L crown drenching'
    ],
    commonPests: ['Rhinoceros Beetle', 'Red Palm Weevil', 'Eriophyid Mite', 'Black Headed Caterpillar'],
    farmingTips: [
      'Release parasitoid Goniozus nephantidis to naturally suppress Black Headed Caterpillar',
      'Grow intercrops like cocoa, banana, or pepper under coconut palm canopy to double farm income'
    ],
    storageMethods: ['Store harvested mature nuts in dry ventilated sheds stacked up to 1 meter high.'],
    marketUses: ['Coconut oil milling', 'Tender coconut water market', 'Desiccated coconut powder', 'Coir fiber mattress & geotextiles'],
    foodUses: ['Tender coconut drink, Coconut milk curries, Chutneys, Grated desserts, Cooking oil']
  },
  {
    id: 'groundnut',
    name: 'Groundnut (Peanut)',
    icon: '🥜',
    image: 'https://images.unsplash.com/photo-1545036584-64f4c5c75467?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Leguminous oilseed crop producing protein-rich subterranean pods and edible oil.',
    category: 'Legumes',
    scientificName: 'Arachis hypogaea',
    commonName: 'Groundnut, Peanut, Mungfali',
    suitableRegions: ['Semi-arid tropical regions', 'India', 'China', 'USA', 'Nigeria'],
    climate: 'Warm season crop (25°C to 30°C); requires sunny days for pegging.',
    soilType: 'Well-drained loose, friable sandy loam rich in calcium with pH 6.0 - 7.5.',
    waterRequirement: '500 - 700 mm; uniform moisture during flowering and peg penetration is vital.',
    fertilizerRecommendation: 'N:P:K ratio of 25:50:75 kg/ha + 200 kg Gypsum/ha.',
    nutrientRequirements: 'Calcium (Gypsum) at flowering is indispensable for proper pod filling (pod rot prevention).',
    growingSeason: 'Kharif (rainfed) and Summer (irrigated).',
    sowingMethod: 'Sowing seed kernels using seed drills or dibbling.',
    plantSpacing: '30 cm x 10 cm.',
    harvestTime: '100 to 120 days after sowing when inner pod shell turns dark brown.',
    averageYield: '2.0 to 3.5 Tons per Hectare dry pods.',
    commonDiseasesList: [
      {
        name: 'Tikka Leaf Spot / Cercospora Spot',
        symptoms: ['Circular dark brown spots on upper leaf surface with yellow chlorotic halos'],
        causes: ['High atmospheric humidity and wet leaf canopy'],
        prevention: ['Crop rotation with cereals', 'Seed treatment'],
        organicTreatment: ['Foliar neem seed kernel extract (5%) spray'],
        chemicalTreatment: ['Spray Carbendazim @ 1g/L + Mancozeb @ 2g/L']
      }
    ],
    diseaseSymptoms: [
      'Small brown to black circular spots on leaves (Tikka disease)',
      'Wilting of plants with white fungal mycelium at collar region (Collar Rot)',
      'Yellowing and stunting due to Peanut Bud Necrosis Virus'
    ],
    diseaseCauses: [
      'Cercospora arachidicola fungal spores',
      'Aspergillus niger fungal seed/soil infection',
      'Thrips vector spreading Bud Necrosis Virus'
    ],
    preventionMethods: [
      'Seed treatment with Trichoderma viride @ 10g/kg seed',
      'Apply Gypsum @ 200 kg/ha at peak flowering (45 DAP)',
      'Ensure soil is light and friable so pegs enter soil easily'
    ],
    organicTreatment: [
      'Spray sour buttermilk 10% solution',
      'Apply bio-fungicide Pseudomonas fluorescens'
    ],
    chemicalTreatment: [
      'Tebuconazole 25.9 EC @ 1.5 ml/L water',
      'Mancozeb 75 WP @ 2 g/L at 15-day intervals'
    ],
    commonPests: ['Red Hairy Caterpillar', 'Tobacco Caterpillar (Spodoptera)', 'Groundnut Aphids', 'White Grubs'],
    farmingTips: [
      'Do NOT deep cultivate or disturb soil after pegging starts to avoid snapping delicate underground pegs',
      'Apply Bradyrhizobium inoculant to boost atmospheric nitrogen fixation'
    ],
    storageMethods: ['Dry pods to <8% moisture level before bagging to avoid Aflatoxin mold growth (Aspergillus flavus).'],
    marketUses: ['Edible groundnut oil', 'Peanut butter manufacturing', 'De-oiled cake for livestock feed', 'Roasted snack food'],
    foodUses: ['Roasted peanuts, Peanut butter, Chikki (jaggery snack), Cooking oil, Peanut chutney']
  },
  {
    id: 'soybean',
    name: 'Soybean',
    icon: '🌱',
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Miracle pulse crop rich in 40% protein and 20% oil driving global food and feed industry.',
    category: 'Legumes',
    scientificName: 'Glycine max',
    commonName: 'Soybean, Soya Bean',
    suitableRegions: ['USA', 'Brazil', 'Argentina', 'China', 'Central India'],
    climate: 'Warm humid summer climate (22°C to 30°C); sensitive to waterlogging and frost.',
    soilType: 'Well-drained fertile clay loams or black soils rich in organic carbon with pH 6.0 - 7.5.',
    waterRequirement: '450 - 700 mm; pod filling is the most moisture-sensitive phase.',
    fertilizerRecommendation: 'N:P:K ratio of 30:60:40 kg/ha + 20 kg/ha Sulfur.',
    nutrientRequirements: 'Requires Rhizobium inoculation for nitrogen fixation; sulfur improves oil and protein.',
    growingSeason: 'Kharif crop: June-July sowing and September-October harvest.',
    sowingMethod: 'Line sowing with seed drill.',
    plantSpacing: '45 cm x 5-7 cm.',
    harvestTime: '90 to 110 days when leaves turn yellow and drop off.',
    averageYield: '2.2 to 3.2 Tons per Hectare.',
    commonDiseasesList: [
      {
        name: 'Soybean Rust (Phakopsora pachyrhizi)',
        symptoms: ['Tiny reddish-brown tan pustules on underside of leaves leading to premature defoliation'],
        causes: ['Airborne spores favored by prolonged leaf wetness and moderate temps (15-28°C)'],
        prevention: ['Use tolerant cultivars', 'Early uniform planting'],
        organicTreatment: ['Foliar bio-sulfur + Neem oil spray'],
        chemicalTreatment: ['Hexaconazole 5 EC @ 1ml/L or Propiconazole @ 1ml/L']
      }
    ],
    diseaseSymptoms: [
      'Small reddish brown pustules on lower leaves (Soybean Rust)',
      'Yellow mosaic patches on leaf blade (Yellow Mosaic Virus)',
      'Sunken brown lesions on pods (Anthracnose)'
    ],
    diseaseCauses: [
      'Phakopsora pachyrhizi rust fungus',
      'Whitefly vector transmitting Yellow Mosaic Virus',
      'Infected seeds carrying Colletotrichum truncatum'
    ],
    preventionMethods: [
      'Inoculate seeds with Bradyrhizobium japonicum @ 10g/kg',
      'Maintain Optimum plant density (400,000 plants/ha)',
      'Deep summer plowing to destroy soil-borne pupae and pathogens'
    ],
    organicTreatment: [
      'Spray 5% NSKE (Neem Seed Kernel Extract)',
      'Bio-control using Pseudomonas fluorescens @ 10g/L'
    ],
    chemicalTreatment: [
      'Spray Tebuconazole 25.9 EC @ 1.25 ml/L',
      'Pyroclostrobin 20% WG @ 1g/L for rust and anthracnose'
    ],
    commonPests: ['Girdle Beetle', 'Tobacco Caterpillar (Spodoptera litura)', 'Green Semilooper', 'Whitefly'],
    farmingTips: [
      'Broadbed Furrow (BBF) planting method prevents waterlogging in heavy rainfall zones',
      'Install bird perches @ 50/ha to encourage natural predation of caterpillars'
    ],
    storageMethods: ['Store clean seeds at <10% moisture in cool dry warehouses away from wall contact.'],
    marketUses: ['Soybean oil refining', 'Soy meal for poultry & livestock feed', 'Soya lecithin', 'Bioplastics'],
    foodUses: ['Tofu, Soy milk, Textured Vegetable Protein (Soya chunks), Soy sauce, Edamame']
  },
  {
    id: 'pulses',
    name: 'Pulses (Chickpea/Lentil)',
    icon: '🌿',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Protein-packed grain legumes that fix atmospheric nitrogen and enhance soil fertility.',
    category: 'Legumes',
    scientificName: 'Cicer arietinum (Chickpea) / Lens culinaris (Lentil)',
    commonName: 'Pulses, Chickpea, Chana, Dal',
    suitableRegions: ['Semi-arid tropics, Mediterranean, India, Canada, Australia'],
    climate: 'Cool dry winter season crop (15°C to 25°C); frost during flowering causes pod abortion.',
    soilType: 'Medium to heavy well-drained soils with good water holding capacity and pH 6.0 - 8.0.',
    waterRequirement: 'Low water requirement (250 - 400 mm); highly drought tolerant.',
    fertilizerRecommendation: 'N:P:K ratio of 20:50:20 kg/ha + 20 kg Sulfur/ha.',
    nutrientRequirements: 'Responds strongly to Phosphorus for root nodulation and early vigor.',
    growingSeason: 'Rabi (Winter) season: October-November sowing and March-April harvest.',
    sowingMethod: 'Broadcasting or line sowing with seed drill.',
    plantSpacing: '30 cm x 10 cm.',
    harvestTime: '100 to 120 days after sowing when plants turn straw-colored.',
    averageYield: '1.5 to 2.5 Tons per Hectare.',
    commonDiseasesList: [
      {
        name: 'Fusarium Wilt (Fusarium oxysporum f. sp. ciceris)',
        symptoms: ['Drooping of leaves, wilting of whole plant, internal dark brown vascular discoloration'],
        causes: ['Soil-borne fungal pathogen invading root system'],
        prevention: ['Grow wilt-resistant varieties like JG 11 or Samrat', 'Deep summer plowing'],
        organicTreatment: ['Seed treatment with Trichoderma viride @ 10g/kg seed'],
        chemicalTreatment: ['Seed treatment with Carbendazim + Thiram (1:1) @ 2g/kg']
      }
    ],
    diseaseSymptoms: [
      'Sudden drooping and drying of branches (Wilt)',
      'Greyish mold on flowers and pods (Botrytis Grey Mold)',
      'Dark brown circular spots on leaves and pods (Ascochyta Blight)'
    ],
    diseaseCauses: [
      'Fusarium oxysporum soil fungus persisting for years',
      'High humidity during bloom causing Botrytis infection',
      'Cool wet weather favoring Ascochyta fungal spore spread'
    ],
    preventionMethods: [
      'Treat seeds with Mesorhizobium and PSB (Phosphate Solubilizing Bacteria)',
      'Crop rotation for 3 years with non-legumes like wheat or mustard',
      'Avoid excessive irrigation during vegetative phase'
    ],
    organicTreatment: [
      'Apply Trichoderma viride enriched farmyard manure',
      'Foliar spray of 3% Panchagavya'
    ],
    chemicalTreatment: [
      'Seed treatment with Carboxin 37.5% + Thiram 37.5% @ 2g/kg',
      'Spray Carbendazim 50 WP @ 1g/L for leaf spots'
    ],
    commonPests: ['Gram Pod Borer (Helicoverpa armigera)', 'Cutworm', 'Pulse Beetle (Callosobruchus in storage)'],
    farmingTips: [
      'Nipping (pinching top shoots at 30-40 DAP) stimulates profuse branching and increases pod count',
      'Set up Helicoverpa sex pheromone traps @ 12/ha'
    ],
    storageMethods: ['Store dried seeds (<10% moisture) mixed with activated clay or neem seed powder in hermetic bags.'],
    marketUses: ['Split pulse (Dal) processing', 'Gram flour (Besan)', 'Confectionery', 'Livestock fodder'],
    foodUses: ['Dal curries, Hummus, Besan sweets, Roasted chana, Sprouts, Soups']
  },
  {
    id: 'sugarcane_sweet',
    name: 'Sugarcane & Energy Cane',
    icon: '🎋',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'High-biomass crop for sustainable bioenergy, renewable fuel, and organic jaggery.',
    category: 'Cash Crops',
    scientificName: 'Saccharum spontaneum / officinarum',
    commonName: 'Energy Cane, Sweet Sorghum/Cane',
    suitableRegions: ['Subtropical & Tropical river basins'],
    climate: 'Warm sunlit plains with 25-35°C temperature.',
    soilType: 'Deep alluvial loams with pH 6.5 - 8.0.',
    waterRequirement: '1200 - 1800 mm water.',
    fertilizerRecommendation: 'N:P:K 200:60:60 kg/ha.',
    nutrientRequirements: 'Nitrogen for stalk height, potassium for sucrose density.',
    growingSeason: 'Autumn/Spring planting.',
    sowingMethod: 'Trench sett planting.',
    plantSpacing: '120 cm row spacing.',
    harvestTime: '12 months duration.',
    averageYield: '85 Tons/ha.',
    commonDiseasesList: [
      {
        name: 'Smut (Sporisorium scitamineum)',
        symptoms: ['Long whip-like black dusty structure emerging from terminal bud'],
        causes: ['Airborne fungal teliospores entering buds'],
        prevention: ['Rogue out smut whips in plastic bags', 'Hot water sett treatment'],
        organicTreatment: ['Sett dip in Trichoderma suspension'],
        chemicalTreatment: ['Sett treatment with Triadimefon @ 1g/L']
      }
    ],
    diseaseSymptoms: ['Black whip emergence', 'Red stalk decay', 'Foliar yellowing'],
    diseaseCauses: ['Spores in high heat & humidity'],
    preventionMethods: ['Resistant varieties', 'Clean setts'],
    organicTreatment: ['Bio-fungicide sett dip'],
    chemicalTreatment: ['Carbendazim 0.1% sett dip'],
    commonPests: ['Shoot Borer', 'White Fly'],
    farmingTips: ['Trash mulching for water saving'],
    storageMethods: ['Process within 24h of harvest.'],
    marketUses: ['Bioethanol', 'Paper pulp', 'Jaggery'],
    foodUses: ['Natural juice, Jaggery, Sugar']
  }
];
