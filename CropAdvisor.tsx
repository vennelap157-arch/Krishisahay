
import React, { useState } from 'react';
import { getCropRecommendations } from '../services/geminiService';
import { Language } from '../types';

interface Props {
  language: Language;
}

const CropAdvisor: React.FC<Props> = ({ language }) => {
  const [soil, setSoil] = useState('Loamy');
  const [region, setRegion] = useState('');
  const [climate, setClimate] = useState('Sunny/Moderate Rain');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGetAdvice = async () => {
    setLoading(true);
    try {
      const advice = await getCropRecommendations(soil, region || "General", climate, language);
      setResult(advice || "No advice found.");
    } catch (error) {
      setResult("Error fetching advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-emerald-600">🌱</span> {language === 'English' ? 'Crop Selection' : language === 'Hindi' ? 'फसल चयन' : 'పంట ఎంపిక'}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Soil Type</label>
            <select 
              value={soil} 
              onChange={(e) => setSoil(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option>Loamy</option>
              <option>Clay</option>
              <option>Sandy</option>
              <option>Black/Regur</option>
              <option>Red Soil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Region</label>
            <input 
              type="text" 
              value={region} 
              onChange={(e) => setRegion(e.target.value)}
              placeholder="e.g. Maharashtra, Andhra Pradesh"
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <button 
            onClick={handleGetAdvice}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "..." : (language === 'English' ? 'Get Best Crops' : language === 'Hindi' ? 'फसलें देखें' : 'పంటలను చూడండి')}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 animate-in slide-in-from-bottom duration-300">
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropAdvisor;
