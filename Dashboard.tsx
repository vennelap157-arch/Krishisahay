
import React, { useState, useEffect } from 'react';
import { AppView, Language } from '../types';
import { getGeneralAdvice } from '../services/geminiService';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
  language: Language;
  t: any;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, language, t }) => {
  const [tip, setTip] = useState<string>("...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTip = async () => {
      setLoading(true);
      try {
        const result = await getGeneralAdvice("Give me one single, very practical and short tip for a sustainable farmer today. Keep it under 2 sentences.", language);
        setTip(result || "Water your plants in the early morning.");
      } catch (err) {
        setTip("Consistent crop rotation keeps soil healthy.");
      } finally {
        setLoading(false);
      }
    };
    fetchTip();
  }, [language]);

  return (
    <div className="space-y-6">
      {/* Greeting Section */}
      <section className="bg-emerald-600 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">{t.greeting}</h2>
          <p className="opacity-90 text-sm mb-4">{t.subGreeting}</p>
          <div className="bg-emerald-500/50 p-4 rounded-2xl border border-emerald-400/30 backdrop-blur-sm">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-100">{t.dailyTip}</span>
            <p className="text-sm font-medium mt-1 leading-snug">
              {loading ? "..." : tip}
            </p>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>
      </section>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard 
          title={t.pestTitle}
          description={t.pestDesc}
          icon="🩺"
          color="bg-rose-50 border-rose-100 text-rose-700"
          onClick={() => onNavigate(AppView.PEST_DOCTOR)}
        />
        <ActionCard 
          title={t.cropTitle}
          description={t.cropDesc}
          icon="🌱"
          color="bg-emerald-50 border-emerald-100 text-emerald-700"
          onClick={() => onNavigate(AppView.CROP_ADVISOR)}
        />
        <ActionCard 
          title={t.fertTitle}
          description={t.fertDesc}
          icon="⚡"
          color="bg-amber-50 border-amber-100 text-amber-700"
          onClick={() => onNavigate(AppView.FERTILIZER)}
        />
        <ActionCard 
          title={t.weatherTitle}
          description={t.weatherDesc}
          icon="🌤️"
          color="bg-blue-50 border-blue-100 text-blue-700"
          onClick={() => alert("Market features coming soon!")}
        />
      </div>
    </div>
  );
};

const ActionCard = ({ title, description, icon, color, onClick }: { title: string; description: string; icon: string; color: string; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`${color} border p-5 rounded-2xl text-left transition-all hover:shadow-md hover:scale-[1.02] flex items-start gap-4 active:scale-95`}
  >
    <span className="text-3xl bg-white/60 p-2 rounded-xl shrink-0">{icon}</span>
    <div>
      <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
      <p className="text-xs opacity-80 leading-snug">{description}</p>
    </div>
  </button>
);

export default Dashboard;
