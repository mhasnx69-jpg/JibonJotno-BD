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
  t?: (key: string) => string;
  [key: string]: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SITE_DICTIONARY: Array<[string, string, string]> = [
  ["জীবনযত্ন (JibonJotno)", "জীবনযত্ন", "JibonJotno"],
  ["জীবনযত্ন", "জীবনযত্ন", "JibonJotno"],
  ["ডিজিটাল স্বাস্থ্য", "ডিজিটাল স্বাস্থ্য", "Digital Health"],
  ["হোম", "হোম", "Home"],
  ["ঔষধ নির্দেশিকা", "ঔষধ নির্দেশিকা", "Medicine Directory"],
  ["ওষুধ নির্দেশিকা", "ওষুধ নির্দেশিকা", "Medicine Directory"],
  ["দামের তুলনা", "দামের তুলনা", "Price Compare"],
  ["স্বাস্থ্য আর্টিকেল (২০+ রোগ)", "স্বাস্থ্য আর্টিকেল (২০+ রোগ)", "Health Articles (20+ Diseases)"],
  ["স্বাস্থ্য আর্টিকেল", "স্বাস্থ্য আর্টিকেল", "Health Articles"],
  ["আইসিইউ ও ম্যাপ", "আইসিইউ ও ম্যাপ", "ICU & Map"],
  ["অন্যান্য সেবা", "অন্যান্য সেবা", "More Services"],
  ["জরুরি", "জরুরি", "Emergency"],
  ["ফার্মেসি", "ফার্মেসি", "Pharmacy"],
  ["লগইন", "লগইন", "Login"],
  ["সহায়তা / WhatsApp", "সহায়তা ও হোয়াটসঅ্যাপ", "Support / WhatsApp"],
  ["৩৫,৯৪১+ VERIFIED MEDICINES & EQUIPMENT", "৩৫,৯৪১+ নিবন্ধিত ঔষধ ও সরঞ্জাম", "35,941+ VERIFIED MEDICINES & EQUIPMENT"],
  ["+ ১০০% ক্যাশ অন ডেলিভারি (CASH ON DELIVERY)", "+ ১০০% ক্যাশ অন ডেলিভারি সুবিধা", "+ 100% CASH ON DELIVERY"],
  ["সহজ ও সঠিক স্বাস্থ্য তথ্য আপনার হাতের মুঠোয়", "সহজ ও সঠিক স্বাস্থ্য তথ্য আপনার হাতের মুঠোয়", "Easy & Accurate Healthcare Info at Your Fingertips"],
  ["খুঁজুন", "খুঁজুন", "Search"],
  ["Pain & Fever", "ব্যথা ও জ্বর", "Pain & Fever"],
  ["Gastric & Acidity", "গ্যাস্ট্রিক ও অ্যাসিডিটি", "Gastric & Acidity"],
  ["Antibiotics", "অ্যান্টিবায়োটিক", "Antibiotics"],
  ["Diabetes Care", "ডায়াবেটিস যত্ন", "Diabetes Care"],
  ["Vitamins & Supplements", "ভিটামিন ও সাপ্লিমেন্ট", "Vitamins & Supplements"],
  ["প্রধান সেবাসমূহ (Core Healthcare Features)", "প্রধান সেবাসমূহ", "Core Healthcare Features"],
  ["জরুরি স্বাস্থ্যসেবা ও স্মার্ট টুলস (Specialized Services)", "জরুরি স্বাস্থ্যসেবা ও স্মার্ট টুলস", "Emergency Healthcare & Smart Tools"],
  ["ব্লাড ব্যাংক ও রক্তদাতা", "ব্লাড ব্যাংক ও রক্তদাতা", "Blood Bank & Donors"],
  ["হোমে ফিরে যান", "হোমে ফিরে যান", "Back to Home"]
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("bn");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("jibonjotno_lang") as Language;
      if (saved === "bn" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("jibonjotno_lang", newLang);
    } catch {}
  };

  const toggleLang = () => setLang(lang === "bn" ? "en" : "bn");

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const timer = setTimeout(() => {
      try {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        let node: any;
        while ((node = walker.nextNode())) {
          const parentTag = node.parentElement?.tagName;
          if (parentTag === "SCRIPT" || parentTag === "STYLE" || parentTag === "NOSCRIPT") continue;
          const raw = node.nodeValue || "";
          const trimmed = raw.trim();
          if (!trimmed) continue;
          if (!node.__jjOrig) node.__jjOrig = trimmed;
          const orig = node.__jjOrig;
          for (const [key, bnVal, enVal] of SITE_DICTIONARY) {
            if (orig === key || trimmed === key || trimmed === bnVal || trimmed === enVal) {
              const target = lang === "en" ? enVal : bnVal;
              if (trimmed !== target) node.nodeValue = raw.replace(trimmed, target);
              break;
            }
          }
        }
      } catch {}
    }, 250);

    return () => clearTimeout(timer);
  }, [lang, mounted]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        language: lang,
        toggleLang,
        toggleLanguage: toggleLang,
        setLang,
        setLanguage: setLang,
        t: (k: string) => k,
      }}
    >
      {mounted && (
        <div className="fixed top-3 right-3 z-[9999] font-sans">
          <button
            type="button"
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-full bg-[#07241C] hover:bg-[#0D4C3B] text-white text-xs font-black shadow-lg border border-emerald-400/50 flex items-center gap-1.5 transition-all"
          >
            <span className={lang === "bn" ? "text-emerald-300 underline" : "text-slate-300"}>বাংলা</span>
            <span className="text-slate-500">|</span>
            <span className={lang === "en" ? "text-emerald-300 underline" : "text-slate-300"}>EN</span>
          </button>
        </div>
      )}
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
      t: (k: string) => k,
    };
  }
  return context;
}