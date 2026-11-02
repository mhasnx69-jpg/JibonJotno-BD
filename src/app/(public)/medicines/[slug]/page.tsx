"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/context/CartContext";
import {
  ArrowLeft,
  Building2,
  Pill,
  ShieldAlert,
  ShoppingBag,
  Activity,
  HeartPulse,
  BookOpen,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  Check,
} from "lucide-react";

interface MedicineDetail {
  id: string;
  name_bn: string;
  name_en: string;
  slug: string;
  generic_name: string;
  strength: string;
  dosage_form: string;
  manufacturer: string;
  unit_price: number;
  pack_unit: string;
  is_prescription_required: boolean;
  // Clinical Information
  therapeutic_class: string;
  indications: string;
  pharmacology: string;
  dosage_administration: string;
  interaction: string;
  contraindications: string;
}

// Fallback comprehensive clinical dictionary
const FALLBACK_DETAILS: Record<string, Partial<MedicineDetail>> = {
  "napa-extend-665mg": {
    name_bn: "নাপা এক্সটেন্ড",
    name_en: "Napa Extend",
    slug: "napa-extend-665mg",
    generic_name: "Paracetamol",
    strength: "665 mg",
    dosage_form: "Tablet",
    manufacturer: "Beximco Pharmaceuticals Ltd.",
    unit_price: 2.5,
    pack_unit: "টি",
    is_prescription_required: false,
    therapeutic_class: "Non-opioid Analgesic & Antipyretic (ব্যথানাশক ও জ্বর নিবারক)",
    indications: "তীব্র জ্বর, মাথাব্যথা, দাঁতের ব্যথা, কোমর ব্যথা, পেশির যন্ত্রণা, সাইনাসের ব্যথা এবং দীর্ঘস্থায়ী জয়েন্টের ব্যথায় ৮ ঘণ্টা পর্যন্ত টানা কার্যকারিতার জন্য নির্দেশিত।",
    pharmacology: "প্যারাসিটামল কেন্দ্রীয় স্নায়ুতন্ত্রে প্রোস্টাগ্ল্যান্ডিন সংশ্লেষণকে বাধা দেয় এবং মস্তিষ্কের হাইপোথ্যালামিক তাপ-নিয়ন্ত্রণকারী কেন্দ্রের ওপর কাজ করে শরীরের তাপমাত্রা কমায়।",
    dosage_administration: "প্রাপ্তবয়স্ক ও ১২ বছরের বেশি বয়সী শিশুদের জন্য: ১ থেকে ২টি ট্যাবলেট প্রতি ৮ ঘণ্টা পর পর (দিনে সর্বোচ্চ ৩ বার)। ওষুধটি চিবিয়ে খাওয়া যাবে না, এক গ্লাস পানি দিয়ে গিলে ফেলতে হবে।",
    interaction: "অ্যালকোহল, ওয়ারফারিন এবং খিঁচুনির ওষুধের (যেমন কার্বামাজেপিন) সাথে সেবনের আগে চিকিৎসকের পরামর্শ আবশ্যক।",
    contraindications: "যাদের প্যারাসিটামলের প্রতি অ্যালার্জি রয়েছে অথবা মারাত্মক লিভার বা কিডনির সমস্যা রয়েছে তাদের ক্ষেত্রে নিষিদ্ধ। দিনে ৪ গ্রামের বেশি সেবন করলে মারাত্মক লিভার ড্যামেজ হতে পারে।",
  },
  "sergel-20mg": {
    name_bn: "সার্জেল ২০",
    name_en: "Sergel 20",
    slug: "sergel-20mg",
    generic_name: "Esomeprazole",
    strength: "20 mg",
    dosage_form: "Capsule",
    manufacturer: "Healthcare Pharmaceuticals Ltd.",
    unit_price: 7.0,
    pack_unit: "টি",
    is_prescription_required: false,
    therapeutic_class: "Proton Pump Inhibitor (PPI / অ্যান্টাসিড ও গ্যাস্ট্রিক রোদক)",
    indications: "গ্যাস্ট্রোইসোফেজিয়াল রিফ্লাক্স ডিজিজ (GERD), বুক জ্বালাপোড়া, এসিড রিফ্লাক্স, পেপটিক আলসার এবং ব্যথানাশক ওষুধের কারণে হওয়া গ্যাস্ট্রিক আলসার প্রতিরোধে ব্যবহৃত হয়।",
    pharmacology: "ইসোমিপ্রাজল পাকস্থলীর প্যারাইটাল কোষের H+/K+ ATPase এনজাইম সিস্টেমের ওপর নির্দিষ্টভাবে বাধা দিয়ে অতিরিক্ত হাইড্রোক্লোরিক এসিড নিঃসরণ দমন করে।",
    dosage_administration: "প্রাপ্তবয়স্কদের জন্য: প্রতিদিন ২০ মিলিগ্রাম ক্যাপসুল দিনে ১ বার, সকালে খাবার খাওয়ার কমপক্ষে ৩০ থেকে ৬০ মিনিট পূর্বে সেবন করতে হবে।",
    interaction: "ডায়াজেপাম, সিটালোপ্রাম, কিটোকোনাজল এবং ক্লপিডোগ্রেলের সাথে সেবনে ওষুধের কার্যকারিতা হ্রাস পেতে পারে।",
    contraindications: "ইসোমিপ্রাজল বা অন্য যেকোনো পিপিআই ওষুধের প্রতি সংবেদনশীলতা থাকলে এটি গ্রহণ করা যাবে না।",
  },
  "monas-10mg": {
    name_bn: "মোনাস ১০",
    name_en: "Monas 10",
    slug: "monas-10mg",
    generic_name: "Montelukast",
    strength: "10 mg",
    dosage_form: "Tablet",
    manufacturer: "Acme Laboratories Ltd.",
    unit_price: 16.0,
    pack_unit: "টি",
    is_prescription_required: true,
    therapeutic_class: "Leukotriene Receptor Antagonist (শ্বাসকষ্ট ও অ্যালার্জি রোদক)",
    indications: "অ্যাজমা বা হাঁপানির দীর্ঘমেয়াদী নিয়ন্ত্রণ, শ্বাসকষ্টের আক্রমণ প্রতিরোধ এবং মৌসুমি অ্যালার্জিক রাইনাইটিস বা অতিরিক্ত হাঁচি-কাশির চিকিৎসায় কার্যকর।",
    pharmacology: "মন্টেলুকাস্ট সিস্টিনাইল লিউকোট্রিন টাইপ-১ রিসেপ্টরকে ব্লক করে শ্বাসনালীর প্রদাহ, ফুলে যাওয়া এবং সংকোচন দূর করে শ্বাসপ্রশ্বাস সহজ করে।",
    dosage_administration: "১৫ বছর বা তদূর্ধ্বদের জন্য: দৈনিক ১০ মিলিগ্রামের ১টি ট্যাবলেট রাতে ঘুমানোর পূর্বে পানির সাথে সেব্য। খাবারের সাথে বা খাবার ছাড়া গ্রহণ করা যায়।",
    interaction: "ফেনোবারবিটাল বা রিফাম্পিসিন মন্টেলুকাস্টের বিপাক বাড়িয়ে দিতে পারে।",
    contraindications: "মন্টেলুকাস্টের যেকোনো উপাদানের প্রতি অ্যালার্জি থাকলে গ্রহণ করবেন না। তীব্র শ্বাসকষ্টের তাৎক্ষণিক উপশমের জন্য এটি নির্দেশিত নয়।",
  },
};

export default function MedicineDetailsPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "napa-extend-665mg";
  const { addToCart, setIsCartOpen } = useCart();
  const [med, setMed] = useState<MedicineDetail | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // 1. Fallback theke match kora
    const fallback = FALLBACK_DETAILS[slug] || {
      name_bn: slug.replace(/-/g, " "),
      name_en: slug.replace(/-/g, " "),
      slug,
      generic_name: "Standard Generic",
      strength: "Standard",
      dosage_form: "Tablet",
      manufacturer: "Leading Pharmaceutical Ltd.",
      unit_price: 10.0,
      pack_unit: "টি",
      is_prescription_required: false,
      therapeutic_class: "General Therapeutic Medication",
      indications: "এই ওষুধটি ডাক্তারের ব্যবস্থাপত্র অনুযায়ী নির্দিষ্ট শারীরিক উপসর্গ ও ক্লিনিক্যাল চিকিৎসার জন্য নির্দেশিত।",
      pharmacology: "শরীরের রাসায়নিক ক্রিয়াকলাপের ওপর বৈজ্ঞানিক প্রভাব ফেলে সুস্থতা নিশ্চিত করে।",
      dosage_administration: "চিকিৎসকের পরামর্শ অনুযায়ী নিয়মিত সময়ে সেবন করুন।",
      interaction: "অন্য কোনো দীর্ঘমেয়াদী ওষুধ গ্রহণ করলে চিকিৎসকের সাথে পরামর্শ করুন।",
      contraindications: "অ্যালার্জি থাকলে সেবন থেকে বিরত থাকুন।",
    };

    setMed(fallback as MedicineDetail);

    // 2. Supabase theke dynamic clinical details fetch kora
    async function loadFromDB() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("medicines")
          .select(`
            id,
            name_bn,
            name_en,
            slug,
            dosage_form,
            strength,
            is_prescription_required,
            generics ( name_en, therapeutic_class, pharmacology, indications, dosage, interactions, contraindications ),
            manufacturers ( name_en ),
            pharmacy_products ( id, selling_price, pack_unit )
          `)
          .eq("slug", slug)
          .single();

        if (data) {
          const gen = (data as any).generics;
          setMed({
            id: data.id,
            name_bn: data.name_bn || data.name_en,
            name_en: data.name_en,
            slug: data.slug,
            generic_name: gen?.name_en || fallback.generic_name || "General",
            strength: data.strength || fallback.strength || "",
            dosage_form: data.dosage_form || "Tablet",
            manufacturer: (data as any).manufacturers?.name_en || fallback.manufacturer || "",
            unit_price: (data as any).pharmacy_products?.[0]?.selling_price || fallback.unit_price || 10,
            pack_unit: (data as any).pharmacy_products?.[0]?.pack_unit || "টি",
            is_prescription_required: data.is_prescription_required || false,
            therapeutic_class: gen?.therapeutic_class || fallback.therapeutic_class || "",
            indications: gen?.indications || fallback.indications || "",
            pharmacology: gen?.pharmacology || fallback.pharmacology || "",
            dosage_administration: gen?.dosage || fallback.dosage_administration || "",
            interaction: gen?.interactions || fallback.interaction || "",
            contraindications: gen?.contraindications || fallback.contraindications || "",
          });
        }
      } catch (err) {
        console.warn("DB detail fetch error:", err);
      }
    }

    loadFromDB();
  }, [slug]);

  if (!med) return null;

  const handleOrder = () => {
    addToCart({
      product_id: med.id,
      medicine_id: med.id,
      name_bn: med.name_bn,
      name_en: med.name_en,
      unit_price: med.unit_price,
      pack_unit: med.pack_unit,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ওষুধ তালিকায় ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-2">
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
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* SECTION ১: প্রাথমিক পরিচিতি (Basic Information Card) */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0D4C3B] bg-emerald-50 px-2.5 py-1 rounded-md">
                ১. প্রাথমিক পরিচিতি (Basic Information)
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#101B32] pt-1">
                {med.name_bn} <span className="text-lg text-[#7B8AA4] font-semibold">({med.name_en})</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#0D4C3B] font-bold flex items-center gap-1.5">
                <span>🧪 মূল রাসায়নিক উপাদান (Generic):</span>
                <span className="underline">{med.generic_name}</span>
              </p>
            </div>

            <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2] text-right space-y-2">
              <span className="text-[11px] text-[#7B8AA4] block">খুচরা বাজারমূল্য:</span>
              <span className="text-2xl font-black text-[#0D4C3B]">
                BDT {med.unit_price.toFixed(2)}
              </span>
              <span className="text-[10px] text-[#7B8AA4] block">প্রতি {med.pack_unit}</span>
              
              <button
                onClick={handleOrder}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{added ? "যুক্ত হয়েছে" : "+ অর্ডার করুন"}</span>
              </button>
            </div>
          </div>

          {/* Quick Spec Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#F7F9FC] p-3.5 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">ওষুধের শক্তি / মাত্রা:</span>
              <span className="font-extrabold text-[#101B32] text-sm pt-0.5 block">{med.strength}</span>
            </div>
            <div className="bg-[#F7F9FC] p-3.5 rounded-2xl border border-[#E5EBF2]">
              <span className="text-[#7B8AA4] block text-[11px]">ওষুধের অবস্থা (Form):</span>
              <span className="font-extrabold text-[#101B32] text-sm pt-0.5 block">{med.dosage_form}</span>
            </div>
            <div className="bg-[#F7F9FC] p-3.5 rounded-2xl border border-[#E5EBF2] sm:col-span-2">
              <span className="text-[#7B8AA4] block text-[11px]">প্রস্তুতকারক কোম্পানি:</span>
              <span className="font-extrabold text-[#101B32] text-sm pt-0.5 block truncate">{med.manufacturer}</span>
            </div>
          </div>
        </div>

        {/* SECTION ২: চিকিৎসা সংক্রান্ত তথ্য (Clinical Information) */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#F1F5F9] pb-3">
            <h2 className="text-base sm:text-lg font-black text-[#101B32] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0D4C3B]" />
              <span>২. চিকিৎসা সংক্রান্ত তথ্য (Clinical Information)</span>
            </h2>
            <p className="text-xs text-[#7B8AA4] pt-0.5">
              রেজিস্টার্ড চিকিৎসকদের প্রেসক্রিপশন ও ফার্মাসিউটিক্যালস নির্দেশিকা অনুযায়ী প্রস্তুতকৃত।
            </p>
          </div>

          <div className="space-y-5 text-xs sm:text-sm">
            
            {/* 1. Indications */}
            <div className="space-y-1.5 bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-bold text-[#0D4C3B] flex items-center gap-2">
                <span>🎯</span>
                <span>ব্যবহার বা নির্দেশনা (Indications)</span>
              </h3>
              <p className="text-[#101B32] leading-relaxed pl-6">{med.indications}</p>
            </div>

            {/* 2. Therapeutic Class */}
            <div className="space-y-1.5 bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-bold text-[#0D4C3B] flex items-center gap-2">
                <span>🔬</span>
                <span>ওষুধের শ্রেণী (Therapeutic Class)</span>
              </h3>
              <p className="text-[#101B32] leading-relaxed pl-6">{med.therapeutic_class}</p>
            </div>

            {/* 3. Pharmacology */}
            <div className="space-y-1.5 bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
              <h3 className="font-bold text-[#0D4C3B] flex items-center gap-2">
                <span>⚙️</span>
                <span>কার্যপদ্ধতি (Pharmacology)</span>
              </h3>
              <p className="text-[#101B32] leading-relaxed pl-6">{med.pharmacology}</p>
            </div>

            {/* 4. Dosage & Administration */}
            <div className="space-y-1.5 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>সেবনমাত্রা ও নিয়ম (Dosage & Administration)</span>
              </h3>
              <p className="text-emerald-950 leading-relaxed pl-6 font-medium">{med.dosage_administration}</p>
            </div>

            {/* 5. Interaction */}
            <div className="space-y-1.5 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <h3 className="font-bold text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>অন্য ওষুধের সাথে বিক্রিয়া (Interaction)</span>
              </h3>
              <p className="text-amber-950 leading-relaxed pl-6">{med.interaction}</p>
            </div>

            {/* 6. Contraindications */}
            <div className="space-y-1.5 bg-rose-50/70 p-4 rounded-2xl border border-rose-200">
              <h3 className="font-bold text-rose-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-700" />
                <span>পার্শ্বপ্রতিক্রিয়া ও সতর্কতা (Contraindications & Side Effects)</span>
              </h3>
              <p className="text-rose-950 leading-relaxed pl-6">{med.contraindications}</p>
            </div>

          </div>
        </div>

        {/* Safety Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>সতর্কতা:</strong> যেকোনো ওষুধ সেবনের পূর্বে অবশ্যই রেজিস্টার্ড চিকিৎসকের পরামর্শ নিন। জীবনযত্ন প্ল্যাটফর্মে প্রদত্ত তথ্য শুধুমাত্র স্বাস্থ্য সচেতনতা ও সাধারণ নির্দেশিকার জন্য।
          </p>
        </div>

      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900">
        <p>© 2026 JibonJotno • সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}