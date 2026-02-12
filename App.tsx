
import React, { useState, useMemo } from 'react';
import { AppView, Language } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CropAdvisor from './components/CropAdvisor';
import PestDoctor from './components/PestDoctor';
import NutritionAdvisor from './components/NutritionAdvisor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [language, setLanguage] = useState<Language>('English');

  // Simple localization dictionary
  const t = useMemo(() => {
    const dictionary: Record<Language, any> = {
      English: {
        home: "Home",
        crops: "Crops",
        doctor: "Doctor",
        nutrition: "Nutrition",
        greeting: "Hello, Farmer!",
        subGreeting: "Your personalized AgriGuide is ready.",
        dailyTip: "Daily Tip",
        pestTitle: "Identify Pest",
        pestDesc: "Take a photo of your sick plant.",
        cropTitle: "Crop Selection",
        cropDesc: "Find what grows best in your soil.",
        fertTitle: "Fertilizer Plan",
        fertDesc: "Get nutrients for your crops.",
        weatherTitle: "Weather & Market",
        weatherDesc: "Local updates for your area.",
      },
      Hindi: {
        home: "होम",
        crops: "फसलें",
        doctor: "डॉक्टर",
        nutrition: "पोषण",
        greeting: "नमस्ते, किसान भाई!",
        subGreeting: "आपका व्यक्तिगत कृषि गाइड तैयार है।",
        dailyTip: "आज की सलाह",
        pestTitle: "कीट पहचान",
        pestDesc: "बीमार पौधे की फोटो लें।",
        cropTitle: "फसल चयन",
        cropDesc: "मिट्टी के लिए सही फसल चुनें।",
        fertTitle: "खाद योजना",
        fertDesc: "फसलों के लिए पोषक तत्व।",
        weatherTitle: "मौसम और बाजार",
        weatherDesc: "स्थानीय मंडी भाव और मौसम।",
      },
      Telugu: {
        home: "హోమ్",
        crops: "పంటలు",
        doctor: "డాక్టర్",
        nutrition: "పోషణ",
        greeting: "నమస్కారం, రైతు సోదరా!",
        subGreeting: "మీ వ్యక్తిగత అగ్రిగైడ్ సిద్ధంగా ఉంది.",
        dailyTip: "నేటి చిట్కా",
        pestTitle: "తెగులు గుర్తింపు",
        pestDesc: "జబ్బుపడిన మొక్క ఫోటో తీయండి.",
        cropTitle: "పంట ఎంపిక",
        cropDesc: "మీ నేలకు ఏ పంట బాగా సరిపోతుందో తెలుసుకోండి.",
        fertTitle: "ఎరువుల ప్రణాళిక",
        fertDesc: "మీ పంటలకు అవసరమైన పోషకాలు.",
        weatherTitle: "వాతావరణం & మార్కెట్",
        weatherDesc: "మీ ప్రాంత మార్కెట్ ధరలు.",
      }
    };
    return dictionary[language];
  }, [language]);

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Dashboard onNavigate={setCurrentView} language={language} t={t} />;
      case AppView.CROP_ADVISOR:
        return <CropAdvisor language={language} />;
      case AppView.PEST_DOCTOR:
        return <PestDoctor language={language} />;
      case AppView.FERTILIZER:
        return <NutritionAdvisor language={language} />;
      default:
        return <Dashboard onNavigate={setCurrentView} language={language} t={t} />;
    }
  };

  return (
    <Layout 
      activeView={currentView} 
      onNavigate={setCurrentView} 
      language={language} 
      setLanguage={setLanguage}
      t={t}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
