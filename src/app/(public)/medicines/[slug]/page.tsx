"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
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
  Activity,
  Layers,
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
        // 1. Database theke current medicine fetch kora
        const { data, error } = await supabase
          .from("medicines")
          .select("*")
          .eq("slug", slug)
          .single();

        if (data && !error) {
          setMed(data);

          // 2. Eki Generic-er onnano alternative brands fetch kora (Damer Tulona)
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
        ওষুধের বিস্তারিত ক্লিনিক্যাল তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (!med) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-4 text-center space-y-3">
        <h2 className="text-lg font-bold text-[#101B32]">ওষুধের তথ্য পাওয়া যায়নি</h2>
        <Link href="/medicines" className="px-4 py-2 rounded-xl bg-[#0D4C3B] text-white text-xs font-bold">
          ওষুধ তালিকায় ফিরে যান
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
      pack_unit: item.pack_unit || "পিস",
      quantity: 1,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D4C3B] hover:text-[#12614A]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? "Back to Medicines" : "ওষুধ তালিকায় ফিরে যান"}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-xl border border-[#0D4C3B]/30 bg-emerald-50 text-xs font-bold text-[#0D4C3B]"
            >
              <Globe className="w-3.5 h-3.5 inline mr-1" />
              <span>{isEn ? "বাংলা দেখুন" : "English View"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#0D4C3B] text-white text-xs font-bold flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isEn ? "Bag" : "ব্যাগ"} ({totalItems})</span>
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
                  {isEn ? "1. Basic Information" : "১. প্রাথমিক পরিচিতি (Basic Information)"}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    med.is_prescription_required
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {med.is_prescription_required ? "প্রেসক্রিপশন আবশ্যক (Rx)" : "ওভার দ্য কাউন্টার (OTC)"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#101B32] pt-1">
                {med.name_bn || med.name_en}{" "}
                <span className="text-lg text-[#7B8AA4] font-semibold">({med.name_en})</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#0D4C3B] font-bold flex items-center gap-1.5">
                <span>🧪 মূল রাসায়নিক উপাদান (Generic Name):</span>
                <span className="underline">{med.generic_name}</span>
              </p>
            </div>

            <div className="bg-[#F7F9FC] p-5 rounded-2xl border border-[#E5EBF2] min-w-[240px] space-y-2">
              <div className="flex justify-between items-center text-xs text-[#7B8AA4]">
                <span>প্রতি পিস মূল্য:</span>
                <span className="text-xl font-black text-[#0D4C3B]">৳ {Number(med.unit_price).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#7B8AA4]">
                <span>প্রতি পাতার আনুমানিক মূল্য:</span>
                <span className="font-extrabold text-[#101B32]">৳ {Number(med.strip_price).toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={() => handleOrder(med)}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {addedId === med.id ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{addedId === med.id ? "ব্যাগে যুক্ত হয়েছে!" : "+ অর্ডার করুন (ক্যাশ অন ডেলিভারি)"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">বাণিজ্যিক নাম (Brand):</span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">{med.name_en}</span>
            </div>
            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">ওষুধের মাত্রা (Strength):</span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">{med.strength}</span>
            </div>
            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">ওষুধের অবস্থা (Dosage Form):</span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block">{med.dosage_form}</span>
            </div>
            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">প্রস্তুতকারক কোম্পানি:</span>
              <span className="font-extrabold text-[#101B32] text-sm pt-1 block truncate">{med.manufacturer}</span>
            </div>
          </div>
        </div>

        {/* ২. চিকিৎসা সংক্রান্ত বিস্তারিত তথ্য (Clinical Information) */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#F1F5F9] pb-4">
            <h2 className="text-lg sm:text-xl font-black text-[#101B32] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0D4C3B]" />
              <span>২. চিকিৎসা সংক্রান্ত বিস্তারিত তথ্য (Clinical Information)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs sm:text-sm">
            {/* 1. Indications */}
            <div className="space-y-1.5 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-extrabold text-[#0D4C3B] flex items-center gap-2 text-sm sm:text-base">
                <span>🎯</span>
                <span>ব্যবহার বা নির্দেশনা (Indications)</span>
              </h3>
              <p className="text-[#101B32] leading-relaxed pl-6">{med.indications}</p>
            </div>

            {/* 2. Active Ingredient */}
            {med.active_ingredient && (
              <div className="space-y-1.5 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
                <h3 className="font-extrabold text-[#0D4C3B] flex items-center gap-2 text-sm sm:text-base">
                  <Layers className="w-4 h-4 text-[#0D4C3B]" />
                  <span>সক্রিয় উপাদান ও ফর্মুলা (Active Ingredient)</span>
                </h3>
                <p className="text-[#101B32] leading-relaxed pl-6">{med.active_ingredient}</p>
              </div>
            )}

            {/* 3. Side Effects */}
            <div className="space-y-1.5 bg-rose-50/70 p-4 sm:p-5 rounded-2xl border border-rose-200">
              <h3 className="font-extrabold text-rose-900 flex items-center gap-2 text-sm sm:text-base">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>পার্শ্বপ্রতিক্রিয়া ও সতর্কতা (Side Effects)</span>
              </h3>
              <p className="text-rose-950 leading-relaxed pl-6">{med.side_effects}</p>
            </div>

            {/* 4. Storage Condition */}
            <div className="space-y-1.5 bg-[#F7F9FC] p-4 sm:p-5 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-extrabold text-[#0D4C3B] flex items-center gap-2 text-sm sm:text-base">
                <ThermometerSnowflake className="w-4 h-4" />
                <span>সংরক্ষণ পদ্ধতি (Storage Condition)</span>
              </h3>
              <p className="text-[#334155] leading-relaxed pl-6">{med.storage_condition}</p>
            </div>
          </div>
        </div>

        {/* ৩. দামের তুলনা: বিকল্প ব্র্যান্ডসমূহ (Price Comparison) */}
        {alternatives.length > 0 && (
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-base sm:text-lg font-black text-[#101B32] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#0D4C3B]" />
              <span>দামের তুলনা: {med.generic_name}-এর বিকল্প ব্র্যান্ডসমূহ</span>
            </h2>

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
                    <span className="text-[10px] font-bold text-[#7B8AA4]">
                      {alt.dosage_form} • {alt.strength}
                    </span>
                    <Link href={`/medicines/${alt.slug}`}>
                      <h3 className="text-sm font-black text-[#101B32] hover:text-[#0D4C3B] pt-1">
                        {alt.name_bn || alt.name_en}
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
                          দেখুন
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => handleOrder(alt)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#0D4C3B] text-white text-[11px] font-bold"
                      >
                        + অর্ডার
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}