import React, { useState } from 'react';
import { FlaskConical, Leaf, CheckCircle2, Clock, IndianRupee, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

interface Recipe {
  name: string;
  targetDisease: string;
  ingredients: { name: string; quantity: string; preparation: string }[];
  steps: string[];
  dosage: string;
  frequency: string;
  effectiveness: number;
  cost: string;
  notes: string;
}

interface RecipeData {
  disease: string;
  recipes: Recipe[];
  generalTips: string[];
}

interface OrganicRecipeProps {
  diseaseName: string;
}

export const OrganicRecipe: React.FC<OrganicRecipeProps> = ({ diseaseName }) => {
  const [data, setData] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/organic-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diseaseName })
      });
      if (!res.ok) throw new Error('Failed');
      setData(await res.json());
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <FlaskConical className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-extrabold text-slate-800">
                Organic Recipe Generator
              </h3>
              <p className="text-xs text-slate-500">Natural remedies from farm ingredients</p>
            </div>
          </div>
        </div>
      </div>

      {!data && (
        <div className="p-6 text-center">
          <button
            onClick={fetchRecipes}
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating recipes...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <Leaf className="w-4 h-4" />
                <span>Generate Organic Recipes</span>
              </span>
            )}
          </button>
        </div>
      )}

      {data && (
        <div className="p-5 space-y-4">
          {data.recipes.map((recipe, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedRecipe(expandedRecipe === i ? null : i)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center text-sm font-extrabold">
                    {i + 1}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-800">{recipe.name}</div>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                      <span className="flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>{recipe.effectiveness}% effective</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <IndianRupee className="w-3 h-3" />
                        <span>{recipe.cost}</span>
                      </span>
                    </div>
                  </div>
                </div>
                {expandedRecipe === i ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {expandedRecipe === i && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
                  {/* Ingredients */}
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Ingredients</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {recipe.ingredients.map((ing, j) => (
                        <div key={j} className="p-2 bg-green-50 rounded-lg border border-green-100">
                          <div className="text-xs font-bold text-green-800">{ing.name}</div>
                          <div className="text-[10px] text-green-600">{ing.quantity} • {ing.preparation}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Preparation Steps</h5>
                    <ol className="space-y-1.5">
                      {recipe.steps.map((step, j) => (
                        <li key={j} className="flex items-start space-x-2 text-xs text-slate-700">
                          <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                            {j + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Usage Info */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-slate-50 rounded-lg text-center">
                      <div className="text-[10px] text-slate-500">Dosage</div>
                      <div className="text-xs font-bold text-slate-800">{recipe.dosage}</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg text-center">
                      <div className="text-[10px] text-slate-500">Frequency</div>
                      <div className="text-xs font-bold text-slate-800">{recipe.frequency}</div>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg text-center">
                      <div className="text-[10px] text-slate-500">Cost</div>
                      <div className="text-xs font-bold text-emerald-700">{recipe.cost}</div>
                    </div>
                  </div>

                  {recipe.notes && (
                    <div className="p-2 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-700">
                      <strong>Note:</strong> {recipe.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* General Tips */}
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">General Organic Tips</h5>
            <ul className="space-y-1.5">
              {data.generalTips.slice(0, 5).map((tip, i) => (
                <li key={i} className="flex items-start space-x-2 text-[11px] text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
