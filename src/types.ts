export interface DiseaseInfo {
  name: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
}

export interface Crop {
  id: string;
  name: string;
  icon: string;
  image: string;
  shortDescription: string;
  category: 'Cereals' | 'Vegetables' | 'Fruits' | 'Cash Crops' | 'Legumes';
  scientificName: string;
  commonName: string;
  suitableRegions: string[];
  climate: string;
  soilType: string;
  waterRequirement: string;
  fertilizerRecommendation: string;
  nutrientRequirements: string;
  growingSeason: string;
  sowingMethod: string;
  plantSpacing: string;
  harvestTime: string;
  averageYield: string;
  commonDiseasesList: DiseaseInfo[];
  diseaseSymptoms: string[];
  diseaseCauses: string[];
  preventionMethods: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  commonPests: string[];
  farmingTips: string[];
  storageMethods: string[];
  marketUses: string[];
  foodUses: string[];
}

export interface DiseaseDiagnosis {
  id: string;
  plantName: string;
  diseaseName: string;
  isHealthy: boolean;
  confidence: number; // 0 - 100
  description: string;
  symptoms: string[];
  causes: string[];
  preventionMethods: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  recommendedFertilizers: string[];
  careInstructions: string[];
  nextInspectionDate: string;
  imageUrl: string;
  scanTimestamp: string;
  severityLevel?: 'Low' | 'Moderate' | 'Severe' | 'None';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export type MenuModalPage = 
  | 'about' 
  | 'how_ai_works' 
  | 'user_guide' 
  | 'faq' 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | null;
