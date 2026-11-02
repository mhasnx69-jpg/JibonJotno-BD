"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check, AlertTriangle, Pill } from "lucide-react";
import type { PharmacyItem } from "./page";

export default function PharmacyProductList({ products }: { products: PharmacyItem[] }) {
  const { addToCart, cart, setIsCartOpen } = useCart();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-[#101B32] flex items-center gap-2">
          <span>📦</span>
          <span>স্টকে থাকা ওষুধসমূহ ({products.length})</span>
        </h2>
        <button
          onClick={() => setIsCartOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D4C3B] text-white text-xs font-bold shadow-xs hover:bg-[#12614A] transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>কার্ট দেখুন ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-12 text-center max-w-md mx-auto space-y-3">
          <Pill className="w-10 h-10 text-[#7B8AA4] mx-auto" />
          <h3 className="font-bold text-base text-[#101B32]">ফার্মেসিতে কোনো ওষুধ স্টক নেই</h3>
          <p className="text-xs text-[#7B8AA4]">
            অ্যাডমিন প্যানেল থেকে ইনভেন্টরি যুক্ত করা হলে এখানে প্রদর্শন করবে।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((item) => {
            const med = item.medicines;
            const inCart = cart.find((c) => c.id === item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#0D4C3B] border border-emerald-100">
                      {med.dosage_form}
                    </span>
                    {med.is_prescription_required ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-[#ED174C] border border-rose-100 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Rx আবশ্যক</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        OTC
                      </span>
                    )}
                  </div>

                  <div>
                    <Link
                      href={`/medicines/${med.slug}`}
                      className="font-bold text-base text-[#101B32] hover:text-[#0D4C3B] transition-colors block"
                    >
                      {med.name_bn}
                    </Link>
                    <p className="text-xs font-semibold text-[#7B8AA4]">
                      {med.name_en} {med.strength}
                    </p>
                  </div>

                  <div className="text-xs space-y-0.5 pt-1 border-t border-[#F1F5F9]">
                    {med.generics?.name && (
                      <p className="text-[#0D4C3B] font-medium">{med.generics.name}</p>
                    )}
                    {med.manufacturers?.name && (
                      <p className="text-[11px] text-[#7B8AA4]">{med.manufacturers.name}</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                  <div>
                    <div className="text-base font-black text-[#0D4C3B]">
                      ৳ {Number(item.selling_price).toFixed(2)}
                    </div>
                    <span className="text-[10px] text-[#7B8AA4]">প্রতি {item.pack_unit}</span>
                  </div>

                  <button
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name_bn: med.name_bn,
                        name_en: med.name_en,
                        strength: med.strength,
                        dosage_form: med.dosage_form,
                        pack_unit: item.pack_unit,
                        price: Number(item.selling_price),
                        is_prescription_required: med.is_prescription_required,
                      })
                    }
                    className="px-3.5 py-2 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    {inCart ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>যোগ করা ({inCart.quantity})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>কার্টে যোগ</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}