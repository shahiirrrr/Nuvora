import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Load the saved language or default to 'en'
    const savedLanguage = localStorage.getItem('userLanguage') || 'en';
    loadLanguage(savedLanguage);
  }, []);

  const loadLanguage = async (lang) => {
    try {
      const module = await import(`@/locales/${lang}.json`);
      setTranslations(module.default);
      setLanguage(lang);
      // Save the selected language to localStorage
      localStorage.setItem('userLanguage', lang);
      // Update the HTML lang attribute
      document.documentElement.lang = lang;
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
    }
  };

  const changeLanguage = (lang) => {
    if (lang !== language) {
      loadLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
