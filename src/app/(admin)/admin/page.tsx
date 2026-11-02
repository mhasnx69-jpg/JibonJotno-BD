"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  ShieldCheck,
  ShoppingBag,
  Pill,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Truck,
  ArrowLeft,
  Search,
  Filter,
  Phone,
  MapPin,
  RefreshCw,
  Edit3,
  DollarSign,
  Package,
  Layers,
} from "lucide-react";

interface AdminOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  delivery_area: string;
  total_amount: number;
  order_status: string;
  created_at: string;
}

interface AdminMedicine {
  id: string;
  name_bn: string;
  name_en: string;
  slug: string;
  dosage_form: string;
  strength: string;
  is_prescription_required: boolean;
  publication_status: string;
  pharmacy_products?: {
    id: string;
    selling_price: number;
    unit_mrp: number;
    stock_quantity: number;
    pack_unit: string;
  }[];
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "inventory">("orders");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [medicines, setMedicines] = useState<AdminMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();

      // ১. সকল অর্ডার ফেচ করা
      const { data: orderData } = await supabase
        .from("orders")
        .select("id, order_number, customer_name, customer_phone, delivery_address, delivery_area, total_amount, order_status, created_at")
        .order("created_at", { ascending: false });

      if (orderData) {
        setOrders(orderData as AdminOrder[]);
      }

      // ২. সকল ওষুধ ও স্টক ফেচ করা
      const { data: medData } = await supabase
        .from("medicines")
        .select(`
          id,
          name_bn,
          name_en,
          slug,
          dosage_form,
          strength,
          is_prescription_required,
          publication_status,
          pharmacy_products ( id, selling_price, unit_mrp, stock_quantity, pack_unit )
        `)
        .order("created_at", { ascending: false });

      if (medData) {
        setMedicines(medData as unknown as AdminMedicine[]);
      }
    } catch (err) {
      console.error("Admin load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // অর্ডার স্ট্যাটাস আপডেট হ্যান্ডলার
  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setStatusUpdatingId(orderId);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("orders")
        .update({ order_status: newStatus })
        .eq("id", orderId);

      if (!error) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // স্টক আপডেট হ্যান্ডলার
  const handleUpdateStock = async (productId: string, newStock: number) => {
    if (newStock < 0) return;
    try {
      const supabase = createClient();
      await supabase
        .from("pharmacy_products")
        .update({ stock_quantity: newStock })
        .eq("id", productId);

      setMedicines((prev) =>
        prev.map((m) => ({
          ...m,
          pharmacy_products: m.pharmacy_products?.map((p) =>
            p.id === productId ? { ...p, stock_quantity: newStock } : p
          ),
        }))
      );
    } catch (err) {
      console.error("Stock update error:", err);
    }
  };

  // ড্যাশবোর্ড পরিসংখ্যান
  const totalOrdersCount = orders.length;
  const pendingReviewCount = orders.filter((o) => o.order_status === "pending_prescription_review").length;
  const totalRevenue = orders
    .filter((o) => o.order_status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

  // ফিল্টার করা অর্ডার
  const filteredOrders = orders.filter(
    (o) =>
      o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      
      {/* অ্যাডমিন হেডার */}
      <header className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl text-[#7B8AA4] hover:text-[#0D4C3B] hover:bg-emerald-50 transition-colors"
              title="ওয়েবসাইটে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg text-[#0D4C3B]">জীবনযত্ন অ্যাডমিন ও ফার্মাসিস্ট পোর্টাল</h1>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-[#0D4C3B]">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-[#7B8AA4]">লাইভ অর্ডার ও ফার্মেসি ইনভেন্টরি কন্ট্রোল</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-3.5 py-1.5 rounded-xl border border-[#E5EBF2] hover:bg-slate-50 text-xs font-bold text-[#7B8AA4] hover:text-[#101B32] flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>রিফ্রেশ</span>
            </button>
            <Link
              href="/"
              className="px-4 py-1.5 rounded-xl bg-[#0D4C3B] text-white text-xs font-bold hover:bg-[#12614A] transition-colors"
            >
              লাইভ সাইট দেখুন
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ৪টি পরিসংখ্যান কার্ড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#E5EBF2] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#7B8AA4] uppercase tracking-wider block">সর্বমোট অর্ডার</span>
              <span className="text-2xl font-black text-[#101B32]">{totalOrdersCount}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E5EBF2] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#7B8AA4] uppercase tracking-wider block">প্রেসক্রিপশন রিভিউ বাকি</span>
              <span className="text-2xl font-black text-amber-700">{pendingReviewCount}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E5EBF2] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#7B8AA4] uppercase tracking-wider block">তালিকাভুক্ত ঔষধ</span>
              <span className="text-2xl font-black text-[#101B32]">{medicines.length}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E5EBF2] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#7B8AA4] uppercase tracking-wider block">মোট বিক্রয় (COD)</span>
              <span className="text-2xl font-black text-emerald-800">৳ {totalRevenue.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* ট্যাব নেভিগেশন ও সার্চ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E5EBF2] pb-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "orders"
                  ? "bg-[#0D4C3B] text-white shadow-xs"
                  : "bg-white text-[#7B8AA4] hover:text-[#101B32] border border-[#E5EBF2]"
              }`}
            >
              অর্ডার ও প্রেসক্রিপশন ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeTab === "inventory"
                  ? "bg-[#0D4C3B] text-white shadow-xs"
                  : "bg-white text-[#7B8AA4] hover:text-[#101B32] border border-[#E5EBF2]"
              }`}
            >
              ওষুধ ইনভেন্টরি ও স্টক ({medicines.length})
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="অর্ডার নং, ফোন বা রোগীর নাম..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-[#E5EBF2] text-xs bg-white focus:outline-none focus:border-[#0D4C3B]"
            />
          </div>
        </div>

        {/* ১. অর্ডার ম্যানেজমেন্ট টেবিল */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-[#E5EBF2] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#F1F5F9] flex justify-between items-center">
              <h2 className="text-sm font-bold text-[#101B32] flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#0D4C3B]" />
                <span>গ্রাহক অর্ডার ও স্ট্যাটাস ট্র্যাকার</span>
              </h2>
              <span className="text-xs text-[#7B8AA4]">মোট {filteredOrders.length}টি অর্ডার পাওয়া গেছে</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F7F9FC] text-[#7B8AA4] font-bold uppercase border-b border-[#E5EBF2]">
                  <tr>
                    <th className="py-3 px-4">অর্ডার আইডি</th>
                    <th className="py-3 px-4">গ্রাহকের নাম ও ফোন</th>
                    <th className="py-3 px-4">ডেলিভারি ঠিকানা</th>
                    <th className="py-3 px-4 text-right">বিল (৳)</th>
                    <th className="py-3 px-4">বর্তমান স্ট্যাটাস</th>
                    <th className="py-3 px-4 text-center">স্ট্যাটাস পরিবর্তন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-[#7B8AA4]">
                        কোনো অর্ডার খুঁজে পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#0D4C3B]">
                          <Link href={`/order-tracking?id=${ord.order_number}`} target="_blank" className="hover:underline">
                            {ord.order_number}
                          </Link>
                          <span className="block text-[10px] text-[#7B8AA4] font-sans font-normal pt-0.5">
                            {new Date(ord.created_at).toLocaleDateString("bn-BD")}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#101B32] block">{ord.customer_name}</span>
                          <a href={`tel:${ord.customer_phone}`} className="text-[#0D4C3B] font-semibold flex items-center gap-1 hover:underline">
                            <Phone className="w-3 h-3 text-[#7B8AA4]" />
                            <span>{ord.customer_phone}</span>
                          </a>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="truncate text-slate-700">{ord.delivery_address}</p>
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                            {ord.delivery_area}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-[#101B32]">
                          ৳ {Number(ord.total_amount).toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                              ord.order_status === "delivered"
                                ? "bg-emerald-100 text-[#0D4C3B]"
                                : ord.order_status === "out_for_delivery"
                                ? "bg-blue-100 text-blue-700"
                                : ord.order_status === "processing"
                                ? "bg-purple-100 text-purple-700"
                                : ord.order_status === "pending_prescription_review"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {ord.order_status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <select
                            disabled={statusUpdatingId === ord.id}
                            value={ord.order_status}
                            onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                            className="text-xs bg-white border border-[#E5EBF2] rounded-xl px-2 py-1.5 focus:outline-none focus:border-[#0D4C3B] cursor-pointer"
                          >
                            <option value="pending_prescription_review">রিভিউ বাকি (Rx)</option>
                            <option value="order_placed">অর্ডার গৃহীত (Placed)</option>
                            <option value="processing">প্রসেসিং (Processing)</option>
                            <option value="out_for_delivery">ডেলিভারির পথে (Out)</option>
                            <option value="delivered">ডেলিভার্ড (Delivered)</option>
                            <option value="cancelled">বাতিল (Cancelled)</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ২. ওষুধ ইনভেন্টরি ও স্টক টেবিল */}
        {activeTab === "inventory" && (
          <div className="bg-white rounded-3xl border border-[#E5EBF2] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#F1F5F9] flex justify-between items-center">
              <h2 className="text-sm font-bold text-[#101B32] flex items-center gap-2">
                <Package className="w-4 h-4 text-[#0D4C3B]" />
                <span>ফার্মেসি স্টক ও খুচরা মূল্য নিয়ন্ত্রণ</span>
              </h2>
              <span className="text-xs text-[#7B8AA4]">মোট {medicines.length}টি ওষুধ রেজিস্টার্ড</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F7F9FC] text-[#7B8AA4] font-bold uppercase border-b border-[#E5EBF2]">
                  <tr>
                    <th className="py-3 px-4">ওষুধের নাম</th>
                    <th className="py-3 px-4">ফর্ম ও স্ট্রেন্থ</th>
                    <th className="py-3 px-4">প্রেসক্রিপশন</th>
                    <th className="py-3 px-4">খুচরা মূল্য (৳)</th>
                    <th className="py-3 px-4 text-center">বর্তমান স্টক (প্যাক)</th>
                    <th className="py-3 px-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {medicines.map((med) => {
                    const prod = med.pharmacy_products?.[0];
                    const stock = prod?.stock_quantity ?? 0;

                    return (
                      <tr key={med.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <Link href={`/medicines/${med.slug}`} target="_blank" className="font-bold text-[#101B32] hover:text-[#0D4C3B]">
                            {med.name_bn}
                          </Link>
                          <span className="block text-[11px] text-[#7B8AA4]">{med.name_en}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                            {med.dosage_form} • {med.strength}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {med.is_prescription_required ? (
                            <span className="text-rose-600 font-bold text-[10px]">Rx আবশ্যক</span>
                          ) : (
                            <span className="text-emerald-700 font-bold text-[10px]">OTC</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-black text-[#0D4C3B]">
                          ৳ {prod ? Number(prod.selling_price).toFixed(2) : "N/A"}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="inline-flex items-center gap-2">
                            <span className={`font-extrabold text-sm ${stock <= 10 ? "text-rose-600" : "text-[#101B32]"}`}>
                              {stock}
                            </span>
                            <span className="text-[10px] text-[#7B8AA4]">({prod?.pack_unit || "Pcs"})</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {prod && (
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() => handleUpdateStock(prod.id, stock - 10)}
                                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]"
                                title="স্টক ১০ কমান"
                              >
                                -১০
                              </button>
                              <button
                                onClick={() => handleUpdateStock(prod.id, stock + 10)}
                                className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0D4C3B] font-bold text-[11px]"
                                title="স্টক ১০ বাড়ান"
                              >
                                +১০
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900">
        <p>© 2026 JibonJotno Admin & Pharmacist Control Center • সরকারি ওয়েবসাইট নয়</p>
      </footer>
    </div>
  );
}