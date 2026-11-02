"use client";

import React, { useState } from "react";
import { Building2, Plus, Phone, Trash2, HeartPulse } from "lucide-react";

export default function AdminHospitalsPage() {
  const [hospitals, setHospitals] = useState([
    {
      id: "hosp-1",
      name: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
      district: "ঢাকা",
      total_beds: 2600,
      icu_beds_free: 8,
      hotline: "02-55165088",
      ambulance: "01711100010",
    },
    {
      id: "hosp-2",
      name: "কুর্মিটোলা জেনারেল হাসপাতাল",
      district: "ঢাকা",
      total_beds: 500,
      icu_beds_free: 5,
      hotline: "02-8712345",
      ambulance: "01711100020",
    },
    {
      id: "hosp-3",
      name: "চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল",
      district: "চট্টগ্রাম",
      total_beds: 1500,
      icu_beds_free: 3,
      hotline: "031-619400",
      ambulance: "01711100030",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    district: "ঢাকা",
    total_beds: "",
    icu_beds_free: "",
    hotline: "",
    ambulance: "",
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    const newH = {
      id: "hosp-" + Date.now(),
      name: formData.name.trim(),
      district: formData.district,
      total_beds: Number(formData.total_beds) || 100,
      icu_beds_free: Number(formData.icu_beds_free) || 0,
      hotline: formData.hotline.trim() || "01700000000",
      ambulance: formData.ambulance.trim() || "01700000000",
    };
    setHospitals([newH, ...hospitals]);
    setFormData({ name: "", district: "ঢাকা", total_beds: "", icu_beds_free: "", hotline: "", ambulance: "" });
  };

  const updateIcu = (id: string, delta: number) => {
    setHospitals(
      hospitals.map((h) =>
        h.id === id ? { ...h, icu_beds_free: Math.max(0, h.icu_beds_free + delta) } : h
      )
    );
  };

  return (
    <div className="flex-1 p-8 space-y-6">
        <header className="border-b pb-4 border-slate-200">
          <h1 className="text-xl font-black text-[#101B32] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-700" />
            <span>হাসপাতাল ডিরেক্টরি ও লাইভ আইসিইউ (ICU) ট্র্যাকার</span>
          </h1>
          <p className="text-xs text-[#7B8AA4]">সারা দেশের হাসপাতাল, ডায়াগনস্টিক সেন্টার ও লাইভ আইসিইউ বেড পরিচালনা করুন।</p>
        </header>

        {/* Add Form */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5EBF2] shadow-xs">
          <h2 className="text-sm font-black text-[#101B32] mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-700" />
            <span>নতুন হাসপাতাল বা ক্লিনিক যুক্ত করুন</span>
          </h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              required
              placeholder="হাসপাতালের নাম"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
            />
            <input
              type="text"
              placeholder="জেলা / শহর (যেমন: ঢাকা, রাজশাহী)"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
            />
            <input
              type="number"
              placeholder="মোট বেড সংখ্যা"
              value={formData.total_beds}
              onChange={(e) => setFormData({ ...formData, total_beds: e.target.value })}
              className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
            />
            <input
              type="number"
              placeholder="ফাঁকা আইসিইউ (ICU) বেড সংখ্যা"
              value={formData.icu_beds_free}
              onChange={(e) => setFormData({ ...formData, icu_beds_free: e.target.value })}
              className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
            />
            <input
              type="tel"
              placeholder="জরুরি হটলাইন নম্বর"
              value={formData.hotline}
              onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
              className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
            />
            <input
              type="tel"
              placeholder="অ্যাম্বুলেন্স হেল্পলাইন"
              value={formData.ambulance}
              onChange={(e) => setFormData({ ...formData, ambulance: e.target.value })}
              className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
            />
            <button
              type="submit"
              className="md:col-span-3 py-3 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-bold transition-all"
            >
              হাসপাতাল তথ্য যোগ করুন
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5EBF2] shadow-xs space-y-4">
          <h2 className="text-sm font-black text-[#101B32]">লাইভ হাসপাতাল ও বেড তালিকা</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-slate-400">
                  <th className="pb-3 font-bold">হাসপাতাল নাম ও জেলা</th>
                  <th className="pb-3 font-bold">মোট বেড</th>
                  <th className="pb-3 font-bold">ফাঁকা আইসিইউ (ICU)</th>
                  <th className="pb-3 font-bold">জরুরি যোগাযোগ</th>
                  <th className="pb-3 font-bold text-right">আইসিইউ পরিবর্তন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hospitals.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold text-[#101B32]">
                      {h.name} <span className="text-[11px] text-slate-500 font-normal">({h.district})</span>
                    </td>
                    <td className="py-3 text-slate-600">{h.total_beds}টি</td>
                    <td className="py-3 font-extrabold text-emerald-700">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                        {h.icu_beds_free}টি খালি
                      </span>
                    </td>
                    <td className="py-3 text-slate-600">
                      <div>হটলাইন: {h.hotline}</div>
                      <div className="text-[11px] text-emerald-700">অ্যাম্বুলেন্স: {h.ambulance}</div>
                    </td>
                    <td className="py-3 text-right space-x-1.5">
                      <button
                        onClick={() => updateIcu(h.id, -1)}
                        className="px-2 py-1 rounded-md bg-rose-50 text-rose-700 font-bold hover:bg-rose-100"
                      >
                        - ১ বেড
                      </button>
                      <button
                        onClick={() => updateIcu(h.id, 1)}
                        className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100"
                      >
                        + ১ বেড
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
