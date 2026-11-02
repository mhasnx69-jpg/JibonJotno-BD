"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  FileText,
  Phone,
  MapPin,
  User,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    totalAmount: number;
  } | null>(null);

  // ক্যালকুলেশন
  const deliveryFee = deliveryArea === "inside_dhaka" ? 60 : 120;
  const grandTotal = subtotal + deliveryFee;
  const hasPrescriptionRequiredMed = cart.some((item) => item.is_prescription_required);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (cart.length === 0) {
      setErrorMsg("আপনার কার্ট খালি। অর্ডার করতে প্রথমে ওষুধ কার্টে যোগ করুন।");
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      setErrorMsg("দয়া করে নাম, ফোন নম্বর এবং সম্পূর্ণ ডেলিভারি ঠিকানা সঠিকভাবে পূরণ করুন।");
      return;
    }

    // ১১ ডিজিটের বাংলাদেশি ফোন নম্বর ভ্যালিডেশন
    const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!bdPhoneRegex.test(customerPhone.trim())) {
      setErrorMsg("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)।");
      return;
    }

    if (hasPrescriptionRequiredMed && !prescriptionFile) {
      setErrorMsg("আপনার কার্টে প্রেসক্রিপশন-আবশ্যক ওষুধ রয়েছে। দয়া করে প্রেসক্রিপশনের ছবি আপলোড করুন।");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      let uploadedPrescriptionPath: string | null = null;

      // ১. প্রেসক্রিপশন থাকলে ফাইল আপলোড
      if (prescriptionFile) {
        const fileExt = prescriptionFile.name.split(".").pop();
        const fileName = `prescriptions/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("prescriptions")
          .upload(fileName, prescriptionFile);

        if (!uploadError) {
          uploadedPrescriptionPath = fileName;
        }
      }

      // ২. অর্ডার নম্বর তৈরি
      const orderNumber = `JJ-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

      // ৩. orders টেবিলে ইনসার্ট
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          delivery_address: deliveryAddress.trim(),
          delivery_area: deliveryArea === "inside_dhaka" ? "ঢাকা সিটি (Inside Dhaka)" : "ঢাকার বাইরে (Outside Dhaka)",
          subtotal: subtotal,
          delivery_fee: deliveryFee,
          total_amount: grandTotal,
          payment_method: "COD",
          order_status: hasPrescriptionRequiredMed ? "pending_prescription_review" : "order_placed",
        })
        .select("id")
        .single();

      if (orderError || !orderData) {
        throw new Error(orderError?.message || "অর্ডার সম্পন্ন করতে সমস্যা হয়েছে।");
      }

      // ৪. order_items ইনসার্ট
      const orderItemsToInsert = cart.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price_snapshot: item.price,
      }));

      await supabase.from("order_items").insert(orderItemsToInsert);

      // ৫. সাকসেস স্টেট ও কার্ট ক্লিয়ার
      setCompletedOrder({
        orderNumber,
        totalAmount: grandTotal,
      });
      clearCart();
    } catch (err: unknown) {
      console.error("Order submit error:", err);
      setErrorMsg(err instanceof Error ? err.message : "অর্ডারে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // অর্ডার সম্পন্ন হলে স্ক্রিন
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex items-center justify-center p-4 font-sans">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-[#E5EBF2] p-8 sm:p-10 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0D4C3B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-[#101B32]">অর্ডার সফলভাবে গৃহীত হয়েছে!</h1>
            <p className="text-xs sm:text-sm text-[#7B8AA4] leading-relaxed">
              ধন্যবাদ! আমাদের রেজিস্টার্ড ফার্মাসিস্ট আপনার অর্ডারটি রিভিউ করে দ্রুত ডেলিভারির ব্যবস্থা করবেন।
            </p>
          </div>

          <div className="bg-[#F7F9FC] border border-[#E5EBF2] rounded-2xl p-4 space-y-2 text-xs text-left">
            <div className="flex justify-between">
              <span className="text-[#7B8AA4]">ট্র্যাকিং / অর্ডার নম্বর:</span>
              <span className="font-extrabold text-[#0D4C3B]">{completedOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B8AA4]">মোট প্রদেয় ক্যাশ অন ডেলিভারি:</span>
              <span className="font-extrabold text-[#101B32]">৳ {completedOrder.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B8AA4]">পেমেন্ট পদ্ধতি:</span>
              <span className="font-bold text-emerald-700">ক্যাশ অন ডেলিভারি (COD)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/order-tracking?id=${completedOrder.orderNumber}`}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs font-bold transition-colors shadow-xs"
            >
              লাইভ অর্ডার ট্র্যাক করুন
            </Link>
            <Link
              href="/pharmacy"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              আরও ওষুধ কিনুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      {/* হেডার */}
      <div className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/pharmacy"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ফার্মেসিতে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% ক্যাশ অন ডেলিভারি চেকআউট</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101B32]">ডেলিভারি ও চেকআউট</h1>
            <p className="text-xs sm:text-sm text-[#7B8AA4] pt-1">
              সরাসরি পণ্য হাতে পেয়ে ডেলিভারিম্যানকে টাকা পরিশোধ করুন। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* বাম পাশ: ডেলিভারি ফর্ম */}
            <form onSubmit={handleOrderSubmit} className="lg:col-span-2 space-y-6">
              
              {/* গ্রাহকের তথ্য */}
              <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 space-y-4 shadow-xs">
                <h2 className="text-base font-bold text-[#101B32] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0D4C3B]" />
                  <span>গ্রাহক ও যোগাযোগের তথ্য</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#101B32]">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="যেমন: মোঃ মাহমুদুল হাসান"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#101B32]">মোবাইল নম্বর (১১ ডিজিট) *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#7B8AA4] absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="017xxxxxxxx"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-[#101B32]">ডেলিভারি এরিয়া *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => setDeliveryArea("inside_dhaka")}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs font-bold transition-all ${
                        deliveryArea === "inside_dhaka"
                          ? "bg-emerald-50 border-[#0D4C3B] text-[#0D4C3B]"
                          : "bg-[#F7F9FC] border-[#E5EBF2] text-[#7B8AA4]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <span>ঢাকা সিটির ভেতরে (৳৬০)</span>
                      </div>
                      <input
                        type="radio"
                        checked={deliveryArea === "inside_dhaka"}
                        onChange={() => setDeliveryArea("inside_dhaka")}
                        className="accent-[#0D4C3B]"
                      />
                    </label>

                    <label
                      onClick={() => setDeliveryArea("outside_dhaka")}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs font-bold transition-all ${
                        deliveryArea === "outside_dhaka"
                          ? "bg-emerald-50 border-[#0D4C3B] text-[#0D4C3B]"
                          : "bg-[#F7F9FC] border-[#E5EBF2] text-[#7B8AA4]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <span>ঢাকার বাইরে / সারা দেশ (৳১২০)</span>
                      </div>
                      <input
                        type="radio"
                        checked={deliveryArea === "outside_dhaka"}
                        onChange={() => setDeliveryArea("outside_dhaka")}
                        className="accent-[#0D4C3B]"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-[#101B32]">পূর্ণ ডেলিভারি ঠিকানা *</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#7B8AA4] absolute left-3 top-3" />
                    <textarea
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="বাড়ি/ফ্ল্যাট নম্বর, রোড, এলাকা, থানা ও জেলার নাম..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
                    />
                  </div>
                </div>
              </div>

              {/* প্রেসক্রিপশন আপলোড (যদি প্রয়োজন হয়) */}
              {hasPrescriptionRequiredMed && (
                <div className="bg-amber-50/60 rounded-3xl border border-amber-200 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <FileText className="w-4 h-4 text-amber-700" />
                    <span>প্রেসক্রিপশন আপলোড আবশ্যক</span>
                  </div>
                  <p className="text-xs text-amber-800">
                    আপনার অর্ডারে প্রেসক্রিপশন-আবশ্যক ওষুধ রয়েছে। চিকিৎসকের প্রেসক্রিপশনের ছবি যুক্ত করুন।
                  </p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setPrescriptionFile(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-amber-900 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0D4C3B] file:text-white hover:file:bg-[#12614A] cursor-pointer"
                  />
                </div>
              )}

              {/* সাবমিট বাটন */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 rounded-2xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-extrabold text-sm sm:text-base transition-colors shadow-md disabled:bg-[#7B8AA4]"
              >
                {isSubmitting ? "অর্ডার সাবমিট হচ্ছে..." : `ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিত করুন (৳ ${grandTotal.toFixed(2)})`}
              </button>
            </form>

            {/* ডান পাশ: অর্ডারের সারসংক্ষেপ */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 space-y-4 shadow-xs">
                <h3 className="font-bold text-sm text-[#101B32] flex items-center gap-2 border-b border-[#F1F5F9] pb-3">
                  <ShoppingBag className="w-4 h-4 text-[#0D4C3B]" />
                  <span>অর্ডারের সারসংক্ষেপ ({cart.reduce((a, b) => a + b.quantity, 0)}টি আইটেম)</span>
                </h3>

                {cart.length === 0 ? (
                  <p className="text-xs text-[#7B8AA4]">কোনো ওষুধ কার্টে নেই।</p>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start text-xs">
                        <div>
                          <p className="font-bold text-[#101B32]">{item.name_bn}</p>
                          <p className="text-[11px] text-[#7B8AA4]">
                            {item.quantity} x ৳{item.price.toFixed(2)}
                          </p>
                        </div>
                        <span className="font-bold text-[#101B32]">
                          ৳ {(item.quantity * item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-[#F1F5F9] pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-[#7B8AA4]">
                    <span>ওষুধের মূল্য:</span>
                    <span className="font-bold text-[#101B32]">৳ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#7B8AA4]">
                    <span>হোম ডেলিভারি চার্জ:</span>
                    <span className="font-bold text-[#101B32]">৳ {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-[#0D4C3B] pt-2 border-t border-[#E5EBF2]">
                    <span>সর্বমোট বিল:</span>
                    <span>৳ {grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-emerald-800 bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ক্যাশ অন ডেলিভারি: পার্সেল দেখে টাকা পরিশোধ করুন।</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900">
        <p>© 2026 JibonJotno. সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}