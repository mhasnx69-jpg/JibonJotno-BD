"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "bn" | "en";

export interface LanguageContextType {
  lang: Language;
  language: Language;
  toggleLang: () => void;
  toggleLanguage: () => void;
  setLang: (lang: Language) => void;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  [key: string]: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("bn");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jibonjotno_lang") as Language;
      if (saved === "bn" || saved === "en") setLangState(saved);
    } catch (e) {}
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try { localStorage.setItem("jibonjotno_lang", newLang); } catch (e) {}
  };

  const toggleLang = () => setLang(lang === "bn" ? "en" : "bn");

  return (
    <LanguageContext.Provider
      value={{
        lang,
        language: lang,
        toggleLang,
        toggleLanguage: toggleLang,
        setLang,
        setLanguage: setLang,
        t: (k: string, _fallback?: string) => k,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "bn" as Language,
      language: "bn" as Language,
      toggleLang: () => {},
      toggleLanguage: () => {},
      setLang: () => {},
      setLanguage: () => {},
      t: (k: string, _fallback?: string) => k,
    };
  }
  return context;
}
