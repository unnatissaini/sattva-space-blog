import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Transform Your Mind, Transform Your Life',
    'hero.subtitle': 'Discover ancient wisdom for modern living through mindfulness, meditation, and spiritual growth.',
    'hero.cta': 'About Sattva Space',
    'hero.secondary': 'Explore Blog',
    
    // Features
    'features.mindfulness': 'Mindfulness',
    'features.mindfulness.desc': 'Learn to be present and aware in every moment of your life.',
    'features.meditation': 'Meditation',
    'features.meditation.desc': 'Develop inner peace and clarity through guided meditation practices.',
    'features.wisdom': 'Ancient Wisdom',
    'features.wisdom.desc': 'Discover timeless teachings adapted for contemporary living.',
    
    // Newsletter
    'newsletter.title': 'Stay Connected',
    'newsletter.subtitle': 'Get weekly insights on mindfulness and spiritual growth.',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.button': 'Subscribe',
    
    // Footer
    'footer.description': 'Your journey to inner peace and spiritual growth begins here.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow Us',
    'footer.rights': 'All rights reserved.',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.blog': 'ब्लॉग',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'nav.admin': 'एडमिन',
    
    // Hero Section
    'hero.title': 'अपने मन को बदलें, अपने जीवन को बदलें',
    'hero.subtitle': 'माइंडफुलनेस, ध्यान और आध्यात्मिक विकास के माध्यम से आधुनिक जीवन के लिए प्राचीन ज्ञान की खोज करें।',
    'hero.cta': 'सत्त्व स्पेस के बारे में',
    'hero.secondary': 'ब्लॉग देखें',
    
    // Features
    'features.mindfulness': 'माइंडफुलनेस',
    'features.mindfulness.desc': 'अपने जीवन के हर क्षण में उपस्थित और जागरूक रहना सीखें।',
    'features.meditation': 'ध्यान',
    'features.meditation.desc': 'निर्देशित ध्यान अभ्यास के माध्यम से आंतरिक शांति और स्पष्टता विकसित करें।',
    'features.wisdom': 'प्राचीन ज्ञान',
    'features.wisdom.desc': 'समकालीन जीवन के लिए अनुकूलित शाश्वत शिक्षाओं की खोज करें।',
    
    // Newsletter
    'newsletter.title': 'जुड़े रहें',
    'newsletter.subtitle': 'माइंडफुलनेस और आध्यात्मिक विकास पर साप्ताहिक अंतर्दृष्टि प्राप्त करें।',
    'newsletter.placeholder': 'अपना ईमेल दर्ज करें',
    'newsletter.button': 'सब्सक्राइब करें',
    
    // Footer
    'footer.description': 'आंतरिक शांति और आध्यात्मिक विकास की आपकी यात्रा यहाँ से शुरू होती है।',
    'footer.links': 'त्वरित लिंक',
    'footer.contact': 'संपर्क',
    'footer.follow': 'हमें फॉलो करें',
    'footer.rights': 'सभी अधिकार सुरक्षित।',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};