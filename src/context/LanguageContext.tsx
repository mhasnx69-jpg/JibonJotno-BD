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

// Complete Website Dictionary: Key -> [Pure Bangla, Pure English]
const SITE_DICTIONARY: Array<[string, string, string]> = [
  // Navbar & Branding
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

  // Hero Badges & Headings
  ["সহায়তা / WhatsApp", "সহায়তা ও হোয়াটসঅ্যাপ", "Support / WhatsApp"],
  ["৩৫,৯৪১+ VERIFIED MEDICINES & EQUIPMENT", "৩৫,৯৪১+ নিবন্ধিত ঔষধ ও সরঞ্জাম", "35,941+ VERIFIED MEDICINES & EQUIPMENT"],
  ["+ ১০০% ক্যাশ অন ডেলিভারি (CASH ON DELIVERY)", "+ ১০০% ক্যাশ অন ডেলিভারি সুবিধা", "+ 100% CASH ON DELIVERY"],
  ["১০০% ক্যাশ অন ডেলিভারি (CASH ON DELIVERY)", "১০০% ক্যাশ অন ডেলিভারি সুবিধা", "100% CASH ON DELIVERY"],
  ["সহজ ও সঠিক স্বাস্থ্য তথ্য আপনার হাতের মুঠোয়", "সহজ ও সঠিক স্বাস্থ্য তথ্য আপনার হাতের মুঠোয়", "Easy & Accurate Healthcare Info at Your Fingertips"],
  ["ঔষধের বিবরণ, জেনেরিক নামের তুলনা, ২০+ রোগের প্রাথমিক চিকিৎসা, জরুরি রক্তসেবা ও আইসিইউ ম্যাপ।", "ঔষধের বিবরণ, জেনেরিক নামের তুলনা, ২০+ রোগের প্রাথমিক চিকিৎসা, জরুরি রক্তসেবা ও আইসিইউ ম্যাপ।", "Medicine profiles, generic price comparisons, 20+ disease primary care guides, emergency blood bank & ICU map."],
  ["খুঁজুন", "খুঁজুন", "Search"],

  // Hero Tags & Categories (Fixing English/Bangla mixing)
  ["Napa Extend", "নাপা এক্সটেন্ড", "Napa Extend"],
  ["Sergel 20", "সার্জেল ২০", "Sergel 20"],
  ["BP Monitor", "প্রেশার মনিটর", "BP Monitor"],
  ["স্বাস্থ্য গাইড", "স্বাস্থ্য গাইড", "Health Guide"],
  ["Pain & Fever", "ব্যথা ও জ্বর", "Pain & Fever"],
  ["Gastric & Acidity", "গ্যাস্ট্রিক ও অ্যাসিডিটি", "Gastric & Acidity"],
  ["Antibiotics", "অ্যান্টিবায়োটিক", "Antibiotics"],
  ["Gastric", "গ্যাস্ট্রিক", "Gastric"],
  ["Diabetes Care", "ডায়াবেটিস যত্ন", "Diabetes Care"],
  ["Vitamins & Supplements", "ভিটামিন ও সাপ্লিমেন্ট", "Vitamins & Supplements"],

  // Prescription Upload CTA
  ["প্রেসক্রিপশনের ছবি তুলে এক ক্লিকে অর্ডার", "প্রেসক্রিপশনের ছবি তুলে এক ক্লিকে অর্ডার", "Upload Prescription Photo for 1-Click Order"],
  ["ঔষধ খুঁজতে না চাইলে ছবি দিন, ফার্মাসিস্ট নিজে বিল করে ফোন দেবেন।", "ঔষধ খুঁজতে না চাইলে ছবি দিন, ফার্মাসিস্ট নিজে বিল করে ফোন দেবেন।", "Don't want to search? Upload a photo and our pharmacist will call you with the bill."],
  ["ছবি আপলোড করুন →", "ছবি আপলোড করুন →", "Upload Photo →"],
  ["ছবি আপলোড করুন", "ছবি আপলোড করুন", "Upload Photo"],

  // Section 1: Core Healthcare Features
  ["প্রধান সেবাসমূহ (Core Healthcare Features)", "প্রধান সেবাসমূহ", "Core Healthcare Features"],
  ["৩৫,৯৪১+ ঔষধের মাত্রা, পার্শ্বপ্রতিক্রিয়া, ব্যবহার ও ক্লিনিক্যাল বিবরণী।", "৩৫,৯৪১+ ঔষধের মাত্রা, পার্শ্বপ্রতিক্রিয়া, ব্যবহার ও ক্লিনিক্যাল বিবরণী।", "Dosage, side effects, uses, and clinical profiles for 35,941+ medicines."],
  ["ঔষধ খুঁজুন →", "ঔষধ খুঁজুন →", "Browse Medicines →"],
  ["একই জেনেরিকের বিভিন্ন কোম্পানির বিকল্প ব্র্যান্ড ও সাশ্রয়ী দাম।", "একই জেনেরিকের বিভিন্ন কোম্পানির বিকল্প ব্র্যান্ড ও সাশ্রয়ী দাম।", "Alternative brands from top companies and affordable prices for the same generic."],
  ["মূল্য তুলনা করুন →", "মূল্য তুলনা করুন →", "Compare Prices →"],
  ["ডেঙ্গু, উচ্চ রক্তচাপ, ডায়াবেটিসসহ ২০+ রোগের প্রাথমিক চিকিৎসা গাইড।", "ডেঙ্গু, উচ্চ রক্তচাপ, ডায়াবেটিসসহ ২০+ রোগের প্রাথমিক চিকিৎসা গাইড।", "Primary treatment guides for 20+ conditions including dengue, hypertension & diabetes."],
  ["গাইড পড়ুন →", "গাইড পড়ুন →", "Read Guides →"],
  ["জরুরি ও আইসিইউ ম্যাপ", "জরুরি ও আইসিইউ ম্যাপ", "Emergency & ICU Map"],
  ["৯৯৯, ১৬২৬৩ হটলাইন এবং রিয়েল ম্যাপে দেশের সকল আইসিইউ হাসপাতাল।", "৯৯৯, ১৬২৬৩ হটলাইন এবং রিয়েল ম্যাপে দেশের সকল আইসিইউ হাসপাতাল।", "999, 16263 hotlines and live map of all ICU hospitals across the country."],
  ["ম্যাপ ও নম্বর দেখুন →", "ম্যাপ ও নম্বর দেখুন →", "View Map & Hotlines →"],

  // Section 2: Specialized Services
  ["জরুরি স্বাস্থ্যসেবা ও স্মার্ট টুলস (Specialized Services)", "জরুরি স্বাস্থ্যসেবা ও স্মার্ট টুলস", "Emergency Healthcare & Smart Tools"],
  ["ব্লাড ব্যাংক ও রক্তদাতা", "ব্লাড ব্যাংক ও রক্তদাতা", "Blood Bank & Donors"],
  ["জরুরি নেটওয়ার্ক", "জরুরি নেটওয়ার্ক", "Emergency Network"],
  ["রক্তের গ্রুপ অনুযায়ী সরাসরি রক্তদাতাদের ফোন নম্বর ও জরুরি রক্তের আবেদন।", "রক্তের গ্রুপ অনুযায়ী সরাসরি রক্তদাতাদের ফোন নম্বর ও জরুরি রক্তের আবেদন।", "Direct phone numbers of blood donors by group and urgent blood requests."],
  ["রক্তদাতা খুঁজুন →", "রক্তদাতা খুঁজুন →", "Find Donors →"],
  ["মাসিক রিফিল ও পিল রিমাইন্ডার", "মাসিক রিফিল ও পিল রিমাইন্ডার", "Monthly Refill & Pill Reminder"],
  ["অটো সাবস্ক্রিপশন", "অটো সাবস্ক্রিপশন", "Auto Subscription"],
  ["ঔষধ শেষ হওয়ার ৩ দিন আগে এসএমএস অ্যালার্ট ও ক্যাশ অন ডেলিভারিতে রিফিল।", "ঔষধ শেষ হওয়ার ৩ দিন আগে এসএমএস অ্যালার্ট ও ক্যাশ অন ডেলিভারিতে রিফিল।", "SMS alert 3 days before medicine runs out and easy Cash on Delivery refill."],
  ["রিফিল চালু করুন →", "রিফিল চালু করুন →", "Enable Refill →"],
  ["অ্যাম্বুলেন্স ও অক্সিজেন সিলিন্ডার", "অ্যাম্বুলেন্স ও অক্সিজেন সিলিন্ডার", "Ambulance & Oxygen Cylinder"],
  ["২৪/৭ সার্ভিস", "২৪/৭ সার্ভিস", "24/7 Service"],
  ["আইসিইউ ভেন্টিলেটেড অ্যাম্বুলেন্স ও ২ ঘণ্টার মধ্যে অক্সিজেন সরবরাহ।", "আইসিইউ ভেন্টিলেটেড অ্যাম্বুলেন্স ও ২ ঘণ্টার মধ্যে অক্সিজেন সরবরাহ।", "ICU ventilated ambulance and oxygen cylinder delivery within 2 hours."],
  ["কল নম্বর দেখুন →", "কল নম্বর দেখুন →", "View Call Numbers →"],
  ["ডায়াগনস্টিক টেস্ট ও হোম স্যাম্পল", "ডায়াগনস্টিক টেস্ট ও হোম স্যাম্পল", "Diagnostic Test & Home Sample"],
  ["সরকারি বনাম বেসরকারি ল্যাব খরচ ও বাসা থেকে স্যাম্পল বুকিং।", "সরকারি বনাম বেসরকারি ল্যাব খরচ ও বাসা থেকে স্যাম্পল বুকিং।", "Public vs. private lab test costs and home sample collection booking."],
  ["ল্যাব খরচ দেখুন →", "ল্যাব খরচ দেখুন →", "Check Lab Costs →"],
  ["শিশুর সিরাপ ডোজ ক্যালকুলেটর", "শিশুর সিরাপ ডোজ ক্যালকুলেটর", "Child Syrup Dose Calculator"],
  ["শিশুর ওজন অনুযায়ী প্যারাসিটামল ও অ্যান্টিবায়োটিকের মিলি পরিমাণ।", "শিশুর ওজন অনুযায়ী প্যারাসিটামল ও অ্যান্টিবায়োটিকের মিলি পরিমাণ।", "Accurate ml dosage of paracetamol & antibiotics according to child weight."],
  ["মাত্রা হিসাব করুন →", "মাত্রা হিসাব করুন →", "Calculate Dose →"],
  ["লাইভ অর্ডার ট্র্যাকিং ও ক্যাশ মেমো", "লাইভ অর্ডার ট্র্যাকিং ও ক্যাশ মেমো", "Live Order Tracking & Cash Memo"],
  ["ট্র্যাকিং আইডি দিয়ে ৪-ধাপের ডেলিভারি আপডেট ও ক্যাশ মেমো প্রিন্ট।", "ট্র্যাকিং আইডি দিয়ে ৪-ধাপের ডেলিভারি আপডেট ও ক্যাশ মেমো প্রিন্ট।", "4-step delivery updates and printable cash memo using tracking ID."],
  ["অর্ডার ট্র্যাক করুন →", "অর্ডার ট্র্যাক করুন →", "Track Order →"],

  // Footer
  ["বাংলাদেশের সাধারণ মানুষের জন্য নির্ভরযোগ্য, সুরক্ষিত ও ১০০% ক্যাশ অন ডেলিভারি ভিত্তিক ডিজিটাল স্বাস্থ্য তথ্য সেবা।", "বাংলাদেশের সাধারণ মানুষের জন্য নির্ভরযোগ্য, সুরক্ষিত ও ১০০% ক্যাশ অন ডেলিভারি ভিত্তিক ডিজিটাল স্বাস্থ্য তথ্য সেবা।", "Reliable, secure, and 100% Cash on Delivery digital health information service for Bangladesh."],
  ["সরকারি ওয়েবসাইট নয়", "সরকারি ওয়েবসাইট নয়", "Not a Government Website"],
  ["গোপনীয়তা ও ডেটা সুরক্ষা নীতি", "গোপনীয়তা ও ডেটা সুরক্ষা নীতি", "Privacy & Data Protection Policy"],
  ["রক্ত ব্যাংক", "রক্ত ব্যাংক", "Blood Bank"],
  ["অর্ডার ট্র্যাকিং", "অর্ডার ট্র্যাকিং", "Order Tracking"],
  ["256-Bit SSL Secured", "২৫৬-বিট এসএসএল সুরক্ষিত", "256-Bit SSL Secured"],
  ["© 2026 JibonJotno. সকল অধিকার সংরক্ষিত।", "© ২০২৬ জীবনযত্ন। সকল অধিকার সংরক্ষিত।", "© 2026 JibonJotno. All rights reserved."],

  // Subpages (Blood Bank, Medicines, Checkout, Tracking)
  ["হোমে ফিরে যান", "হোমে ফিরে যান", "Back to Home"],
  ["ওষুধ তালিকায় ফিরে যান", "ওষুধ তালিকায় ফিরে যান", "Back to Medicines"],
  ["রক্তের পোস্ট করুন", "রক্তের পোস্ট করুন", "Post Blood Request"],
  ["ব্লাড ব্যাংক ও স্বেচ্ছায় রক্তদাতা নেটওয়ার্ক", "ব্লাড ব্যাংক ও স্বেচ্ছায় রক্তদাতা নেটওয়ার্ক", "Blood Bank & Voluntary Donor Network"],
  ["ব্লাড ব্যাংক ও স্বেচ্ছায় রক্তদাতা", "ব্লাড ব্যাংক ও স্বেচ্ছায় রক্তদাতা", "Blood Bank & Voluntary Donors"],
  ["রক্তের গ্রুপ নির্বাচন করুন:", "রক্তের গ্রুপ নির্বাচন করুন:", "Select Blood Group:"],
  ["সকল গ্রুপ", "সকল গ্রুপ", "All Groups"],
  ["সকল জেলা", "সকল জেলা", "All Districts"],
  ["জেলা:", "জেলা:", "District:"],
  ["ঢাকা", "ঢাকা", "Dhaka"],
  ["চট্টগ্রাম", "চট্টগ্রাম", "Chattogram"],
  ["রাজশাহী", "রাজশাহী", "Rajshahi"],
  ["সিলেট", "সিলেট", "Sylhet"],
  ["খুলনা", "খুলনা", "Khulna"],
  ["বরিশাল", "বরিশাল", "Barishal"],
  ["রংপুর", "রংপুর", "Rangpur"],
  ["ভেরিফাইড", "ভেরিফাইড", "Verified"],
  ["কল দিন", "কল দিন", "Call Now"]
];

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
    try {
      localStorage.setItem("jibonjotno_lang", newLang);
    } catch (e) {}
  };

  const toggleLang = () => setLang(lang === "bn" ? "en" : "bn");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const translateDOM = () => {
      // 1. Translate all text nodes
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      let node: any;
      while ((node = walker.nextNode())) {
        const parentTag = node.parentElement?.tagName;
        if (parentTag === "SCRIPT" || parentTag === "STYLE" || parentTag === "NOSCRIPT") continue;

        const raw = node.nodeValue || "";
        const trimmed = raw.trim();
        if (!trimmed) continue;

        if (!node.__jjOrig) {
          node.__jjOrig = trimmed;
        }
        const orig = node.__jjOrig;

        for (const [key, bnVal, enVal] of SITE_DICTIONARY) {
          if (orig === key || trimmed === key || trimmed === bnVal || trimmed === enVal) {
            const target = lang === "en" ? enVal : bnVal;
            if (trimmed !== target) {
              node.nodeValue = raw.replace(trimmed, target);
            }
            break;
          }
        }
      }

      // 2. Translate input placeholders
      const inputs = document.querySelectorAll("input[placeholder], textarea[placeholder]");
      inputs.forEach((el: any) => {
        if (!el.__jjOrigPh) el.__jjOrigPh = el.placeholder;
        const origPh = el.__jjOrigPh || "";
        if (origPh.includes("ঔষধের নাম") || origPh.includes("Search by medicine")) {
          el.placeholder =
            lang === "en"
              ? "Search by medicine name, device, or symptom (Napa, Sergel, Omron)..."
              : "ঔষধের নাম, ডিভাইস বা রোগ লিখে খুঁজুন (নাপা, সার্জেল, প্রেশার মনিটর)...";
        } else if (origPh.includes("ওষুধের নাম লিখে খুঁজুন") || origPh.includes("Search medicine")) {
          el.placeholder = lang === "en" ? "Search medicines..." : "ওষুধের নাম লিখে খুঁজুন...";
        }
      });
    };

    translateDOM();
    const timer = setInterval(translateDOM, 400);
    return () => clearInterval(timer);
  }, [lang]);

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
      {/* Global Top-Right Language Switcher Pill */}
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