"use client";

import React, { useState } from "react";
import { ShoppingBag, CheckCircle2, Clock, Truck, Eye } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "ord-1",
      order_number: "JJ-849201",
      customer_name: "তানভীর আহমেদ",
      customer_phone: "01723456789",
      delivery_zone: "ঢাকার ভেতরে",
      shipping_address: "রোড নং ৪, মিরপুর ১০, ঢাকা",
      total_amount: 450,
      status: "pending",
      created_at: "আজ, সকাল ১০:১৫",
    },
    {
      id: "ord-2",
      order_number: "JJ-621045",
      customer_name: "সালমা বেগম",
      customer_phone: "01898765432",
      delivery_zone: "ঢাকার বাইরে",
      shipping_address: "জিইসি মোড়, চট্টগ্রাম",
      total_amount: 1280,
      status: "confirmed",
      created_at: "আজ, সকাল ০৯:৩০",
    },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  return (
    <div className="flex-1 p-8 space-y-6">
        <header className="border-b pb-4 border-slate-200">
          <h1 className="text-xl font-black text-[#101B32] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-700" />
            <span>ফার্মেসি অর্ডার ও প্রেসক্রিপশন ম্যানেজমেন্ট</span>
          </h1>
          <p className="text-xs text-[#7B8AA4]">গ্রাহকদের ক্যাশ অন ডেলিভারি অর্ডার ও প্রেসক্রিপশন প্রসেস করুন।</p>
        </header>

        <div className="bg-white rounded-3xl p-6 border border-[#E5EBF2] shadow-xs space-y-4">
          <h2 className="text-sm font-black text-[#101B32]">লাইভ কাস্টমার অর্ডার তালিকা ({orders.length}টি)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-slate-400">
                  <th className="pb-3 font-bold">অর্ডার নম্বর</th>
                  <th className="pb-3 font-bold">গ্রাহকের নাম ও মোবাইল</th>
                  <th className="pb-3 font-bold">ডেলিভারি ঠিকানা</th>
                  <th className="pb-3 font-bold">মোট বিল</th>
                  <th className="pb-3 font-bold">বর্তমান অবস্থা</th>
                  <th className="pb-3 font-bold text-right">স্ট্যাটাস পরিবর্তন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="py-3.5 font-mono font-bold text-[#0D4C3B]">{o.order_number}</td>
                    <td className="py-3.5">
                      <div className="font-bold text-[#101B32]">{o.customer_name}</div>
                      <div className="text-[11px] text-slate-500">{o.customer_phone}</div>
                    </td>
                    <td className="py-3.5 text-slate-600 max-w-xs truncate">{o.shipping_address}</td>
                    <td className="py-3.5 font-black text-[#101B32]">৳{o.total_amount}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          o.status === "delivered"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : o.status === "confirmed"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => updateStatus(o.id, "confirmed")}
                        className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100"
                      >
                        নিশ্চিত
                      </button>
                      <button
                        onClick={() => updateStatus(o.id, "delivered")}
                        className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100"
                      >
                        ডেলিভার্ড
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
