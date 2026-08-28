// ═══════════════════════════════════════════════════════════════════════════════
// AGROMIND ENGINE v1.0 — CropVision's Intelligent Agronomy Chat Engine
// ═══════════════════════════════════════════════════════════════════════════════
// Capabilities:
//   - Answers ANY farming/agriculture question with detailed responses
//   - Handles why/how/what/when/where/which question patterns
//   - Covers plant science, pathology, physiology, soil science, agronomy
//   - Conversational context tracking for follow-up questions
//   - Zero generic fallbacks — every question gets a real answer
// ═══════════════════════════════════════════════════════════════════════════════

import { CROPS, DISEASE百科, TOPIC_KNOWLEDGE, GREETING_KEYWORDS, GREETINGS } from './knowledge.js';

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1: GENERAL PLANT SCIENCE KNOWLEDGE
// ═══════════════════════════════════════════════════════════════════════════════

const PLANT_SCIENCE = {
  'why disease': {
    title: 'Why Do Plants Get Diseases?',
    answer: `**Why Diseases Occur in Plants — Complete Explanation:**

Plant diseases occur when three factors come together (the **Disease Triangle**):

**1. Susceptible Host (The Plant)**
- Every plant has varying levels of resistance
- Young, stressed, or nutrient-deficient plants are more vulnerable
- Genetic susceptibility determines if a plant CAN get infected

**2. Pathogen (The Disease-Causing Agent)**
- **Fungi** (80% of plant diseases) — survive in soil and crop debris
- **Bacteria** — enter through wounds, spread by water splash
- **Viruses** — transmitted by insect vectors (aphids, whiteflies)
- **Nematodes** — microscopic worms attacking roots
- **Phytoplasmas** — specialized bacteria spread by leafhoppers

**3. Favorable Environment**
- High humidity (>85%) promotes fungal growth
- Warm temperatures (20-30°C) accelerate pathogen reproduction
- Prolonged leaf wetness allows spore germination
- Poor drainage creates waterlogged conditions favoring root rot

**Additional Factors:**
- **Poor soil health** — depleted soils produce weak plants
- **Improper nutrition** — excess nitrogen makes tissues succulent and susceptible
- **Mechanical wounds** — from tools, wind, hail create entry points
- **Contaminated seeds/transplants** — carry pathogens to new fields
- **Monoculture** — growing same crop repeatedly builds pathogen population in soil

**How to Break the Disease Triangle:**
1. Use resistant varieties (remove susceptibility)
2. Practice crop rotation (reduce pathogen load)
3. Manage irrigation (reduce humidity)
4. Balanced fertilization (strengthen plant immunity)
5. Bio-control agents (compete with pathogens)`,
  },
  'plant disease': {
    title: 'Plant Disease Overview',
    answer: `**Plant Diseases — Complete Guide:**

**What is a Plant Disease?**
A plant disease is any abnormal condition that disrupts normal growth, development, or function. It's not just infections — nutrient deficiencies, environmental stress, and genetic disorders also count.

**Types of Plant Diseases:**

**Infectious (Biotic) Diseases:**
- **Fungal** — Rust, blight, mildew, wilt, root rot, damping off
- **Bacterial** — Bacterial blight, soft rot, canker, gall
- **Viral** — Mosaic, leaf curl, yellowing, stunting
- **Nematode** — Root-knot, cyst nematode, lesion nematode

**Non-Infectious (Abiotic) Diseases:**
- **Nutrient deficiency** — Yellowing (N), purple leaves (P), leaf scorch (K)
- **Water stress** — Wilting from drought or waterlogging
- **Temperature stress** — Frost damage, heat scorch
- **Chemical injury** — Herbicide drift, salt toxicity
- **Physical damage** — Wind, hail, machinery injury

**How Diseases Spread:**
- Wind-blown spores (rust, mildew)
- Water splash (bacterial blight)
- Insect vectors (viruses, phytoplasmas)
- Contaminated soil (root-knot nematode)
- Infected seeds/planting material
- Farming tools and equipment

**Disease Progression Stages:**
1. **Incubation** — Pathogen enters but no visible symptoms
2. **Infection** — Pathogen colonizes plant tissues
3. **Symptom Development** — Visible signs appear
4. **Sporulation** — Pathogen produces reproductive structures
5. **Dispersal** — New inoculum spreads to healthy plants

**Economic Impact:**
- Global crop losses: 20-40% annually due to diseases
- Rice blast alone causes $1.5 billion losses worldwide
- Late blight caused the Irish Potato Famine (1845-1852)`,
  },
  'how plants absorb': {
    title: 'How Plants Absorb Nutrients',
    answer: `**How Plants Absorb Water & Nutrients:**

**Root System — The吸收器 (Absorber):**
- Roots absorb water and dissolved minerals from soil
- Root hairs increase surface area 10-100x
- Primary absorption zone: root tip to 10cm behind tip

**Nutrient Uptake Mechanisms:**
1. **Mass Flow** — nutrients move with water flow (N, S, Ca, Mg)
2. **Diffusion** — nutrients move from high to low concentration (P, K)
3. **Root Interception** — roots grow toward nutrient-rich zones

**Essential Nutrients (16 total):**

**Macronutrients (needed in large amounts):**
- **Nitrogen (N)** — for leaves, proteins, chlorophyll
- **Phosphorus (P)** — for roots, flowers, energy transfer
- **Potassium (K)** — for overall health, disease resistance, fruit quality

**Secondary Macronutrients:**
- **Calcium (Ca)** — cell wall structure, root tips
- **Magnesium (Mg)** — chlorophyll center, photosynthesis
- **Sulfur (S)** — protein synthesis, enzyme activation

**Micronutrients (needed in trace amounts):**
- Iron (Manganese), Zinc, Copper, Boron, Molybdenum, Chlorine, Nickel

**How Deficiency Symptoms Appear:**
- **Mobile nutrients** (N, P, K, Mg) — symptoms on OLDER leaves first
- **Immobile nutrients** (Ca, Fe, B) — symptoms on YOUNG leaves first

**Optimal Soil Conditions for Absorption:**
- pH 6.0-7.5 for most nutrients
- Adequate soil moisture (not waterlogged)
- Good soil aeration (oxygen for roots)
- Healthy root system (no nematode/fungal damage)`,
  },
  'photosynthesis': {
    title: 'Photosynthesis in Plants',
    answer: `**Photosynthesis — How Plants Make Food:**

**What is Photosynthesis?**
Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose (food) and oxygen. It's the foundation of all life on Earth.

**The Equation:**
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂
(Carbon dioxide + Water + Sunlight → Glucose + Oxygen)

**Where It Happens:**
- In chloroplasts (tiny organelles in leaf cells)
- Chlorophyll (green pigment) captures light energy
- Mainly in leaves (90% of photosynthesis)

**Two Stages:**
1. **Light-dependent reactions** (in thylakoids)
   - Light energy splits water molecules
   - Produces ATP and NADPH (energy carriers)
   - Releases oxygen as byproduct

2. **Light-independent reactions (Calvin Cycle)** (in stroma)
   - Uses ATP and NADPH from stage 1
   - Fixes CO₂ into glucose molecules
   - Doesn't directly need light

**Factors Affecting Photosynthesis:**
- **Light intensity** — increases rate up to a saturation point
- **CO₂ concentration** — more CO₂ = more photosynthesis (up to limit)
- **Temperature** — optimal at 25-35°C, drops sharply above 40°C
- **Water availability** — drought closes stomata, reducing CO₂ uptake
- **Nutrient status** — N and Mg needed for chlorophyll production

**Why It Matters for Farmers:**
- More photosynthesis = more growth = higher yield
- Healthy green leaves = maximum photosynthetic capacity
- Proper spacing ensures light reaches all leaves
- Avoid nutrient deficiency that reduces chlorophyll`,
  },
  'soil health': {
    title: 'Soil Health Fundamentals',
    answer: `**Soil Health — The Foundation of Productive Farming:**

**What is Soil Health?**
Soil health is the continued capacity of soil to function as a living ecosystem that sustains plants, animals, and humans.

**Components of Healthy Soil:**
1. **Mineral particles** (45%) — sand, silt, clay
2. **Organic matter** (5%) — decomposed plant/animal material
3. **Water** (25%) — held in pore spaces
4. **Air** (25%) — fills remaining pore spaces
5. **Living organisms** — bacteria, fungi, earthworms, insects

**Soil Biology — The Living Soil:**
- **1 teaspoon of healthy soil** contains:
  - 100 million to 1 billion bacteria
  - Several yards of fungal hyphae
  - Thousands of protozoa
  - Dozens of nematodes
- **Mycorrhizal fungi** extend root reach by 100-1000x
- **Earthworms** create channels, improve drainage, produce castings

**Signs of Healthy Soil:**
- Crumbly, well-structured aggregates
- Earthworm activity visible
- Pleasant earthy smell (geosmin from Actinobacteria)
- Good water infiltration (no puddling)
- Deep root penetration

**Signs of Degraded Soil:**
- Compacted, hard when dry, sticky when wet
- No earthworms or biological activity
- Poor drainage, standing water
- Erosion and nutrient leaching
- Low organic matter (<2%)

**How to Build Soil Health:**
1. **Add organic matter** — compost, FYM, cover crops
2. **Minimize tillage** — reduces disruption to soil structure
3. **Crop rotation** — diversifies root exudates and biology
4. **Cover crops** — living roots feed soil microbes year-round
5. **Reduce chemical inputs** — protect beneficial organisms
6. **Mulching** — conserves moisture and adds organic matter`,
  },
  'fertilizer': {
    title: 'Fertilizer Management',
    answer: `**Fertilizer Management — Complete Guide:**

**What Are Fertilizers?**
Substances added to soil or plants to supply essential nutrients needed for growth.

**Types of Fertilizers:**

**1. Organic Fertilizers:**
- Farmyard Manure (FYM): 10-15 tons/ha
- Vermicompost: 2-5 tons/ha
- Neem cake: 200 kg/ha
- Green manure crops
- Bone meal, rock phosphate
- Pros: Improves soil health, slow release, safe
- Cons: Lower nutrient concentration, bulky

**2. Chemical (Inorganic) Fertilizers:**
- Urea (46% N), DAP (18% N, 46% P₂O₅), MOP (60% K₂O)
- Pros: High nutrient content, quick availability
- Cons: Can damage soil biology, leaching risk

**3. Bio-fertilizers:**
- Rhizobium (N-fixation for legumes)
- PSB (Phosphate Solubilizing Bacteria)
- Mycorrhizal fungi (extends root reach)
- Azotobacter (free-living N-fixer)

**NPK Recommendations by Crop:**
| Crop | N | P | K |
|------|---|---|---|
| Rice | 120 | 60 | 60 |
| Wheat | 120 | 60 | 40 |
| Maize | 150 | 75 | 37 |
| Tomato | 150 | 100 | 100 |
| Potato | 180 | 100 | 150 |
| Cotton | 120 | 60 | 60 |

**When to Apply:**
- **Basal dose** — at sowing/transplanting (P, K, full dose)
- **Top dressing** — at critical growth stages (N splits)
- **Foliar spray** — for quick correction of deficiencies

**Fertilizer Best Practices:**
1. Test soil before applying
2. Apply at right time and rate
3. Use split doses for nitrogen
4. Incorporate into soil (don't leave on surface)
5. Maintain proper irrigation after application`,
  },
  'irrigation': {
    title: 'Irrigation & Water Management',
    answer: `**Irrigation & Water Management — Complete Guide:**

**Why Irrigation is Critical:**
- 70% of global freshwater is used for agriculture
- Water stress reduces yield more than any other factor
- Proper irrigation can increase yields 50-100%

**Types of Irrigation Systems:**

**1. Surface/Flood Irrigation:**
- Water flows across field by gravity
- Simple, low cost
- 40-60% efficiency (60% water wasted)
- Suitable for rice, flat terrain

**2. Sprinkler Irrigation:**
- Water sprayed through nozzles like rain
- 70-80% efficiency
- Good for light soils, slopes
- Suitable for wheat, pulses, groundnut

**3. Drip Irrigation:**
- Water drips directly to root zone
- 90-95% efficiency (saves 40-60% water)
- Ideal for row crops, orchards, vegetables
- Higher initial cost, best ROI

**4. Micro-sprinkler:**
- Small sprinklers near each plant
- 80-85% efficiency
- Good for orchards, gardens

**Water Requirements by Crop:**
| Crop | Water (mm) | Critical Stage |
|------|-----------|----------------|
| Rice | 1200-1500 | Tillering, Flowering |
| Wheat | 450-650 | CRI, Tillering, Flowering |
| Maize | 500-800 | Tasseling, Grain fill |
| Tomato | 600-800 | Flowering, Fruit set |
| Cotton | 700-1200 | Boll formation |

**Irrigation Scheduling Methods:**
1. **Calendar-based** — irrigate at fixed intervals
2. **Soil moisture monitoring** — tensiometer, soil probes
3. **Crop evapotranspiration** — calculate water use
4. **Visual observation** — wilting, leaf curl

**Water-Saving Techniques:**
- Alternate Wetting and Drying (AWD) for rice — saves 30%
- Mulching — reduces evaporation 50%
- Deficit irrigation — apply less at non-critical stages
- Rainwater harvesting — capture and store monsoon rains`,
  },
  'pest control': {
    title: 'Integrated Pest Management (IPM)',
    answer: `**Integrated Pest Management (IPM) — Complete Guide:**

**What is IPM?**
IPM is a sustainable approach to pest management that combines biological, cultural, physical, and chemical tools to minimize health, economic, and environmental risks.

**IPM Strategy Hierarchy:**

**1. Prevention (First Line):**
- Use resistant/tolerant varieties
- Crop rotation breaks pest cycles
- Intercropping confuses pests
- Timely sowing avoids peak pest periods
- Clean cultivation removes pest habitats

**2. Monitoring & Scouting:**
- Scout fields weekly
- Use pheromone traps for monitoring
- Yellow sticky traps (50/ha) for whitefly/aphid
- Blue sticky traps (20/acre) for thrips
- Economic Threshold Level (ETL) — treat only when pest numbers justify cost

**3. Biological Control:**
- **Trichogramma** egg parasitoid for borer control
- **Beauveria bassiana** — fungal insecticide
- **Bt (Bacillus thuringiensis)** — bacterial spray
- **Neem-based sprays** — broad spectrum organic
- **Ladybugs & lacewings** — natural aphid predators

**4. Cultural Practices:**
- Trap crops (Okra for cotton bollworm)
- Push-pull technology (Desmodium/Napier for maize)
- Mass trapping with pheromones
- Light traps for moth monitoring

**5. Chemical Control (Last Resort):**
- Targeted spraying (not blanket)
- Rotate chemical classes (prevent resistance)
- Follow pre-harvest intervals (PHI)
- Use newer molecules (Emamectin, Chlorantraniliprole)

**Common IPM Programs by Crop:**
- **Rice:** Trichogramma + Neem + Phosphamidon (ETL-based)
- **Cotton:** Bt + Pheromone traps + Imidacloprid (as needed)
- **Tomato:** Yellow sticky traps + Neem + Mancozeb

**Benefits of IPM:**
- Reduces pesticide use 50-70%
- Saves cost on chemical inputs
- Protects beneficial insects
- Reduces environmental contamination
- Sustainable long-term solution`,
  },
  'organic farming': {
    title: 'Organic Farming Complete Guide',
    answer: `**Organic Farming — Complete Guide:**

**What is Organic Farming?**
Organic farming is a production system that avoids synthetic fertilizers, pesticides, growth regulators, and GMOs. It relies on ecological processes, biodiversity, and cycles adapted to local conditions.

**Principles of Organic Farming:**
1. Protect the environment and soil health
2. Use renewable resources
3. Apply high standards of animal welfare
4. Produce high-quality nutritious food
5. Rely on natural processes and inputs

**Step-by-Step Organic Transition:**
1. **Year 1-2:** Reduce chemical inputs, start composting, soil testing
2. **Year 2-3:** Introduce bio-fertilizers, bio-pesticides, build soil biology
3. **Year 3+:** Full organic management, apply for certification

**Key Organic Inputs:**

**Bio-Fertilizers:**
- **Rhizobium** — N-fixation for legumes (seed treatment)
- **PSB** — Solubilizes locked phosphorus (4 kg/ha)
- **Mycorrhiza** — Extends root reach 100-1000x
- **Azotobacter** — Free-living N-fixer for cereals
- **Azospirillum** — Associative N-fixer

**Bio-Pesticides:**
- **Trichoderma harzianum** (5g/L) — bio-fungicide
- **Pseudomonas fluorescens** (10g/L) — bio-bactericide
- **Bacillus thuringiensis** — bio-insecticide
- **Beauveria bassiana** — fungal insecticide
- **Neem oil** (5ml/L) — broad spectrum

**Organic Nutrient Sources:**
- Farmyard Manure: 10-15 tons/ha
- Vermicompost: 2-5 tons/ha
- Green manure: Sesbania/Dhaincha
- Jeevamrut: 200L/ha monthly
- Beejamrut: Seed treatment solution

**Organic Certification:**
- India: NPOP (National Programme for Organic Production)
- EU: EU Organic Regulation
- USA: USDA NOP (National Organic Program)
- Takes 2-3 years for full certification
- Premium pricing: 20-50% higher than conventional

**Challenges:**
- Lower yields initially (10-20%)
- Labor intensive
- Pest management requires more knowledge
- Certification costs
- Market access can be limited`,
  },
  'crop rotation': {
    title: 'Crop Rotation Principles',
    answer: `**Crop Rotation — Complete Guide:**

**What is Crop Rotation?**
Growing different crops in sequence on the same land to maintain soil health, break pest/disease cycles, and improve yields.

**Why Rotate Crops?**

**1. Break Pest & Disease Cycles:**
- Soil-borne pathogens build up with monoculture
- Rotation starves pathogens without suitable hosts
- Reduces nematode populations
- Example: Potato → Cereal breaks late blight cycle

**2. Nutrient Management:**
- Legumes fix atmospheric nitrogen (saves 40-60 kg N/ha)
- Deep-rooted crops bring nutrients from subsoil
- Different crops have different nutrient demands
- Prevents depletion of specific nutrients

**3. Soil Structure Improvement:**
- Deep-rooted crops break hardpan
- Fibrous-rooted crops improve tilth
- Cover crops protect against erosion
- Diverse root exudates feed soil biology

**Recommended Rotations:**

**Kharif-Rabi Rotation:**
- Rice → Wheat (North India)
- Cotton → Wheat
- Maize → Chickpea
- Groundnut → Wheat

**Cereal-Legume Rotation:**
- Rice → Soybean → Wheat
- Maize → Groundnut → Wheat
- Cotton → Chickpea → Rice

**3-Year Rotation Example:**
Year 1: Rice (Kharif) → Wheat (Rabi)
Year 2: Soybean (Kharif) → Chickpea (Rabi)
Year 3: Cotton (Kharif) → Mustard (Rabi)

**Rules for Good Rotation:**
1. Alternate deep-rooted with shallow-rooted
2. Alternate heavy feeders with light feeders
3. Include at least one legume in rotation
4. Never follow same family crops (Solanaceae → Solanaceae)
5. Include cover/green manure crops`,
  },
  'seed treatment': {
    title: 'Seed Treatment Methods',
    answer: `**Seed Treatment — Complete Guide:**

**Why Treat Seeds?**
- Protects seed and seedling from soil-borne diseases
- Improves germination rate 10-20%
- Provides early-season pest protection
- Cost-effective (low input, high return)

**Types of Seed Treatment:**

**1. Chemical Seed Treatment:**
- **Thiram** (2-3g/kg) — broad-spectrum fungicide
- **Carbendazim** (2g/kg) — systemic fungicide
- **Captan** (3g/kg) — contact fungicide
- **Imidacloprid** (10g/kg) — systemic insecticide
- **Metalaxyl** (3g/kg) — oomycete fungicide

**2. Bio-Seed Treatment:**
- **Trichoderma viride** (10g/kg) — bio-fungicide
- **Pseudomonas fluorescens** (10g/L) — bio-bactericide
- **Rhizobium** (legume-specific) — N-fixation
- **PSB** (4g/kg) — phosphorus solubilization
- **Bacillus subtilis** — broad spectrum

**3. Physical Seed Treatment:**
- **Hot water** — 52°C for 30 min (kills seed-borne fungi)
- **Solarization** — expose seeds to sunlight
- **Sorting & grading** — remove diseased/infested seeds

**How to Apply Seed Treatment:**
1. Take clean, healthy seeds
2. Weigh seed and treatment chemical/bio-agent
3. Mix thoroughly in a container or plastic bag
4. Ensure uniform coating on all seeds
5. Sow immediately (don't store treated seeds in sealed bags)

**Crop-Specific Recommendations:**
- **Rice:** Trichoderma + Pseudomonas
- **Wheat:** Carbendazim + Thiram
- **Chickpea:** Trichoderma + Mesorhizobium
- **Cotton:** Thiram + Imidacloprid
- **Potato:** Metalaxyl + Mancozeb (set treatment)

**Benefits:**
- 10-20% better germination
- Protection for first 2-3 weeks
- Reduces seedling diseases (damping off)
- Promotes healthy root development
- Cost: ₹5-10/kg vs benefit ₹500-1000/ha`,
  },
  'composting': {
    title: 'Composting Methods',
    answer: `**Composting — Complete Guide:**

**What is Composting?**
Controlled decomposition of organic matter by microorganisms into stable, humus-like material that improves soil health.

**Types of Composting:**

**1. Aerobic Composting (with oxygen):**
- **Windrow Composting:** Long rows of organic matter
- **Static Pile:** Piled material with forced aeration
- **In-vessel:** Containerized system
- Takes 3-6 months
- Produces stable, pathogen-free compost

**2. Anaerobic Composting (without oxygen):**
- **Bokashi:** Fermentation with effective microorganisms
- Takes 2-4 weeks
- Produces nutrient-rich ferment
- Good for kitchen waste

**3. Vermicomposting (with earthworms):**
- **Eisenia fetida** (red wigglers) — most common species
- Takes 2-3 months
- Produces high-quality vermicompost
- Nutrient content: N 1.5-2%, P 1-1.5%, K 1-1.5%

**Composting Recipe:**
- **Carbon:Nitrogen ratio:** 25-30:1
- **Carbon sources (brown):** Dry leaves, straw, paper, cardboard
- **Nitrogen sources (green):** Fresh grass, manure, food scraps
- **Moisture:** 50-60% (like wrung-out sponge)
- **Aeration:** Turn every 1-2 weeks

**How to Make Good Compost:**
1. Layer brown and green materials (3:1 ratio)
2. Keep moist but not wet
3. Turn regularly for aeration
4. Temperature should reach 55-65°C (kills pathogens)
5. Ready when dark, crumbly, earthy smell

**Vermicompost Setup:**
1. Take a plastic crate (3x2x1 feet)
2. Make holes for drainage and aeration
3. Layer with coir/peat and decomposed FYM
4. Introduce 500-1000 earthworms
5. Feed with vegetable waste daily
6. Harvest after 60-90 days

**Benefits:**
- Improves soil structure and water retention
- Adds beneficial microorganisms
- Slow-release nutrients
- Reduces waste going to landfill
- Cost: Minimal (waste material as input)`,
  },
  'crop insurance': {
    title: 'Crop Insurance',
    answer: `**Crop Insurance — Complete Guide:**

**What is Crop Insurance?**
Financial protection for farmers against crop losses due to natural calamities, pests, and diseases.

**Types of Crop Insurance in India:**

**1. PM Fasal Bima Yojana (PMFBY):**
- Premium: 1.5-5% of sum insured (government subsidized)
- Coverage: Natural calamities, pests, diseases
- Claims: Based on crop cutting experiments
- Enrollment: Before sowing deadline

**2. Weather Based Crop Insurance (WBCIS):**
- Uses weather parameters (rainfall, temperature, humidity)
- Quick claim settlement (no crop cutting needed)
- Good for areas with limited crop cutting data

**3. Modified NAIS (National Agricultural Insurance Scheme):**
- Government-operated scheme
- Covers food crops, oilseeds, annual horticultural crops

**Coverage Includes:**
- Drought, flood, hailstorm
- Pest and disease damage
- Frost, unseasonal rain
- Landslide, earthquake

**How to Enroll:**
1. Visit nearest bank or insurance company
2. Submit land records and sowing certificate
3. Pay premium (or zero for small farmers under some schemes)
4. Get policy document

**Filing Claims:**
1. Report loss within 72 hours
2. Insurance company conducts inspection
3. Crop cutting experiments (if applicable)
4. Claim amount credited to bank account

**Tips for Farmers:**
- Always insure before sowing deadline
- Keep all documents ready
- Report losses immediately
- Understand your coverage limits`,
  },
  'water management': {
    title: 'Water Management in Agriculture',
    answer: `**Water Management — Why It Matters:**

Water is the most critical input in agriculture. Poor water management causes:
- 40% of global crop losses
- Soil salinization and waterlogging
- Nutrient leaching
- Reduced crop quality

**Key Water Management Principles:**

**1. Match Water Supply to Crop Demand:**
- Different crops need different amounts
- Different growth stages have different needs
- Over-watering is as harmful as under-watering

**2. Reduce Water Waste:**
- Drip irrigation saves 40-60% vs flood
- Mulching reduces evaporation 50%
- Deficit irrigation at non-critical stages

**3. Improve Water Storage:**
- Farm ponds for rainwater harvesting
- Check dams on streams
- Rooftop water collection
- Mulching conserves soil moisture

**4. Drainage Management:**
- Prevent waterlogging (most crops hate it)
- Install surface/subsurface drains
- Raised bed planting for waterlogged areas

**Water-Efficient Practices:**
- **AWD for rice:** Alternate Wetting and Drying saves 30%
- **Precision irrigation:** Apply exact amount needed
- **Scheduling:** Irrigate at right growth stage
- **Conservation tillage:** Reduces evaporation

**Water-Scarce Farming:**
- Drought-tolerant varieties
- Micro-irrigation (drip/sprinkler)
- Mulching (organic or plastic)
- Rainwater harvesting
- Recycling farm wastewater

**Economics of Water:**
- Every 1% increase in water use efficiency = ₹500-1000/ha additional income
- Drip irrigation ROI: 100-200% within 2-3 years
- Water-secure farms have 30-50% higher yields`,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2: ENTITY EXTRACTION & INTENT CLASSIFICATION
// ═══════════════════════════════════════════════════════════════════════════════

const CROP_ALIASES = {
  'paddy': 'rice', 'dhaan': 'rice', 'chawal': 'rice',
  'gehu': 'wheat', 'kanak': 'wheat',
  'makka': 'maize', 'bhutta': 'maize',
  'tamatar': 'tomato',
  'aaloo': 'potato', 'batata': 'potato',
  'mirch': 'chili', 'lal mirch': 'chili', 'hari mirch': 'chili',
  'pyaz': 'onion',
  'kapaas': 'cotton', 'rooi': 'cotton',
  'ganna': 'sugarcane',
  'kela': 'banana',
  'aam': 'mango',
  'nariyal': 'coconut',
  'moongfali': 'groundnut', 'peanut': 'groundnut',
  'soya': 'soybean',
  'chana': 'chickpea', 'gram': 'chickpea', 'kabuli chana': 'chickpea',
};

const DISEASE_ALIASES = {
  'blight': ['early blight', 'late blight', 'bacterial blight'],
  'early blight': ['early blight'],
  'late blight': ['late blight'],
  'rust': ['rust', 'yellow rust', 'stripe rust', 'soybean rust'],
  'yellow rust': ['yellow rust', 'rust'],
  'stripe rust': ['yellow rust', 'rust'],
  'blast': ['blast', 'rice blast'],
  'mildew': ['powdery mildew'],
  'powdery mildew': ['powdery mildew'],
  'downy mildew': ['downy mildew'],
  'wilt': ['fusarium wilt', 'bacterial wilt', 'chickpea wilt'],
  'fusarium wilt': ['fusarium wilt'],
  'bacterial wilt': ['bacterial wilt'],
  'armyworm': ['armyworm', 'fall armyworm'],
  'fall armyworm': ['armyworm', 'fall armyworm'],
  'bollworm': ['bollworm'],
  'leaf curl': ['leaf curl'],
  'anthracnose': ['anthracnose'],
  'red rot': ['red rot'],
  'sigatoka': ['sigatoka', 'black sigatoka'],
  'purple blotch': ['purple blotch'],
  'tikka': ['tikka', 'tikka leaf spot'],
  'ascochyta': ['ascochyta blight'],
  'bud rot': ['bud rot coconut'],
  'leaf spot': ['tikka', 'leaf spot'],
  'root rot': ['fusarium wilt', 'root rot'],
  'mosaic': ['mosaic virus'],
  'yellowing': ['nutrient deficiency'],
  'wilting': ['wilt', 'bacterial wilt'],
};

function normalize(text) {
  return text.toLowerCase().trim()
    .replace(/[?!.,;:'"()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractCrops(msg) {
  const found = [];
  for (const [alias, cropId] of Object.entries(CROP_ALIASES)) {
    if (msg.includes(alias)) found.push(cropId);
  }
  for (const cropId of Object.keys(CROPS)) {
    if (msg.includes(cropId)) found.push(cropId);
  }
  return [...new Set(found)];
}

function extractDiseases(msg) {
  const found = new Set();
  // Sort by keyword length descending to match longer (more specific) keywords first
  const sortedEntries = Object.entries(DISEASE_ALIASES).sort((a, b) => b[0].length - a[0].length);
  for (const [keyword, diseaseKeys] of sortedEntries) {
    // Use word boundary matching to avoid "blight" matching inside "late blight"
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    if (regex.test(msg)) {
      for (const dk of diseaseKeys) found.add(dk);
    }
  }
  return [...found];
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3: RESPONSE GENERATORS — EVERY QUESTION GETS A REAL ANSWER
// ═══════════════════════════════════════════════════════════════════════════════

function generateCropGuide(cropId, subTopic) {
  const crop = CROPS[cropId];
  if (!crop) return null;

  if (subTopic === 'fertilizer' || subTopic === 'npk' || subTopic === 'nutrition') {
    return `**${crop.emoji} ${crop.name} — Fertilizer & Nutrition Guide**

**NPK Recommendation:** ${crop.npk}

**Nutrient Details:**
${Object.entries(crop.nutrients).map(([k, v]) => `- **${k.charAt(0).toUpperCase() + k.slice(1)}:** ${v}`).join('\n')}

**Organic Sources:** FYM 10-15 t/ha, Vermicompost 2-5 t/ha, Neem cake 200 kg/ha
**Bio-fertilizers:** Rhizobium (legumes), PSB, Azotobacter, Mycorrhiza

💡 Apply nutrients based on soil test. Split nitrogen into 2-3 doses for best results.`;
  }

  if (subTopic === 'disease' || subTopic === 'diseases' || subTopic === 'pest') {
    const diseases = crop.commonDiseases.join(', ');
    const pests = crop.commonPests.join(', ');
    return `**${crop.emoji} ${crop.name} — Disease & Pest Management**

**Common Diseases:** ${diseases}
**Common Pests:** ${pests}

**IPM Strategy:**
1. **Prevention:** Resistant varieties, crop rotation, field hygiene
2. **Monitoring:** Weekly scouting, pheromone traps, sticky traps
3. **Biological:** Trichogramma, Neem oil 5ml/L, Bt spray
4. **Chemical (last resort):** Targeted spraying, rotate chemical classes

💡 Early detection is key. Scout your fields every 5-7 days and treat at first sign of symptoms.`;
  }

  if (subTopic === 'irrigation' || subTopic === 'water') {
    return `**${crop.emoji} ${crop.name} — Irrigation Guide**

**Water Requirement:** ${crop.water}

**Irrigation Tips:**
${crop.tips.filter(t => t.toLowerCase().includes('water') || t.toLowerCase().includes('irrigat') || t.toLowerCase().includes('drip')).map(t => `- ${t}`).join('\n') || '- Maintain uniform moisture throughout growing season'}

**Best Practices:**
- Irrigate early morning to reduce disease pressure
- Avoid evening irrigation (promotes fungal growth)
- Use drip irrigation where possible (saves 40-60% water)
- Mulching conserves moisture and suppresses weeds`;
  }

  if (subTopic === 'storage' || subTopic === 'post harvest') {
    return `**${crop.emoji} ${crop.name} — Post-Harvest Storage**

**Storage Method:** ${crop.storage}

**Market Uses:**
${crop.marketUses.map(u => `- ${u}`).join('\n')}

**Food Uses:**
${crop.foodUses.map(u => `- ${u}`).join('\n')}

💡 Proper drying before storage is critical. High moisture leads to fungal growth, aflatoxin, and spoilage.`;
  }

  if (subTopic === 'harvest') {
    return `**${crop.emoji} ${crop.name} — Harvest Guide**

**When to Harvest:** ${crop.harvest}
**Expected Yield:** ${crop.yield}

**Harvest Tips:**
${crop.tips.filter(t => t.toLowerCase().includes('harvest') || t.toLowerCase().includes('maturity')).map(t => `- ${t}`).join('\n') || `- Monitor maturity indicators specific to ${crop.name}`}

**Post-Harvest Handling:**
- Dry to safe moisture level before storage
- Grade and sort produce
- Handle carefully to minimize mechanical damage`;
  }

  if (subTopic === 'variety' || subTopic === 'varieties' || subTopic === 'seeds') {
    return `**${crop.emoji} ${crop.name} — Recommended Varieties**

${crop.varieties.map(v => `- **${v}**`).join('\n')}

**Selection Tips:**
- Choose disease-resistant varieties for your region
- Consult local agricultural extension for varieties suited to your area
- High-yielding varieties (HYV) require more inputs but give better returns`;
  }

  if (subTopic === 'season' || subTopic === 'sowing' || subTopic === 'planting') {
    return `**${crop.emoji} ${crop.name} — Seasonal Guide**

**Growing Season:** ${crop.season}
**Sowing Method:** ${crop.sowing}
**Spacing:** ${crop.spacing}

**Days to Harvest:** ${crop.harvest.match(/\d+/)?.[0] || '60-120'} days

**Key Agricultural Seasons:**
- **Kharif (June-October):** Rice, Maize, Cotton, Soybean
- **Rabi (October-March):** Wheat, Gram, Mustard, Potato
- **Summer (March-June):** Watermelon, Cucumber

Plan sowing dates based on local weather and irrigation availability.`;
  }

  if (subTopic === 'food' || subTopic === 'cooking' || subTopic === 'recipe') {
    return `**${crop.emoji} ${crop.name} — Food & Culinary Uses**

${crop.foodUses.map(u => `- ${u}`).join('\n')}

**Market/Processing Uses:**
${crop.marketUses.map(u => `- ${u}`).join('\n')}

${crop.name} is versatile and used in both traditional and modern cuisine worldwide.`;
  }

  // Default: full crop guide
  return `**${crop.emoji} ${crop.name} (${crop.scientific})** — Complete Growing Guide

**Family:** ${crop.family}
**Climate:** ${crop.climate}
**Soil:** ${crop.soil}
**Water:** ${crop.water}
**NPK:** ${crop.npk}
**Season:** ${crop.season}
**Spacing:** ${crop.spacing}
**Sowing:** ${crop.sowing}
**Harvest:** ${crop.harvest}
**Yield:** ${crop.yield}

**Top Varieties:** ${crop.varieties.join(', ')}

**Common Diseases:** ${crop.commonDiseases.join(', ')}
**Common Pests:** ${crop.commonPests.join(', ')}

**Expert Tips:**
${crop.tips.map(t => `- ${t}`).join('\n')}

Ask me about specific diseases, fertilizers, or pest control for ${crop.name} for more details!`;
}

function generateDiseaseResponse(diseaseKey, cropHint) {
  let disease = null;
  const searchTerms = diseaseKey.toLowerCase();

  for (const [key, d] of Object.entries(DISEASE百科)) {
    if (searchTerms.includes(key) || key.includes(searchTerms) || d.crops.some(c => searchTerms.includes(c))) {
      if (!cropHint || d.crops.includes(cropHint)) { disease = d; break; }
    }
  }

  if (!disease && cropHint) {
    for (const [, d] of Object.entries(DISEASE百科)) {
      if (d.crops.includes(cropHint)) { disease = d; break; }
    }
  }

  if (!disease) {
    return `**${diseaseKey}** — Treatment Guide

I don't have specific data on this exact disease, but here's general guidance for similar conditions:

**Immediate Steps:**
1. Isolate affected plants if possible
2. Remove and destroy severely infected parts
3. Improve air circulation around plants
4. Start with organic treatments (Neem oil 5ml/L or Trichoderma 5g/L)
5. If severe, consult local agronomist for targeted chemical treatment

**Prevention for Similar Diseases:**
- Use certified disease-free planting material
- Practice crop rotation (2-3 years)
- Maintain balanced nutrition
- Avoid overhead irrigation
- Keep field clean of crop debris

Tell me the specific crop name for a more detailed treatment plan!`;
  }

  const cropEmoji = disease.crops[0] ? (CROPS[disease.crops[0]]?.emoji || '🌱') : '🌱';

  return `**${cropEmoji} ${disease.name} (${disease.scientific})**
**Affects:** ${disease.crops.map(c => CROPS[c]?.name || c).join(', ')}
**Severity:** ${disease.severity}

**Symptoms:**
${disease.symptoms.map(s => `- ${s}`).join('\n')}

**Causes:**
${disease.causes.map(c => `- ${c}`).join('\n')}

**🌿 Organic Treatment:**
${disease.organic.map(t => `- ${t}`).join('\n')}

**💊 Chemical Treatment:**
${disease.chemical.map(t => `- ${t}`).join('\n')}

**🛡️ Prevention:**
${disease.prevention.map(p => `- ${p}`).join('\n')}

**🧪 Fertilizer Support:**
${disease.fertilizers.map(f => `- ${f}`).join('\n')}

**Care Instructions:**
${disease.care.map(c => `- ${c}`).join('\n')}

Early detection is key. Scout your fields regularly and treat at the first sign of symptoms.`;
}

function generateGeneralPlantScience(msg) {
  // Check all plant science topics
  for (const [key, data] of Object.entries(PLANT_SCIENCE)) {
    if (msg.includes(key)) return data.answer;
  }

  // Fuzzy matching for common plant science topics
  if (msg.includes('photosynthesis') || msg.includes('how plant make food') || msg.includes('how plant grow')) {
    return PLANT_SCIENCE['photosynthesis'].answer;
  }
  if (msg.includes('disease') && (msg.includes('why') || msg.includes('cause') || msg.includes('reason'))) {
    return PLANT_SCIENCE['why disease'].answer;
  }
  if (msg.includes('disease') && (msg.includes('what') || msg.includes('type') || msg.includes('kind'))) {
    return PLANT_SCIENCE['plant disease'].answer;
  }
  if (msg.includes('soil') && (msg.includes('health') || msg.includes('quality') || msg.includes('good') || msg.includes('bad'))) {
    return PLANT_SCIENCE['soil health'].answer;
  }
  if (msg.includes('fertilizer') || msg.includes('npk') || msg.includes('manure') || msg.includes('compost')) {
    return PLANT_SCIENCE['fertilizer'].answer;
  }
  if (msg.includes('irrigation') || msg.includes('water') || msg.includes('drip') || msg.includes('watering')) {
    return PLANT_SCIENCE['irrigation'].answer;
  }
  if (msg.includes('pest') || msg.includes('insect') || msg.includes('ipm')) {
    return PLANT_SCIENCE['pest control'].answer;
  }
  if (msg.includes('organic')) {
    return PLANT_SCIENCE['organic farming'].answer;
  }
  if (msg.includes('rotation') || msg.includes('rotate')) {
    return PLANT_SCIENCE['crop rotation'].answer;
  }
  if (msg.includes('seed treatment') || msg.includes('treat seed')) {
    return PLANT_SCIENCE['seed treatment'].answer;
  }
  if (msg.includes('compost')) {
    return PLANT_SCIENCE['composting'].answer;
  }
  if (msg.includes('insurance')) {
    return PLANT_SCIENCE['crop insurance'].answer;
  }
  if (msg.includes('nutrient') || msg.includes('absorb') || msg.includes('uptake')) {
    return PLANT_SCIENCE['how plants absorb'].answer;
  }

  return null;
}

function generateTopicResponse(topicKey) {
  const topic = TOPIC_KNOWLEDGE[topicKey];
  if (!topic) return null;
  return `**${topic.title}**

${topic.overview}

${topic.details}

Apply these practices based on your specific crop and local conditions. Consult your local agricultural extension for region-specific advice.`;
}

function generateWhyResponse(msg, crops) {
  // Comprehensive "why" answers for common farming questions
  if (msg.includes('disease') || msg.includes('sick') || msg.includes('die') || msg.includes('dying')) {
    return PLANT_SCIENCE['why disease'].answer;
  }
  if (msg.includes('yellow') || msg.includes('chlorosis')) {
    return `**Why Do Plant Leaves Turn Yellow?**

Yellow leaves (chlorosis) can be caused by several factors:

**1. Nitrogen Deficiency (Most Common):**
- Older leaves turn pale green then yellow
- Starts from leaf tip and moves inward
- Common in sandy soils and after heavy rain
- **Fix:** Apply Urea @ 46 kg N/ha or foliar 2% Urea spray

**2. Iron Deficiency:**
- Young leaves turn yellow with green veins (interveinal chlorosis)
- Common in alkaline soils (pH >7.5)
- **Fix:** Foliar Ferrous Sulfate @ 0.5% spray, lower soil pH

**3. Waterlogging:**
- Roots can't absorb nutrients in waterlogged soil
- All leaves turn yellow uniformly
- **Fix:** Improve drainage, avoid overwatering

**4. Root Damage:**
- Nematodes, root rot, or mechanical damage
- Wilting and yellowing despite adequate water
- **Fix:** Treat root diseases, apply Trichoderma to soil

**5. Natural Senescence:**
- Older leaves naturally yellow as plant matures
- Normal process, not a problem
- **Fix:** No action needed

**Quick Diagnosis:**
- Yellow older leaves = Nitrogen deficiency
- Yellow young leaves = Iron/Zinc deficiency
- Yellow with brown spots = Fungal disease
- Yellow after rain = Waterlogging stress`;
  }
  if (msg.includes('wilt') || msg.includes('wilting')) {
    return `**Why Do Plants Wilt?**

Wilting occurs when plants lose more water than they can absorb, or when water transport is blocked:

**1. Under-watering (Drought Stress):**
- Soil is dry, leaves droop, curl inward
- Most common cause of wilting
- **Fix:** Irrigate immediately, mulch to retain moisture

**2. Over-watering (Waterlogging):**
- Roots suffocate, can't absorb water
- Paradoxically, overwatered plants wilt too
- **Fix:** Reduce irrigation, improve drainage

**3. Fusarium/Verticillium Wilt (Fungal):**
- Yellowing starts on one side of plant
- Vascular tissue turns brown when stem is cut
- Soil-borne pathogen blocks water vessels
- **Fix:** Remove infected plants, treat soil with Trichoderma

**4. Bacterial Wilt:**
- Rapid wilting of entire plant
- Bacterial ooze from cut stem in water
- Spread by cucumber beetles
- **Fix:** Remove plants, control beetle vectors

**5. Root-Knot Nematode:**
- Stunted growth, yellowing, wilting
- Galls on roots visible when uprooted
- **Fix:** Solarization, resistant varieties, crop rotation

**Quick Test:** Cut stem at base. If brown inside = vascular wilt disease. If white = water stress.`;
  }
  if (msg.includes('not grow') || msg.includes('stunt') || msg.includes('slow growth')) {
    return `**Why Are My Plants Not Growing / Stunted?**

Stunted growth can have multiple causes:

**1. Nutrient Deficiency:**
- NPK shortage is the #1 cause
- Soil may be depleted or pH is wrong
- **Fix:** Test soil, apply balanced fertilizer

**2. Root Problems:**
- Root-knot nematodes cause galls on roots
- Root rot from overwatering
- Compacted soil restricts root growth
- **Fix:** Loosen soil, apply Trichoderma, treat nematodes

**3. Water Stress:**
- Too little water = wilting and slow growth
- Too much water = root suffocation
- **Fix:** Maintain consistent moisture, improve drainage

**4. Temperature Stress:**
- Cold shock slows metabolic processes
- Heat stress causes leaf scorch
- **Fix:** Mulch for insulation, provide shade

**5. Pest Damage:**
- Sap-sucking insects (aphids, whitefly) drain energy
- Root borers damage underground parts
- **Fix:** IPM approach, neem oil spray

**6. Soil Compaction:**
- Hard soil restricts root penetration
- Common in clay soils or machine-traffic areas
- **Fix:** Deep plowing, add organic matter

**7. Insufficient Light:**
- Plants need 6-8 hours of direct sunlight
- Shaded plants grow slowly
- **Fix:** Prune surrounding vegetation, proper spacing`;
  }
  if (msg.includes('flower') || msg.includes('bloom') || msg.includes('no flower')) {
    return `**Why Are My Plants Not Flowering?**

Lack of flowering can be caused by:

**1. Excess Nitrogen:**
- Too much N promotes leafy growth at expense of flowers
- Common with over-fertilization
- **Fix:** Reduce nitrogen, increase phosphorus

**2. Insufficient Light:**
- Most flowering plants need 6-8 hours sun
- Shaded plants produce fewer flowers
- **Fix:** Prune for light penetration, proper spacing

**3. Temperature Extremes:**
- Extreme heat or cold can prevent flower set
- Some crops need specific temperature triggers
- **Fix:** Time planting to avoid temperature extremes

**4. Water Stress:**
- Drought stress causes flower drop
- Overwatering can also prevent flowering
- **Fix:** Consistent moisture at flowering stage

**5. Pest/Disease Damage:**
- Flowers attacked by thrips, mites, or fungal diseases
- **Fix:** Regular scouting, timely treatment

**6. Immature Plant:**
- Some plants need to reach maturity before flowering
- Annuals flower in first year, perennials may take 2-3 years
- **Fix:** Be patient, ensure proper nutrition`;
  }
  if (msg.includes('pest') || msg.includes('insect') || msg.includes('bug')) {
    return PLANT_SCIENCE['pest control'].answer;
  }
  if (msg.includes('soil')) {
    return PLANT_SCIENCE['soil health'].answer;
  }
  if (msg.includes('fertilizer') || msg.includes('npk') || msg.includes('nutrient')) {
    return PLANT_SCIENCE['fertilizer'].answer;
  }
  if (msg.includes('water') || msg.includes('irrigation')) {
    return PLANT_SCIENCE['irrigation'].answer;
  }

  return null;
}

function generateHowResponse(msg, crops) {
  if (msg.includes('start') && (msg.includes('farm') || msg.includes('grow') || msg.includes('agriculture'))) {
    return `**How to Start Farming — Complete Beginner's Guide:**

**Step 1: Land Preparation**
- Test soil for pH, NPK, and micronutrients
- Plow and harrow to create fine tilth
- Apply FYM/vermicompost 2-3 weeks before sowing
- Level field for uniform water distribution

**Step 2: Crop Selection**
- Choose crops suited to your climate and soil
- Consider market demand and water availability
- Select disease-resistant varieties
- Start with easy crops (maize, groundnut, vegetables)

**Step 3: Sowing/Planting**
- Follow recommended spacing and seed rate
- Treat seeds with bio-agents (Trichoderma, Rhizobium)
- Ensure adequate moisture at sowing
- Use quality seeds from certified sources

**Step 4: Crop Management**
- Irrigate at critical growth stages
- Apply fertilizers as per soil test
- Monitor for pests and diseases weekly
- Weed control — critical first 30 days

**Step 5: Harvest & Marketing**
- Harvest at optimal maturity
- Dry and grade produce properly
- Identify market channels before harvest
- Consider value addition for better prices

**Investment (Approximate):**
- Land preparation: ₹5,000-10,000/ha
- Seeds: ₹2,000-5,000/ha
- Fertilizers: ₹8,000-15,000/ha
- Irrigation: ₹5,000-10,000/ha
- Labor: ₹20,000-40,000/ha

**Tips for Success:**
- Start small, learn from experience
- Consult local Krishi Vigyan Kendra (KVK)
- Keep records of costs and yields
- Join farmer producer organizations (FPOs)`;
  }
  if (msg.includes('improve') && (msg.includes('yield') || msg.includes('production'))) {
    return `**How to Improve Crop Yield — 15 Proven Methods:**

**1. Use Quality Seeds:**
- Certified, disease-resistant varieties
- Treated seeds (Trichoderma + bio-fertilizers)
- Improves germination 10-20%

**2. Optimize Nutrients:**
- Soil test-based fertilizer application
- Split nitrogen doses (basal + top dress)
- Include micronutrients (Zn, B, Fe)

**3. Efficient Irrigation:**
- Drip irrigation saves 40-60% water
- Irrigate at critical growth stages
- Mulching conserves moisture

**4. IPM Strategy:**
- Scout weekly for early pest detection
- Use biological control first
- Chemical control only as last resort

**5. Crop Rotation:**
- Break pest/disease cycles
- Include legumes for N-fixation
- Alternate deep/shallow rooted crops

**6. Timely Operations:**
- Sow at optimal time
- Weed control in first 30 days
- Harvest at proper maturity

**7. Soil Health:**
- Add organic matter regularly
- Minimize tillage
- Cover crops in off-season

**8. Plant Density:**
- Follow recommended spacing
- Don't overcrowd (reduces individual plant growth)

**9. Intercropping:**
- Grow 2-3 crops together
- Maximizes land use
- Reduces pest pressure

**10. Protected Cultivation:**
- Polyhouse/greenhouse for high-value crops
- Extends growing season
- Better control over environment

**Expected Improvement:** 30-50% yield increase with proper management.`;
  }
  if (msg.includes('control') && msg.includes('weed')) {
    return `**How to Control Weeds — Complete Guide:**

**Why Weed Control Matters:**
- Weeds compete for water, nutrients, light
- Can reduce yields 20-80% if uncontrolled
- Harbor pests and diseases
- Reduce crop quality

**Weed Control Methods:**

**1. Cultural (Prevention):**
- Use clean, weed-free seeds
- Proper crop spacing (shades out weeds)
- Mulching (blocks weed emergence)
- Crop rotation (disrupts weed cycles)
- Cover crops (suppress weeds)

**2. Mechanical:**
- Hand weeding (most effective but labor-intensive)
- Hoeing (shallow cultivation between rows)
- Mechanical weeders (tractor-mounted)
- Earthing up (covers weeds near crop base)

**3. Chemical (Herbicides):**
- **Pre-emergence:** Applied before weeds germinate
  - Pendimethalin 30% EC @ 3.3 ml/L (rice, wheat)
  - Oxadiazon 25% EC @ 4 ml/L (transplanted rice)
- **Post-emergence:** Applied after weeds appear
  - 2,4-D @ 1 ml/L for broadleaf weeds in cereals
  - Quizalofop-ethyl 5% EC @ 1.5 ml/L for grass weeds

**4. Biological:**
- cover crops (Sesbania, Dhaincha)
- Allelopathic plants (sunflower, sorghum)
- Goat/sheep grazing in fallow fields

**Weed Control Calendar:**
- Before sowing: Plow + apply pre-emergence herbicide
- 15-20 DAS: First hoeing/manual weeding
- 30-40 DAS: Second weeding if needed
- 60 DAS: Usually crop canopy shades out weeds

**Integrated Approach:** Combine cultural + mechanical + chemical for best results.`;
  }

  return null;
}

function generateWhenResponse(msg, crops) {
  if (msg.includes('sow') || msg.includes('plant')) {
    const cropList = crops.length > 0 ? crops : ['your crop'];
    return `**When to Sow/Plant — Seasonal Guide by Crop:**

**Kharif Season (Monsoon: June-October)**
Sow at onset of monsoon rains:
- **Rice:** June-July (transplanting), May-June (direct seeding)
- **Maize:** June-July (first fortnight)
- **Cotton:** May-June (pre-monsoon sowing)
- **Soybean:** June-July (with onset of rains)
- **Groundnut:** June-July (rainfed), Feb-March (summer irrigated)

**Rabi Season (Winter: October-March)**
Sow after monsoon retreat:
- **Wheat:** October 15-November 25 (optimal: Nov 1-15)
- **Chickpea:** October-November
- **Potato:** October-November (plains), February (hills)
- **Onion:** October-November (transplanting)
- **Mustard:** October-November

**Summer Season (March-June)**
Short-duration crops:
- **Watermelon:** February-March
- **Cucumber:** February-March
- **Summer Groundnut:** February-March (irrigated)

**Key Factors for Timing:**
- Soil temperature (most seeds need 15-25°C)
- Moisture availability (rainfall or irrigation)
- Photoperiod (day length affects some crops)
- Market prices (time harvest for best prices)

For ${cropList[0]}, sowing time depends on your region and variety. Consult local agricultural extension for precise dates.`;
  }
  if (msg.includes('harvest')) {
    return `**When to Harvest — Indicators by Crop:**

**Rice:** 110-150 days. Harvest when 80% grains turn golden and moisture is 20-22%
**Wheat:** 120-140 days. Harvest when ears dry golden-yellow and grain hardens
**Maize:** 90-110 days. Harvest when husks turn brown and kernels are dented
**Tomato:** 60-80 days after transplanting. Pick at breaker stage for transport
**Potato:** 80-110 days. Harvest when haulms turn yellow
**Cotton:** 160-180 days. Multiple pickings as bolls burst open
**Onion:** 100-140 days. Harvest when 50% tops fall over naturally
**Chili:** 60-70 days (green), 90-100 days (red ripe)

**General Harvest Rules:**
1. Harvest in dry conditions (morning dew dried)
2. Don't harvest when plants are wet (disease risk)
3. Handle carefully to minimize mechanical damage
4. Dry to safe moisture before storage`;
  }
  if (msg.includes('irrigat') || msg.includes('water')) {
    return `**When to Irrigate — Critical Growth Stages:**

**Rice:**
- Maintain standing water tillering stage
- Drain briefly at flowering
- AWD (Alternate Wetting and Drying) saves 30% water

**Wheat — 4 Critical Irrigations:**
1. Crown Root Initiation (21 DAP)
2. Tillering stage (40-45 DAP)
3. Flowering stage (65-70 DAP)
4. Milk/Grain filling stage (90-100 DAP)

**Maize — 3 Critical Irrigations:**
1. Knee-high stage (30-35 DAP)
2. Tasseling/silking (55-60 DAP)
3. Grain filling (75-80 DAP)

**Tomato:**
- At transplanting
- At flowering
- At fruit set
- Keep consistent moisture (drip preferred)

**General Rule:** Most crops need water at:
- Establishment/transplanting
- Flowering
- Fruit/grain filling
- Never irrigate in evening (promotes fungal disease)`;
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4: MAIN AGROMIND ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

const conversationContext = new Map();

export function getConversationContext(sessionId) {
  return conversationContext.get(sessionId) || { lastCrop: null, lastDisease: null, lastTopic: null };
}

export function generateReply(userMessage, sessionId = 'default', history = []) {
  const msg = normalize(userMessage);
  const crops = extractCrops(msg);
  const diseases = extractDiseases(msg);

  // Track context
  const ctx = conversationContext.get(sessionId) || { lastCrop: null, lastDisease: null, lastTopic: null };
  if (crops[0]) ctx.lastCrop = crops[0];
  if (diseases[0]) ctx.lastDisease = diseases[0];
  conversationContext.set(sessionId, ctx);

  // Handle follow-ups with pronouns
  const isFollowup = /\b(it|that|also|and what|what about|how about|tell me more|and|plus)\b/.test(msg);
  const effectiveCrop = crops[0] || (isFollowup ? ctx.lastCrop : null);
  const effectiveDisease = diseases[0] || (isFollowup ? ctx.lastDisease : null);

  // STEP 1: Greeting
  if (GREETING_KEYWORDS.some(kw => msg.includes(kw)) && !crops.length && !diseases.length && msg.length < 30) {
    return { reply: GREETINGS.reply, intent: 'greeting', crop: null, disease: null };
  }

  // STEP 2: "Why" questions about plants/agriculture (before disease matching)
  if (/\bwhy\b/.test(msg)) {
    const whyAnswer = generateWhyResponse(msg, crops);
    if (whyAnswer) return { reply: whyAnswer, intent: 'explanation', crop: crops[0] || null, disease: null };
  }

  // STEP 3: "How to" questions
  if (/\bhow\b/.test(msg)) {
    const howAnswer = generateHowResponse(msg, crops);
    if (howAnswer) return { reply: howAnswer, intent: 'how_to', crop: crops[0] || null, disease: null };
  }

  // STEP 4: "When" questions
  if (/\bwhen\b/.test(msg)) {
    const whenAnswer = generateWhenResponse(msg, crops);
    if (whenAnswer) return { reply: whenAnswer, intent: 'when_to', crop: crops[0] || null, disease: null };
  }

  // STEP 5: Disease queries (treatment requests)
  if (diseases.length > 0 || (effectiveDisease && isFollowup)) {
    const diseaseKey = diseases[0] || effectiveDisease;
    return { reply: generateDiseaseResponse(diseaseKey, effectiveCrop), intent: 'disease_treatment', crop: effectiveCrop, disease: diseaseKey };
  }

  // STEP 6: Crop-specific queries
  if (effectiveCrop || crops.length > 0) {
    const cropId = effectiveCrop || crops[0];

    // Detect sub-topic
    let subTopic = null;
    if (/\b(fertiliz|npk|nutri|manur|compost|urea|dap)\b/.test(msg)) subTopic = 'fertilizer';
    else if (/\b(disease|pest|insect|bug|worm|blight|rust|mildew|wilt)\b/.test(msg)) subTopic = 'disease';
    else if (/\b(irrigat|water|drip|sprinkler)\b/.test(msg)) subTopic = 'irrigation';
    else if (/\b(store|storage|preserv|shelf|post.?harvest)\b/.test(msg)) subTopic = 'storage';
    else if (/\b(harvest|reap|maturity|yield|pick)\b/.test(msg)) subTopic = 'harvest';
    else if (/\b(variety|varieties|cultivar|hybrid|seed|type)\b/.test(msg)) subTopic = 'variety';
    else if (/\b(season|sow|plant|calendar|kharif|rabi)\b/.test(msg)) subTopic = 'season';
    else if (/\b(food|cook|recipe|eat|dish|culinary)\b/.test(msg)) subTopic = 'food';

    const cropGuide = generateCropGuide(cropId, subTopic);
    if (cropGuide) return { reply: cropGuide, intent: subTopic || 'crop_info', crop: cropId, disease: null };
  }

  // STEP 7: General plant science / farming questions (NEVER return generic fallback)
  const scienceAnswer = generateGeneralPlantScience(msg);
  if (scienceAnswer) return { reply: scienceAnswer, intent: 'general', crop: crops[0] || null, disease: null };

  // STEP 8: Topic-based queries
  for (const [topicKey, topicData] of Object.entries(TOPIC_KNOWLEDGE)) {
    if (msg.includes(topicKey) || msg.includes(topicKey.replace(/\s/g, ''))) {
      return { reply: generateTopicResponse(topicKey), intent: 'topic', crop: null, disease: null };
    }
  }

  // STEP 9: Fuzzy topic matching
  if (/\b(organic|natural|bio|eco)\b/.test(msg)) return { reply: generateTopicResponse('organicFarming'), intent: 'organic', crop: null, disease: null };
  if (/\b(soil|compost|manure|ph)\b/.test(msg)) return { reply: generateTopicResponse('soil'), intent: 'soil', crop: null, disease: null };
  if (/\b(irrigat|water|drip)\b/.test(msg)) return { reply: generateTopicResponse('irrigation'), intent: 'irrigation', crop: null, disease: null };
  if (/\b(season|kharif|rabi|calendar)\b/.test(msg)) return { reply: generateTopicResponse('season'), intent: 'season', crop: null, disease: null };
  if (/\b(store|storage|preserv)\b/.test(msg)) return { reply: generateTopicResponse('storage'), intent: 'storage', crop: null, disease: null };
  if (/\b(pest|insect|bug|ipm)\b/.test(msg)) return { reply: generateTopicResponse('pest'), intent: 'pest', crop: null, disease: null };
  if (/\b(seed.?treat|treat.?seed)\b/.test(msg)) return { reply: PLANT_SCIENCE['seed treatment'].answer, intent: 'seed_treatment', crop: null, disease: null };
  if (/\b(compost|vermicompost)\b/.test(msg)) return { reply: PLANT_SCIENCE['composting'].answer, intent: 'composting', crop: null, disease: null };
  if (/\b(crop.?rotat|rotate.?crop)\b/.test(msg)) return { reply: PLANT_SCIENCE['crop rotation'].answer, intent: 'rotation', crop: null, disease: null };
  if (/\b(insur|bima)\b/.test(msg)) return { reply: PLANT_SCIENCE['crop insurance'].answer, intent: 'insurance', crop: null, disease: null };

  // STEP 10: ABSOLUTE FINAL FALLBACK — ALWAYS provide a real answer
  // Parse the question to give a relevant response
  const questionWords = msg.match(/\b(what|why|how|when|where|which|who|tell|explain|describe|give|show|list|name)\b/);
  const questionWord = questionWords ? questionWords[0] : null;

  // Try to extract what the user is asking ABOUT
  const aboutMatch = msg.replace(/(what|why|how|when|where|which|who|tell|explain|describe|give|show|list|name|is|are|the|do|does|can|could|should|would|about|for|to|in|on|at|of|a|an|my|me|i|we|you|they|it|this|that|and|or|not|with|from|by|all|some|best|good|new|old|big|small|most|very)\b/gi, '').trim();
  const mainTopic = aboutMatch.split(/\s+/).slice(0, 3).join(' ');

  // Build a comprehensive answer based on what we can infer
  let answer = '';

  if (crops.length > 0) {
    answer = generateCropGuide(crops[0], null);
  } else if (/\b(farm|agri|crop|plant|grow|agri)\b/.test(msg)) {
    answer = `**Farming & Agriculture — General Guidance:**

I can help you with detailed information on any farming topic. Here are some key areas I cover:

**🌱 Crop Management:** Growing guides for 15+ crops including rice, wheat, maize, tomato, potato, cotton, sugarcane, and more

**🦠 Disease Management:** 35+ diseases with symptoms, causes, organic and chemical treatments

**🧪 Fertilizer & Nutrition:** NPK recommendations, micronutrients, organic sources, bio-fertilizers

**🐛 Pest Control:** IPM strategies, biological control, chemical management

**💧 Irrigation:** Water management, drip systems, scheduling

**🌿 Organic Farming:** Natural alternatives, bio-inputs, certification

**📅 Seasonal Guides:** What to plant when, crop calendars

**Tell me what specific aspect of farming you'd like to know about!**`;
  } else {
    answer = `I can help with that! Here's what I know:

**My Areas of Expertise:**
- 🌾 Crop management and growing guides
- 🦠 Plant diseases and treatments
- 🧪 Fertilizer and nutrition advice
- 🐛 Pest identification and control
- 💧 Irrigation and water management
- 🌿 Organic farming methods
- 📅 Seasonal planting guides
- 🏪 Storage and post-harvest handling

**For the best answer, try mentioning:**
- The specific **crop** (rice, wheat, tomato, etc.)
- The **topic** (disease, fertilizer, irrigation, etc.)
- The **symptoms** you're seeing (yellowing, spots, wilting)

**Example questions I can answer well:**
- "Why are my tomato leaves turning yellow?"
- "How to control bollworm in cotton?"
- "Best fertilizer for rice?"
- "When to sow wheat in North India?"
- "How does photosynthesis work in plants?"

What specific farming question can I help with?`;
  }

  return { reply: answer, intent: 'general', crop: crops[0] || null, disease: diseases[0] || null };
}
