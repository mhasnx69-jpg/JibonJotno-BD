"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MEDICINES_DATA, MedicineRecord } from "@/data/medicinesData";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  ArrowLeft,
  Building2,
  Check,
  Scale,
  ShoppingBag,
  Globe,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";

const CATEGORIES = [
  { key: "all", bn: "সকল ওষুধ (২৫+)", en: "All Medicines (25+)" },
  { key: "pain", bn: "ব্যথানাশক ও জ্বর", en: "Fever & Painkiller" },
  { key: "gastric", bn: "গ্যাস্ট্রিক ও আলসার", en: "Gastric & Ulcer" },
  { key: "antibiotic", bn: "অ্যান্টিবায়োটিক", en: "Antibiotic" },
  { key: "allergy", bn: "অ্যালার্জি ও হাঁপানি", en: "Allergy & Asthma" },
  { key: "diabetes", bn: "ডায়াবেটিস ও প্রেশার", en: "Diabetes & BP" },
  { key: "vitamin", bn: "ভিটামিন ও স্যালাইন", en: "Vitamins & ORS" },
];

export default function MedicinesCatalogPage() {
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === "en";
  const { addToCart, setIsCartOpen, totalItems } = useCart();

  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedGeneric, setSelectedGeneric] = useState<string>("All");
  const [addedId, setAddedId] = useState<string | null>(null);

  // Instant 0ms filtering via useMemo
  const filteredMedicines = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MEDICINES_DATA.filter((m) => {
      const catMatch = activeCat === "all" || m.category_key === activeCat;
      const genMatch =
        !compareMode || selectedGeneric === "All" || m.generic_en === selectedGeneric;
      const searchMatch =
        !q ||
        m.name_en.toLowerCase().includes(q) ||
        m.name_bn.toLowerCase().includes(q) ||
        m.generic_en.toLowerCase().includes(q) ||
        m.generic_bn.toLowerCase().includes(q) ||
        m.manufacturer_en.toLowerCase().includes(q) ||
        m.manufacturer_bn.toLowerCase().includes(q);
      return catMatch && genMatch && searchMatch;
    });
  }, [search, activeCat, compareMode, selectedGeneric]);

  // Group by Generic for "দামের তুলনা" (Price Comparison)
  const genericGroups = useMemo(() => {
    const map: Record<string, MedicineRecord[]> = {};
    filteredMedicines.forEach((m) => {
      if (!map[m.generic_en]) map[m.generic_en] = [];
      map[m.generic_en].push(m);
    });
    // Sort each generic group from lowest price to highest price
    Object.keys(map).forEach((g) => {
      map[g].sort((a, b) => a.unit_price - b.unit_price);
    });
    return map;
  }, [filteredMedicines]);

  const uniqueGenerics = useMemo(() => {
    return ["All", ...Array.from(new Set(MEDICINES_DATA.map((m) => m.generic_en)))];
  }, []);

  const handleOrderClick = (med: MedicineRecord) => {
    addToCart({
      product_id: med.id,
      medicine_id: med.id,
      name_bn: `${med.name_bn} (${med.strength_bn})`,
      name_en: `${med.name_en} (${med.strength_en})`,
      unit_price: med.unit_price,
      pack_unit: isEn ? med.pack_unit_en : med.pack_unit_bn,
      quantity: 1,
    });
    setAddedId(med.id);
    setTimeout(() => setAddedId(null), 1200);
    setIsCartOpen(true);
  };

  const getBadgeStyle = (formEn: string) => {
    const f = formEn.toLowerCase();
    if (f.includes("tablet")) return "from-emerald-700 to-teal-900 text-white";
    if (f.includes("capsule")) return "from-blue-700 to-indigo-900 text-white";
    return "from-amber-600 to-orange-800 text-white";
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      
      {/* Sticky Top Bar with Language & Cart Controls */}
      <header className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D4C3B] hover:text-[#12614A]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? "Back to Home" : "হোমে ফিরে যান"}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Price Comparison Toggle Button */}
            <button
              type="button"
              onClick={() => setCompareMode(!compareMode)}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition-all ${
                compareMode
                  ? "bg-[#FFB91F] text-[#101B32] border-amber-400 shadow-xs"
                  : "bg-emerald-50 text-[#0D4C3B] border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isEn ? "Compare Prices" : "দামের তুলনা"}</span>
            </button>

            {/* Instant A-to-Z Language Switcher */}
            <button
              type="button"
              onClick={toggleLang}
              className="px-3 py-2 rounded-xl border border-[#E5EBF2] bg-[#F7F9FC] hover:bg-slate-100 text-xs font-extrabold text-[#101B32] flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-[#0D4C3B]" />
              <span>{isEn ? "বাংলা দেখুন" : "English View"}</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 rounded-xl bg-[#0D4C3B] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isEn ? "Bag" : "ব্যাগ"}</span>
              {totalItems > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#FFB91F] text-[#101B32] rounded-full text-[10px] font-black">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl 2xl:max-w-[1600px] mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero Search Banner */}
        <div className="bg-[#0D4C3B] rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-200">
                {isEn
                  ? "VERIFIED MEDICINE DIRECTORY & PRICE COMPARISON"
                  : "অনুমোদিত ওষুধ নির্দেশিকা ও বিকল্প ব্র্যান্ডের দামের তুলনা"}
              </span>
              <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-black">
                {compareMode
                  ? isEn
                    ? "Generic Brand Price Comparison"
                    : "একই জেনেরিকের বিভিন্ন কোম্পানির ওষুধের দামের তুলনা"
                  : isEn
                  ? "Complete Medicine Directory & Price List"
                  : "পূর্ণাঙ্গ ঔষধ নির্দেশিকা ও মূল্য তালিকা"}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCompareMode(false)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  !compareMode ? "bg-white text-[#0D4C3B]" : "bg-white/10 text-white"
                }`}
              >
                {isEn ? "All Cards" : "সব ওষুধ"}
              </button>
              <button
                type="button"
                onClick={() => setCompareMode(true)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  compareMode ? "bg-[#FFB91F] text-[#101B32]" : "bg-white/10 text-white"
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isEn ? "Compare Brands by Price" : "দামের তুলনা করুন"}</span>
              </button>
            </div>
          </div>

          {/* Instant Search Bar */}
          <div className="relative max-w-3xl">
            <Search className="w-4 h-4 text-[#7B8AA4] absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isEn
                  ? "Search by brand (Napa, Sergel), generic (Paracetamol), or company..."
                  : "ওষুধের নাম (Napa, Sergel), জেনেরিক বা কোম্পানির নাম লিখে খুঁজুন..."
              }
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-[#101B32] text-xs sm:text-sm placeholder-[#7B8AA4] focus:outline-none shadow-md"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCat(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCat === cat.key
                    ? "bg-[#FFB91F] text-[#101B32] shadow-sm"
                    : "bg-white/10 hover:bg-white/20 text-emerald-100"
                }`}
              >
                {isEn ? cat.en : cat.bn}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE COMPARISON VIEW ("দামের তুলনা") */}
        {compareMode ? (
          <div className="space-y-6">
            {/* Generic Selector Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E5EBF2] flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold text-[#0D4C3B] mr-2 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                {isEn ? "Select Generic to Compare:" : "জেনেরিক নির্বাচন করুন:"}
              </span>
              {uniqueGenerics.map((gen) => (
                <button
                  key={gen}
                  type="button"
                  onClick={() => setSelectedGeneric(gen)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedGeneric === gen
                      ? "bg-[#0D4C3B] text-white border-[#0D4C3B]"
                      : "bg-[#F7F9FC] text-[#101B32] border-[#E5EBF2] hover:border-[#0D4C3B]"
                  }`}
                >
                  {gen === "All" ? (isEn ? "All Generics" : "সকল জেনেরিক") : gen}
                </button>
              ))}
            </div>

            {Object.entries(genericGroups).map(([genericName, items]) => {
              const lowestPrice = items[0]?.unit_price || 0;
              return (
                <div
                  key={genericName}
                  className="bg-white rounded-3xl border border-[#E5EBF2] p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0D4C3B] border border-emerald-200">
                        {isEn ? "Generic Group" : "মূল জেনেরিক উপাদান"}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-[#101B32] pt-1">
                        🧪 {isEn ? items[0].generic_en : `${items[0].generic_bn} (${items[0].generic_en})`}
                      </h2>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl">
                      {isEn
                        ? `${items.length} Alternative Brand(s) • Lowest: BDT ${lowestPrice.toFixed(2)}`
                        : `${items.length}টি বিকল্প ব্র্যান্ড • সর্বনিম্ন মূল্য: ৳ ${lowestPrice.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((med, index) => (
                      <div
                        key={med.id}
                        className={`rounded-2xl border p-4 flex flex-col justify-between space-y-3 ${
                          index === 0
                            ? "border-emerald-400 bg-emerald-50/40"
                            : "border-[#E5EBF2] bg-[#F7F9FC]"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#7B8AA4]">
                              {isEn ? med.dosage_form_en : med.dosage_form_bn} •{" "}
                              {isEn ? med.strength_en : med.strength_bn}
                            </span>
                            {index === 0 && (
                              <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                                {isEn ? "Best Value / Lowest Price" : "সবচেয়ে সাশ্রয়ী"}
                              </span>
                            )}
                          </div>
                          <Link href={`/medicines/${med.slug}`}>
                            <h3 className="text-base font-black text-[#101B32] hover:text-[#0D4C3B]">
                              {isEn ? med.name_en : med.name_bn}
                            </h3>
                          </Link>
                          <p className="text-xs text-[#7B8AA4] truncate">
                            {isEn ? med.manufacturer_en : med.manufacturer_bn}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#7B8AA4] block">
                              {isEn ? "Unit Price:" : "প্রতি পিস মূল্য:"}
                            </span>
                            <span className="text-base font-black text-[#0D4C3B]">
                              BDT {med.unit_price.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Link
                              href={`/medicines/${med.slug}`}
                              className="px-3 py-1.5 rounded-xl bg-white border border-[#E5EBF2] text-xs font-bold text-[#101B32]"
                            >
                              {isEn ? "Details" : "বিস্তারিত"}
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOrderClick(med)}
                              className="px-3 py-1.5 rounded-xl bg-[#0D4C3B] text-white text-xs font-bold"
                            >
                              {addedId === med.id
                                ? isEn
                                  ? "✓ Added"
                                  : "✓ যুক্ত"
                                : isEn
                                ? "+ Order"
                                : "+ অর্ডার"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* STANDARD 2-COLUMN SCREENSHOT-EXACT CARD CATALOG */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMedicines.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-3xl border border-[#E5EBF2] p-4 sm:p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-14 h-16 sm:w-16 sm:h-18 rounded-2xl bg-gradient-to-br ${getBadgeStyle(
                      med.dosage_form_en
                    )} flex flex-col items-center justify-center shrink-0 p-1.5 shadow-xs text-center`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 truncate max-w-full">
                      {isEn ? med.dosage_form_en : med.dosage_form_bn}
                    </span>
                    <span className="text-xs font-black leading-tight pt-0.5 line-clamp-1">
                      {isEn ? med.strength_en : med.strength_bn}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-[#7B8AA4] bg-[#F7F9FC] px-2 py-0.5 rounded-md border border-[#E5EBF2]">
                        {isEn ? med.category_en : med.category_bn}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                          med.is_prescription_required
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {med.is_prescription_required ? "Rx" : "OTC"}
                      </span>
                    </div>

                    <Link href={`/medicines/${med.slug}`}>
                      <h2 className="font-extrabold text-sm sm:text-base text-[#101B32] hover:text-[#0D4C3B] truncate pt-0.5">
                        {isEn ? med.name_en : med.name_bn}{" "}
                        <span className="text-xs text-[#7B8AA4] font-medium">
                          ({isEn ? med.name_bn : med.name_en})
                        </span>
                      </h2>
                    </Link>

                    <p className="text-xs text-[#0D4C3B] font-semibold truncate flex items-center gap-1">
                      <span>🧪</span>
                      <span>{isEn ? med.generic_en : med.generic_bn}</span>
                    </p>

                    <p className="text-[11px] text-[#7B8AA4] truncate flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-[#7B8AA4] shrink-0" />
                      <span>{isEn ? med.manufacturer_en : med.manufacturer_bn}</span>
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-[#7B8AA4] block">
                      {isEn ? `Unit Price (per ${med.pack_unit_en}):` : `খুচরা মূল্য (প্রতি ${med.pack_unit_bn}):`}
                    </span>
                    <span className="text-sm sm:text-base font-black text-[#101B32]">
                      BDT {med.unit_price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGeneric(med.generic_en);
                        setCompareMode(true);
                      }}
                      title={isEn ? "Compare Alternative Brands" : "বিকল্প ব্র্যান্ডের দামের তুলনা"}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold"
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      href={`/medicines/${med.slug}`}
                      className="px-3 py-2 rounded-xl bg-[#F7F9FC] hover:bg-[#E5EBF2] text-[#101B32] text-xs font-bold border border-[#E5EBF2] transition-colors"
                    >
                      {isEn ? "Details" : "বিস্তারিত"}
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleOrderClick(med)}
                      className="px-3.5 py-2 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                    >
                      {addedId === med.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{isEn ? "Added" : "যুক্ত হয়েছে"}</span>
                        </>
                      ) : (
                        <span>{isEn ? "+ Order" : "+ অর্ডার"}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}