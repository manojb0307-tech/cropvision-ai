// ═══════════════════════════════════════════════════════════════════════════════
// INTELLIGENT AGRONOMY CHAT ENGINE
// Intent classification, entity extraction, context tracking, and
// dynamic response generation from the knowledge base.
// ═══════════════════════════════════════════════════════════════════════════════

import { CROPS, DISEASE百科, TOPIC_KNOWLEDGE, GREETING_KEYWORDS, GREETINGS } from './knowledge.js';

// ── Intent Types ──────────────────────────────────────────────────────────────
const INTENTS = {
  GREETING: 'greeting',
  CROP_INFO: 'crop_info',
  DISEASE_TREATMENT: 'disease_treatment',
  FERTILIZER: 'fertilizer',
  PEST_CONTROL: 'pest_control',
  IRRIGATION: 'irrigation',
  ORGANIC: 'organic',
  SOIL: 'soil',
  STORAGE: 'storage',
  SEASONAL: 'seasonal',
  HARVEST: 'harvest',
  VARIETIES: 'varieties',
  TIPS: 'tips',
  MARKET: 'market',
  FOOD_USES: 'food_uses',
  GENERAL: 'general',
  HOW_TO: 'how_to',
  WHEN_TO: 'when_to',
  COMPARE: 'compare',
  FOLLOWUP: 'followup',
};

// ── Entity Extraction ─────────────────────────────────────────────────────────

const CROP_ALIASES = {
  'paddy': 'rice', 'dhaan': 'rice', 'chawal': 'rice',
  'gehu': 'wheat', 'kanak': 'wheat',
  'makka': 'maize', 'bhutta': 'maize', 'corn': 'maize',
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
};

const INTENT_KEYWORDS = {
  [INTENTS.FERTILIZER]: ['fertilizer', 'npk', 'manure', 'compost', 'nutrient', 'deficiency', 'urea', 'dap', 'mop', 'zinc', 'sulfur', 'calcium', 'boron', 'potash', 'phosphorus', 'nitrogen'],
  [INTENTS.PEST_CONTROL]: ['pest', 'insect', 'bug', 'worm', 'caterpillar', 'borer', 'aphid', 'mite', 'thrips', 'whitefly', 'beetle', 'weevil', 'trap', 'spray for insect', 'ipm'],
  [INTENTS.IRRIGATION]: ['irrigation', 'drip', 'water', 'watering', 'moisture', 'rain', 'flood', 'sprinkler', 'awd', 'irrigate'],
  [INTENTS.ORGANIC]: ['organic', 'natural', 'bio', 'neem', 'trichoderma', 'pseudomonas', 'vermicompost', 'biodynamic', 'sustainable', 'chemical-free', 'eco-friendly'],
  [INTENTS.SOIL]: ['soil', 'ph', 'compost', 'manure', 'organic matter', 'mulch', 'erosion', 'drainage', 'clay', 'sandy', 'loam', 'topsoil'],
  [INTENTS.STORAGE]: ['storage', 'store', 'preserve', 'post-harvest', 'shelf life', 'dry', 'curing', 'grading', 'packaging', 'cold storage', 'warehouse'],
  [INTENTS.SEASONAL]: ['season', 'sowing time', 'when to sow', 'when to plant', 'calendar', 'kharif', 'rabi', 'zaid', 'monsoon', 'winter crop', 'summer crop', 'which month'],
  [INTENTS.HARVEST]: ['harvest', 'harvesting', 'when to harvest', 'maturity', 'picking', 'yield', 'reap'],
  [INTENTS.VARIETIES]: ['variety', 'varieties', 'cultivar', 'hybrid', 'best variety', 'which variety', 'recommended variety', 'seed variety', 'best seeds', 'which seeds', 'type of', 'types of'],
  [INTENTS.TIPS]: ['tips', 'advice', 'suggestion', 'how to improve', 'best practice', 'pro tip', 'trick', 'method', 'technique'],
  [INTENTS.MARKET]: ['market', 'sell', 'price', 'export', 'buyer', 'demand', 'trade', 'commercial', 'processing', 'industry use'],
  [INTENTS.FOOD_USES]: ['food use', 'recipe', 'eat', 'cook', 'dish', 'food', 'consumption', 'cuisine', 'culinary'],
  [INTENTS.HOW_TO]: ['how to', 'how do i', 'how can i', 'steps to', 'guide to', 'procedure', 'process of', 'method to', 'way to'],
  [INTENTS.WHEN_TO]: ['when to', 'what time', 'which month', 'what season', 'at what stage', 'at what age'],
  [INTENTS.COMPARE]: ['compare', 'difference between', 'vs', 'versus', 'which is better', 'which one'],
  [INTENTS.GENERAL]: ['tell me about', 'what is', 'what are', 'explain', 'describe', 'information about', 'about'],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

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
  const found = [];
  for (const [keyword, diseaseKeys] of Object.entries(DISEASE_ALIASES)) {
    if (msg.includes(keyword)) {
      found.push(...diseaseKeys);
    }
  }
  return [...new Set(found)];
}

function classifyIntents(msg) {
  const scores = {};
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (msg.includes(kw)) {
        // Use word-boundary matching to avoid false positives (e.g., 'ph' matching 'photosynthesis')
        const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
        if (regex.test(msg)) {
          score += kw.length * 3;
        } else {
          // Only give partial score for very short keywords if they match as substrings
          // (e.g., 'npk' as substring is fine, but 'ph' should require word boundary)
          if (kw.length >= 4) {
            score += kw.length;
          }
        }
      }
    }
    if (score > 0) scores[intent] = score;
  }
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([intent]) => intent);
}

function isGreeting(msg) {
  return GREETING_KEYWORDS.some(kw => msg.includes(kw));
}

function hasQuestionWord(msg) {
  return /\b(how|what|when|where|which|why|tell|explain|describe|give|show|list|name)\b/.test(msg);
}

// ── Response Generators ───────────────────────────────────────────────────────

function generateGreetingResponse(msg) {
  return GREETINGS.reply;
}

function generateCropInfoResponse(cropId, intents) {
  const crop = CROPS[cropId];
  if (!crop) return null;

  const primaryIntent = intents[0];

  if (primaryIntent === INTENTS.FERTILIZER || intents.includes(INTENTS.FERTILIZER)) {
    return generateFertilizerForCrop(crop);
  }
  if (primaryIntent === INTENTS.IRRIGATION || intents.includes(INTENTS.IRRIGATION)) {
    return generateIrrigationForCrop(crop);
  }
  if (primaryIntent === INTENTS.STORAGE || intents.includes(INTENTS.STORAGE)) {
    return generateStorageForCrop(crop);
  }
  if (primaryIntent === INTENTS.HARVEST || intents.includes(INTENTS.HARVEST)) {
    return generateHarvestForCrop(crop);
  }
  if (primaryIntent === INTENTS.VARIETIES || intents.includes(INTENTS.VARIETIES)) {
    return generateVarietiesForCrop(crop);
  }
  if (primaryIntent === INTENTS.SEASONAL || intents.includes(INTENTS.SEASONAL)) {
    return generateSeasonForCrop(crop);
  }
  if (primaryIntent === INTENTS.MARKET || intents.includes(INTENTS.MARKET)) {
    return generateMarketForCrop(crop);
  }
  if (primaryIntent === INTENTS.FOOD_USES || intents.includes(INTENTS.FOOD_USES)) {
    return generateFoodUsesForCrop(crop);
  }
  if (primaryIntent === INTENTS.PEST_CONTROL || intents.includes(INTENTS.PEST_CONTROL)) {
    return generatePestForCrop(crop);
  }
  if (primaryIntent === INTENTS.TIPS || intents.includes(INTENTS.TIPS)) {
    return generateTipsForCrop(crop);
  }

  // General crop info
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

**Key Tips:**
${crop.tips.map(t => `- ${t}`).join('\n')}

💡 *Ask me about specific diseases, fertilizer schedules, or pest control for ${crop.name} for more details!*`;
}

function generateFertilizerForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Fertilizer & Nutrient Guide**

**NPK Recommendation:** ${crop.npk}

**Nutrient Details:**
${Object.entries(crop.nutrients).map(([nutrient, info]) => `- **${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}:** ${info}`).join('\n')}

**Organic Fertilizer Sources:**
- Farmyard Manure (FYM): 10-15 tons/ha
- Vermicompost: 2-5 tons/ha
- Neem cake: 200 kg/ha
- Bio-fertilizers: Rhizobium (legumes), PSB, Azotobacter

💡 *Balanced nutrition is key. Always get a soil test before applying fertilizers. Excess nitrogen attracts pests and delays flowering.*`;
}

function generateIrrigationForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Irrigation Guide**

**Water Requirement:** ${crop.water}

**Irrigation Tips:**
${crop.tips.filter(t => t.toLowerCase().includes('water') || t.toLowerCase().includes('irrigat') || t.toLowerCase().includes('drip') || t.toLowerCase().includes('awd')).map(t => `- ${t}`).join('\n') || '- Maintain uniform moisture throughout the growing season'}

**General Irrigation Best Practices:**
- Irrigate early morning to reduce disease pressure
- Avoid evening irrigation (promotes fungal growth)
- Use drip irrigation where possible (saves 40-60% water)
- Monitor soil moisture at 15cm depth
- Mulching conserves moisture and suppresses weeds`;
}

function generateStorageForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Post-Harvest Storage**

**Storage Method:**
${crop.storage}

**Market Uses:**
${crop.marketUses.map(u => `- ${u}`).join('\n')}

**Food Uses:**
${crop.foodUses.map(u => `- ${u}`).join('\n')}

💡 *Proper drying before storage is critical. High moisture content leads to fungal growth, aflatoxin, and spoilage.*`;
}

function generateHarvestForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Harvest Guide**

**When to Harvest:** ${crop.harvest}

**Expected Yield:** ${crop.yield}

**Harvest Tips:**
${crop.tips.filter(t => t.toLowerCase().includes('harvest') || t.toLowerCase().includes('maturity') || t.toLowerCase().includes('picking')).map(t => `- ${t}`).join('\n') || `- Monitor crop maturity indicators specific to ${crop.name}`}

**Post-Harvest Handling:**
- Dry to safe moisture level before storage
- Grade and sort produce
- Handle carefully to minimize mechanical damage`;
}

function generateVarietiesForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Recommended Varieties**

${crop.varieties.map((v, i) => `- **${v}**`).join('\n')}

**Selection Tips:**
- Choose disease-resistant varieties for your region
- Consult local agricultural extension for varieties suited to your area
- High-yielding varieties (HYV) require more inputs but give better returns
- Consider market demand when selecting varieties`;
}

function generateSeasonForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Seasonal Guide**

**Growing Season:** ${crop.season}

**Sowing Method:** ${crop.sowing}

**Days to Harvest:** ${crop.harvest.match(/\d+/)?.[0] || '60-120'} days

**Key Agricultural Seasons:**
- **Kharif (June-October):** Rice, Maize, Cotton, Soybean, Groundnut
- **Rabi (October-March):** Wheat, Gram, Mustard, Potato, Onion
- **Summer (March-June):** Watermelon, Cucumber, Summer Groundnut

*Plan your sowing dates based on local weather patterns and irrigation availability.*`;
}

function generateMarketForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Market & Commercial Uses**

**Market Uses:**
${crop.marketUses.map(u => `- ${u}`).join('\n')}

**Food/Culinary Uses:**
${crop.foodUses.map(u => `- ${u}`).join('\n')}

**Value Addition Ideas:**
- Processing increases shelf life and market value
- Direct marketing to consumers可以获得 better prices
- Export quality requires specific grading and packaging standards`;
}

function generateFoodUsesForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Food & Culinary Uses**

${crop.foodUses.map(u => `- ${u}`).join('\n')}

**Market/Processing Uses:**
${crop.marketUses.map(u => `- ${u}`).join('\n')}

*${crop.name} is versatile and used in both traditional and modern cuisine worldwide.*`;
}

function generatePestForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Pest Management**

**Common Pests:** ${crop.commonPests.join(', ')}

**IPM Strategy:**
1. **Monitor:** Use pheromone traps and sticky traps for early detection
2. **Prevent:** Crop rotation, resistant varieties, field hygiene
3. **Biological:** Trichogramma parasitoids, Neem oil, Bt spray
4. **Chemical (last resort):** Targeted spraying, rotate chemical classes

**General Pest Control Tips:**
- Scout fields weekly
- Install yellow sticky traps @ 50/ha for whitefly/aphid
- Use pheromone traps for borer monitoring
- Keep field borders clean of alternate hosts
- Spray in evening for best contact with insects`;
}

function generateTipsForCrop(crop) {
  return `**${crop.emoji} ${crop.name} — Expert Farming Tips**

${crop.tips.map((t, i) => `${i + 1}. ${t}`).join('\n')}

**Additional Best Practices:**
- Maintain balanced nutrition based on soil test
- Practice integrated pest management (IPM)
- Keep records of sowing dates, inputs, and yields
- Consult local agricultural extension for region-specific advice`;
}

function generateDiseaseResponse(diseaseKey, cropHint) {
  // Find matching disease
  let disease = null;
  const searchTerms = diseaseKey.toLowerCase();

  for (const [key, d] of Object.entries(DISEASE百科)) {
    if (searchTerms.includes(key) || key.includes(searchTerms) ||
        d.crops.some(c => searchTerms.includes(c))) {
      if (!cropHint || d.crops.includes(cropHint)) {
        disease = d;
        break;
      }
    }
  }

  // Fallback: search by crop if disease not found directly
  if (!disease && cropHint) {
    for (const [key, d] of Object.entries(DISEASE百科)) {
      if (d.crops.includes(cropHint)) {
        disease = d;
        break;
      }
    }
  }

  if (!disease) {
    // Generic disease response
    return `I found a reference to **${diseaseKey}**. Here's general guidance:

**Identification:** Look for ${diseaseKey.includes('blight') ? 'dark lesions, yellowing, and wilting' : diseaseKey.includes('rust') ? 'powdery pustules on leaf surfaces' : diseaseKey.includes('mildew') ? 'white powdery growth on leaves' : 'unusual spots, discoloration, or abnormal growth'}.

**Immediate Steps:**
1. Isolate affected plants if possible
2. Remove and destroy severely infected parts
3. Improve air circulation around plants
4. Start with organic treatments (Neem oil 5ml/L or Trichoderma 5g/L)
5. If severe, consult local agronomist for targeted chemical treatment

💡 *Tell me the specific crop name for a detailed treatment plan!*`;
  }

  const cropEmoji = disease.crops[0] ? (CROPS[disease.crops[0]]?.emoji || '🌱') : '🌱';
  const cropName = disease.crops[0] ? (CROPS[disease.crops[0]]?.name || disease.crops[0]) : '';

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

💡 *Early detection is key. Scout your fields regularly and treat at the first sign of symptoms.*`;
}

function generateTopicResponse(topicKey) {
  const topic = TOPIC_KNOWLEDGE[topicKey];
  if (!topic) return null;

  return `**${topic.title}**

${topic.overview}

${topic.details}

💡 *Apply these practices based on your specific crop and local conditions. Consult your local agricultural extension for region-specific advice.*`;
}

function generateHowToResponse(msg, crops, diseases, intents) {
  if (diseases.length > 0) {
    return generateDiseaseResponse(diseases[0], crops[0]);
  }
  if (crops.length > 0) {
    return generateCropInfoResponse(crops[0], intents);
  }

  if (msg.includes('farm') || msg.includes('grow') || msg.includes('start')) {
    return `**How to Start Farming — Quick Guide:**

1. **Land Preparation:**
   - Test soil for pH, NPK, and micronutrients
   - Plow and harrow to create fine tilth
   - Apply FYM/vermicompost 2-3 weeks before sowing

2. **Crop Selection:**
   - Choose crops suited to your climate and soil
   - Consider market demand and water availability
   - Select disease-resistant varieties

3. **Sowing/Planting:**
   - Follow recommended spacing and seed rate
   - Treat seeds with bio-agents (Trichoderma, Rhizobium)
   - Ensure adequate moisture at sowing

4. **Crop Management:**
   - Irrigate at critical growth stages
   - Apply fertilizers as per soil test recommendations
   - Monitor for pests and diseases weekly

5. **Harvest & Marketing:**
   - Harvest at optimal maturity
   - Dry and grade produce properly
   - Identify market channels before harvest

💡 *Start small, learn from experience, and scale gradually. Consult your local Krishi Vigyan Kendra (KVK) for training.*`;
  }

  return `I'd be happy to help! Could you be more specific? For example:
- Tell me which **crop** you're growing
- Describe the **problem** you're seeing (spots, wilting, pests)
- Ask about a specific **topic** (fertilizer, irrigation, storage, organic)

I can provide detailed guidance on any farming topic!`;
}

function generateGeneralResponse(msg, crops, diseases, intents) {
  // Try to match any topic by exact keyword (with word boundaries for short keywords)
  for (const topicKey of Object.keys(TOPIC_KNOWLEDGE)) {
    const regex = new RegExp(`\\b${topicKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    if (regex.test(msg)) {
      return { reply: generateTopicResponse(topicKey), matched: true };
    }
  }

  // Fuzzy topic matching with word boundaries
  if (/\borganic\b|\bnatural\b|\bbio\b/.test(msg)) {
    return { reply: generateTopicResponse('organicFarming'), matched: true };
  }
  if (/\bsoil\b|\bcompost\b|\bmanure\b/.test(msg)) {
    return { reply: generateTopicResponse('soil'), matched: true };
  }
  if (/\bwater\b|\birrigat/.test(msg)) {
    return { reply: generateTopicResponse('irrigation'), matched: true };
  }
  if (/\bseason\b|\bkharif\b|\brabi\b/.test(msg)) {
    return { reply: generateTopicResponse('season'), matched: true };
  }
  if (/\bstore\b|\bstorage\b|\bpreserv/.test(msg)) {
    return { reply: generateTopicResponse('storage'), matched: true };
  }
  if (/\bpest\b|\binsect\b|\bbug\b/.test(msg)) {
    return { reply: generateTopicResponse('pest'), matched: true };
  }

  // If we have a crop, give crop info
  if (crops.length > 0) {
    return { reply: generateCropInfoResponse(crops[0], intents), matched: true };
  }

  // If we have a disease, give disease info
  if (diseases.length > 0) {
    return { reply: generateDiseaseResponse(diseases[0], null), matched: true };
  }

  return { reply: null, matched: false };
}

// ── Context Tracker ───────────────────────────────────────────────────────────

const conversationContext = new Map(); // sessionId -> { lastCrop, lastDisease, lastIntent }

export function getConversationContext(sessionId) {
  return conversationContext.get(sessionId) || { lastCrop: null, lastDisease: null, lastIntent: null };
}

function updateContext(sessionId, crop, disease, intent) {
  const ctx = conversationContext.get(sessionId) || { lastCrop: null, lastDisease: null, lastIntent: null };
  if (crop) ctx.lastCrop = crop;
  if (disease) ctx.lastDisease = disease;
  if (intent) ctx.lastIntent = intent;
  conversationContext.set(sessionId, ctx);

  // Cleanup old sessions (keep max 1000)
  if (conversationContext.size > 1000) {
    const firstKey = conversationContext.keys().next().value;
    conversationContext.delete(firstKey);
  }
}

// ── Main Chat Engine ──────────────────────────────────────────────────────────

export function generateReply(userMessage, sessionId = 'default', history = []) {
  const msg = normalize(userMessage);
  const crops = extractCrops(msg);
  const diseases = extractDiseases(msg);
  const intents = classifyIntents(msg);

  // Track conversation context
  updateContext(sessionId, crops[0] || null, diseases[0] || null, intents[0] || null);
  const ctx = getConversationContext(sessionId);

  // Handle follow-up questions (pronouns, "it", "that", "also", "and", "what about")
  const isFollowup = /\b(it|that|also|and what|what about|how about|tell me more|and|plus|additionally)\b/.test(msg);
  const effectiveCrop = crops[0] || (isFollowup ? ctx.lastCrop : null);
  const effectiveDisease = diseases[0] || (isFollowup ? ctx.lastDisease : null);

  // Step 1: Greeting
  if (isGreeting(msg) && !crops.length && !diseases.length) {
    return { reply: generateGreetingResponse(msg), intent: INTENTS.GREETING, crop: null, disease: null };
  }

  // Step 2: Disease-specific queries (highest priority)
  if (diseases.length > 0 || (effectiveDisease && isFollowup)) {
    const diseaseKey = diseases[0] || effectiveDisease;
    return {
      reply: generateDiseaseResponse(diseaseKey, effectiveCrop || crops[0]),
      intent: INTENTS.DISEASE_TREATMENT,
      crop: effectiveCrop || crops[0] || null,
      disease: diseaseKey,
    };
  }

  // Step 3: Crop + intent combinations
  if (effectiveCrop || crops.length > 0) {
    const cropId = effectiveCrop || crops[0];
    const reply = generateCropInfoResponse(cropId, intents);
    if (reply) {
      return {
        reply,
        intent: intents[0] || INTENTS.CROP_INFO,
        crop: cropId,
        disease: null,
      };
    }
  }

  // Step 4: Topic-specific queries
  const topicMap = {
    [INTENTS.FERTILIZER]: 'fertilizer',
    [INTENTS.ORGANIC]: 'organicFarming',
    [INTENTS.IRRIGATION]: 'irrigation',
    [INTENTS.PEST_CONTROL]: 'pest',
    [INTENTS.SOIL]: 'soil',
    [INTENTS.STORAGE]: 'storage',
    [INTENTS.SEASONAL]: 'season',
  };

  for (const intent of intents) {
    const topicKey = topicMap[intent];
    if (topicKey && TOPIC_KNOWLEDGE[topicKey]) {
      return {
        reply: generateTopicResponse(topicKey),
        intent,
        crop: null,
        disease: null,
      };
    }
  }

  // Step 5: "How to" queries
  if (intents.includes(INTENTS.HOW_TO) || intents.includes(INTENTS.WHEN_TO)) {
    const reply = generateHowToResponse(msg, crops, diseases, intents);
    if (reply) {
      return { reply, intent: intents[0], crop: crops[0] || null, disease: diseases[0] || null };
    }
  }

  // Step 6: General response with context
  const generalResult = generateGeneralResponse(msg, crops, diseases, intents);
  if (generalResult.matched && generalResult.reply) {
    return {
      reply: generalResult.reply,
      intent: intents[0] || INTENTS.GENERAL,
      crop: crops[0] || null,
      disease: diseases[0] || null,
    };
  }

  // Step 7: Fallback — intelligent default
  // Check if the query is clearly non-farming related
  const nonFarmingKeywords = ['photosynthesis', 'physics', 'chemistry', 'math', 'history', 'geography', 'music', 'movie', 'sports', 'weather forecast', 'stock', 'crypto', 'bitcoin', 'recipe for cake', 'recipe for cookies'];
  const isNonFarming = nonFarmingKeywords.some(kw => msg.includes(kw));

  if (isNonFarming) {
    return {
      reply: `I'm **CropVision AI**, specialized in farming and agriculture. 🌱

I can't help with that topic, but I'm an expert at:
- 🌾 **Crop management** — growing guides for 15+ crops
- 🦠 **Disease diagnosis** — 35+ diseases with treatments
- 🧪 **Fertilizer recommendations** — NPK and micronutrients
- 🐛 **Pest control** — IPM strategies and treatments
- 💧 **Irrigation** — water management and scheduling
- 🌿 **Organic farming** — natural alternatives
- 📅 **Seasonal guides** — what to plant and when

**Try asking:**
- "Tell me about rice farming"
- "How to treat tomato early blight?"
- "Best fertilizer for wheat?"
- "When to sow potato?"

What farming question can I help with?`,
      intent: INTENTS.GENERAL,
      crop: null,
      disease: null,
    };
  }

  return {
    reply: `Thanks for your question about **"${userMessage}"**!

I'm CropVision AI, your smart farming assistant. To give you the best answer, could you tell me:

1. 🌱 **Which crop** are you asking about? (Rice, Wheat, Tomato, Potato, etc.)
2. 🐛 **What's the issue?** (disease, pest, nutrient deficiency, irrigation, etc.)
3. 📍 **What's your growing region?** (for localized advice)

**Quick Topics:**
- Ask "tell me about rice" for complete growing guide
- Ask "how to treat early blight" for disease treatment
- Ask "fertilizer for tomato" for NPK recommendations
- Ask "organic farming tips" for natural alternatives
- Ask "when to sow wheat" for seasonal guidance

I can help with any farming question — just be specific! 🌾`,
    intent: INTENTS.GENERAL,
    crop: null,
    disease: null,
  };
}
