"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  ArrowLeft,
  Building2,
  Pill,
  Sparkles,
  ShoppingBag,
  Info,
  Check,
  ChevronRight,
  Filter,
} from "lucide-react";

interface MedicineItem {
  id: string;
  name_bn: string;
  name_en: string;
  slug: string;
  generic_name: string;
  strength: string;
  dosage_form: string;
  manufacturer: string;
  is_prescription_required: boolean;
  unit_price: number;
  product_id?: string;
  pack_unit?: string;
}

// Fallback dummy data jodi database empty thake
const INITIAL_MEDICINES: MedicineItem[] = [
  {
    id: "m-1",
    name_bn: "নাপা এক্সটেন্ড",
    name_en: "Napa Extend",
    slug: "napa-extend-665mg",
    generic_name: "Paracetamol",
    strength: "665 mg",
    dosage_form: "Tablet",
    manufacturer: "Beximco Pharmaceuticals Ltd.",
    is_prescription_required: false,
    unit_price: 2.5,
    pack_unit: "টি",
  },
  {
    id: "m-2",
    name_bn: "সার্জেল ২০",
    name_en: "Sergel 20",
    slug: "sergel-20mg",
    generic_name: "Esomeprazole",
    strength: "20 mg",
    dosage_form: "Capsule",
    manufacturer: "Healthcare Pharmaceuticals Ltd.",
    is_prescription_required: false,
    unit_price: 7.0,
    pack_unit: "টি",
  },
  {
    id: "m-3",
    name_bn: "মোনাস ১০",
    name_en: "Monas 10",
    slug: "monas-10mg",
    generic_name: "Montelukast",
    strength: "10 mg",
    dosage_form: "Tablet",
    manufacturer: "Acme Laboratories Ltd.",
    is_prescription_required: true,
    unit_price: 16.0,
    pack_unit: "টি",
  },
  {
    id: "m-4",
    name_bn: "সেক্লো ২০",
    name_en: "Seclo 20",
    slug: "seclo-20mg",
    generic_name: "Omeprazole",
    strength: "20 mg",
    dosage_form: "Capsule",
    manufacturer: "Square Pharmaceuticals Ltd.",
    is_prescription_required: false,
    unit_price: 6.0,
    pack_unit: "টি",
  },
  {
    id: "m-5",
    name_bn: "অ্যাজিথ্রোক্স ৫০০",
    name_en: "Azithrox 500",
    slug: "azithrox-500mg",
    generic_name: "Azithromycin",
    strength: "500 mg",
    dosage_form: "Tablet",
    manufacturer: "Incepta Pharmaceuticals Ltd.",
    is_prescription_required: true,
    unit_price: 35.0,
    pack_unit: "টি",
  },
  {
    id: "m-6",
    name_bn: "ফেক্সো ১২০",
    name_en: "Fexo 120",
    slug: "fexo-120mg",
    generic_name: "Fexofenadine Hydrochloride",
    strength: "120 mg",
    dosage_form: "Tablet",
    manufacturer: "Square Pharmaceuticals Ltd.",
    is_prescription_required: false,
    unit_price: 9.0,
    pack_unit: "টি",
  },
  {
    id: "m-7",
    name_bn: "টাসকা ডিএক্স",
    name_en: "Tusca DX",
    slug: "tusca-dx-syrup",
    generic_name: "Dextromethorphan + Phenylephrine",
    strength: "100 ml",
    dosage_form: "Syrup",
    manufacturer: "Square Pharmaceuticals Ltd.",
    is_prescription_required: false,
    unit_price: 95.0,
    pack_unit: "বোতল",
  },
  {
    id: "m-8",
    name_bn: "প্যানটনিক ২০",
    name_en: "Pantonic 20",
    slug: "pantonic-20mg",
    generic_name: "Pantoprazole",
    strength: "20 mg",
    dosage_form: "Tablet",
    manufacturer: "Incepta Pharmaceuticals Ltd.",
    is_prescription_required: false,
    unit_price: 7.0,
    pack_unit: "টি",
  },
];

const CATEGORY_TAGS = [
  "প্রয়োজনীয়",
  "গ্যাস্ট্রিক",
  "ডায়াবেটিস",
  "অ্যান্টিবায়োটিক",
  "অ্যালার্জি",
  "ভিটামিন",
  "ব্যথানাশক",
];

export default function MedicinesCatalogPage() {
  const { t, lang } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  const [medicines, setMedicines] = useState<MedicineItem[]>(INITIAL_MEDICINES);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("প্রয়োজনীয়");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMedicines() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("medicines")
          .select(`
            id,
            name_bn,
            name_en,
            slug,
            dosage_form,
            strength,
            is_prescription_required,
            generics ( name_en ),
            manufacturers ( name_en ),
            pharmacy_products ( id, selling_price, pack_unit )
          `)
          .limit(30);

        if (data && data.length > 0 && !error) {
          const mapped: MedicineItem[] = data.map((item: any) => ({
            id: item.id,
            name_bn: item.name_bn || item.name_en,
            name_en: item.name_en,
            slug: item.slug,
            generic_name: item.generics?.name_en || "General Generic",
            strength: item.strength || "",
            dosage_form: item.dosage_form || "Tablet",
            manufacturer: item.manufacturers?.name_en || "Registered Pharma",
            is_prescription_required: item.is_prescription_required || false,
            unit_price: item.pharmacy_products?.[0]?.selling_price || 10.0,
            product_id: item.pharmacy_products?.[0]?.id,
            pack_unit: item.pharmacy_products?.[0]?.pack_unit || "টি",
          }));
          setMedicines(mapped);
        }
      } catch (err) {
        console.warn("Supabase fetch warning, using seeded data:", err);
      }
    }
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name_en.toLowerCase().includes(q) ||
      m.name_bn.toLowerCase().includes(q) ||
      m.generic_name.toLowerCase().includes(q) ||
      m.manufacturer.toLowerCase().includes(q)
    );
  });

  const handleAddToCart = (med: MedicineItem) => {
    addToCart({
      product_id: med.product_id || med.id,
      medicine_id: med.id,
      name_bn: med.name_bn,
      name_en: med.name_en,
      unit_price: med.unit_price,
      pack_unit: med.pack_unit || "টি",
      quantity: 1,
    });
    setAddedItem(med.id);
    setTimeout(() => setAddedItem(null), 1500);
    setIsCartOpen(true);
  };

  // Badge background color generator
  const getBadgeStyle = (form: string) => {
    const f = form.toLowerCase();
    if (f.includes("tablet")) return "from-emerald-700 to-teal-800 text-white";
    if (f.includes("capsule")) return "from-blue-700 to-indigo-800 text-white";
    if (f.includes("syrup") || f.includes("suspension")) return "from-amber-600 to-orange-700 text-white";
    return "from-slate-700 to-slate-900 text-white";
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0D4C3B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              মোট ৩৫,৯৪১+ ওষুধ তালিকাভুক্ত
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Banner Section (Exact like screenshot) */}
        <div className="bg-[#0D4C3B] rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-200">
                VERIFIED MEDICINE DIRECTORY
              </span>
              <h1 className="text-2xl sm:text-3xl font-black">
                পূর্ণাঙ্গ ঔষধ নির্দেশিকা ও মূল্য তালিকা
              </h1>
            </div>
            <div className="text-right">
              <span className="text-[11px] bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 block sm:inline-block font-mono">
                Total Listed: 35,941
              </span>
            </div>
          </div>

          {/* Search bar inside banner */}
          <div className="relative max-w-3xl">
            <Search className="w-4 h-4 text-[#7B8AA4] absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ওষুধ, জেনেরিক বা কোম্পানির নাম লিখুন..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-[#101B32] text-xs sm:text-sm placeholder-[#7B8AA4] focus:outline-none shadow-md"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
            {CATEGORY_TAGS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#FFB91F] text-[#101B32] shadow-sm scale-105"
                    : "bg-white/10 hover:bg-white/20 text-emerald-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Medicine Cards Grid (Screenshot 2-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMedicines.map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-3xl border border-[#E5EBF2] p-4 sm:p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* Top part: Badge + Medicine details */}
              <div className="flex items-start gap-3.5">
                
                {/* Left Colored Badge */}
                <div
                  className={`w-14 h-16 sm:w-16 sm:h-18 rounded-2xl bg-gradient-to-br ${getBadgeStyle(
                    med.dosage_form
                  )} flex flex-col items-center justify-center shrink-0 p-1 shadow-xs text-center`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 truncate max-w-full">
                    {med.dosage_form}
                  </span>
                  <span className="text-xs sm:text-sm font-black leading-tight pt-0.5 line-clamp-1">
                    {med.strength}
                  </span>
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-[#7B8AA4] bg-[#F7F9FC] px-2 py-0.5 rounded-md border border-[#E5EBF2]">
                      {med.dosage_form}
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
                      {med.name_bn}{" "}
                      <span className="text-xs text-[#7B8AA4] font-medium">
                        ({med.name_en})
                      </span>
                    </h2>
                  </Link>

                  <p className="text-xs text-[#0D4C3B] font-semibold truncate flex items-center gap-1">
                    <span>🧪</span>
                    <span>{med.generic_name}</span>
                  </p>

                  <p className="text-[11px] text-[#7B8AA4] truncate flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#7B8AA4] shrink-0" />
                    <span>{med.manufacturer}</span>
                  </p>
                </div>
              </div>

              {/* Bottom part: Price & Action Buttons */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[#7B8AA4] block">খুচরা মূল্য:</span>
                  <span className="text-sm sm:text-base font-black text-[#101B32]">
                    BDT {med.unit_price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/medicines/${med.slug}`}
                    className="px-3 sm:px-4 py-2 rounded-xl bg-[#F7F9FC] hover:bg-[#E5EBF2] text-[#101B32] text-xs font-bold border border-[#E5EBF2] transition-colors"
                  >
                    বিস্তারিত
                  </Link>
                  <button
                    onClick={() => handleAddToCart(med)}
                    className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                  >
                    {addedItem === med.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>যুক্ত হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <span>+ অর্ডার</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900">
        <p>© 2026 JibonJotno • সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}