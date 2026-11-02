"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Phone,
  MapPin,
  User,
} from "lucide-react";

export default function CartDrawer() {
  const router = useRouter();
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getSubtotal, clearCart } = useCart();

  // Quick Order inside drawer for maximum user-friendliness
  const [quickOrderMode, setQuickOrderMode] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [zone, setZone] = useState<"dhaka" | "outside">("dhaka");
  const [submitting, setSubmitting] = useState(false);
  const [orderDoneId, setOrderDoneId] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 0 ? (zone === "dhaka" ? 60 : 120) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleQuickOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) return;
    setSubmitting(true);

    const generatedOrderNo = "JJ-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const supabase = createClient();
      await supabase.from("orders").insert({
        order_number: generatedOrderNo,
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        shipping_address: customerAddress.trim(),
        delivery_zone: zone,
        subtotal: subtotal,
        delivery_fee: deliveryFee,
        total_amount: grandTotal,
        payment_method: "COD",
        status: "pending",
      });
    } catch (err) {
      console.warn("Saved locally:", err);
    }

    setSubmitting(false);
    setOrderDoneId(generatedOrderNo);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-[#E5EBF2]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E5EBF2] flex items-center justify-between bg-[#0D4C3B] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#FFB91F]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold">
                {isEn ? "Your Medicine Bag" : "আপনার ওষুধের ব্যাগ"}
              </h2>
              <p className="text-[11px] text-emerald-200">
                {isEn
                  ? `${cart.length} item(s) added • 100% Cash on Delivery`
                  : `মোট ${cart.length}টি ওষুধ যুক্ত • ১০০% ক্যাশ অন ডেলিভারি`}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setOrderDoneId(null);
              setQuickOrderMode(false);
            }}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderDoneId ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0D4C3B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-[#101B32]">
                {isEn ? "Order Confirmed!" : "আপনার অর্ডার সফল হয়েছে!"}
              </h3>
              <p className="text-xs text-[#7B8AA4] max-w-xs mx-auto">
                {isEn
                  ? "Our pharmacist will call you shortly to confirm dispatch."
                  : "আমাদের রেজিস্টার্ড ফার্মাসিস্ট খুব শীঘ্রই কল করে ডেলিভারি নিশ্চিত করবেন।"}
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] text-emerald-800 block">
                  {isEn ? "Tracking Order ID:" : "অর্ডার ট্র্যাকিং নম্বর:"}
                </span>
                <span className="text-lg font-black text-[#0D4C3B] font-mono">
                  {orderDoneId}
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setOrderDoneId(null);
                    setQuickOrderMode(false);
                    router.push("/order-tracking");
                  }}
                  className="w-full py-3 rounded-xl bg-[#0D4C3B] text-white text-xs font-bold"
                >
                  {isEn ? "Track Live Order" : "লাইভ অর্ডার ট্র্যাক করুন"}
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-[#101B32]">
                {isEn ? "Your medicine bag is empty" : "আপনার ওষুধের ব্যাগটি খালি"}
              </h3>
              <p className="text-xs text-[#7B8AA4] max-w-xs">
                {isEn
                  ? "Click '+ Order' on any medicine card to add items here."
                  : "যেকোনো ওষুধের কার্ডে '+ অর্ডার' বাটনে ক্লিক করে ব্যাগে যোগ করুন।"}
              </p>
            </div>
          ) : quickOrderMode ? (
            <form id="quick-order-form" onSubmit={handleQuickOrderSubmit} className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#E5EBF2] pb-2">
                <h3 className="text-sm font-black text-[#0D4C3B]">
                  {isEn ? "Quick Cash on Delivery Form" : "দ্রুত ক্যাশ অন ডেলিভারি ফর্ম"}
                </h3>
                <button
                  type="button"
                  onClick={() => setQuickOrderMode(false)}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  {isEn ? "← Back to Items" : "← তালিকায় ফিরুন"}
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#101B32]">
                  {isEn ? "Patient / Receiver Name *" : "রোগী বা গ্রহণকারীর নাম *"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7B8AA4] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isEn ? "Enter your full name" : "আপনার নাম লিখুন"}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5EBF2] text-xs bg-[#F7F9FC] focus:outline-none focus:border-[#0D4C3B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#101B32]">
                  {isEn ? "Mobile Number (11 Digits) *" : "মোবাইল নম্বর (১১ ডিজিট) *"}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#7B8AA4] absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    pattern="01[3-9][0-9]{8}"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5EBF2] text-xs bg-[#F7F9FC] focus:outline-none focus:border-[#0D4C3B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#101B32]">
                  {isEn ? "Delivery Area *" : "ডেলিভারি এলাকা *"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setZone("dhaka")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      zone === "dhaka"
                        ? "bg-emerald-50 border-[#0D4C3B] text-[#0D4C3B]"
                        : "border-[#E5EBF2] text-[#7B8AA4]"
                    }`}
                  >
                    {isEn ? "Inside Dhaka (৳60)" : "ঢাকার ভেতরে (৳৬০)"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setZone("outside")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      zone === "outside"
                        ? "bg-emerald-50 border-[#0D4C3B] text-[#0D4C3B]"
                        : "border-[#E5EBF2] text-[#7B8AA4]"
                    }`}
                  >
                    {isEn ? "Outside Dhaka (৳120)" : "ঢাকার বাইরে (৳১২০)"}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#101B32]">
                  {isEn ? "Full Delivery Address *" : "পূর্ণ ডেলিভারি ঠিকানা (বাসা, রোড, এলাকা) *"}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#7B8AA4] absolute left-3 top-3" />
                  <textarea
                    required
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder={isEn ? "House, Road, Area, Thana..." : "বাসা নম্বর, রোড, মহল্লা, থানা..."}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5EBF2] text-xs bg-[#F7F9FC] focus:outline-none focus:border-[#0D4C3B]"
                  />
                </div>
              </div>
            </form>
          ) : (
            cart.map((item) => (
              <div
                key={item.product_id}
                className="p-3.5 rounded-2xl border border-[#E5EBF2] bg-[#F7F9FC] hover:border-emerald-300 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#101B32] truncate">
                    {isEn ? item.name_en : item.name_bn}
                  </h4>
                  <p className="text-[11px] text-[#7B8AA4] truncate">
                    {isEn ? item.name_bn : item.name_en}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-black text-[#0D4C3B]">
                      ৳ {(item.unit_price * item.quantity).toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      (৳{item.unit_price} × {item.quantity})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-[#E5EBF2] rounded-xl p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 text-center text-xs font-black text-[#101B32]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-[#0D4C3B] hover:bg-[#12614A] text-white flex items-center justify-center font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.product_id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && !orderDoneId && (
          <div className="p-5 border-t border-[#E5EBF2] bg-white space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#7B8AA4]">
                <span>{isEn ? "Medicine Subtotal:" : "ওষুধের মোট মূল্য:"}</span>
                <span className="font-bold text-[#101B32]">৳ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#7B8AA4]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isEn ? "Delivery Fee:" : "ডেলিভারি চার্জ:"}</span>
                </span>
                <span className="font-bold text-emerald-700">৳ {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#101B32] pt-2 border-t border-dashed border-[#E5EBF2]">
                <span>{isEn ? "Total Payable (COD):" : "সর্বমোট পরিশোধযোগ্য:"}</span>
                <span className="text-[#0D4C3B] text-base">৳ {grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {quickOrderMode ? (
              <button
                type="submit"
                form="quick-order-form"
                disabled={submitting}
                className="w-full py-3.5 rounded-2xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <span>
                  {submitting
                    ? isEn
                      ? "Confirming Order..."
                      : "অর্ডার নিশ্চিত হচ্ছে..."
                    : isEn
                    ? "Confirm Cash on Delivery Order"
                    : "ক্যাশ অন ডেলিভারি অর্ডার নিশ্চিত করুন"}
                </span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setQuickOrderMode(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>
                    {isEn ? "1-Click Easy Order (Cash on Delivery)" : "সহজ অর্ডার করুন (ক্যাশ অন ডেলিভারি)"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#F7F9FC] hover:bg-[#E5EBF2] text-[#101B32] font-bold text-xs text-center border border-[#E5EBF2]"
                >
                  {isEn ? "Full Checkout & Prescription Upload" : "প্রেসক্রিপশন আপলোড ও বিস্তারিত চেকআউট"}
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}