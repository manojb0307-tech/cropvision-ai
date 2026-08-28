import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, '..', 'test-images', 'crop-databases');
const IMAGES_DIR = path.join(__dirname, '..', 'test-images', 'crop-diseases');

// ══════════════════════════════════════════════════════════════════════════════
// ALL CROPS AND THEIR DISEASES
// ══════════════════════════════════════════════════════════════════════════════

const CROP_DISEASES = {
  wheat: {
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Cereals',
    diseases: [
      {
        id: 'yellow_rust',
        name: 'Yellow Rust (Stripe Rust)',
        scientificName: 'Puccinia striiformis',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'leaves',
        description: 'Fungal disease causing bright yellow pustules in linear stripes along leaf veins.',
        symptoms: ['Bright yellow pustules arranged in linear stripes along leaf veins', 'Leaves turn yellow and dry prematurely', 'Reduced grain filling and yield loss', 'Pustules may merge covering entire leaf surface'],
        causes: ['Cool moist temperatures (10-15°C) favor spore germination', 'Wind-blown fungal urediniospores', 'High relative humidity above 90%', 'Dense crop canopy reducing airflow'],
        treatments: {
          immediate: 'Remove and destroy heavily infected leaves.',
          chemical: 'Propiconazole 25% EC (1 ml/L) or Tebuconazole 250 EC (1.25 ml/L).',
          biological: 'Trichoderma harzianum soil application. Garlic extract spray.',
          cultural: 'Grow resistant cultivars. Timely early winter sowing.',
          prevention: 'Seed treatment with Carboxin (2g/kg). Balanced potassium fertilization.',
          timeline: 'First spray at disease appearance, repeat after 10-15 days.'
        }
      },
      {
        id: 'brown_rust',
        name: 'Brown Rust (Leaf Rust)',
        scientificName: 'Puccinia triticina',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'leaves',
        description: 'Common rust disease producing brown pustules on leaf surfaces.',
        symptoms: ['Small brown-orange pustules scattered on leaf surfaces', 'Yellowing around infection sites', 'Premature leaf senescence', 'Reduced photosynthetic area'],
        causes: ['Moderate temperatures (15-22°C)', 'Extended leaf wetness periods', 'Wind-dispersed spores', 'Susceptible varieties'],
        treatments: {
          immediate: 'Monitor fields regularly for early detection.',
          chemical: 'Mancozeb 75 WP (2.5 g/L) or Propiconazole 25 EC (1 ml/L).',
          biological: 'Trichoderma viride seed treatment. Neem oil spray.',
          cultural: 'Grow resistant varieties. Remove volunteer wheat plants.',
          prevention: 'Early sowing to avoid peak rust season. Balanced fertilization.',
          timeline: 'Spray at 10% disease severity threshold.'
        }
      },
      {
        id: 'karnal_bunt_wheat',
        name: 'Karnal Bunt',
        scientificName: 'Tilletia indica',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'grains',
        description: 'Fungal disease causing black powdery mass in wheat grains.',
        symptoms: ['Black powdery mass replacing grain contents', 'Fishy odor from infected grains', 'Partial bunt - only部分 grains infected', 'Reduced grain quality and market value'],
        causes: ['Cool moist conditions during flowering', 'Soil-borne teliospores', 'Wind and water splash dispersal', 'High humidity during grain filling'],
        treatments: {
          immediate: 'Remove and destroy infected grains. Use certified seed.',
          chemical: 'Propiconazole 25% EC (1 ml/L) or Carbendazim 50% WP (1 g/L).',
          biological: 'Trichoderma viride seed treatment. Pseudomonas fluorescens.',
          cultural: 'Remove infected grains. Avoid irrigation during grain filling.',
          prevention: 'Use resistant varieties. Seed treatment with Carbendazim (2 g/kg).',
          timeline: 'Treat seed before sowing. Spray at booting stage.'
        }
      },
      {
        id: 'powdery_mildew_wheat',
        name: 'Powdery Mildew',
        scientificName: 'Blumeria graminis',
        category: 'fungal',
        severity: 'low',
        affected_parts: 'leaves, stems',
        description: 'White powdery fungal growth on leaves and stems.',
        symptoms: ['White powdery patches on leaf surfaces', 'Stunted growth in severe infections', 'Premature leaf death', 'Reduced grain weight'],
        causes: ['High humidity with moderate temperatures', 'Dense crop canopy', 'Poor air circulation', 'Excess nitrogen fertilization'],
        treatments: {
          immediate: 'Improve air circulation by proper spacing.',
          chemical: 'Sulfur 80 WP (3 g/L) or Hexaconazole 5 EC (1 ml/L).',
          biological: 'Trichoderma harzianum. Neem oil spray.',
          cultural: 'Balanced nitrogen application. Proper row spacing.',
          prevention: 'Use resistant varieties. Avoid excess nitrogen.',
          timeline: 'Spray at first appearance of powdery growth.'
        }
      },
      {
        id: 'septoria_leaf_blotch',
        name: 'Septoria Leaf Blotch',
        scientificName: 'Septoria tritici',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'leaves',
        description: 'Fungal disease causing necrotic lesions with pycnidia on leaves.',
        symptoms: ['Elongated brown necrotic lesions with gray centers', 'Tiny black pycnidia visible in lesions', 'Lesions coalesce killing entire leaves', 'Severe yield loss in wet seasons'],
        causes: ['Cool wet weather conditions', 'Crop debris survival', 'Rain splash dispersal', 'Susceptible varieties'],
        treatments: {
          immediate: 'Remove crop debris after harvest.',
          chemical: 'Azoxystrobin 23% SC (1 ml/L) or Epoxiconazole (0.75 ml/L).',
          biological: 'Trichoderma viride. Bacillus subtilis.',
          cultural: 'Crop rotation. Deep plowing to bury debris.',
          prevention: 'Use resistant varieties. Timely sowing.',
          timeline: 'First spray at tillering stage in high-risk areas.'
        }
      }
    ]
  },
  maize: {
    name: 'Maize',
    scientificName: 'Zea mays',
    category: 'Cereals',
    diseases: [
      {
        id: 'turcicum_leaf_blight',
        name: 'Turcicum Leaf Blight',
        scientificName: 'Exserohilum turcicum',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'leaves',
        description: 'Fungal disease causing long elliptical tan lesions on leaves.',
        symptoms: ['Long elliptical tan/grayish leaf lesions', 'Lesions may coalesce killing entire leaves', 'Reduced photosynthetic area', 'Premature plant death in severe cases'],
        causes: ['High humidity and moderate temperatures (18-27°C)', 'Infected crop residues', 'Wind-blown spores', 'Susceptible hybrids'],
        treatments: {
          immediate: 'Remove and destroy infected plant debris.',
          chemical: 'Mancozeb 75 WP (2.5 g/L) or Azoxystrobin (1 ml/L).',
          biological: 'Trichoderma formulation. Bacillus subtilis.',
          cultural: 'Use disease-tolerant hybrids. Clear field stubbles.',
          prevention: 'Crop rotation with legumes. Certified disease-resistant hybrids.',
          timeline: 'Spray at 5-10% disease severity.'
        }
      },
      {
        id: 'common_rust_maize',
        name: 'Common Rust',
        scientificName: 'Puccinia sorghi',
        category: 'fungal',
        severity: 'low',
        affected_parts: 'leaves',
        description: 'Rust disease producing reddish-brown pustules on leaves.',
        symptoms: ['Small reddish-brown pustules on leaf surfaces', 'Pustules turn dark brown with age', 'Severe infection causes leaf death', 'Reduced grain filling'],
        causes: ['Cool moist conditions (16-21°C)', 'Extended leaf wetness', 'Wind-dispersed spores', 'Susceptible hybrids'],
        treatments: {
          immediate: 'Monitor fields during cool wet periods.',
          chemical: 'Mancozeb 75 WP (2.5 g/L).',
          biological: 'Neem oil spray (3%).',
          cultural: 'Grow resistant hybrids. Early planting.',
          prevention: 'Use resistant varieties. Avoid dense planting.',
          timeline: 'Spray only in severe epidemic years.'
        }
      },
      {
        id: 'stalk_rot_maize',
        name: 'Stalk Rot',
        scientificName: 'Fusarium moniliforme',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'stem, roots',
        description: 'Fungal disease causing rotting of stalk joints and lodging.',
        symptoms: ['Rotting of stalk joints', 'Stems break easily (lodging)', 'Discolored vascular tissue inside stalk', 'Premature plant death'],
        causes: ['High humidity during grain filling', 'Nitrogen deficiency', 'Mechanical damage to roots', 'Waterlogging'],
        treatments: {
          immediate: 'Harvest affected fields early to prevent lodging.',
          chemical: 'Carbendazim 50 WP (1 g/L) soil drench.',
          biological: 'Trichoderma viride soil application.',
          cultural: 'Balanced fertilization. Avoid waterlogging.',
          prevention: 'Balanced NPK. Avoid mechanical damage.',
          timeline: 'Preventive treatment at planting.'
        }
      }
    ]
  },
  cotton: {
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Cash Crops',
    diseases: [
      {
        id: 'cotton_leaf_curl',
        name: 'Cotton Leaf Curl Virus (CLCuV)',
        scientificName: 'Cotton leaf curl virus',
        category: 'viral',
        severity: 'severe',
        affected_parts: 'leaves, whole plant',
        description: 'Viral disease causing upward cupping and vein thickening of leaves.',
        symptoms: ['Upward cupping of leaves', 'Vein thickening and enations on undersides', 'Stunted plant growth', 'Reduced boll development'],
        causes: ['Transmitted by Whitefly vector (Bemisia tabaci)', 'Infected weed hosts', 'High whitefly populations', 'Susceptible varieties'],
        treatments: {
          immediate: 'Remove infected plants and weed hosts.',
          chemical: 'Imidacloprid 17.8 SL (0.5 ml/L) for whitefly control.',
          biological: 'Yellow sticky traps (50/ha) + Neem oil spray.',
          cultural: 'Control whitefly vector. Remove weed hosts.',
          prevention: 'Grow CLCuV-resistant varieties. Monitor whitefly populations.',
          timeline: 'Apply insecticide when whitefly population exceeds 5/leaf.'
        }
      },
      {
        id: 'bacterial_blight_cotton',
        name: 'Bacterial Blight (Angular Leaf Spot)',
        scientificName: 'Xanthomonas citri pv. malvacearum',
        category: 'bacterial',
        severity: 'moderate',
        affected_parts: 'leaves, bolls',
        description: 'Bacterial disease causing angular water-soaked lesions on leaves.',
        symptoms: ['Angular water-soaked lesions on leaves', 'Lesions turn black with age', 'Boll rot with bacterial ooze', 'Seed staining'],
        causes: ['Warm humid weather', 'Rain splash dispersal', 'Contaminated seed', 'Mechanical damage'],
        treatments: {
          immediate: 'Remove infected plant debris.',
          chemical: 'Copper oxychloride (3 g/L) + Streptocycline (500 ppm).',
          biological: 'Bacillus subtilis foliar spray.',
          cultural: 'Use certified seed. Avoid overhead irrigation.',
          prevention: 'Seed treatment with hot water (52°C for 30 min).',
          timeline: 'Spray at first symptom appearance.'
        }
      }
    ]
  },
  sugarcane: {
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    category: 'Cash Crops',
    diseases: [
      {
        id: 'red_rot_sugarcane',
        name: 'Red Rot',
        scientificName: 'Colletotrichum falcatum',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'stem',
        description: 'Fungal disease causing red discoloration of internal stalk pith.',
        symptoms: ['Reddish discoloration of internal stalk pith', 'White transverse patches in stalk', 'Third/fourth leaf turns yellow and dries', 'Sour smell from infected stalk'],
        causes: ['Fungal pathogen spreading via infected setts', 'Irrigation water dispersal', 'Ratoon cropping without sanitation', 'Infected planting material'],
        treatments: {
          immediate: 'Remove and destroy infected cane. Use clean setts.',
          chemical: 'Bordeaux mixture (1%). Metalaxyl 35% WS for set treatment.',
          biological: 'Trichoderma viride for set treatment.',
          cultural: 'Use disease-free setts. Proper drainage.',
          prevention: 'Hot water treatment of setts (50°C for 2 hours).',
          timeline: 'Treat setts before planting.'
        }
      },
      {
        id: 'smut_sugarcane',
        name: 'Smut',
        scientificName: 'Sporisorium scitamineum',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'terminal bud',
        description: 'Fungal disease producing whip-like black powdery structure from terminal bud.',
        symptoms: ['Long whip-like black dusty structure from central whorl', 'Secondary tillers may also show smut', 'Reduced cane yield', 'Stunted growth'],
        causes: ['Airborne fungal teliospores entering buds', 'Hot humid weather', 'Mechanical damage to buds', 'Susceptible varieties'],
        treatments: {
          immediate: 'Rogue out smut whips in plastic bags.',
          chemical: 'Carbendazim 50% WP seed treatment. Triadimefon (1g/L).',
          biological: 'Trichoderma solution for setts.',
          cultural: 'Use healthy setts. Remove infected shoots.',
          prevention: 'Plant resistant varieties. Hot water sett treatment.',
          timeline: 'Inspect fields weekly during warm humid weather.'
        }
      },
      {
        id: 'rust_sugarcane',
        name: 'Rust',
        scientificName: 'Puccinia melanocephala',
        category: 'fungal',
        severity: 'low',
        affected_parts: 'leaves',
        description: 'Rust disease producing reddish-brown pustules on leaves.',
        symptoms: ['Reddish-brown elongated pustules on leaves', 'Leaves may dry in severe infection', 'Reduced photosynthetic area', 'Premature leaf death'],
        causes: ['High humidity and moderate temperatures', 'Wind-dispersed spores', 'Dense canopy', 'Susceptible varieties'],
        treatments: {
          immediate: 'Remove severely infected leaves.',
          chemical: 'Propiconazole 25 EC (1 ml/L).',
          biological: 'Neem oil spray.',
          cultural: 'Proper spacing for air circulation.',
          prevention: 'Grow resistant varieties.',
          timeline: 'Spray when disease severity exceeds 10%.'
        }
      }
    ]
  },
  tomato: {
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetables',
    diseases: [
      {
        id: 'early_blight_tomato',
        name: 'Early Blight',
        scientificName: 'Alternaria solani',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'leaves, stems, fruits',
        description: 'Fungal disease causing concentric target-board ring spots on leaves.',
        symptoms: ['Concentric dark brown target-board ring spots on older leaves', 'Yellow chlorotic halos surrounding leaf spots', 'Dark sunken stem lesions (collar rot)', 'Premature dropping of lower foliage'],
        causes: ['Alternaria solani fungal spores in plant debris', 'Warm humid weather (24-29°C)', 'Poor air circulation', 'Dense canopy shading'],
        treatments: {
          immediate: 'Remove infected lower leaves using sterilized shears.',
          chemical: 'Mancozeb 75% WP (2.5 g/L) or Azoxystrobin 23% SC (1 ml/L).',
          biological: 'Trichoderma harzianum (5g/L). Copper Hydroxide bio-fungicide.',
          cultural: 'Mulch soil to prevent splash. Use drip irrigation.',
          prevention: 'Rotate with non-solanaceous crops every 2-3 years.',
          timeline: 'Spray at early onset, repeat every 10 days.'
        }
      },
      {
        id: 'tomato_leaf_curl',
        name: 'Tomato Leaf Curl Virus (ToLCV)',
        scientificName: 'Tomato leaf curl virus',
        category: 'viral',
        severity: 'severe',
        affected_parts: 'leaves, whole plant',
        description: 'Viral disease causing severe upward curling and stunting of leaves.',
        symptoms: ['Severe upward curling of young leaves', 'Stunting and puckering of leaves', 'Reduced fruit set', 'Bushy appearance with small leaves'],
        causes: ['Transmitted by Bemisia tabaci whitefly vector', 'Infected transplants', 'High whitefly populations', 'Weed hosts nearby'],
        treatments: {
          immediate: 'Remove infected plants immediately.',
          chemical: 'Imidacloprid 200 SL (0.4 ml/L) for vector management.',
          biological: 'Sticky yellow traps + Neem seed extract spray.',
          cultural: 'Use insect net nurseries. Grow tolerant F1 hybrids.',
          prevention: 'Use virus-free transplants. Control whitefly early.',
          timeline: 'Apply insecticide preventively during transplanting.'
        }
      },
      {
        id: 'late_blight_tomato',
        name: 'Late Blight',
        scientificName: 'Phytophthora infestans',
        category: 'fungal',
        severity: 'critical',
        affected_parts: 'leaves, stems, fruits',
        description: 'Devastating disease causing water-soaked lesions and rapid plant collapse.',
        symptoms: ['Water-soaked dark green-black lesions on leaves', 'White fuzzy fungal growth on leaf undersides in humid mornings', 'Brown firm rot on fruits', 'Rapid wilting and foliage collapse'],
        causes: ['Cool wet weather (10-20°C) with high humidity', 'Infected seed tubers or transplants', 'Wind-dispersed sporangia', 'Overhead irrigation'],
        treatments: {
          immediate: 'Remove and destroy infected plant debris.',
          chemical: 'Metalaxyl + Mancozeb 8+64% WP (2.5 g/L). Chlorothalonil 75% WP.',
          biological: 'Bacillus subtilis bio-fungicide. Bordeaux mixture (1%).',
          cultural: 'Avoid overhead irrigation in cool weather. Ensure air circulation.',
          prevention: 'Use certified disease-free transplants. Monitor weather.',
          timeline: 'Spray protectively before cool wet periods.'
        }
      }
    ]
  },
  potato: {
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetables',
    diseases: [
      {
        id: 'late_blight_potato',
        name: 'Late Blight',
        scientificName: 'Phytophthora infestans',
        category: 'fungal',
        severity: 'critical',
        affected_parts: 'leaves, tubers',
        description: 'Devastating disease causing water-soaked lesions and tuber rot.',
        symptoms: ['Water-soaked dark lesions on leaf tips/margins', 'White cottony fungal growth on lower leaf surface', 'Brown decay and dry rot inside tubers', 'Black scabs on tuber skin'],
        causes: ['Cool foggy humid conditions (10-20°C and RH >90%)', 'Infected seed tubers carrying latent pathogen', 'Excessive overhead irrigation', 'Wind-blown sporangia'],
        treatments: {
          immediate: 'Remove infected foliage immediately.',
          chemical: 'Cymoxanil + Mancozeb (2g/L) or Metalaxyl + Mancozeb.',
          biological: 'Bordeaux mixture 1% spray. Trichoderma viride.',
          cultural: 'Plant certified seed tubers. Proper earthing up.',
          prevention: 'Use disease-free seed from tissue culture. Cut haulms before harvest.',
          timeline: 'Prophylactic spray before fog. Curative spray at first symptoms.'
        }
      },
      {
        id: 'early_blight_potato',
        name: 'Early Blight',
        scientificName: 'Alternaria solani',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'leaves, tubers',
        description: 'Fungal disease causing concentric ring spots on leaves.',
        symptoms: ['Dark concentric ring spots on older leaves', 'Yellow halos around lesions', 'Tuber corky rot', 'Premature defoliation'],
        causes: ['Alternaria solani spores', 'Warm humid conditions', 'Nutrient deficiency', 'Plant stress'],
        treatments: {
          immediate: 'Remove affected lower leaves.',
          chemical: 'Mancozeb 75 WP (2.5 g/L) or Chlorothalonil (2 g/L).',
          biological: 'Trichoderma harzianum. Bacillus subtilis.',
          cultural: 'Balanced fertilization. Proper spacing.',
          prevention: 'Crop rotation. Seed treatment.',
          timeline: 'Spray at first symptom appearance.'
        }
      },
      {
        id: 'black_scurf_potato',
        name: 'Black Scurf',
        scientificName: 'Rhizoctonia solani',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'tubers, stems',
        description: 'Fungal disease causing black sclerotia on tuber surface.',
        symptoms: ['Black raised sclerotia on tuber surface', 'Brown lesions on stem base', 'Premature vine death', 'Reduced tuber quality'],
        causes: ['Soil-borne fungus surviving as sclerotia', 'Cool wet conditions', 'Infected seed tubers', 'Poor drainage'],
        treatments: {
          immediate: 'Remove infected tubers.',
          chemical: 'Pencycuron 25% EC (seed treatment). Fludioxonil.',
          biological: 'Trichoderma viride.',
          cultural: 'Crop rotation. Proper storage.',
          prevention: 'Use certified seed. Crop rotation.',
          timeline: 'Treat seed before planting.'
        }
      }
    ]
  },
  chili: {
    name: 'Chili Pepper',
    scientificName: 'Capsicum annuum',
    category: 'Vegetables',
    diseases: [
      {
        id: 'chili_leaf_curl',
        name: 'Chili Leaf Curl Virus (ChLCV)',
        scientificName: 'Chili leaf curl virus',
        category: 'viral',
        severity: 'severe',
        affected_parts: 'leaves, whole plant',
        description: 'Viral disease causing upward curling and bushiness.',
        symptoms: ['Upward curling of leaf margins', 'Puckering and reduced leaf size', 'Bushy compact appearance', 'Reduced fruit set and quality'],
        causes: ['Whitefly (Bemisia tabaci) vector transmission', 'Infected transplants', 'High whitefly populations', 'Weed hosts nearby'],
        treatments: {
          immediate: 'Remove infected plants.',
          chemical: 'Acetamiprid 20 SP (0.2g/L) or Fipronil (1.5ml/L).',
          biological: 'Spray 5% NSKE + Neem oil. Yellow sticky traps.',
          cultural: 'Use net barrier in nursery. Intercrop with maize.',
          prevention: 'Erect yellow sticky traps. Use virus-free seedlings.',
          timeline: 'Apply insecticide when whitefly exceeds 5/leaf.'
        }
      },
      {
        id: 'anthracnose_chili',
        name: 'Anthracnose (Dieback)',
        scientificName: 'Colletotrichum capsici',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'fruits, stems',
        description: 'Fungal disease causing sunken black spots on fruits.',
        symptoms: ['Sunken circular black spots on pods', 'Fruit rotting in storage', 'Dieback of branches', 'Dark lesions on stems'],
        causes: ['Warm humid conditions', 'Rain splash dispersal', 'Infected seed', 'Dense canopy'],
        treatments: {
          immediate: 'Remove infected fruits and plant debris.',
          chemical: 'Azoxystrobin 23% SC (1 ml/L) or Carbendazim (1 g/L).',
          biological: 'Trichoderma viride. Bacillus subtilis.',
          cultural: 'Proper spacing. Drip irrigation.',
          prevention: 'Seed treatment. Avoid continuous pepper cropping.',
          timeline: 'Spray at flowering and fruit set stages.'
        }
      }
    ]
  },
  onion: {
    name: 'Onion',
    scientificName: 'Allium cepa',
    category: 'Vegetables',
    diseases: [
      {
        id: 'purple_blotch_onion',
        name: 'Purple Blotch',
        scientificName: 'Alternaria porri',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'leaves, seed stalks',
        description: 'Fungal disease causing purple-centered sunken lesions.',
        symptoms: ['Small water-soaked sunken lesions with purple centers', 'Lesions on leaves and seed stalks', 'Yellow halo around lesions', 'Premature leaf drying'],
        causes: ['Warm moist weather with frequent dew', 'Rain splash dispersal', 'Dense planting', 'Nutrient deficiency'],
        treatments: {
          immediate: 'Remove severely infected leaves.',
          chemical: 'Mancozeb 75 WP (2.5 g/L) or Tebuconazole (1ml/L).',
          biological: 'Trichoderma spray + bio-sulfur.',
          cultural: 'Balanced fertilization with sulfur. Avoid dense planting.',
          prevention: 'Apply elemental sulfur (30 kg/ha). Stop irrigation before harvest.',
          timeline: 'Spray at first symptom appearance.'
        }
      },
      {
        id: 'downy_mildew_onion',
        name: 'Downy Mildew',
        scientificName: 'Peronoa destructor',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'leaves',
        description: 'Fungal disease causing pale yellow streaks and white downy growth.',
        symptoms: ['Pale yellow streaks on leaves', 'Downy white growth on leaf surfaces in humid conditions', 'Premature leaf death', 'Reduced bulb size'],
        causes: ['Cool wet conditions', 'High humidity', 'Prolonged leaf wetness', 'Dense planting'],
        treatments: {
          immediate: 'Improve air circulation.',
          chemical: 'Metalaxyl 8% + Mancozeb 64% WP (2 g/L).',
          biological: 'Copper-based sprays.',
          cultural: 'Proper spacing. Drip irrigation.',
          prevention: 'Avoid overhead irrigation. Grow resistant varieties.',
          timeline: 'Spray preventively in cool wet weather.'
        }
      }
    ]
  },
  banana: {
    name: 'Banana',
    scientificName: 'Musa acuminata',
    category: 'Fruits',
    diseases: [
      {
        id: 'sigatoka_banana',
        name: 'Sigatoka Leaf Spot',
        scientificName: 'Mycosphaerella musicola',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'leaves',
        description: 'Fungal disease causing dark brown streaks with yellow halos.',
        symptoms: ['Small pale yellow spots turning dark brown', 'Necrotic streaks with yellow halos', 'Premature leaf death', 'Reduced bunch weight'],
        causes: ['High humidity and rainfall', 'Wind-blown spores', 'Dense canopy', 'Poor drainage'],
        treatments: {
          immediate: 'Remove affected lower leaves.',
          chemical: 'Propiconazole (1ml/L) or Carbendazim (1g/L).',
          biological: 'Mineral oil or Neem extract foliar spray.',
          cultural: 'Ensure proper field drainage. De-suckering.',
          prevention: 'Remove affected leaves. Proper drainage.',
          timeline: 'Spray at first spot appearance.'
        }
      },
      {
        id: 'panama_wilt_banana',
        name: 'Panama Wilt (Fusarium Wilt)',
        scientificName: 'Fusarium oxysporum f. sp. cubense TR4',
        category: 'fungal',
        severity: 'critical',
        affected_parts: 'whole plant, roots, pseudostem',
        description: 'Soil-borne fungal disease causing yellowing and vascular discoloration.',
        symptoms: ['Yellowing of lower leaves', 'Longitudinal splitting of pseudostem base', 'Internal vascular discoloration', 'Plant death'],
        causes: ['Soil-borne fungal pathogen invading roots', 'Contaminated soil and water', 'Infected planting material', 'Fusarium surviving decades in soil'],
        treatments: {
          immediate: 'Remove and destroy infected plants. Do not move soil.',
          chemical: 'Injecting 2% Carbendazim solution into pseudostem.',
          biological: 'Soil drenching with Pseudomonas fluorescens and Trichoderma.',
          cultural: 'Use disease-free tissue culture plants.',
          prevention: 'Use disease-free tissue culture. Avoid soil movement from infected fields.',
          timeline: 'No cure once infected. Focus on prevention.'
        }
      }
    ]
  },
  mango: {
    name: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'Fruits',
    diseases: [
      {
        id: 'powdery_mildew_mango',
        name: 'Powdery Mildew',
        scientificName: 'Oidium mangiferae',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'panicles, leaves, fruits',
        description: 'White powdery fungal coating on panicles and developing fruitlets.',
        symptoms: ['White powdery coating on panicles', 'Blossom drop', 'Small fruitlets fall off', 'Reduced fruit set'],
        causes: ['Cool nights and warm humid days during panicle emergence', 'Wind-blown spores', 'High humidity'],
        treatments: {
          immediate: 'Monitor panicles during emergence.',
          chemical: 'Hexaconazole 5 EC (1ml/L) or Karathane.',
          biological: 'Wettable Sulfur (3g/L) or Neem oil.',
          cultural: 'Prune dense canopy for light aeration.',
          prevention: 'Prune dead branches. Avoid high nitrogen before flowering.',
          timeline: 'Spray at panicle emergence.'
        }
      },
      {
        id: 'anthracnose_mango',
        name: 'Anthracnose',
        scientificName: 'Colletotrichum gloeosporioides',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'leaves, panicles, fruits',
        description: 'Dark brown blights on leaves and tear-stain lesions on fruit.',
        symptoms: ['Dark brown blights on leaves', 'Panicle wither', 'Tear-stain black lesions on maturing fruit', 'Fruit rot in storage'],
        causes: ['High rainfall and humidity during fruit set', 'Rain splash dispersal', 'Infected plant debris', 'Wound entry'],
        treatments: {
          immediate: 'Remove infected fruits and plant debris.',
          chemical: 'Copper Oxychloride (3g/L) or Carbendazim (1g/L).',
          biological: 'Trichoderma formulation foliar spray.',
          cultural: 'Post-harvest hot water fruit treatment (52°C for 5 mins).',
          prevention: 'Prune dead branches. Avoid high nitrogen before flowering.',
          timeline: 'Spray at bud burst and flowering.'
        }
      },
      {
        id: 'mango_malformation',
        name: 'Mango Malformation',
        scientificName: 'Fusarium mangiferae',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'panicles, shoots',
        description: 'Malformation of panicles into compact bunchy mass.',
        symptoms: ['Malformation of panicles', 'Compact bunchy mass of flowers', 'Reduced fruit set', 'Deformed vegetative shoots'],
        causes: ['Eriophyid mites transmitting fungus', 'High humidity', 'Gibberellin imbalance', 'Infected planting material'],
        treatments: {
          immediate: 'Remove malformed panicles.',
          chemical: 'Carbendazim (1g/L) spray.',
          biological: 'Trichoderma spray.',
          cultural: 'Prune malformed shoots. Control mites.',
          prevention: 'Remove malformed parts. Control eriophyid mites.',
          timeline: 'Spray at panicle emergence.'
        }
      }
    ]
  },
  coconut: {
    name: 'Coconut',
    scientificName: 'Cocos nucifera',
    category: 'Cash Crops',
    diseases: [
      {
        id: 'bud_rot_coconut',
        name: 'Bud Rot',
        scientificName: 'Phytophthora palmivora',
        category: 'fungal',
        severity: 'critical',
        affected_parts: 'crown bud, leaves',
        description: 'Fungal disease causing rotting of crown bud with foul odor.',
        symptoms: ['Yellowing and drooping of central spindle leaf', 'Rotting of crown bud with foul odor', 'Premature nut fall', 'Outer fronds droop and hang'],
        causes: ['Heavy monsoon rains', 'Continuous wet weather', 'High relative humidity', 'Wound entry from beetle damage'],
        treatments: {
          immediate: 'Clear crown before monsoon.',
          chemical: 'Copper Oxychloride 0.3% drenching on crown.',
          biological: 'Bordeaux paste application on crown bud.',
          cultural: 'Apply fungicide paste on central bud.',
          prevention: 'Clean crown area twice a year. Fill leaf axils with Neem cake.',
          timeline: 'Apply before monsoon and after monsoon.'
        }
      },
      {
        id: 'stem_bleeding_coconut',
        name: 'Stem Bleeding',
        scientificName: 'Thielaviopsis paradoxa',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'trunk',
        description: 'Fungal disease causing oozing of reddish-brown fluid from trunk.',
        symptoms: ['Reddish-brown fluid oozing from trunk cracks', 'Progressive trunk decay', 'Premature nut fall', 'Tree death in severe cases'],
        causes: ['Fungus entering through wounds', 'Mechanical damage to trunk', 'High humidity', 'Poor tree vigor'],
        treatments: {
          immediate: 'Apply Bordeaux paste on bleeding cracks.',
          chemical: 'Copper Hydroxide 77% WP (2g/L) trunk application.',
          biological: 'Trichoderma harzianum coir-pith cake to root zone.',
          cultural: 'Avoid root damage during inter-cultivation.',
          prevention: 'Avoid mechanical damage. Maintain tree vigor.',
          timeline: 'Apply paste on cracks during dry season.'
        }
      }
    ]
  },
  groundnut: {
    name: 'Groundnut',
    scientificName: 'Arachis hypogaea',
    category: 'Legumes',
    diseases: [
      {
        id: 'tikka_leaf_spot',
        name: 'Tikka Leaf Spot (Cercospora Spot)',
        scientificName: 'Cercospora arachidicola',
        category: 'fungal',
        severity: 'moderate',
        affected_parts: 'leaves',
        description: 'Fungal disease causing circular dark brown spots with yellow halos.',
        symptoms: ['Circular dark brown spots on upper leaf surface', 'Yellow chlorotic halos around spots', 'Premature defoliation', 'Reduced pod filling'],
        causes: ['High atmospheric humidity', 'Wet leaf canopy', 'Infected crop debris', 'Susceptible varieties'],
        treatments: {
          immediate: 'Remove heavily infected leaves.',
          chemical: 'Carbendazim (1g/L) + Mancozeb (2g/L).',
          biological: 'Neem seed kernel extract (5%) spray.',
          cultural: 'Crop rotation with cereals. Seed treatment.',
          prevention: 'Seed treatment with Trichoderma viride (10g/kg).',
          timeline: 'Spray at 10% disease severity.'
        }
      },
      {
        id: 'collar_rot_groundnut',
        name: 'Collar Rot',
        scientificName: 'Aspergillus niger',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'stem, roots',
        description: 'Fungal disease causing wilting with white mycelium at collar region.',
        symptoms: ['Wilting of plants', 'White fungal mycelium at collar region', 'Stem blackening at soil level', 'Plant death'],
        causes: ['Aspergillus niger soil/seed infection', 'Waterlogging', 'Heavy soil', 'Mechanical damage'],
        treatments: {
          immediate: 'Remove and destroy infected plants.',
          chemical: 'Carbendazim (1g/L) soil drench.',
          biological: 'Trichoderma viride soil application.',
          cultural: 'Improve drainage. Use light friable soil.',
          prevention: 'Seed treatment with Trichoderma. Ensure soil is friable.',
          timeline: 'Preventive seed treatment before sowing.'
        }
      }
    ]
  },
  soybean: {
    name: 'Soybean',
    scientificName: 'Glycine max',
    category: 'Legumes',
    diseases: [
      {
        id: 'soybean_rust',
        name: 'Soybean Rust',
        scientificName: 'Phakopsora pachyrhizi',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'leaves',
        description: 'Rust disease causing reddish-brown pustules on leaf undersides.',
        symptoms: ['Tiny reddish-brown tan pustules on underside of leaves', 'Premature defoliation', 'Reduced seed filling', 'Yellowing of leaves'],
        causes: ['Airborne spores', 'Prolonged leaf wetness', 'Moderate temps (15-28°C)', 'Susceptible varieties'],
        treatments: {
          immediate: 'Monitor lower leaves regularly.',
          chemical: 'Hexaconazole 5 EC (1ml/L) or Propiconazole (1ml/L).',
          biological: 'Foliar bio-sulfur + Neem oil spray.',
          cultural: 'Use tolerant cultivars. Early uniform planting.',
          prevention: 'Use tolerant varieties. Maintain optimum plant density.',
          timeline: 'Spray at first pustule appearance.'
        }
      },
      {
        id: 'yellow_mosaic_soybean',
        name: 'Yellow Mosaic Virus',
        scientificName: 'Soybean mosaic virus',
        category: 'viral',
        severity: 'moderate',
        affected_parts: 'leaves',
        description: 'Viral disease causing yellow mosaic patches on leaves.',
        symptoms: ['Yellow mosaic patches on leaf blade', 'Leaf distortion', 'Stunted growth', 'Reduced pod number'],
        causes: ['Whitefly vector transmission', 'Infected seed', 'Weed hosts', 'Susceptible varieties'],
        treatments: {
          immediate: 'Remove infected plants.',
          chemical: 'Imidacloprid (0.5 ml/L) for whitefly control.',
          biological: 'Yellow sticky traps + Neem oil.',
          cultural: 'Use resistant varieties. Control whitefly.',
          prevention: 'Use virus-free seed. Control vector early.',
          timeline: 'Apply insecticide when whitefly exceeds threshold.'
        }
      }
    ]
  },
  pulses: {
    name: 'Pulses',
    scientificName: 'Cicer arietinum',
    category: 'Legumes',
    diseases: [
      {
        id: 'fusarium_wilt_pulses',
        name: 'Fusarium Wilt',
        scientificName: 'Fusarium oxysporum f. sp. ciceris',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'whole plant, roots, vascular',
        description: 'Soil-borne fungal disease causing wilting and vascular browning.',
        symptoms: ['Drooping of leaves', 'Wilting of whole plant', 'Internal dark brown vascular discoloration', 'Plant death'],
        causes: ['Soil-borne fungal pathogen', 'Infected seed', 'Warm soil temperatures', 'Poor drainage'],
        treatments: {
          immediate: 'Remove and burn infected plants.',
          chemical: 'Seed treatment with Carbendazim + Thiram (1:1) @ 2g/kg.',
          biological: 'Seed treatment with Trichoderma viride (10g/kg).',
          cultural: 'Grow wilt-resistant varieties (JG 11, Samrat). Deep summer plowing.',
          prevention: 'Use resistant varieties. Crop rotation for 3 years.',
          timeline: 'Remove infected plants immediately.'
        }
      },
      {
        id: 'ascochyta_blight_pulses',
        name: 'Ascochyta Blight',
        scientificName: 'Ascochyta rabiei',
        category: 'fungal',
        severity: 'severe',
        affected_parts: 'leaves, pods, stems',
        description: 'Fungal disease causing dark brown spots on leaves and pods.',
        symptoms: ['Dark brown circular spots on leaves', 'Pods with dark sunken lesions', 'Stem cankers', 'Premature plant death'],
        causes: ['Cool wet weather', 'Rain splash dispersal', 'Infected seed', 'Crop debris survival'],
        treatments: {
          immediate: 'Remove infected debris.',
          chemical: 'Mancozeb 75 WP (2.5 g/L) or Chlorothalonil (2 g/L).',
          biological: 'Trichoderma harzianum seed treatment.',
          cultural: 'Crop rotation with cereals.',
          prevention: 'Use certified disease-free seed. Seed treatment.',
          timeline: 'First spray at 40 DAS.'
        }
      }
    ]
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// DATABASE CREATION
// ══════════════════════════════════════════════════════════════════════════════

function createDatabase(cropId, cropData) {
  const dbPath = path.join(DB_DIR, `${cropId}_diseases.db`);
  
  // Ensure directory exists
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  
  // Remove existing database
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }
  
  const db = new Database(dbPath);
  
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS diseases (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      scientific_name TEXT,
      category TEXT CHECK(category IN ('fungal', 'bacterial', 'viral', 'nematode', 'physiological', 'healthy')),
      severity TEXT CHECK(severity IN ('none', 'low', 'moderate', 'severe', 'critical')),
      affected_parts TEXT,
      description TEXT,
      crop_id TEXT DEFAULT '${cropId}'
    );

    CREATE TABLE IF NOT EXISTS symptoms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_id TEXT NOT NULL,
      symptom_text TEXT NOT NULL,
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS causes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_id TEXT NOT NULL,
      cause_text TEXT NOT NULL,
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS treatments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_id TEXT NOT NULL,
      treatment_type TEXT CHECK(treatment_type IN ('immediate', 'chemical', 'biological', 'cultural', 'prevention', 'timeline')),
      treatment_text TEXT NOT NULL,
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_id TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_size INTEGER,
      format TEXT,
      width INTEGER,
      height INTEGER,
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE
    );

    CREATE INDEX idx_symptoms_disease ON symptoms(disease_id);
    CREATE INDEX idx_causes_disease ON causes(disease_id);
    CREATE INDEX idx_treatments_disease ON treatments(disease_id);
    CREATE INDEX idx_images_disease ON images(disease_id);
  `);

  // Create views
  db.exec(`
    CREATE VIEW IF NOT EXISTS v_disease_summary AS
    SELECT 
      d.id,
      d.name,
      d.scientific_name,
      d.category,
      d.severity,
      d.affected_parts,
      d.description,
      d.crop_id,
      (SELECT COUNT(*) FROM images WHERE disease_id = d.id) as image_count,
      (SELECT COUNT(*) FROM symptoms WHERE disease_id = d.id) as symptom_count,
      (SELECT COUNT(*) FROM causes WHERE disease_id = d.id) as cause_count
    FROM diseases d;

    CREATE VIEW IF NOT EXISTS v_disease_details AS
    SELECT 
      d.*,
      GROUP_CONCAT(DISTINCT s.symptom_text) as all_symptoms,
      GROUP_CONCAT(DISTINCT c.cause_text) as all_causes,
      GROUP_CONCAT(DISTINCT t_chemical.treatment_text) as chemical_treatment,
      GROUP_CONCAT(DISTINCT t_biological.treatment_text) as biological_treatment,
      GROUP_CONCAT(DISTINCT t_prevention.treatment_text) as prevention_methods
    FROM diseases d
    LEFT JOIN symptoms s ON d.id = s.disease_id
    LEFT JOIN causes c ON d.id = c.disease_id
    LEFT JOIN treatments t_chemical ON d.id = t_chemical.disease_id AND t_chemical.treatment_type = 'chemical'
    LEFT JOIN treatments t_biological ON d.id = t_biological.disease_id AND t_biological.treatment_type = 'biological'
    LEFT JOIN treatments t_prevention ON d.id = t_prevention.disease_id AND t_prevention.treatment_type = 'prevention'
    GROUP BY d.id;
  `);

  return db;
}

function insertDiseaseData(db, disease) {
  // Insert disease
  db.prepare(`
    INSERT OR REPLACE INTO diseases (id, name, scientific_name, category, severity, affected_parts, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(disease.id, disease.name, disease.scientificName, disease.category, disease.severity, disease.affected_parts, disease.description);

  // Insert symptoms
  const insertSymptom = db.prepare('INSERT INTO symptoms (disease_id, symptom_text) VALUES (?, ?)');
  for (const symptom of disease.symptoms) {
    insertSymptom.run(disease.id, symptom);
  }

  // Insert causes
  const insertCause = db.prepare('INSERT INTO causes (disease_id, cause_text) VALUES (?, ?)');
  for (const cause of disease.causes) {
    insertCause.run(disease.id, cause);
  }

  // Insert treatments
  const insertTreatment = db.prepare('INSERT INTO treatments (disease_id, treatment_type, treatment_text) VALUES (?, ?, ?)');
  const treatments = disease.treatments;
  if (treatments.immediate) insertTreatment.run(disease.id, 'immediate', treatments.immediate);
  if (treatments.chemical) insertTreatment.run(disease.id, 'chemical', treatments.chemical);
  if (treatments.biological) insertTreatment.run(disease.id, 'biological', treatments.biological);
  if (treatments.cultural) insertTreatment.run(disease.id, 'cultural', treatments.cultural);
  if (treatments.prevention) insertTreatment.run(disease.id, 'prevention', treatments.prevention);
  if (treatments.timeline) insertTreatment.run(disease.id, 'timeline', treatments.timeline);
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ══════════════════════════════════════════════════════════════════════════════

console.log('=== Crop Disease Database Builder ===\n');

let totalDiseases = 0;
let totalSymptoms = 0;
let totalCauses = 0;
let totalTreatments = 0;

for (const [cropId, cropData] of Object.entries(CROP_DISEASES)) {
  console.log(`\nBuilding database for ${cropData.name}...`);
  
  const db = createDatabase(cropId, cropData);
  
  for (const disease of cropData.diseases) {
    insertDiseaseData(db, disease);
    totalDiseases++;
    totalSymptoms += disease.symptoms.length;
    totalCauses += disease.causes.length;
    totalTreatments += Object.keys(disease.treatments).filter(k => disease.treatments[k]).length;
  }
  
  // Get counts
  const stats = db.prepare('SELECT COUNT(*) as count FROM diseases').get();
  const symCount = db.prepare('SELECT COUNT(*) as count FROM symptoms').get();
  const causeCount = db.prepare('SELECT COUNT(*) as count FROM causes').get();
  const treatCount = db.prepare('SELECT COUNT(*) as count FROM treatments').get();
  
  console.log(`  Diseases: ${stats.count}`);
  console.log(`  Symptoms: ${symCount.count}`);
  console.log(`  Causes: ${causeCount.count}`);
  console.log(`  Treatments: ${treatCount.count}`);
  
  db.close();
}

console.log('\n=== Summary ===');
console.log(`Total crops: ${Object.keys(CROP_DISEASES).length}`);
console.log(`Total diseases: ${totalDiseases}`);
console.log(`Total symptoms: ${totalSymptoms}`);
console.log(`Total causes: ${totalCauses}`);
console.log(`Total treatments: ${totalTreatments}`);
console.log(`\nDatabases saved to: ${DB_DIR}`);
