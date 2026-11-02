import AdminSidebar from '@/components/admin/AdminSidebar';
import { createClient } from "@/lib/supabase/server";
import { Pill, Plus, CheckCircle, AlertTriangle } from "lucide-react";
import { createMedicineAndProduct } from "@/modules/medicines/medicines.actions";
import { MediaUploader } from "@/components/admin/MediaUploader";

/**
 * JibonJotno (জীবনযত্ন) — Admin Medicine & Pharmacy CMS Page
 */
export default async function AdminMedicinesPage() {
  const supabase = await createClient();

  // ডাটাবেস থেকে বর্তমান ওষুধসমূহের তালিকা ফেচ করা
  const { data: medicines, error } = await supabase
    .from("medicines")
    .select(`
      id,
      name_en,
      name_bn,
      publication_status,
      created_at,
      medicine_brands(name_en),
      dosage_forms(name_en),
      medicine_strengths(strength_value)
    `)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">ওষুধ নির্দেশিকা ও ফার্মেসি CMS</h2>
          <p className="text-sm text-slate-500 mt-1">ডাটাবেসের সকল ওষুধ রেফারেন্স এবং সেলেবল প্রোডাক্ট পরিচালনা করুন।</p>
        </div>
      </div>

      {/* নতুন ওষুধ যুক্ত করার ফর্ম */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-brand-600" />
          <span>নতুন ওষুধ ও ফার্মেসি পণ্য যুক্ত করুন</span>
        </h3>

        <form action={async (formData) => {
          "use server";
          await createMedicineAndProduct(formData);
        }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">ওষুধের ইংরেজি নাম (Brand/Name)</label>
            <input type="text" name="name_en" required placeholder="Napa Extra" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">ওষুধের বাংলা নাম</label>
            <input type="text" name="name_bn" required placeholder="নাপা এক্সট্রা" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">জেনেরিক নাম (Generic Name)</label>
            <input type="text" name="generic_name" required placeholder="Paracetamol + Caffeine" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">ব্র্যান্ড নাম (Brand)</label>
            <input type="text" name="brand_name" required placeholder="Beximco Pharmaceuticals" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">প্রস্তুতকারক কোম্পানি (Manufacturer)</label>
            <input type="text" name="manufacturer_name" required placeholder="Beximco" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">থেরাপিউটিক ক্যাটাগরি</label>
            <input type="text" name="category_name" required placeholder="Analgesic / Pain Relief" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">ডোজ ফরম (Dosage Form)</label>
            <input type="text" name="dosage_form" required placeholder="Tablet" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">শক্তি (Strength)</label>
            <input type="text" name="strength" required placeholder="500 mg" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">বিক্রয়মূল্য (BDT Price)</label>
            <input type="number" step="0.01" name="price_bdt" required placeholder="3.50" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">প্রাথমিক স্টক পরিমাণ (Stock Qty)</label>
            <input type="number" name="stock_qty" defaultValue={100} required className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">প্যাক সাইজ (Pack Unit)</label>
            <input type="text" name="pack_unit" defaultValue="10s Strip" required className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">প্রেসক্রিপশন প্রয়োজন কি না?</label>
            <select name="rx_required" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              <option value="false">না (OTC - Over the Counter)</option>
              <option value="true">হ্যাঁ (Prescription Required)</option>
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-semibold text-slate-700 block">ইউটিউব ভিডিও তথ্য লিংক (Optional YouTube URL)</label>
            <input type="url" name="youtube_url" placeholder="https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>

          <div className="sm:col-span-3 pt-4">
            <button type="submit" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-colors">
              ওষুধ ও পণ্য ডাটাবেসে প্রকাশ করুন
            </button>
          </div>
        </form>
      </div>

      {/* বর্তমান ওষুধের তালিকা টেবিল */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">বিদ্যমান ওষুধের তালিকা ({medicines?.length || 0})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="py-4 px-6 font-semibold">ওষুধের নাম</th>
                <th className="py-4 px-6 font-semibold">ডোজ ও শক্তি</th>
                <th className="py-4 px-6 font-semibold">স্ট্যাটাস</th>
                <th className="py-4 px-6 font-semibold">তারিখ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {medicines && medicines.length > 0 ? (
                medicines.map((med: any) => (
                  <tr key={med.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">
                      {med.name_en} <span className="text-slate-400 font-normal">({med.name_bn})</span>
                    </td>
                    <td className="py-4 px-6">
                      {med.dosage_forms?.name_en} • {med.medicine_strengths?.strength_value}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5" /> {med.publication_status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs">
                      {new Date(med.created_at).toLocaleDateString("bn-BD")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    কোনো ওষুধ ডাটাবেসে পাওয়া যায়নি। উপরে ফর্ম পূরণ করে নতুন ওষুধ যুক্ত করুন।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
