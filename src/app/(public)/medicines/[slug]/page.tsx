import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowLeft,
  Pill,
  ShieldAlert,
  ShoppingCart,
  Video,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

interface MedicineDetail {
  id: string;
  name_bn: string;
  name_en: string;
  slug: string;
  dosage_form: string;
  strength: string;
  indications_bn: string | null;
  dosage_info_bn: string | null;
  side_effects_bn: string | null;
  contraindications_bn: string | null;
  is_prescription_required: boolean;
  youtube_video_id: string | null;
  generics?: { name: string; description_bn: string | null } | null;
  manufacturers?: { name: string; origin: string | null } | null;
  medicine_categories?: { name_bn: string; slug: string } | null;
  pharmacy_products?: {
    selling_price: number;
    unit_mrp: number;
    stock_quantity: number;
    pack_unit: string;
    sku: string;
  }[];
}

export default async function MedicineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let medicine: MedicineDetail | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("medicines")
      .select(
        `
        id,
        name_bn,
        name_en,
        slug,
        dosage_form,
        strength,
        indications_bn,
        dosage_info_bn,
        side_effects_bn,
        contraindications_bn,
        is_prescription_required,
        youtube_video_id,
        generics ( name, description_bn ),
        manufacturers ( name, origin ),
        medicine_categories ( name_bn, slug ),
        pharmacy_products ( selling_price, unit_mrp, stock_quantity, pack_unit, sku )
      `
      )
      .eq("slug", slug)
      .eq("publication_status", "published")
      .single();

    if (data) {
      medicine = data as unknown as MedicineDetail;
    }
  } catch (err) {
    console.error("Error fetching medicine details:", err);
  }

  if (!medicine) {
    notFound();
  }

  const product = medicine.pharmacy_products?.[0];
  const price = product?.selling_price || product?.unit_mrp;
  const inStock = (product?.stock_quantity ?? 10) > 0;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      {/* টপ ব্যাক নেভিগেশন হেডার */}
      <div className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল ঔষধে ফিরে যান</span>
          </Link>
          <span className="text-xs text-[#7B8AA4]">
            {medicine.medicine_categories?.name_bn || "ঔষধ বিবরণী"}
          </span>
        </div>
      </div>

      {/* পেজ কনটেন্ট */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* টপ কার্ড: ওষুধের মূল তথ্য ও অর্ডার বক্স */}
        <section className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="space-y-4 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#0D4C3B] border border-emerald-100">
                  {medicine.dosage_form}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-[#101B32]">
                  {medicine.strength}
                </span>
                {medicine.is_prescription_required ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#ED174C] border border-rose-100 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>প্রেসক্রিপশন আবশ্যক</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>OTC ওষুধ</span>
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#101B32] tracking-tight">
                  {medicine.name_bn}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[#7B8AA4] pt-1">
                  {medicine.name_en} {medicine.strength}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#F7F9FC] rounded-2xl p-4 border border-[#E5EBF2]">
                  <span className="text-[11px] font-bold text-[#7B8AA4] uppercase tracking-wider block">
                    জেনেরিক উপাদান
                  </span>
                  <span className="text-sm font-bold text-[#0D4C3B] block pt-0.5">
                    {medicine.generics?.name || "নির্দিষ্ট করা নেই"}
                  </span>
                </div>

                <div className="bg-[#F7F9FC] rounded-2xl p-4 border border-[#E5EBF2]">
                  <span className="text-[11px] font-bold text-[#7B8AA4] uppercase tracking-wider block">
                    প্রস্তুতকারক কোম্পানি
                  </span>
                  <span className="text-sm font-bold text-[#101B32] block pt-0.5">
                    {medicine.manufacturers?.name || "বাংলাদেশি প্রস্তুতকারক"}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-2xl border border-emerald-100 p-6 space-y-4 shrink-0">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                খুচরা মূল্য ও ফার্মেসি স্টক
              </span>
              
              <div>
                {price ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0D4C3B]">
                      ৳ {Number(price).toFixed(2)}
                    </span>
                    <span className="text-xs text-[#7B8AA4]">
                      {product?.pack_unit ? `প্রতি ${product.pack_unit}` : ""}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-bold text-[#7B8AA4]">
                    মূল্য তথ্যাধীন
                  </span>
                )}

                <div className="pt-2 text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{inStock ? "স্টকে এভেইলেবল আছে" : "সীমিত স্টক"}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/pharmacy"
                  className="w-full py-3 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ফার্মেসিতে অর্ডার করুন</span>
                </Link>

                <Link
                  href="/refill"
                  className="w-full py-2.5 rounded-xl bg-[#FFB91F] hover:bg-[#e5a619] text-[#101B32] text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>প্রেসক্রিপশন দিয়ে অর্ডার</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ক্লিনিক্যাল ও মেডিক্যাল নির্দেশিকা সেকশন */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E5EBF2] p-6 space-y-2">
              <h2 className="text-base font-bold text-[#101B32] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#0D4C3B]" />
                <span>ব্যবহারের ক্ষেত্র ও নির্দেশনা (Indications)</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#7B8AA4] leading-relaxed pt-1">
                {medicine.indications_bn ||
                  "এই ওষুধটি সাধারণত চিকিৎসকের পরামর্শ অনুযায়ী বিভিন্ন শারীরিক সমস্যা ও উপসর্গের উপশমে সেবন করা হয়। মাত্রা ও মেয়াদ চিকিৎসকের নির্দেশ অনুযায়ী মেনে চলুন।"}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EBF2] p-6 space-y-2">
              <h2 className="text-base font-bold text-[#101B32] flex items-center gap-2">
                <Pill className="w-4 h-4 text-[#0D4C3B]" />
                <span>সেবনবিধি ও খাবার নিয়ম (Dosage & Administration)</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#7B8AA4] leading-relaxed pt-1">
                {medicine.dosage_info_bn ||
                  "রোগীর বয়স, ওজন ও শারীরিক অবস্থার ওপর ভিত্তি করে চিকিৎসক নির্দিষ্ট মাত্রা নির্ধারণ করেন। নির্ধারিত সময়ের চেয়ে অতিরিক্ত ওষুধ একবারে খাবেন না।"}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EBF2] p-6 space-y-2">
              <h2 className="text-base font-bold text-[#ED174C] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#ED174C]" />
                <span>পার্শ্বপ্রতিক্রিয়া ও সতর্কতা (Side Effects & Precautions)</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#7B8AA4] leading-relaxed pt-1">
                {medicine.side_effects_bn ||
                  "সাধারণত বমি বমি ভাব, পেট ফাঁপা বা মৃদু মাথা ঘোরার অনুভূতি হতে পারে। গুরুতর কোনো লক্ষণ দেখা দিলে অবিলম্বে সেবন বন্ধ করে চিকিৎসকের শরণাপন্ন হোন।"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {medicine.youtube_video_id && (
              <div className="bg-white rounded-2xl border border-[#E5EBF2] p-5 space-y-3 shadow-xs">
                <h3 className="text-xs sm:text-sm font-bold text-[#101B32] flex items-center gap-2">
                  <Video className="w-4 h-4 text-red-600" />
                  <span>ওষুধের বিবরণী ভিডিও</span>
                </h3>
                
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${medicine.youtube_video_id}`}
                    title={`${medicine.name_bn} নির্দেশিকা ভিডিও`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] text-[#7B8AA4]">
                  বিশেষজ্ঞ চিকিৎসকের পরামর্শ ও বিস্তারিত ব্যাখ্যা সরাসরি ইউটিউব থেকে দেখতে প্লে করুন।
                </p>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>মেডিকেল ডিসক্লেইমার</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                এই ওয়েবসাইটে প্রকাশিত সকল তথ্য সাধারণ শিক্ষামূলক উদ্দেশ্যে প্রণীত। এটি কোনোভাবেই চিকিৎসকের সরাসরি প্রেসক্রিপশন বা পরামর্শের বিকল্প নয়। চিকিৎসকের পরামর্শ ছাড়া ওষুধ সেবন থেকে বিরত থাকুন।
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900">
        <p>© 2026 JibonJotno. সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}