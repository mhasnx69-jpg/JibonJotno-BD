"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import {
  Search,
  Mic,
  Camera,
  Pill,
  Scale,
  BookOpen,
  MapPin,
  Heart,
  CalendarClock,
  PhoneCall,
  FlaskConical,
  Baby,
  Truck,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  MessageCircle,
  Activity,
  ShieldPlus,
  HeartPulse,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  pill: <Pill className="w-3.5 h-3.5" />,
  "shield-plus": <ShieldPlus className="w-3.5 h-3.5" />,
  "flask-conical": <FlaskConical className="w-3.5 h-3.5" />,
  activity: <Activity className="w-3.5 h-3.5" />,
  "heart-pulse": <HeartPulse className="w-3.5 h-3.5" />,
};

interface Category {
  id: string;
  name_bn: string;
  name_en: string;
  slug: string;
  icon_name: string | null;
}

export default function HomePage() {
  const { lang, setLang, t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("medicine_categories")
          .select("id, name_bn, name_en, slug, icon_name")
          .order("created_at", { ascending: true })
          .limit(8);

        if (data && data.length > 0) {
          setCategories(data);
        }
      } catch {
        setCategories([]);
      }
    }
    loadCategories();
  }, []);

  const quickSearchTags = [
    { label: "Napa Extend", query: "Napa Extend" },
    { label: "Sergel 20", query: "Sergel 20" },
    { label: "Antibiotics", query: "Antibiotics" },
    { label: "Gastric", query: "Gastric" },
    { label: "BP Monitor", query: "BP Monitor" },
    { label: t("স্বাস্থ্য গাইড", "Health Guides"), href: "/health-guides" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans selection:bg-[#DDF8EA] selection:text-[#0D4C3B]">
      
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5EBF2] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/" className="text-2xl font-black text-[#0D4C3B] tracking-tight">
              {t("জীবনযত্ন", "JibonJotno")}
            </Link>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#DDF8EA] text-[#0D4C3B]">
              {t("ডিজিটাল স্বাস্থ্য", "Digital Health")}
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-[#101B32]">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full bg-[#0D4C3B] text-white shadow-xs"
            >
              {t("হোম", "Home")}
            </Link>
            <Link
              href="/medicines"
              className="px-3 py-1.5 rounded-md hover:text-[#0D4C3B] hover:bg-emerald-50 transition-colors"
            >
              {t("ঔষধ নির্দেশিকা", "Medicine Guide")}
            </Link>
            <Link
              href="/medicines"
              className="px-3 py-1.5 rounded-md hover:text-[#0D4C3B] hover:bg-emerald-50 transition-colors"
            >
              {t("দামের তুলনা", "Price Comparison")}
            </Link>
            <Link
              href="/health-guides"
              className="px-3 py-1.5 rounded-md hover:text-[#0D4C3B] hover:bg-emerald-50 transition-colors"
            >
              {t("স্বাস্থ্য আর্টিকেল", "Health Articles")}
            </Link>
            <Link
              href="/hospitals"
              className="px-3 py-1.5 rounded-md hover:text-[#0D4C3B] hover:bg-emerald-50 transition-colors"
            >
              {t("আইসিইউ ও ম্যাপ", "ICU & Map")}
            </Link>
            
            {/* More Services Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="px-3 py-1.5 rounded-md hover:text-[#0D4C3B] hover:bg-emerald-50 inline-flex items-center gap-1 transition-colors"
              >
                <span>{t("অন্যান্য সেবা", "More Services")}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block w-52 bg-white border border-[#E5EBF2] rounded-xl shadow-lg py-2 mt-1 z-50">
                <Link href="/blood-bank" className="block px-4 py-2 hover:bg-emerald-50 text-xs">
                  {t("রক্ত ব্যাংক ও রক্তদাতা", "Blood Bank & Donors")}
                </Link>
                <Link href="/ambulance" className="block px-4 py-2 hover:bg-emerald-50 text-xs">
                  {t("অ্যাম্বুলেন্স ও অক্সিজেন", "Ambulance & Oxygen")}
                </Link>
                <Link href="/diagnostic-centers" className="block px-4 py-2 hover:bg-emerald-50 text-xs">
                  {t("ডায়াগনস্টিক টেস্ট", "Diagnostic Tests")}
                </Link>
                <Link href="/pediatric-dose" className="block px-4 py-2 hover:bg-emerald-50 text-xs">
                  {t("শিশুর সিরাপ ডোজ ক্যালকুলেটর", "Pediatric Dose Calculator")}
                </Link>
                <Link href="/order-tracking" className="block px-4 py-2 hover:bg-emerald-50 text-xs">
                  {t("লাইভ অর্ডার ট্র্যাকিং", "Live Order Tracking")}
                </Link>
              </div>
            </div>
          </nav>

          {/* Action Buttons & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/ambulance"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#ED174C] text-white hover:bg-[#d01442] transition-colors shadow-xs"
            >
              <span>🚨</span>
              <span>{t("জরুরি", "Emergency")}</span>
            </Link>

            <Link
              href="/pharmacy"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0D4C3B] text-white hover:bg-[#07372B] transition-colors shadow-xs"
            >
              <span>💊</span>
              <span>{t("ফার্মেসি", "Pharmacy")}</span>
            </Link>

            <Link
              href="/login"
              className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0D4C3B] text-white hover:bg-[#07372B] transition-colors shadow-xs"
            >
              {t("লগইন", "Login")}
            </Link>

            {/* Language Switcher Buttons */}
            <div className="inline-flex items-center bg-[#F7F9FC] border border-[#E5EBF2] rounded-full p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLang("bn")}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === "bn"
                    ? "bg-[#0D4C3B] text-white shadow-xs font-bold"
                    : "text-[#7B8AA4] hover:text-[#101B32]"
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === "en"
                    ? "bg-[#0D4C3B] text-white shadow-xs font-bold"
                    : "text-[#7B8AA4] hover:text-[#101B32]"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        
        {/* 2. Hero Section */}
        <section className="bg-gradient-to-b from-[#0D4C3B] to-[#07372B] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          {/* Floating WhatsApp Support Button */}
          <div className="absolute left-4 top-4 hidden md:block">
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold shadow-md transition-all hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t("সহায়তা / WhatsApp", "Support / WhatsApp")}</span>
            </a>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-200 border border-white/15">
                {t("৩৫,৯৪১+ VERIFIED MEDICINES & EQUIPMENT", "35,941+ VERIFIED MEDICINES & EQUIPMENT")}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FFB91F]/20 text-[#FFB91F] border border-[#FFB91F]/30">
                {t("⚡ ১০০% ক্যাশ অন ডেলিভারি (CASH ON DELIVERY)", "⚡ 100% CASH ON DELIVERY")}
              </span>
            </div>

            {/* Main Headline & Subtitle */}
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              {t(
                "সহজ ও সঠিক স্বাস্থ্য তথ্য আপনার হাতের মুঠোয়",
                "Simple & Accurate Healthcare Information at Your Fingertips"
              )}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
              {t(
                "ঔষধের বিবরণ, জেনেরিক নামের তুলনা, ২০+ রোগের প্রাথমিক চিকিৎসা, জরুরি রক্তসেবা ও আইসিইউ ম্যাপ।",
                "Medicine guidelines, generic price comparison, 20+ disease first aids, emergency blood bank, and ICU maps."
              )}
            </p>

            {/* Search Input Box */}
            <form action="/medicines" method="GET" className="pt-2 max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-lg border border-emerald-100">
                <Search className="w-5 h-5 text-[#7B8AA4] ml-3 shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder={t(
                    "ঔষধের নাম, ডিভাইস বা রোগ লিখে খুঁজুন (Napa, Sergel, Omron)...",
                    "Search medicine, device, or symptom (Napa, Sergel, Omron)..."
                  )}
                  className="w-full px-3 py-2 text-sm text-[#101B32] placeholder-[#7B8AA4] focus:outline-none bg-transparent"
                />
                <button
                  type="button"
                  aria-label="Voice Search"
                  className="p-2 text-[#7B8AA4] hover:text-[#0D4C3B] rounded-full transition-colors shrink-0"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs sm:text-sm font-bold transition-colors shrink-0 shadow-sm"
                >
                  {t("খুঁজুন", "Search")}
                </button>
              </div>
            </form>

            {/* Quick Search Tag Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              {quickSearchTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href || `/medicines?q=${encodeURIComponent(tag.query || "")}`}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/10 transition-colors"
                >
                  {tag.label}
                </Link>
              ))}
            </div>

            {/* Dynamic Supabase Category Pills */}
            {categories.length > 0 && (
              <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/medicines?category=${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/40 hover:bg-emerald-950/60 text-emerald-100 border border-emerald-500/20 transition-colors"
                  >
                    {cat.icon_name && CATEGORY_ICONS[cat.icon_name]}
                    <span>{lang === "bn" ? cat.name_bn : cat.name_en}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Prescription Upload Banner Card */}
            <div className="pt-4 max-w-2xl mx-auto">
              <div className="bg-[#093d30]/90 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-600/40 flex items-center justify-center shrink-0 text-[#FFB91F]">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-white">
                      {t(
                        "প্রেসক্রিপশনের ছবি তুলে এক-ক্লিকে অর্ডার",
                        "Upload Prescription & Order with One-Click"
                      )}
                    </h2>
                    <p className="text-[11px] text-emerald-200">
                      {t(
                        "ঔষধ খুঁজতে না চাইলে ছবি দিন, ফার্মাসিস্ট নিজে বিল করে ফোন দেবেন।",
                        "No need to search medicines. Upload prescription photo, our pharmacist will call you."
                      )}
                    </p>
                  </div>
                </div>
                <Link
                  href="/refill"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#FFB91F] hover:bg-[#e5a619] text-[#101B32] text-xs font-bold whitespace-nowrap transition-colors text-center shadow-sm"
                >
                  {t("ছবি আপলোড করুন ➔", "Upload Photo ➔")}
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* 3. Core Healthcare Features (4 Cards) */}
        <section aria-labelledby="core-features-title" className="space-y-4">
          <h2
            id="core-features-title"
            className="text-sm sm:text-base font-bold text-[#101B32] flex items-center gap-2"
          >
            <span>✨</span>
            <span>{t("প্রধান সেবাসমূহ (Core Healthcare Features)", "Core Healthcare Features")}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: Medicine Guide */}
            <Link
              href="/medicines"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Pill className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-[#101B32]">
                  {t("ঔষধ নির্দেশিকা", "Medicine Guide")}
                </h3>
                <p className="text-xs text-[#7B8AA4] leading-relaxed">
                  {t(
                    "৩৫,৯৪১+ ওষুধের মাত্রা, পার্শ্বপ্রতিক্রিয়া, ব্যবহার ও ক্লিনিক্যাল বিবরণী।",
                    "35,941+ medicines with dosage, side effects, indications, and clinical details."
                  )}
                </p>
                <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                  <span>{t("ঔষধ খুঁজুন", "Find Medicine")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Card 2: Price Comparison */}
            <Link
              href="/medicines"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#FFB91F] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-[#101B32]">
                  {t("দামের তুলনা", "Price Comparison")}
                </h3>
                <p className="text-xs text-[#7B8AA4] leading-relaxed">
                  {t(
                    "একই জেনেরিকের বিভিন্ন কোম্পানির বিকল্প ব্র্যান্ড ও সাশ্রয়ী দাম।",
                    "Compare alternative brands and cost savings under the same generic."
                  )}
                </p>
                <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                  <span>{t("মূল্য তুলনা করুন", "Compare Prices")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Card 3: Health Guides */}
            <Link
              href="/health-guides"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-[#101B32]">
                  {t("স্বাস্থ্য আর্টিকেল (২০+ রোগ)", "Health Articles (20+ Diseases)")}
                </h3>
                <p className="text-xs text-[#7B8AA4] leading-relaxed">
                  {t(
                    "ডেঙ্গু, উচ্চ রক্তচাপ, ডায়াবেটিসসহ ২০+ রোগের প্রাথমিক চিকিৎসা গাইড।",
                    "Emergency first-aid guides for dengue, hypertension, diabetes, and 20+ conditions."
                  )}
                </p>
                <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                  <span>{t("গাইড পড়ুন", "Read Guides")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* Card 4: Emergency & ICU Map */}
            <Link
              href="/hospitals"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#ED174C]/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#ED174C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-[#101B32]">
                  {t("জরুরি ও আইসিইউ ম্যাপ", "Emergency & ICU Map")}
                </h3>
                <p className="text-xs text-[#7B8AA4] leading-relaxed">
                  {t(
                    "৯৯৯, ১৬২৬৩ হটলাইন এবং রিয়েল ম্যাপে দেশের সকল আইসিইউ হাসপাতাল।",
                    "999, 16263 hotlines and interactive maps of all ICU hospitals."
                  )}
                </p>
                <div className="pt-2 text-xs font-semibold text-[#ED174C] inline-flex items-center gap-1">
                  <span>{t("ম্যাপ ও নম্বর দেখুন", "View Map & Numbers")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

          </div>
        </section>

        {/* 4. Specialized Services (6 Cards) */}
        <section aria-labelledby="specialized-services-title" className="space-y-4">
          <h2
            id="specialized-services-title"
            className="text-sm sm:text-base font-bold text-[#101B32] flex items-center gap-2"
          >
            <span>⚡</span>
            <span>
              {t(
                "জরুরি স্বাস্থ্যসেবা ও স্মার্ট টুলস (Specialized Services)",
                "Emergency Healthcare Services & Smart Tools"
              )}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1: Blood Bank */}
            <Link
              href="/blood-bank"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all relative group"
            >
              <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-[#ED174C]">
                {t("জরুরি নেটওয়ার্ক", "Emergency Network")}
              </span>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#ED174C] flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-16 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">
                    {t("ব্লাড ব্যাংক ও রক্তদাতা", "Blood Bank & Donors")}
                  </h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    {t(
                      "রক্তের গ্রুপ অনুযায়ী সরাসরি রক্তদাতাদের ফোন নম্বর ও জরুরি রক্তের আবেদন।",
                      "Direct blood donor phone numbers by group and urgent blood requests."
                    )}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#ED174C] inline-flex items-center gap-1">
                    <span>{t("রক্তদাতা খুঁজুন", "Find Donors")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 2: Monthly Refill */}
            <Link
              href="/refill"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all relative group"
            >
              <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0D4C3B]">
                {t("অটো-সাবস্ক্রিপশন", "Auto-Subscription")}
              </span>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-16 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">
                    {t("মাসিক রিফিল ও পিল রিমাইন্ডার", "Monthly Refill & Pill Reminder")}
                  </h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    {t(
                      "ওষুধ শেষ হওয়ার ৩ দিন আগে এসএমএস অ্যালার্ট ও ক্যাশ অন ডেলিভারিতে রিফিল।",
                      "SMS alert 3 days before medicine finishes and automated COD refills."
                    )}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>{t("রিফিল চালু করুন", "Activate Refill")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 3: Ambulance */}
            <Link
              href="/ambulance"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all relative group"
            >
              <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {t("২৪/৭ সার্ভিস", "24/7 Service")}
              </span>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-16 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">
                    {t("অ্যাম্বুলেন্স ও অক্সিজেন সিলিন্ডার", "Ambulance & Oxygen Cylinder")}
                  </h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    {t(
                      "আইসিইউ ডেডিকেটেড অ্যাম্বুলেন্স ও ২ ঘণ্টার মধ্যে অক্সিজেন সরবরাহ।",
                      "ICU-dedicated ambulance and express 2-hour oxygen delivery."
                    )}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>{t("কল নম্বর দেখুন", "View Numbers")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 4: Diagnostic Tests */}
            <Link
              href="/diagnostic-centers"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">
                    {t("ডায়াগনস্টিক টেস্ট ও হোম স্যাম্পল", "Diagnostic Tests & Home Sampling")}
                  </h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    {t(
                      "সরকারি বনাম বেসরকারি ল্যাব খরচ ও বাসা থেকে স্যাম্পল বুকিং।",
                      "Government vs private lab test cost comparison and home sampling booking."
                    )}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>{t("ল্যাব খরচ দেখুন", "View Lab Costs")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 5: Pediatric Dose */}
            <Link
              href="/pediatric-dose"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Baby className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">
                    {t("শিশুর সিরাপ ডোজ ক্যালকুলেটর", "Pediatric Dose Calculator")}
                  </h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    {t(
                      "শিশুর ওজন অনুযায়ী প্যারাসিটামল ও অ্যান্টিবায়োটিকের মিলি পরিমাপ।",
                      "Weight-based accurate ml and spoon dose calculation for children."
                    )}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>{t("মাত্রা হিসাব করুন", "Calculate Dose")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 6: Order Tracking */}
            <Link
              href="/order-tracking"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">
                    {t("লাইভ অর্ডার ট্র্যাকিং ও ক্যাশ মেমো", "Live Order Tracking & Cash Memo")}
                  </h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    {t(
                      "ট্র্যাকিং আইডি দিয়ে ৫-ধাপের ডেলিভারি অগ্রগতি ও ক্যাশ মেমো প্রিন্ট।",
                      "5-step delivery tracking with ID and official printable cash memo."
                    )}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>{t("অর্ডার ট্র্যাক করুন", "Track Order")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="bg-[#07372B] text-emerald-100 py-10 px-4 sm:px-6 lg:px-8 border-t border-emerald-900 mt-12">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          
          <div className="space-y-2">
            <h2 className="text-xl font-black text-white tracking-tight">
              {t("জীবনযত্ন (JibonJotno)", "JibonJotno")}
            </h2>
            <p className="text-xs text-emerald-200 max-w-xl mx-auto leading-relaxed">
              {t(
                "বাংলাদেশের সাধারণ মানুষের জন্য নির্ভরযোগ্য, সুরক্ষিত ও ১০০% ক্যাশ অন ডেলিভারি ভিত্তিক ডিজিটাল স্বাস্থ্য তথ্য সেবা।",
                "Reliable, secure, and 100% Cash on Delivery digital healthcare platform for Bangladesh."
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <span
              title={t("জীবনযত্ন কোনো সরকারি সংস্থা বা অধিদপ্তরের অফিসিয়াল প্ল্যাটফর্ম নয়।", "JibonJotno is not an official government platform.")}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-amber-300 font-semibold cursor-help"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("সরকারি ওয়েবসাইট নয়", "Not a Government Website")}</span>
            </span>

            <Link href="/privacy" className="hover:text-white transition-colors">
              {t("গোপনীয়তা ও ডেটা সুরক্ষা নীতি", "Privacy & Data Protection Policy")}
            </Link>
            <span className="text-emerald-700">•</span>
            <Link href="/blood-bank" className="hover:text-white transition-colors">
              {t("রক্ত ব্যাংক", "Blood Bank")}
            </Link>
            <span className="text-emerald-700">•</span>
            <Link href="/order-tracking" className="hover:text-white transition-colors">
              {t("অর্ডার ট্র্যাকিং", "Order Tracking")}
            </Link>
            <span className="text-emerald-700">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>256-Bit SSL Secured</span>
            </span>
          </div>

          <div className="pt-4 border-t border-emerald-900/60 text-[11px] text-emerald-400">
            © {new Date().getFullYear()} JibonJotno. {t("সকল অধিকার সংরক্ষিত।", "All rights reserved.")}
          </div>
        </div>
      </footer>
    </div>
  );
}