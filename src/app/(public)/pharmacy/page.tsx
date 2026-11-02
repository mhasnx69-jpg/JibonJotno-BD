import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, ShoppingBag, Truck, Sparkles } from "lucide-react";
import PharmacyProductList from "./PharmacyProductList";

export const dynamic = "force-dynamic";

export interface PharmacyItem {
  id: string;
  sku: string;
  pack_unit: string;
  unit_mrp: number;
  selling_price: number;
  stock_quantity: number;
  is_sellable: boolean;
  medicines: {
    name_bn: string;
    name_en: string;
    slug: string;
    dosage_form: string;
    strength: string;
    is_prescription_required: boolean;
    generics?: { name: string } | null;
    manufacturers?: { name: string } | null;
  };
}

export default async function PharmacyPage() {
  let products: PharmacyItem[] = [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("pharmacy_products")
      .select(`
        id,
        sku,
        pack_unit,
        unit_mrp,
        selling_price,
        stock_quantity,
        is_sellable,
        medicines (
          name_bn,
          name_en,
          slug,
          dosage_form,
          strength,
          is_prescription_required,
          generics ( name ),
          manufacturers ( name )
        )
      `)
      .eq("is_sellable", true)
      .gt("stock_quantity", 0);

    if (data && !error) {
      products = data as unknown as PharmacyItem[];
    }
  } catch (err) {
    console.error("Pharmacy products fetch error:", err);
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      {/* ফার্মেসি হেডার ব্যানার */}
      <section className="bg-gradient-to-r from-[#0D4C3B] to-[#07372B] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>হোমপেজে ফিরে যান</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center justify-center md:justify-start gap-2">
              <ShoppingBag className="w-7 h-7 text-[#FFB91F]" />
              <span>জীবনযত্ন অনলাইন ফার্মেসি</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              ১০০% আসল ও জেনুইন ওষুধ সরাসরি আপনার ঠিকানায় পৌঁছে দিচ্ছি ক্যাশ অন ডেলিভারিতে।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/20 text-xs flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#FFB91F]" />
              <span>সারা দেশে দ্রুত হোম ডেলিভারি</span>
            </div>
            <Link
              href="/refill"
              className="px-4 py-2.5 rounded-2xl bg-[#FFB91F] hover:bg-[#e5a619] text-[#101B32] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>প্রেসক্রিপশন আপলোড</span>
            </Link>
          </div>
        </div>
      </section>

      {/* প্রোডাক্ট গ্রিড (Client Component) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <PharmacyProductList products={products} />
      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900">
        <p>© 2026 JibonJotno. সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}