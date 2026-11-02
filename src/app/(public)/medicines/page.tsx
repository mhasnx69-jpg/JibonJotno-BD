import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Search,
  Pill,
  Filter,
  ArrowLeft,
  ShoppingCart,
  ShieldAlert,
  AlertCircle,
  Tag,
  CheckCircle2,
} from "lucide-react";

interface MedicineItem {
  id: string;
  name_bn: string;
  name_en: string;
  slug: string;
  dosage_form: string;
  strength: string;
  is_prescription_required: boolean;
  generics?: { name: string } | null;
  manufacturers?: { name: string } | null;
  medicine_categories?: { name_bn: string; slug: string } | null;
  pharmacy_products?: {
    selling_price: number;
    unit_mrp: number;
    stock_quantity: number;
    pack_unit: string;
  }[];
}

interface CategoryItem {
  id: string;
  name_bn: string;
  name_en: string;
  slug: string;
}

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "" } = await searchParams;

  let medicines: MedicineItem[] = [];
  let categories: CategoryItem[] = [];
  let totalCount = 0;

  try {
    const supabase = await createClient();

    // ১. ফিল্টারের জন্য ক্যাটাগরি তালিকা ফেচ করা
    const { data: catData } = await supabase
      .from("medicine_categories")
      .select("id, name_bn, name_en, slug")
      .order("name_bn", { ascending: true });

    if (catData) categories = catData;

    // ২. ঔষধ তালিকা কুয়েরি তৈরি
    let queryBuilder = supabase
      .from("medicines")
      .select(
        `
        id,
        name_bn,
        name_en,
        slug,
        dosage_form,
        strength,
        is_prescription_required,
        generics ( name ),
        manufacturers ( name ),
        medicine_categories ( name_bn, slug ),
        pharmacy_products ( selling_price, unit_mrp, stock_quantity, pack_unit )
      `,
        { count: "exact" }
      )
      .eq("publication_status", "published");

    // ক্যাটাগরি ফিল্টার
    if (category) {
      queryBuilder = queryBuilder.eq("medicine_categories.slug", category);
    }

    // সার্চ কুয়েরি (বাংলা বা ইংরেজি নাম দিয়ে)
    if (q.trim()) {
      queryBuilder = queryBuilder.or(
        `name_bn.ilike.%${q.trim()}%,name_en.ilike.%${q.trim()}%`
      );
    }

    const { data: medData, count } = await queryBuilder.limit(40);
    if (medData) {
      medicines = medData as unknown as MedicineItem[];
      totalCount = count || medicines.length;
    }
  } catch (err) {
    console.error("Medicines fetch error:", err);
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      {/* টপ ন্যাভ ও সার্চ হেডার */}
      <section className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* ব্যাক ও টাইটেল */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href="/"
                className="p-2 rounded-xl text-[#7B8AA4] hover:text-[#0D4C3B] hover:bg-emerald-50 transition-colors"
                title="হোমপেজে ফিরে যান"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-[#0D4C3B] flex items-center gap-2">
                  <Pill className="w-5 h-5 text-[#0D4C3B]" />
                  <span>ঔষধ নির্দেশিকা ও ক্যাটালগ</span>
                </h1>
                <p className="text-xs text-[#7B8AA4]">
                  {totalCount > 0 ? `${totalCount}টি ভেরিফাইড ঔষধ পাওয়া গেছে` : "সকল ঔষধ ও দামের তালিকা"}
                </p>
              </div>
            </div>

            {/* পেজ সার্চ ইনপুট */}
            <form action="/medicines" method="GET" className="w-full md:max-w-md">
              <div className="relative flex items-center bg-[#F7F9FC] border border-[#E5EBF2] rounded-full p-1 focus-within:border-[#0D4C3B] focus-within:bg-white transition-all">
                <Search className="w-4 h-4 text-[#7B8AA4] ml-3 shrink-0" />
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="ঔষধের নাম বা জেনেরিক দিয়ে খুঁজুন..."
                  className="w-full px-3 py-1.5 text-xs sm:text-sm text-[#101B32] placeholder-[#7B8AA4] bg-transparent focus:outline-none"
                />
                {category && <input type="hidden" name="category" value={category} />}
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0D4C3B] text-white text-xs font-bold rounded-full hover:bg-[#12614A] transition-colors shrink-0"
                >
                  সার্চ
                </button>
              </div>
            </form>

          </div>

          {/* ক্যাটাগরি ফিল্টার স্ক্রলবার */}
          {categories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none text-xs">
              <span className="text-[#7B8AA4] flex items-center gap-1 font-semibold shrink-0">
                <Filter className="w-3.5 h-3.5" /> ক্যাটাগরি:
              </span>
              <Link
                href={q ? `/medicines?q=${encodeURIComponent(q)}` : "/medicines"}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  !category
                    ? "bg-[#0D4C3B] text-white font-bold"
                    : "bg-[#F7F9FC] text-[#7B8AA4] hover:text-[#101B32] border border-[#E5EBF2]"
                }`}
              >
                সকল ঔষধ
              </Link>
              {categories.map((cat) => {
                const isActive = category === cat.slug;
                const linkHref = q
                  ? `/medicines?q=${encodeURIComponent(q)}&category=${cat.slug}`
                  : `/medicines?category=${cat.slug}`;
                return (
                  <Link
                    key={cat.id}
                    href={linkHref}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-[#0D4C3B] text-white font-bold"
                        : "bg-[#F7F9FC] text-[#7B8AA4] hover:text-[#101B32] border border-[#E5EBF2]"
                    }`}
                  >
                    {cat.name_bn}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* কনটেন্ট বডি */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* বাধ্যতামূলক মেডিকেল ডিসক্লেইমার ব্যানার */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">সতর্কবার্তা:</span> এখানে প্রদর্শিত ঔষধের তথ্য শুধুমাত্র সাধারণ জ্ঞান ও শিক্ষামূলক উদ্দেশ্যে দেওয়া। চিকিৎসকের প্রেসক্রিপশন ছাড়া অ্যান্টিবায়োটিক বা সিডিউলড ঔষধ সেবন করবেন না।
          </div>
        </div>

        {/* ঔষধ গ্রিড */}
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {medicines.map((med) => {
              const product = med.pharmacy_products?.[0];
              const price = product?.selling_price || product?.unit_mrp;
              const inStock = (product?.stock_quantity ?? 10) > 0;

              return (
                <div
                  key={med.id}
                  className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    
                    {/* ব্যাজসমূহ */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#0D4C3B] border border-emerald-100">
                        {med.dosage_form}
                      </span>
                      {med.is_prescription_required ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-[#ED174C] border border-rose-100">
                          প্রেসক্রিপশন আবশ্যক
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                          OTC
                        </span>
                      )}
                    </div>

                    {/* নাম ও স্ট্রেন্থ */}
                    <div>
                      <h3 className="font-bold text-base text-[#101B32] group-hover:text-[#0D4C3B] transition-colors">
                        {med.name_bn}
                      </h3>
                      <p className="text-xs font-semibold text-[#7B8AA4]">
                        {med.name_en} {med.strength}
                      </p>
                    </div>

                    {/* জেনেরিক ও কোম্পানি */}
                    <div className="text-xs space-y-1 pt-1 border-t border-[#F1F5F9]">
                      {med.generics?.name && (
                        <div className="text-[#0D4C3B] font-medium flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#7B8AA4]" />
                          <span>{med.generics.name}</span>
                        </div>
                      )}
                      {med.manufacturers?.name && (
                        <p className="text-[11px] text-[#7B8AA4]">
                          প্রস্তুতকারক: {med.manufacturers.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* মূল্য ও বাটন */}
                  <div className="pt-4 mt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                    <div>
                      {price ? (
                        <div>
                          <div className="text-base font-extrabold text-[#0D4C3B]">
                            ৳ {Number(price).toFixed(2)}
                          </div>
                          <span className="text-[10px] text-[#7B8AA4]">
                            {product?.pack_unit ? `প্রতি ${product.pack_unit}` : "খুচরা মূল্য"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-[#7B8AA4]">
                          মূল্য তথ্যাধীন
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/pharmacy`}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>অর্ডার</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* খালি বা ডাটা না থাকার অবস্থা */
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center mx-auto">
              <Pill className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-[#101B32]">
                {q ? `"${q}" দিয়ে কোনো ঔষধ পাওয়া যায়নি` : "ডাটাবেসে এখনো কোনো ঔষধ যোগ করা হয়নি"}
              </h2>
              <p className="text-xs text-[#7B8AA4] leading-relaxed">
                অ্যাডমিন প্যানেল থেকে ঔষধ যুক্ত করার পর তা স্বয়ংক্রিয়ভাবে এখানে প্রদর্শিত হবে। অথবা প্রেসক্রিপশন আপলোড করে যেকোনো ঔষধের অর্ডার করতে পারেন।
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/refill"
                className="px-5 py-2.5 rounded-xl bg-[#FFB91F] hover:bg-[#e5a619] text-[#101B32] text-xs font-bold transition-colors"
              >
                প্রেসক্রিপশন আপলোড করুন ➔
              </Link>
              <Link
                href="/medicines"
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                ফিল্টার রিসেট করুন
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* ফুটার */}
      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900">
        <p>© {new Date().getFullYear()} JibonJotno. সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}
