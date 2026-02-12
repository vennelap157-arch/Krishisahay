
import React, { useState } from 'react';
import { getFertilizerAdvice } from '../services/geminiService';
import { Language } from '../types';

interface Props {
  language: Language;
}

const NutritionAdvisor: React.FC<Props> = ({ language }) => {
  const [crop, setCrop] = useState('');
  const [soil, setSoil] = useState('Loamy');
  const [stage, setStage] = useState('Seedling');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop) return;
    setLoading(true);
    try {
      const result = await getFertilizerAdvice(crop, soil, stage, language);
      setAdvice(result || "No data available.");
    } catch (err) {
      setAdvice("Error getting advice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-amber-500">⚡</span> {language === 'English' ? 'Nutrition' : language === 'Hindi' ? 'पोषण' : 'పోషణ'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            required
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder={language === 'English' ? "Crop Name" : language === 'Hindi' ? "फसल का नाम" : "పంట పేరు"}
            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-amber-500"
          />

          <button 
            type="submit"
            disabled={loading || !crop}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "..." : (language === 'English' ? 'Get Plan' : language === 'Hindi' ? 'योजना देखें' : 'ప్రణాళిక చూడండి')}
          </button>
        </form>
      </div>

      {advice && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 animate-in slide-in-from-bottom duration-300">
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
            {advice}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionAdvisor;
