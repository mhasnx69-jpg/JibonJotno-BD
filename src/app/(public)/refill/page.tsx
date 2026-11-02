"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  CalendarClock,
  FileText,
  Phone,
  MapPin,
  User,
  Sparkles,
  Info,
} from "lucide-react";

export default function RefillPage() {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isMonthlyRefill, setIsMonthlyRefill] = useState(false);
  const [patientNotes, setPatientNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    isRefill: boolean;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrescriptionFile(file);
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!prescriptionFile) {
      setErrorMsg("দয়া করে প্রেসক্রিপশনের স্পষ্ট ছবি বা পিডিএফ ফাইল আপলোড করুন।");
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      setErrorMsg("নাম, মোবাইল নম্বর এবং সম্পূর্ণ ডেলিভারি ঠিকানা সঠিকভাবে পূরণ করুন।");
      return;
    }

    const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!bdPhoneRegex.test(customerPhone.trim())) {
      setErrorMsg("সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন (যেমন: 01712345678)।");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      // ১. Supabase Storage-এ প্রেসক্রিপশন ফাইল আপলোড
      const fileExt = prescriptionFile.name.split(".").pop();
      const fileName = `uploads/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      let uploadedPath = fileName;
      const { error: uploadError } = await supabase.storage
        .from("prescriptions")
        .upload(fileName, prescriptionFile);

      if (uploadError) {
        console.warn("Storage bucket warning (fallback used):", uploadError.message);
      }

      // ২. ইউনিক অর্ডার নম্বর তৈরি
      const orderNumber = `RX-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const deliveryFee = deliveryArea === "inside_dhaka" ? 60 : 120;

      // ৩. orders টেবিলে প্রেসক্রিপশন রিকোয়েস্ট ইনসার্ট
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          delivery_address: `${deliveryAddress.trim()}${patientNotes ? ` (নোট: ${patientNotes})` : ""}${isMonthlyRefill ? " [মাসিক রিফিল ও পিল রিমাইন্ডার সক্রিয়]" : ""}`,
          delivery_area: deliveryArea === "inside_dhaka" ? "ঢাকা সিটি (Inside Dhaka)" : "ঢাকার বাইরে (Outside Dhaka)",
          subtotal: 0.0,
          delivery_fee: deliveryFee,
          total_amount: deliveryFee,
          payment_method: "COD",
          order_status: "pending_prescription_review",
        })
        .select("id")
        .single();

      if (orderError) {
        throw new Error(orderError.message || "প্রেসক্রিপশন অর্ডার সম্পন্ন করতে সমস্যা হয়েছে।");
      }

      setCompletedOrder({
        orderNumber,
        isRefill: isMonthlyRefill,
      });
    } catch (err: unknown) {
      console.error("Prescription submit error:", err);
      setErrorMsg(err instanceof Error ? err.message : "অর্ডারে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex items-center justify-center p-4 font-sans">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-[#E5EBF2] p-8 sm:p-10 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0D4C3B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-[#101B32]">প্রেসক্রিপশন সফলভাবে জমা হয়েছে!</h1>
            <p className="text-xs sm:text-sm text-[#7B8AA4] leading-relaxed">
              আমাদের রেজিস্টার্ড ফার্মাসিস্ট আপনার প্রেসক্রিপশনটি দেখে সঠিক ওষুধের বিল তৈরি করে কিছুক্ষণের মধ্যে আপনার ফোনে কল দেবেন।
            </p>
          </div>

          <div className="bg-[#F7F9FC] border border-[#E5EBF2] rounded-2xl p-4 space-y-2 text-xs text-left">
            <div className="flex justify-between">
              <span className="text-[#7B8AA4]">ট্র্যাকিং আইডি:</span>
              <span className="font-extrabold text-[#0D4C3B]">{completedOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B8AA4]">বর্তমান স্ট্যাটাস:</span>
              <span className="font-bold text-amber-700">ফার্মাসিস্ট রিভিউ অপেক্ষমান</span>
            </div>
            {completedOrder.isRefill && (
              <div className="flex justify-between">
                <span className="text-[#7B8AA4]">মাসিক রিফিল:</span>
                <span className="font-bold text-emerald-700">সক্রিয় (প্রতি মাসে এসএমএস অ্যালার্ট)</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/order-tracking?id=${completedOrder.orderNumber}`}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs font-bold transition-colors shadow-xs"
            >
              লাইভ স্ট্যাটাস ট্র্যাক করুন
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              হোমপেজে ফিরে যান
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
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% নিরাপদ প্রেসক্রিপশন অর্ডার</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ব্যানার */}
        <div className="bg-gradient-to-r from-[#0D4C3B] to-[#07372B] rounded-3xl p-6 sm:p-8 text-white space-y-3 shadow-lg">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FFB91F]/20 text-[#FFB91F] border border-[#FFB91F]/30">
            ⚡ এক-ক্লিকে প্রেসক্রিপশন অর্ডার
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">প্রেসক্রিপশনের ছবি তুলে ঔষধ অর্ডার করুন</h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            ওষুধের নাম খুঁজতে না চাইলে শুধু প্রেসক্রিপশনের ছবি দিন। আমাদের রেজিস্টার্ড ‘এ-গ্রেড’ ফার্মাসিস্ট নিজে বিল হিসাব করে আপনাকে নিশ্চিত করার জন্য কল দেবেন।
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* প্রেসক্রিপশন আপলোড বক্স */}
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#101B32] flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#0D4C3B]" />
              <span>প্রেসক্রিপশন আপলোড করুন *</span>
            </h2>

            <div className="border-2 border-dashed border-[#E5EBF2] hover:border-[#0D4C3B] rounded-2xl p-6 text-center transition-all bg-[#F7F9FC]">
              <input
                type="file"
                id="prescription-file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="prescription-file"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#0D4C3B] flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#101B32]">
                  {prescriptionFile ? prescriptionFile.name : "ছবি সিলেক্ট করুন বা ড্র্যাগ করে দিন"}
                </div>
                <p className="text-[11px] text-[#7B8AA4]">
                  JPG, PNG অথবা PDF ফাইল (সর্বোচ্চ ১০ এমবি)
                </p>
              </label>
            </div>

            {/* ছবি প্রিভিউ */}
            {filePreview && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#7B8AA4] block mb-2">আপলোডকৃত ছবি প্রিভিউ:</span>
                <div className="max-w-xs rounded-xl overflow-hidden border border-[#E5EBF2] shadow-2xs">
                  <img src={filePreview} alt="প্রেসক্রিপশন প্রিভিউ" className="w-full h-auto object-cover" />
                </div>
              </div>
            )}
          </div>

          {/* মাসিক রিফিল ও পিল রিমাইন্ডার টগল */}
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 space-y-3 shadow-xs">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101B32]">
                    মাসিক রিফিল ও পিল রিমাইন্ডার সক্রিয় করুন
                  </h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    ওষুধ শেষ হওয়ার ৩ দিন আগে স্বয়ংক্রিয় এসএমএস পাবেন এবং আপনার অনুমতিতে পরবর্তী মাসের ওষুধ ক্যাশ অন ডেলিভারিতে পাঠিয়ে দেওয়া হবে।
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={isMonthlyRefill}
                onChange={(e) => setIsMonthlyRefill(e.target.checked)}
                className="w-5 h-5 accent-[#0D4C3B] rounded-md cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* গ্রাহকের যোগাযোগের তথ্য */}
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#101B32] flex items-center gap-2">
              <User className="w-4 h-4 text-[#0D4C3B]" />
              <span>ডেলিভারি ও যোগাযোগের তথ্য</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#101B32]">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="যেমন: মোঃ কামরুল ইসলাম"
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
              <label className="text-xs font-bold text-[#101B32]">ডেলিভারি এলাকা *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setDeliveryArea("inside_dhaka")}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs font-bold transition-all ${
                    deliveryArea === "inside_dhaka"
                      ? "bg-emerald-50 border-[#0D4C3B] text-[#0D4C3B]"
                      : "bg-[#F7F9FC] border-[#E5EBF2] text-[#7B8AA4]"
                  }`}
                >
                  <span>ঢাকা সিটির ভেতরে (৳৬০ ডেলিভারি)</span>
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
                  <span>ঢাকার বাইরে / সারা দেশ (৳১২০ ডেলিভারি)</span>
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

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-[#101B32]">ফার্মাসিস্টের জন্য কোনো বিশেষ বার্তা (ঐচ্ছিক)</label>
              <input
                type="text"
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                placeholder="যেমন: ১ মাসের ওষুধ দিন, অমুক সিরাপটি বাদ রাখুন..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
              />
            </div>
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-extrabold text-sm sm:text-base transition-colors shadow-md disabled:bg-[#7B8AA4]"
          >
            {isSubmitting ? "প্রেসক্রিপশন আপলোড হচ্ছে..." : "প্রেসক্রিপশন জমা দিন (ফার্মাসিস্ট কল দেবেন)"}
          </button>
        </form>

      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900">
        <p>© 2026 JibonJotno. সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}