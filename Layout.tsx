
import React from 'react';
import { AppView, Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, language, setLanguage, t }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onNavigate(AppView.HOME)}
          >
            <div className="bg-white p-1 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-lg font-bold tracking-tight">AgriGuide</h1>
          </div>
          
          <div className="flex gap-1 bg-emerald-800/50 p-1 rounded-xl border border-emerald-600">
            <LangButton active={language === 'English'} onClick={() => setLanguage('English')} label="EN" />
            <LangButton active={language === 'Hindi'} onClick={() => setLanguage('Hindi')} label="हिं" />
            <LangButton active={language === 'Telugu'} onClick={() => setLanguage('Telugu')} label="తె" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-4xl mx-auto grid grid-cols-4 h-16">
          <NavItem 
            active={activeView === AppView.HOME} 
            onClick={() => onNavigate(AppView.HOME)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            label={t.home}
          />
          <NavItem 
            active={activeView === AppView.CROP_ADVISOR} 
            onClick={() => onNavigate(AppView.CROP_ADVISOR)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>}
            label={t.crops}
          />
          <NavItem 
            active={activeView === AppView.PEST_DOCTOR} 
            onClick={() => onNavigate(AppView.PEST_DOCTOR)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            label={t.doctor}
          />
          <NavItem 
            active={activeView === AppView.FERTILIZER} 
            onClick={() => onNavigate(AppView.FERTILIZER)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.383a4 4 0 01-4.653-.138l.31-.31a2 2 0 000-2.828l-.828-.828a2 2 0 010-2.828l.849-.849A2 2 0 0011 8.634V5a2 2 0 10-4 0v3.386a2 2 0 00.586 1.414l.828.828a2 2 0 010 2.828l-.828.828a2 2 0 000 2.828l.31.31a4 4 0 01-.138 4.653l.383-.691a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-.547-1.022L19.428 15.428z" /></svg>}
            label={t.nutrition}
          />
        </div>
      </nav>
    </div>
  );
};

const LangButton = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${active ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-100 hover:bg-emerald-700'}`}
  >
    {label}
  </button>
);

const NavItem = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-colors ${active ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:text-emerald-500'}`}
  >
    {icon}
    <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{label}</span>
  </button>
);

export default Layout;
