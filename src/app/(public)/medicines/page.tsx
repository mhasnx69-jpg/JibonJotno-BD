import { createClient } from "@/lib/supabase/server";
import { Pill, Search, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SearchPageProps {
  readonly searchParams: Promise<{ q?: string }>;
}

/**
 * JibonJotno (জীবনযত্ন) — Public Medicines Search & Catalog Page
 */
export default async function PublicMedicinesPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  const supabase = await createClient();

  // ডাটাবেস থেকে শুধুমাত্র প্রকাশিত ওষুধগুলো কুয়েরি করা
  let dbQuery = supabase
    .from("medicines")
    .select(`
      id,
      name_en,
      name_bn,
      slug,
      reference_mrp_bdt,
      publication_status,
      medicine_brands(name_en),
      dosage_forms(name_en),
      medicine_strengths(strength_value),
      pharmacy_products(selling_price_bdt, stock_available, pack_unit)
    `)
    .eq("publication_status", "PUBLISHED")
    .is("archived_at", null);

  if (query) {
    dbQuery = dbQuery.or(`name_en.ilike.%${query}%,name_bn.ilike.%${query}%`);
  }

  const { data: medicines, error } = await dbQuery.limit(20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* সার্চ হেডার */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-center max-w-3xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-sm">
          <Pill className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">ওষুধ নির্দেশিকা ও অনুসন্ধান</h1>
        <p className="text-slate-600 text-sm">
          আপনার প্রয়োজনীয় ওষুধের সঠিক ব্র্যান্ড, জেনেরিক, মাত্রা এবং মূল্য খুঁজুন।
        </p>

        {/* সার্চ বার ফর্ম */}
        <form method="GET" action="/medicines" className="flex gap-3 max-w-xl mx-auto">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="ওষুধের নাম লিখুন (যেমন: Napa, Paracetamol)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-colors"
          >
            খুঁজুন
          </button>
        </form>
      </div>

      {/* ওষুধের তালিকা গ্রিড */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          {query ? `"${query}" এর অনুসন্ধান ফলাফল` : "সকল প্রকাশিত ওষুধসমূহ"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines && medicines.length > 0 ? (
            medicines.map((med: any) => {
              const product = med.pharmacy_products?.[0];
              const price = product?.selling_price_bdt ?? med.reference_mrp_bdt;
              const inStock = (product?.stock_available ?? 0) > 0;

              return (
                <div key={med.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold">
                        {med.dosage_forms?.name_en} • {med.medicine_strengths?.strength_value}
                      </span>
                      {inStock ? (
                        <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> স্টকে আছে
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-rose-500">স্টক আউট</span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {med.name_en} <span className="text-slate-500 font-normal text-base">({med.name_bn})</span>
                    </h3>
                    <p className="text-xs text-slate-500">ব্র্যান্ড: {med.medicine_brands?.name_en}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      মূল্য: <strong className="text-slate-900 text-base">৳ {price}</strong> <span className="text-xs text-slate-400">/{product?.pack_unit || 'unit'}</span>
                    </div>
                    <Link
                      href={`/medicines/${med.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs font-semibold transition-colors"
                    >
                      <span>বিস্তারিত</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-16 bg-white rounded-3xl border border-slate-200 text-center text-slate-500">
              কোনো ওষুধ পাওয়া যায়নি। অন্য নামে অনুসন্ধান করুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
