"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Clean UTF-8 translations - NO CORRUPTION
const translations = {
  en: {
    // Navigation & Common
    "nav.home": "Home",
    "nav.pricing": "Pricing",
    "nav.products": "Products",
    "nav.about": "About",
    "cta.getStarted": "Get Started",
    "cta.learnMore": "Learn More",

    // Videos Page
    "videos.hero.title": "Video Tutorials and Demos",
    "videos.search.placeholder": "Search videos...",
    "videos.category.allVideos": "All Videos",
    "videos.category.gettingStarted": "Getting Started",
    "videos.category.advancedFeatures": "Advanced Features",
    "videos.category.useCases": "Use Cases",
    "videos.category.bestPractices": "Best Practices",

    // AI Literacy
    "aiLiteracy.title": "Master AI for Education",
    "aiLiteracy.courses": "Courses",
    "aiLiteracy.educators": "Educators",
    "aiLiteracy.certified": "Certified",

    // Glossary
    "glossary.title": "AI Terms Glossary",
    "glossary.search": "Search terms...",
  },

  de: {
    // Navigation & Common
    "nav.home": "Startseite",
    "nav.pricing": "Preise",
    "nav.products": "Produkte",
    "nav.about": "Über uns",
    "cta.getStarted": "Jetzt starten",
    "cta.learnMore": "Mehr erfahren",

    // Videos Page - ADD YOUR CLEAN TRANSLATIONS HERE
    "videos.hero.title": "Video-Tutorials und Demos",
    "videos.search.placeholder": "Videos durchsuchen...",
    "videos.category.allVideos": "Alle Videos",
    "videos.category.gettingStarted": "Erste Schritte",
    "videos.category.advancedFeatures": "Erweiterte Funktionen",
    "videos.category.useCases": "Anwendungsfälle",
    "videos.category.bestPractices": "Best Practices",

    // AI Literacy - ADD YOUR CLEAN TRANSLATIONS HERE
    "aiLiteracy.title": "KI für Bildung meistern",
    "aiLiteracy.courses": "Kurse",
    "aiLiteracy.educators": "Pädagogen",
    "aiLiteracy.certified": "Zertifiziert",

    // Glossary - ADD YOUR CLEAN TRANSLATIONS HERE
    "glossary.title": "KI-Begriffe Glossar",
    "glossary.search": "Begriffe suchen...",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "de")) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

