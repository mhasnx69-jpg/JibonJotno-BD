"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MEDICINES_DATA, MedicineRecord } from "@/data/medicinesData";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeft,
  Building2,
  ShieldAlert,
  ShoppingBag,
  BookOpen,
  AlertTriangle,
  Clock,
  Check,
  Globe,
  Scale,
  HeartPulse,
  Baby,
  ThermometerSnowflake,
} from "lucide-react";

export default function MedicineDetailsPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "napa-extend-665mg";
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === "en";
  const { addToCart, setIsCartOpen, totalItems } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Instant lookup
  const med: MedicineRecord = useMemo(() => {
    return (
      MEDICINES_DATA.find((m) => m.slug === slug) || MEDICINES_DATA[0]
    );
  }, [slug]);

  // Alternative brands with the exact same generic for instant price comparison
  const alternatives = useMemo(() => {
    return MEDICINES_DATA.filter((m) => m.generic_en === med.generic_en).sort(
      (a, b) => a.unit_price - b.unit_price
    );
  }, [med]);

  const handleOrder = (item: MedicineRecord) => {
    addToCart({
      product_id: item.id,
      medicine_id: item.id,
      name_bn: `${item.name_bn} (${item.strength_bn})`,
      name_en: `${item.name_en} (${item.strength_en})`,
      unit_price: item.unit_price,
      pack_unit: isEn ? item.pack_unit_en : item.pack_unit_bn,
      quantity: 1,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      
      {/* Top Sticky Header with Instant A-to-Z Language Switcher */}
      <header className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D4C3B] hover:text-[#12614A]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? "Back to Medicine List" : "ওষুধ তালিকায় ফিরে যান"}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLang}
              className="px-3.5 py-2 rounded-xl border border-[#0D4C3B]/30 bg-emerald-50 hover:bg-emerald-100 text-xs font-extrabold text-[#0D4C3B] flex items-center gap-1.5 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>{isEn ? "বাংলায় সম্পূর্ণ তথ্য দেখুন" : "Read Full Info in English"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#0D4C3B] text-white text-xs font-extrabold flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isEn ? "Bag" : "ব্যাগ"} ({totalItems})</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* SECTION 1: BASIC INFORMATION (প্রাথমিক পরিচিতি) */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#F1F5F9] pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D4C3B] bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  {isEn ? "1. Basic Information" : "১. প্রাথমিক পরিচিতি (Basic Information)"}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    med.is_prescription_required
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {med.is_prescription_required
                    ? isEn
                      ? "Prescription Required (Rx)"
                      : "প্রেসক্রিপশন আবশ্যক (Rx)"
                    : isEn
                    ? "Over The Counter (OTC)"
                    : "ওভার দ্য কাউন্টার (OTC)"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#101B32] pt-1">
                {isEn ? med.name_en : med.name_bn}{" "}
                <span className="text-lg text-[#7B8AA4] font-semibold">
                  ({isEn ? med.name_bn : med.name_en})
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-[#0D4C3B] font-bold flex items-center gap-1.5">
                <span>🧪 {isEn ? "Generic Name:" : "মূল রাসায়নিক উপাদান (Generic Name):"}</span>
                <span className="underline">
                  {isEn ? med.generic_en : `${med.generic_bn} (${med.generic_en})`}
                </span>
              </p>
            </div>

            {/* Price & Direct Order Box */}
            <div className="bg-[#F7F9FC] p-5 rounded-2xl border border-[#E5EBF2] min-w-[240px] space-y-2">
              <div className="flex justify-between items-center text-xs text-[#7B8AA4]">
                <span>{isEn ? `Unit Price (Per ${med.pack_unit_en}):` : `প্রতি ${med.pack_unit_bn} মূল্য:`}</span>
                <span className="text-xl font-black text-[#0D4C3B]">৳ {med.unit_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#7B8AA4]">
                <span>{isEn ? "Est. Strip Price:" : "প্রতি পাতার আনুমানিক মূল্য:"}</span>
                <span className="font-extrabold text-[#101B32]">৳ {med.strip_price.toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={() => handleOrder(med)}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {addedId === med.id ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>
                  {addedId === med.id
                    ? isEn
                      ? "Added to Bag!"
                      : "ব্যাগে যুক্ত হয়েছে!"
                    : isEn
                    ? "+ Order Now (Cash on Delivery)"
                    : "+ অর্ডার করুন (ক্যাশ অন ডেলিভারি)"}
                </span>
              </button>
            </div>
          </div>

          {/* 4-Column Specification Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">
                {isEn ? "Brand Name:" : "বাণিজ্যিক নাম (Brand Name):"}
              </span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">
                {isEn ? med.name_en : med.name_bn}
              </span>
            </div>

            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">
                {isEn ? "Strength / Power:" : "ওষুধের পাওয়ার বা মাত্রা (Strength):"}
              </span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">
                {isEn ? med.strength_en : med.strength_bn}
              </span>
            </div>

            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">
                {isEn ? "Dosage Form:" : "ওষুধের অবস্থা (Dosage Form):"}
              </span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">
                {isEn ? med.dosage_form_en : med.dosage_form_bn}
              </span>
            </div>

            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">
                {isEn ? "Manufacturer (Company):" : "প্রস্তুতকারক কোম্পানি (Company):"}
              </span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">
                {isEn ? med.manufacturer_en : med.manufacturer_bn}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: CLINICAL INFORMATION (চিকিৎসা সংক্রান্ত তথ্য) */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#F1F5F9] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#101B32] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0D4C3B]" />
                <span>
                  {isEn
                    ? "2. Clinical & Medical Information (A to Z)"
                    : "২. চিকিৎসা সংক্রান্ত বিস্তারিত তথ্য (Clinical Information)"}
                </span>
              </h2>
              <p className="text-xs text-[#7B8AA4] pt-0.5">
                {isEn
                  ? "Prepared in accordance with standard pharmacological and registered clinical guidelines."
                  : "রেজিস্টার্ড চিকিৎসকদের প্রেসক্রিপশন ও ফার্মাকোলজিক্যাল নির্দেশিকা অনুযায়ী প্রস্তুতকৃত।"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs sm:text-sm">
            
            {/* 1. Indications */}
            <div className="space-y-1.5 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-extrabold text-[#0D4C3B] flex items-center gap-2 text-sm sm:text-base">
                <span>🎯</span>
                <span>
                  {isEn
                    ? "Indications (Uses & Prescribed Conditions)"
                    : "ব্যবহার বা নির্দেশনা (Indications)"}
                </span>
              </h3>
              <p className="text-[#101B32] leading-relaxed pl-6">
                {isEn ? med.indications_en : med.indications_bn}
              </p>
            </div>

            {/* 2. Therapeutic Class */}
            <div className="space-y-1.5 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-extrabold text-[#0D4C3B] flex items-center gap-2 text-sm sm:text-base">
                <span>🔬</span>
                <span>
                  {isEn ? "Therapeutic Class" : "ওষুধের শ্রেণী (Therapeutic Class)"}
                </span>
              </h3>
              <p className="text-[#101B32] leading-relaxed pl-6 font-semibold">
                {isEn ? med.therapeutic_class_en : med.therapeutic_class_bn}
              </p>
            </div>

            {/* 3. Pharmacology */}
            <div className="space-y-1.5 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-extrabold text-[#0D4C3B] flex items-center gap-2 text-sm sm:text-base">
                <span>⚙️</span>
                <span>
                  {isEn
                    ? "Pharmacology (Mechanism of Action)"
                    : "কার্যপদ্ধতি (Pharmacology)"}
                </span>
              </h3>
              <p className="text-[#101B32] leading-relaxed pl-6">
                {isEn ? med.pharmacology_en : med.pharmacology_bn}
              </p>
            </div>

            {/* 4. Dosage & Administration */}
            <div className="space-y-1.5 bg-emerald-50/70 p-4 sm:p-5 rounded-2xl border border-emerald-200">
              <h3 className="font-extrabold text-emerald-900 flex items-center gap-2 text-sm sm:text-base">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>
                  {isEn
                    ? "Dosage & Administration (Adult & Pediatric Rules)"
                    : "সেবনমাত্রা ও নিয়ম (Dosage & Administration)"}
                </span>
              </h3>
              <p className="text-emerald-950 leading-relaxed pl-6 font-medium">
                {isEn ? med.dosage_en : med.dosage_bn}
              </p>
            </div>

            {/* 5. Drug Interactions */}
            <div className="space-y-1.5 bg-amber-50/70 p-4 sm:p-5 rounded-2xl border border-amber-200">
              <h3 className="font-extrabold text-amber-900 flex items-center gap-2 text-sm sm:text-base">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>
                  {isEn
                    ? "Drug Interactions (With Other Medications)"
                    : "অন্য ওষুধের সাথে বিক্রিয়া (Interaction)"}
                </span>
              </h3>
              <p className="text-amber-950 leading-relaxed pl-6">
                {isEn ? med.interaction_en : med.interaction_bn}
              </p>
            </div>

            {/* 6. Contraindications */}
            <div className="space-y-1.5 bg-rose-50/70 p-4 sm:p-5 rounded-2xl border border-rose-200">
              <h3 className="font-extrabold text-rose-900 flex items-center gap-2 text-sm sm:text-base">
                <ShieldAlert className="w-4 h-4 text-rose-700" />
                <span>
                  {isEn
                    ? "Contraindications (When Not to Take)"
                    : "প্রতিনির্দেশনা বা নিষেধাজ্ঞা (Contraindications)"}
                </span>
              </h3>
              <p className="text-rose-950 leading-relaxed pl-6">
                {isEn ? med.contraindications_en : med.contraindications_bn}
              </p>
            </div>

            {/* 7. Side Effects */}
            <div className="space-y-1.5 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-extrabold text-[#101B32] flex items-center gap-2 text-sm sm:text-base">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>
                  {isEn ? "Side Effects" : "পার্শ্বপ্রতিক্রিয়া (Side Effects)"}
                </span>
              </h3>
              <p className="text-[#101B32] leading-relaxed pl-6">
                {isEn ? med.side_effects_en : med.side_effects_bn}
              </p>
            </div>

            {/* 8. Pregnancy & Storage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2] space-y-1">
                <h4 className="font-extrabold text-[#0D4C3B] flex items-center gap-1.5">
                  <Baby className="w-4 h-4" />
                  <span>
                    {isEn ? "Pregnancy & Lactation" : "গর্ভাবস্থা ও স্তন্যদানকালে ব্যবহার"}
                  </span>
                </h4>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {isEn ? med.pregnancy_cat_en : med.pregnancy_cat_bn}
                </p>
              </div>

              <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2] space-y-1">
                <h4 className="font-extrabold text-[#0D4C3B] flex items-center gap-1.5">
                  <ThermometerSnowflake className="w-4 h-4" />
                  <span>
                    {isEn ? "Storage Conditions" : "সংরক্ষণ বিধি (Storage)"}
                  </span>
                </h4>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {isEn ? med.storage_en : med.storage_bn}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: ALTERNATIVE BRANDS & PRICE COMPARISON (দামের তুলনা) */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#101B32] flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#0D4C3B]" />
                <span>
                  {isEn
                    ? `Price Comparison: Other Brands of ${med.generic_en}`
                    : `দামের তুলনা: ${med.generic_bn} (${med.generic_en})-এর বিকল্প ব্র্যান্ডসমূহ`}
                </span>
              </h2>
              <p className="text-xs text-[#7B8AA4]">
                {isEn
                  ? "Same active generic ingredient from top Bangladeshi pharmaceutical companies."
                  : "একই জেনেরিক উপাদানের বিভিন্ন কোম্পানির ওষুধ ও খুচরা মূল্যের তুলনা।"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alternatives.map((alt) => (
              <div
                key={alt.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                  alt.id === med.id
                    ? "border-[#0D4C3B] bg-emerald-50/40"
                    : "border-[#E5EBF2] bg-[#F7F9FC]"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-[#7B8AA4]">
                    <span>
                      {isEn ? alt.dosage_form_en : alt.dosage_form_bn} •{" "}
                      {isEn ? alt.strength_en : alt.strength_bn}
                    </span>
                    {alt.id === med.id && (
                      <span className="text-[#0D4C3B] font-extrabold">
                        {isEn ? "Viewing Now" : "বর্তমানে দেখছেন"}
                      </span>
                    )}
                  </div>
                  <Link href={`/medicines/${alt.slug}`}>
                    <h3 className="text-sm font-black text-[#101B32] hover:text-[#0D4C3B] pt-1">
                      {isEn ? alt.name_en : alt.name_bn}
                    </h3>
                  </Link>
                  <p className="text-[11px] text-[#7B8AA4] truncate">
                    {isEn ? alt.manufacturer_en : alt.manufacturer_bn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-sm font-black text-[#0D4C3B]">
                    BDT {alt.unit_price.toFixed(2)}
                  </span>
                  <div className="flex gap-1.5">
                    {alt.id !== med.id && (
                      <Link
                        href={`/medicines/${alt.slug}`}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E5EBF2] text-[11px] font-bold"
                      >
                        {isEn ? "View" : "দেখুন"}
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handleOrder(alt)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0D4C3B] text-white text-[11px] font-bold"
                    >
                      {isEn ? "+ Order" : "+ অর্ডার"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}