"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Printer,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Phone,
  AlertCircle,
  FileText,
} from "lucide-react";

interface OrderItemDetail {
  id: string;
  quantity: number;
  unit_price_snapshot: number;
  pharmacy_products: {
    pack_unit: string;
    medicines: {
      name_bn: string;
      name_en: string;
      strength: string;
      dosage_form: string;
    };
  };
}

interface OrderDetail {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  delivery_area: string;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  payment_method: string;
  order_status: string;
  created_at: string;
  order_items: OrderItemDetail[];
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [trackingId, setTrackingId] = useState(initialId);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchOrderDetails = async (idToSearch: string) => {
    if (!idToSearch.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setOrder(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          id,
          order_number,
          customer_name,
          customer_phone,
          delivery_address,
          delivery_area,
          subtotal,
          delivery_fee,
          total_amount,
          payment_method,
          order_status,
          created_at,
          order_items (
            id,
            quantity,
            unit_price_snapshot,
            pharmacy_products (
              pack_unit,
              medicines (
                name_bn,
                name_en,
                strength,
                dosage_form
              )
            )
          )
        `
        )
        .eq("order_number", idToSearch.trim())
        .single();

      if (error || !data) {
        setErrorMsg("এই নম্বরে কোনো অর্ডার খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক ট্র্যাকিং নম্বর দিন।");
      } else {
        setOrder(data as unknown as OrderDetail);
      }
    } catch {
      setErrorMsg("অর্ডার তথ্য লোড করতে সমস্যা হয়েছে। সংযোগ পরীক্ষা করুন।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchOrderDetails(initialId);
    }
  }, [initialId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrderDetails(trackingId);
  };

  // স্ট্যাটাস স্টেপ ম্যাপিং
  const getStepProgress = (status: string) => {
    switch (status) {
      case "pending_prescription_review":
        return 1;
      case "order_placed":
        return 1;
      case "processing":
        return 2;
      case "out_for_delivery":
        return 3;
      case "delivered":
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = order ? getStepProgress(order.order_status) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      
      {/* হেডার (প্রিন্ট মোডে হাইড থাকবে) */}
      <div className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs print:hidden">
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
            <span>লাইভ পার্সেল ট্র্যাকিং ও ক্যাশ মেমো</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* সার্চ বক্স কার্ড (প্রিন্ট মোডে হাইড) */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 space-y-4 shadow-xs print:hidden">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-[#101B32] flex items-center gap-2">
              <Truck className="w-6 h-6 text-[#0D4C3B]" />
              <span>আপনার অর্ডার ট্র্যাক করুন</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#7B8AA4]">
              এসএমএস বা চেকআউট কনফার্মেশনে প্রাপ্ত ট্র্যাকিং নম্বরটি প্রবেশ করান (যেমন: JJ-XXXXXX-XXXX)।
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="অর্ডার / ট্র্যাকিং নম্বর দিন..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-2xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs sm:text-sm font-bold transition-colors shadow-xs disabled:bg-[#7B8AA4]"
            >
              {loading ? "খোঁজা হচ্ছে..." : "ট্র্যাক"}
            </button>
          </form>

          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* ট্র্যাকিং প্রগ্রেস ও বিবরণী কার্ড */}
        {order && (
          <div className="space-y-6">
            
            {/* ৪-ধাপের ডেলিভারি প্রগ্রেস বার */}
            <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-xs print:hidden space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-4">
                <div>
                  <span className="text-[11px] font-bold text-[#7B8AA4] uppercase tracking-wider">
                    ট্র্যাকিং আইডি
                  </span>
                  <h2 className="text-lg font-black text-[#0D4C3B]">{order.order_number}</h2>
                </div>
                <div className="text-xs text-[#7B8AA4]">
                  অর্ডারের সময়: {new Date(order.created_at).toLocaleString("bn-BD")}
                </div>
              </div>

              {/* প্রগ্রেস স্টেপস */}
              <div className="grid grid-cols-4 gap-2 text-center relative">
                {/* ১: অর্ডার গৃহীত */}
                <div className="space-y-2 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 1
                        ? "bg-[#0D4C3B] text-white shadow-xs"
                        : "bg-[#F7F9FC] text-[#7B8AA4] border border-[#E5EBF2]"
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#101B32]">
                    অর্ডার গৃহীত
                  </span>
                </div>

                {/* ২: ফার্মাসিস্ট রিভিউ */}
                <div className="space-y-2 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 2
                        ? "bg-[#0D4C3B] text-white shadow-xs"
                        : "bg-[#F7F9FC] text-[#7B8AA4] border border-[#E5EBF2]"
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#101B32]">
                    ফার্মাসিস্ট যাচাই
                  </span>
                </div>

                {/* ৩: ডেলিভারির পথে */}
                <div className="space-y-2 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 3
                        ? "bg-[#0D4C3B] text-white shadow-xs"
                        : "bg-[#F7F9FC] text-[#7B8AA4] border border-[#E5EBF2]"
                    }`}
                  >
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#101B32]">
                    ডেলিভারির পথে
                  </span>
                </div>

                {/* ৪: ডেলিভার্ড */}
                <div className="space-y-2 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 4
                        ? "bg-[#0D4C3B] text-white shadow-xs"
                        : "bg-[#F7F9FC] text-[#7B8AA4] border border-[#E5EBF2]"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#101B32]">
                    ডেলিভার্ড
                  </span>
                </div>
              </div>
            </div>

            {/* অফিশিয়াল ক্যাশ মেমো / ইনভয়েস (প্রিন্টেবল) */}
            <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
              
              {/* ইনভয়েস শীর্ষ বার */}
              <div className="flex items-start justify-between border-b border-[#E5EBF2] pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-[#0D4C3B]">জীবনযত্ন</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[#DDF8EA] text-[#0D4C3B] font-bold">
                      অফিশিয়াল ক্যাশ মেমো
                    </span>
                  </div>
                  <p className="text-xs text-[#7B8AA4]">ডিজিটাল স্বাস্থ্য ও ফার্মেসি সেবা বাংলাদেশ</p>
                  <p className="text-[11px] text-[#7B8AA4]">হটলাইন: ১৬২৬৩ • ৯৯৯</p>
                </div>

                <div className="text-right space-y-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors print:hidden shadow-2xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>মেমো প্রিন্ট করুন</span>
                  </button>
                  <div className="text-xs text-[#7B8AA4]">
                    চালান নং: <span className="font-bold text-[#101B32]">{order.order_number}</span>
                  </div>
                </div>
              </div>

              {/* গ্রাহকের বিবরণী */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5EBF2]">
                <div className="space-y-1">
                  <span className="font-bold text-[#7B8AA4] block">প্রাপকের নাম ও যোগাযোগ:</span>
                  <p className="font-bold text-[#101B32] text-sm">{order.customer_name}</p>
                  <p className="text-[#101B32] flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#7B8AA4]" />
                    <span>{order.customer_phone}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-[#7B8AA4] block">ডেলিভারি ঠিকানা ও এরিয়া:</span>
                  <p className="text-[#101B32] flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#7B8AA4] shrink-0 mt-0.5" />
                    <span>{order.delivery_address}</span>
                  </p>
                  <p className="font-semibold text-[#0D4C3B]">{order.delivery_area}</p>
                </div>
              </div>

              {/* ওষুধ আইটেম টেবিল */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F7F9FC] text-[#7B8AA4] uppercase font-bold border-b border-[#E5EBF2]">
                    <tr>
                      <th className="py-2.5 px-3">ক্রমিক</th>
                      <th className="py-2.5 px-3">ওষুধের বিবরণী</th>
                      <th className="py-2.5 px-3 text-center">পরিমাণ</th>
                      <th className="py-2.5 px-3 text-right">একক মূল্য</th>
                      <th className="py-2.5 px-3 text-right">মোট (টাকা)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {order.order_items.map((item, idx) => {
                      const med = item.pharmacy_products?.medicines;
                      const lineTotal = item.quantity * item.unit_price_snapshot;

                      return (
                        <tr key={item.id}>
                          <td className="py-3 px-3 text-[#7B8AA4]">{idx + 1}</td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-[#101B32] block">
                              {med?.name_bn || "ঔষধ আইটেম"}
                            </span>
                            <span className="text-[11px] text-[#7B8AA4]">
                              {med?.name_en} {med?.strength} ({med?.dosage_form})
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-[#101B32]">
                            {item.quantity}
                          </td>
                          <td className="py-3 px-3 text-right text-[#7B8AA4]">
                            ৳ {item.unit_price_snapshot.toFixed(2)}
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-[#101B32]">
                            ৳ {lineTotal.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* বিল হিসাব */}
              <div className="border-t border-[#E5EBF2] pt-4 flex flex-col items-end text-xs space-y-1.5">
                <div className="w-full sm:w-64 flex justify-between text-[#7B8AA4]">
                  <span>মোট ওষুধের মূল্য:</span>
                  <span className="font-bold text-[#101B32]">৳ {order.subtotal.toFixed(2)}</span>
                </div>
                <div className="w-full sm:w-64 flex justify-between text-[#7B8AA4]">
                  <span>হোম ডেলিভারি চার্জ:</span>
                  <span className="font-bold text-[#101B32]">৳ {order.delivery_fee.toFixed(2)}</span>
                </div>
                <div className="w-full sm:w-64 flex justify-between text-sm font-black text-[#0D4C3B] pt-2 border-t border-[#E5EBF2]">
                  <span>ক্যাশ অন ডেলিভারি বিল:</span>
                  <span>৳ {order.total_amount.toFixed(2)}</span>
                </div>
              </div>

              {/* ক্যাশ অন ডেলিভারি স্বীকৃতি নোট */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>ক্যাশ অন ডেলিভারি (COD) নির্দেশিকা:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  পার্সেল রিসিভ করার সময় সিল ও ইনভয়েস মিলিয়ে ডেলিভারিম্যানকে মোট ৳ {order.total_amount.toFixed(2)} পরিশোধ করুন। কোনো সমস্যা হলে আমাদের কাস্টমার সার্ভিসে যোগাযোগ করুন।
                </p>
              </div>

            </div>

          </div>
        )}

      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900 print:hidden">
        <p>© 2026 JibonJotno. সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[#7B8AA4]">ট্র্যাকিং লোড হচ্ছে...</div>}>
      <TrackingContent />
    </Suspense>
  );
}