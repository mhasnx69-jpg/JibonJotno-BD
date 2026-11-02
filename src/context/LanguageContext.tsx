"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "bn" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (bn: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("bn");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jj_lang") as Language;
      if (saved === "bn" || saved === "en") {
        setLangState(saved);
      }
    } catch (e) {
      console.error("Lang hydration error:", e);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("jj_lang", newLang);
    } catch (e) {
      console.error("Lang save error:", e);
    }
  };

  const t = (bn: string, en: string) => (lang === "bn" ? bn : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}