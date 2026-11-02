"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  getDosageFormBn,
  getGenericBn,
  getPackUnitBn,
  translateIndicationsToBn,
  translateSideEffectsToBn,
  translateStorageToBn,
  translateActiveIngredientToBn,
} from "@/lib/bilingualHelper";
import {
  ArrowLeft,
  ShoppingBag,
  BookOpen,
  Check,
  Globe,
  Scale,
  HeartPulse,
  ThermometerSnowflake,
  Layers,
  ShieldAlert,
  AlertTriangle,
  FileCheck,
} from "lucide-react";

export default function MedicineDetailsPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "napa-extend-665mg";
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === "en";
  const { addToCart, setIsCartOpen, totalItems } = useCart();
  
  const [med, setMed] = useState<any>(null);
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadMedicineData() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("medicines")
          .select("*")
          .eq("slug", slug)
          .single();

        if (data && !error) {
          setMed(data);

          if (data.generic_name) {
            const { data: altData } = await supabase
              .from("medicines")
              .select("id, slug, name_en, name_bn, dosage_form, strength, unit_price, strip_price, manufacturer")
              .eq("generic_name", data.generic_name)
              .order("unit_price", { ascending: true })
              .limit(6);

            if (altData) {
              setAlternatives(altData);
            }
          }
        }
      } catch (err) {
        console.warn("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMedicineData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center text-xs text-[#7B8AA4]">
        {isEn ? "Loading complete medicine details..." : "ওষুধের সম্পূর্ণ বিস্তারিত তথ্য লোড হচ্ছে..."}
      </div>
    );
  }

  if (!med) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-4 text-center space-y-3">
        <h2 className="text-lg font-bold text-[#101B32]">
          {isEn ? "Medicine details not found" : "ওষুধের তথ্য পাওয়া যায়নি"}
        </h2>
        <Link href="/medicines" className="px-4 py-2 rounded-xl bg-[#0D4C3B] text-white text-xs font-bold">
          {isEn ? "Back to Medicines" : "ওষুধ তালিকায় ফিরে যান"}
        </Link>
      </div>
    );
  }

  const handleOrder = (item: any) => {
    addToCart({
      product_id: item.id,
      medicine_id: item.id,
      name_bn: `${item.name_bn || item.name_en} (${item.strength || ""})`,
      name_en: `${item.name_en} (${item.strength || ""})`,
      unit_price: Number(item.unit_price || 0),
      pack_unit: isEn ? (item.pack_unit || "Piece") : getPackUnitBn(item.pack_unit),
      quantity: 1,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
    setIsCartOpen(true);
  };

  const dosageBn = getDosageFormBn(med.dosage_form);
  const genericBn = getGenericBn(med.generic_name);
  const unitPrice = Number(med.unit_price || 0).toFixed(2);
  const stripPrice = Number(med.strip_price || 0).toFixed(2);

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      
      {/* Sticky Header with Language Toggle */}
      <header className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D4C3B] hover:text-[#12614A]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? "Back to Medicine List" : "ওষুধ তালিকায় ফিরে যান"}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleLang}
              className="px-3.5 py-2 rounded-xl border border-[#0D4C3B]/40 bg-emerald-50 hover:bg-emerald-100 text-xs font-black text-[#0D4C3B] flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Globe className="w-4 h-4 text-[#0D4C3B]" />
              <span>{isEn ? "বাংলায় দেখুন" : "View in English"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#0D4C3B] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isEn ? "Medicine Bag" : "ব্যাগ"} ({totalItems})</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ১. প্রাথমিক পরিচিতি (Basic Information) */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#F1F5F9] pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0D4C3B] bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  {isEn ? "1. Basic Information" : "১. প্রাথমিক পরিচিতি"}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    med.is_prescription_required
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {isEn
                    ? (med.is_prescription_required ? "Prescription Required (Rx)" : "Over The Counter (OTC)")
                    : (med.is_prescription_required ? "প্রেসক্রিপশন আবশ্যক (Rx)" : "ওভার দ্য কাউন্টার (OTC)")}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#101B32] pt-1">
                {isEn ? med.name_en : (med.name_bn || med.name_en)}
              </h1>

              <div className="text-xs sm:text-sm font-bold">
                <p className="text-[#0D4C3B] flex items-center gap-1.5">
                  <span>🧪 {isEn ? "Generic Name:" : "মূল রাসায়নিক উপাদান:"}</span>
                  <span className="underline">{isEn ? med.generic_name : genericBn}</span>
                </p>
              </div>
            </div>

            {/* Price & Order Box */}
            <div className="bg-[#F7F9FC] p-5 rounded-2xl border border-[#E5EBF2] min-w-[240px] space-y-2">
              <div className="flex justify-between items-center text-xs text-[#7B8AA4]">
                <span>{isEn ? `Unit Price (per ${med.pack_unit || "Piece"}):` : `প্রতি ${getPackUnitBn(med.pack_unit)} মূল্য:`}</span>
                <span className="text-xl font-black text-[#0D4C3B]">৳ {unitPrice}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#7B8AA4]">
                <span>{isEn ? "Strip Price (Est.):" : "প্রতি পাতার আনুমানিক মূল্য:"}</span>
                <span className="font-extrabold text-[#101B32]">৳ {stripPrice}</span>
              </div>

              <button
                type="button"
                onClick={() => handleOrder(med)}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {addedId === med.id ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>
                  {addedId === med.id
                    ? (isEn ? "Added to Bag!" : "ব্যাগে যুক্ত হয়েছে!")
                    : (isEn ? "+ Order (Cash on Delivery)" : "+ অর্ডার করুন (ক্যাশ অন ডেলিভারি)")}
                </span>
              </button>
            </div>
          </div>

          {/* 4-Item Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">
                {isEn ? "Brand Name:" : "বাণিজ্যিক নাম:"}
              </span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">
                {isEn ? med.name_en : (med.name_bn || med.name_en)}
              </span>
            </div>

            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">
                {isEn ? "Strength / Power:" : "ওষুধের মাত্রা:"}
              </span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">
                {med.strength}
              </span>
            </div>

            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">
                {isEn ? "Dosage Form:" : "ওষুধের ধরন:"}
              </span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">
                {isEn ? med.dosage_form : dosageBn}
              </span>
            </div>

            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">
                {isEn ? "Manufacturer:" : "প্রস্তুতকারক কোম্পানি:"}
              </span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block truncate">
                {med.manufacturer}
              </span>
            </div>
          </div>
        </div>

        {/* ২. চিকিৎসা সংক্রান্ত বিস্তারিত তথ্য (Clinical Information) */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#F1F5F9] pb-4">
            <h2 className="text-lg sm:text-xl font-black text-[#101B32] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0D4C3B]" />
              <span>
                {isEn
                  ? "2. Clinical & Medical Information"
                  : "২. চিকিৎসা সংক্রান্ত বিস্তারিত তথ্য"}
              </span>
            </h2>
            <p className="text-xs text-[#7B8AA4] pt-0.5">
              {isEn
                ? "Standard pharmacopeia and medical prescribing guidelines."
                : "অফিশিয়াল ফার্মাকোপিয়া ও চিকিৎসা নির্দেশিকা অনুযায়ী প্রস্তুত।"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs sm:text-sm">
            {/* Indications */}
            <div className="space-y-2 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-extrabold text-[#0D4C3B] flex items-center gap-2 text-sm sm:text-base">
                <span>🎯</span>
                <span>{isEn ? "Indications & Prescribed Uses" : "ব্যবহার ও রোগ নিরাময় নির্দেশিকা"}</span>
              </h3>
              <p className="text-[#101B32] leading-relaxed text-xs sm:text-sm pl-6">
                {isEn ? med.indications : translateIndicationsToBn(med.indications, med.generic_name)}
              </p>
            </div>

            {/* Active Ingredient */}
            {med.active_ingredient && (
              <div className="space-y-1.5 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
                <h3 className="font-extrabold text-[#0D4C3B] flex items-center gap-2 text-sm sm:text-base">
                  <Layers className="w-4 h-4 text-[#0D4C3B]" />
                  <span>{isEn ? "Active Ingredient Composition" : "সক্রিয় উপাদান ও ফর্মুলা"}</span>
                </h3>
                <p className="text-[#101B32] leading-relaxed pl-6 text-xs sm:text-sm">
                  {isEn ? med.active_ingredient : translateActiveIngredientToBn(med.active_ingredient)}
                </p>
              </div>
            )}

            {/* Side Effects */}
            <div className="space-y-2 bg-rose-50/70 p-4 sm:p-5 rounded-2xl border border-rose-200">
              <h3 className="font-extrabold text-rose-900 flex items-center gap-2 text-sm sm:text-base">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>{isEn ? "Side Effects & Adverse Reactions" : "পার্শ্বপ্রতিক্রিয়া ও সতর্কতা"}</span>
              </h3>
              <p className="text-rose-950 leading-relaxed text-xs sm:text-sm pl-6 font-medium">
                {isEn ? med.side_effects : translateSideEffectsToBn(med.side_effects)}
              </p>
            </div>

            {/* Storage Condition */}
            <div className="space-y-2 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-extrabold text-[#0D4C3B] flex items-center gap-2 text-sm sm:text-base">
                <ThermometerSnowflake className="w-4 h-4" />
                <span>{isEn ? "Storage Conditions" : "সংরক্ষণ পদ্ধতি"}</span>
              </h3>
              <p className="text-[#101B32] leading-relaxed pl-6 font-medium text-xs sm:text-sm">
                {isEn ? med.storage_condition : translateStorageToBn(med.storage_condition)}
              </p>
            </div>
          </div>
        </div>

        {/* ৩. বিকল্প ব্র্যান্ড ও দামের তুলনা (Price Comparison) */}
        {alternatives.length > 0 && (
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#101B32] flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#0D4C3B]" />
                  <span>
                    {isEn
                      ? `Price Comparison: Alternative Brands of ${med.generic_name}`
                      : `দামের তুলনা: ${genericBn}-এর বিকল্প ব্র্যান্ডসমূহ`}
                  </span>
                </h2>
                <p className="text-xs text-[#7B8AA4]">
                  {isEn
                    ? "Market prices of other pharmaceutical brands with the same generic active molecule."
                    : "একই মূল জেনেরিক উপাদানের বিভিন্ন কোম্পানির ওষুধের বাজারমূল্যের তালিকা।"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {alternatives.map((alt) => (
                <div
                  key={alt.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                    alt.slug === med.slug
                      ? "border-[#0D4C3B] bg-emerald-50/40"
                      : "border-[#E5EBF2] bg-[#F7F9FC]"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-[#7B8AA4]">
                      <span>
                        {isEn ? alt.dosage_form : getDosageFormBn(alt.dosage_form)} • {alt.strength}
                      </span>
                      {alt.slug === med.slug && (
                        <span className="text-[#0D4C3B] font-extrabold">
                          {isEn ? "Viewing Now" : "বর্তমানে দেখছেন"}
                        </span>
                      )}
                    </div>
                    <Link href={`/medicines/${alt.slug}`}>
                      <h3 className="text-sm font-black text-[#101B32] hover:text-[#0D4C3B] pt-1">
                        {isEn ? alt.name_en : (alt.name_bn || alt.name_en)}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-[#7B8AA4] truncate">{alt.manufacturer}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-sm font-black text-[#0D4C3B]">
                      BDT {Number(alt.unit_price).toFixed(2)}
                    </span>
                    <div className="flex gap-1.5">
                      {alt.slug !== med.slug && (
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
        )}

        {/* ৪. বাংলাদেশ আইন ও বিএমডিসি বিধি মোতাবেক আইনি সতর্কবার্তা ও দায়মুক্তি (Legal Disclaimer) */}
        <div className="bg-amber-50/70 rounded-3xl border border-amber-200 p-6 sm:p-7 space-y-3.5 shadow-2xs text-xs">
          <div className="flex items-center gap-2 text-amber-950 font-black text-sm border-b border-amber-200/80 pb-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
            <span>
              {isEn
                ? "Statutory Legal Disclaimer & Medical Liability Notice (Bangladesh Health Regulations)"
                : "আইনি সতর্কবার্তা ও চিকিৎসা দায়মুক্তি বিজ্ঞপ্তি (বাংলাদেশ স্বাস্থ্য ও ওষুধ আইন অনুযায়ী)"}
            </span>
          </div>

          <div className="text-amber-900 leading-relaxed space-y-2 text-[11px] sm:text-xs">
            {isEn ? (
              <>
                <p>
                  <strong>Notice under The Drugs Act, 1940 / Drugs Act, 2023 & BMDC Act:</strong> The pharmaceutical, dosage, indication, and clinical data displayed on JibonJotno are compiled solely for informational, public awareness, and educational purposes. This platform does not provide direct medical advice, clinical diagnosis, or personalized treatment plans.
                </p>
                <p>
                  Any medication designated as <strong>Prescription Required (Rx)</strong> must only be consumed under the explicit written prescription and supervision of a registered medical practitioner (BMDC registered physician). Self-medication or altering prescribed dosages without consulting a certified doctor is strictly prohibited and medically hazardous.
                </p>
                <p className="text-[10px] text-amber-800 italic pt-1">
                  JibonJotno BD operates as an e-health information and pharmacy facilitation network. In case of any medical emergencies, adverse drug reactions, or acute symptoms, users are advised to immediately visit the nearest registered hospital or call the national emergency health helpline 16263 / 999.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>বাংলাদেশ ওষুধ আইন (The Drugs Act / ড্রাগস আইন ২০২৩) এবং বিএমডিসি বিধিমালা অনুযায়ী সতর্কীকরণ:</strong> জীবনযত্ন প্ল্যাটফর্মে প্রদর্শিত সকল ওষুধের বিবরণ, ব্যবহারবিধি, পার্শ্বপ্রতিক্রিয়া এবং অন্যান্য চিকিৎসা সংক্রান্ত তথ্য শুধুমাত্র জনসচেতনতা, তথ্যসংগ্রহ ও শিক্ষামূলক উদ্দেশ্যে সংকলিত হয়েছে। এটি কোনোভাবেই একজন রেজিস্টার্ড চিকিৎসকের প্রেসক্রিপশন বা পেশাদার চিকিৎসার বিকল্প নয়।
                </p>
                <p>
                  যেকোনো <strong>প্রেসক্রিপশন আবশ্যক (Rx)</strong> ওষুধ সেবনের পূর্বে অবশ্যই বাংলাদেশ মেডিকেল অ্যান্ড ডেন্টাল কাউন্সিল (BMDC) স্বীকৃত রেজিস্টার্ড চিকিৎসকের লিখিত পরামর্শ গ্রহণ করুন। চিকিৎসকের প্রেসক্রিপশন ব্যতীত নিজে নিজে ওষুধ সেবন (Self-medication) আইনত ও স্বাস্থ্যগতভাবে অত্যন্ত ঝুঁকিপূর্ণ।
                </p>
                <p className="text-[10px] text-amber-800 italic pt-1">
                  জীবনযত্ন কোনো সরাসরি চিকিৎসা প্রদানকারী প্রতিষ্ঠান নয়, বরং একটি ডিজিটাল স্বাস্থ্য তথ্য ও সেবা সংযোগকারী মাধ্যম। ওষুধের বিরূপ প্রতিক্রিয়া বা যেকোনো জরুরি স্বাস্থ্য পরিস্থিতিতে বিলম্ব না করে নিকটস্থ হাসপাতালে যোগাযোগ করুন অথবা সরকারি স্বাস্থ্য বাতায়ন ১৬২৬৩ / জাতীয় জরুরি সেবা ৯৯৯-এ কল করুন।
                </p>
              </>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}