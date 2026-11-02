"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const deliveryFee = subtotal > 0 ? 60 : 0;
  const grandTotal = subtotal + deliveryFee;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* হেডার */}
          <div className="px-6 py-4 bg-[#0D4C3B] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-300" />
              <h2 className="font-bold text-base">আপনার ফার্মেসি কার্ট ({totalItems})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* আইটেম তালিকা */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0D4C3B] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#101B32]">কার্ট সম্পূর্ণ খালি</h3>
                <p className="text-xs text-[#7B8AA4]">প্রয়োজনীয় ওষুধ কার্টে যোগ করে অর্ডার করুন।</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F7F9FC] border border-[#E5EBF2] rounded-2xl p-4 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-[#0D4C3B]">
                        {item.dosage_form}
                      </span>
                      {item.is_prescription_required && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-[#ED174C]">
                          Rx আবশ্যক
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-[#101B32]">{item.name_bn}</h4>
                    <p className="text-[11px] text-[#7B8AA4]">
                      {item.name_en} {item.strength} • ৳{item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* পরিমাণ নিয়ন্ত্রণ */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white border border-[#E5EBF2] rounded-xl overflow-hidden shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-slate-100 text-[#7B8AA4] hover:text-[#101B32]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#101B32]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-slate-100 text-[#7B8AA4] hover:text-[#101B32]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                      title="আইটেম মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* চেকআউট ফুটার */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#F7F9FC] border-t border-[#E5EBF2] space-y-3">
              <div className="space-y-1.5 text-xs text-[#7B8AA4]">
                <div className="flex justify-between">
                  <span>ওষুধের মোট মূল্য (Subtotal):</span>
                  <span className="font-bold text-[#101B32]">৳ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ক্যাশ অন ডেলিভারি চার্জ:</span>
                  <span className="font-bold text-[#101B32]">৳ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#0D4C3B] pt-2 border-t border-[#E5EBF2]">
                  <span>সর্বমোট প্রদেয় বিল:</span>
                  <span>৳ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>১০০% ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ)</span>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 rounded-2xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>অর্ডার সম্পূর্ণ করুন (Checkout)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}