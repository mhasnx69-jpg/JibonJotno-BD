"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getSubtotal } = useCart();

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const deliveryEstimated = subtotal > 0 ? 60 : 0;
  const grandTotal = subtotal + deliveryEstimated;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-[#E5EBF2]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E5EBF2] flex items-center justify-between bg-[#F7F9FC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0D4C3B] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#101B32]">আপনার ওষুধের ব্যাগ</h2>
              <p className="text-[10px] text-[#7B8AA4]">মোট {cart.length}টি আইটেম যুক্ত আছে</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-200 text-[#7B8AA4] hover:text-[#101B32] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-[#101B32]">ব্যাগটি এখনো খালি আছে</h3>
              <p className="text-xs text-[#7B8AA4] max-w-xs">
                প্রয়োজনীয় ওষুধ বা স্বাস্থ্য সরঞ্জাম নির্বাচন করে ব্যাগে যোগ করুন।
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#0D4C3B] text-white text-xs font-bold hover:bg-[#12614A] transition-colors"
              >
                ওষুধ ব্রাউজ করুন
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product_id}
                className="p-3.5 rounded-2xl border border-[#E5EBF2] bg-[#F7F9FC] hover:border-emerald-200 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#101B32] truncate">{item.name_bn}</h4>
                  <p className="text-[11px] text-[#7B8AA4] truncate">{item.name_en}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-extrabold text-[#0D4C3B]">
                      ৳ {(item.unit_price * item.quantity).toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      (৳{item.unit_price} / {item.pack_unit})
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-white border border-[#E5EBF2] rounded-xl p-1 shadow-2xs">
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-7 text-center text-xs font-black text-[#101B32]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    className="w-6 h-6 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0D4C3B] flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E5EBF2] bg-white space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#7B8AA4]">
                <span>ওষুধের মূল্য (Subtotal):</span>
                <span className="font-bold text-[#101B32]">৳ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#7B8AA4]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>আনুমানিক ডেলিভারি ফি:</span>
                </span>
                <span className="font-bold text-emerald-700">৳ {deliveryEstimated.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#101B32] pt-2 border-t border-dashed border-[#E5EBF2]">
                <span>সর্বমোট পরিশোধযোগ্য:</span>
                <span className="text-[#0D4C3B]">৳ {grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 text-[10px] text-emerald-800 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>১০০% ক্যাশ অন ডেলিভারি ও রেজিস্টার্ড ফার্মাসিস্ট যাচাইকৃত</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-3.5 rounded-2xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
            >
              <span>অর্ডার সম্পন্ন করতে এগিয়ে যান (Checkout)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}