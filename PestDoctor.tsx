
import React, { useState, useRef } from 'react';
import { diagnosePestOrDisease } from '../services/geminiService';
import { Language } from '../types';

interface Props {
  language: Language;
}

const PestDoctor: React.FC<Props> = ({ language }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        runDiagnosis(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const runDiagnosis = async (base64: string) => {
    setLoading(true);
    setDiagnosis(null);
    try {
      const result = await diagnosePestOrDisease(base64, language);
      setDiagnosis(result || "Could not identify problem.");
    } catch (error) {
      setDiagnosis("Error analyzing image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-rose-500">🩺</span> {language === 'English' ? 'Pest Doctor' : language === 'Hindi' ? 'कीट डॉक्टर' : 'తెగులు గుర్తింపు'}
        </h2>

        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
          >
            <div className="bg-emerald-100 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
            <p className="text-slate-500 font-bold">{language === 'English' ? 'Take Photo' : language === 'Hindi' ? 'फोटो लें' : 'ఫోటో తీయండి'}</p>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square max-w-xs mx-auto">
              <img src={image} alt="Crop scan" className="w-full h-full object-cover" />
              {loading && <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold">Analyzing...</div>}
            </div>
            <button onClick={() => setImage(null)} className="w-full text-slate-500 py-2">Try another</button>
          </div>
        )}
      </div>

      {diagnosis && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 animate-in slide-in-from-bottom duration-300">
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
            {diagnosis}
          </div>
        </div>
      )}
    </div>
  );
};

export default PestDoctor;
