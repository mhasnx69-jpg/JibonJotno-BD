"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const cartContext = useCart() as any;
  const cart = Array.isArray(cartContext?.cart) ? cartContext.cart : [];
  const clearCart = typeof cartContext?.clearCart === "function" ? cartContext.clearCart : () => {};

  const subtotal = cart.reduce(
    (sum: number, item: any) =>
      sum + Number(item.unit_price || item.price || 0) * Number(item.quantity || 1),
    0
  );

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [deliveryZone, setDeliveryZone] = useState<"dhaka" | "outside">("dhaka");
  const [loading, setLoading] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  const deliveryFee = subtotal > 0 ? (deliveryZone === "dhaka" ? 60 : 120) : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !shippingAddress) return;
    setLoading(true);

    const generatedOrderNumber = "JJ-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const supabase = createClient();
      await supabase.from("orders").insert({
        order_number: generatedOrderNumber,
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        shipping_address: shippingAddress.trim(),
        delivery_zone: deliveryZone,
        delivery_fee: deliveryFee,
        subtotal: subtotal,
        total_amount: grandTotal,
        payment_method: "COD",
        status: "pending",
      });
    } catch (err) {}

    setOrderSuccessId(generatedOrderNumber);
    clearCart();
    setLoading(false);
  };

  if (orderSuccessId) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E5EBF2] shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0D4C3B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-xl font-black text-[#101B32]">অর্ডার সফলভাবে সম্পন্ন হয়েছে!</h1>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs text-emerald-800 block">ট্র্যাকিং নম্বর:</span>
            <span className="text-xl font-black text-[#0D4C3B] font-mono">{orderSuccessId}</span>
          </div>
          <button
            onClick={() => router.push("/order-tracking")}
            className="w-full py-3.5 rounded-xl bg-[#0D4C3B] text-white font-bold text-xs"
          >
            অর্ডার ট্র্যাক করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#101B32] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/medicines" className="inline-flex items-center gap-2 text-xs font-bold text-[#0D4C3B]">
          <ArrowLeft className="w-4 h-4" />
          <span>ওষুধ তালিকায় ফিরে যান</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EBF2] shadow-xs space-y-5">
            <h2 className="text-lg font-black text-[#101B32]">ডেলিভারি তথ্য</h2>
            <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">রোগী / গ্রহণকারীর নাম *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="আপনার পূর্ণ নাম"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">১১ ডিজিটের মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  pattern="01[3-9][0-9]{8}"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryZone("dhaka")}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border ${
                    deliveryZone === "dhaka"
                      ? "bg-emerald-50 border-[#0D4C3B] text-[#0D4C3B]"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  ঢাকার ভেতরে (৳৬০)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryZone("outside")}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border ${
                    deliveryZone === "outside"
                      ? "bg-emerald-50 border-[#0D4C3B] text-[#0D4C3B]"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  ঢাকার বাইরে (৳১২০)
                </button>
              </div>

              <div>
                <label className="font-bold block mb-1">পূর্ণ ঠিকানা *</label>
                <textarea
                  required
                  rows={3}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="বাসা নম্বর, রোড, এলাকা, থানা..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full py-4 rounded-2xl bg-[#0D4C3B] text-white font-extrabold text-sm shadow-md"
              >
                {loading ? "অর্ডার প্রসেস হচ্ছে..." : "ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিত করুন"}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E5EBF2] shadow-xs space-y-4 h-fit">
            <h3 className="font-black text-sm text-[#101B32]">অর্ডারের সারসংক্ষেপ</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>ওষুধের মূল্য:</span>
                <span className="font-bold text-[#101B32]">৳ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-bold text-emerald-700">৳ {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed pt-2 flex justify-between font-black text-sm text-[#101B32]">
                <span>মোট:</span>
                <span className="text-[#0D4C3B]">৳ {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}