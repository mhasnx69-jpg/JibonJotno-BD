"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FlaskConical,
  Search,
  PhoneCall,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from "lucide-react";

interface DiagnosticTest {
  id: string;
  name_bn: string;
  name_en: string;
  govt_rate: number;
  private_rate: number;
  sample_type: string;
  home_collection: boolean;
}

const DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  {
    id: "cbc",
    name_bn: "সিবিসি টেস্ট (CBC with ESR)",
    name_en: "Complete Blood Count",
    govt_rate: 150,
    private_rate: 400,
    sample_type: "রক্ত (Blood)",
    home_collection: true,
  },
  {
    id: "lipid",
    name_bn: "লিপিড প্রোফাইল (রক্তের চর্বি পরীক্ষা)",
    name_en: "Lipid Profile",
    govt_rate: 400,
    private_rate: 1000,
    sample_type: "রক্ত (খালি পেটে)",
    home_collection: true,
  },
  {
    id: "serum_creatinine",
    name_bn: "সিরাম ক্রিয়েটিনিন (কিডনি পরীক্ষা)",
    name_en: "Serum Creatinine",
    govt_rate: 100,
    private_rate: 350,
    sample_type: "রক্ত (Blood)",
    home_collection: true,
  },
  {
    id: "hba1c",
    name_bn: "এইচবিএ১সি (৩ মাসের ডায়াবেটিস গড়)",
    name_en: "HbA1c Test",
    govt_rate: 350,
    private_rate: 900,
    sample_type: "রক্ত (Blood)",
    home_collection: true,
  },
  {
    id: "ultrasono",
    name_bn: "আল্ট্রাসনোগ্রাম (পুরো পেট)",
    name_en: "USG of Whole Abdomen",
    govt_rate: 220,
    private_rate: 1200,
    sample_type: "ইমেজিং (ল্যাবে উপস্থিত হতে হবে)",
    home_collection: false,
  },
  {
    id: "ecg",
    name_bn: "ইসিজি (হৃদযন্ত্রের পরীক্ষা)",
    name_en: "12-Lead ECG",
    govt_rate: 80,
    private_rate: 350,
    sample_type: "ইলেক্ট্রোকার্ডিওগ্রাম",
    home_collection: false,
  },
];

export default function DiagnosticCentersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookedState, setBookedState] = useState<string | null>(null);

  const filteredTests = DIAGNOSTIC_TESTS.filter(
    (t) =>
      t.name_bn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      <div className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
            <span>ল্যাব টেস্ট খরচ তালিকা ও হোম স্যাম্পল</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-gradient-to-r from-[#0D4C3B] to-[#07372B] rounded-3xl p-6 sm:p-8 text-white space-y-3 shadow-xl">
          <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#FFB91F]/20 text-[#FFB91F] border border-[#FFB91F]/30">
            🔬 ন্যায্য ল্যাব খরচ ও বুকিং
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">ডায়াগনস্টিক টেস্ট ও হোম স্যাম্পল</h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            সরকারি হাসপাতালের নির্ধারিত মূল্য ও শীর্ষ বেসরকারি ডায়াগনস্টিক সেন্টারের তুলনামূলক খরচ জানুন।
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-4 sm:p-6 shadow-xs flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="টেস্টের নাম দিয়ে খুঁজুন (যেমন: CBC, Creatinine)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
            />
          </div>
          <span className="hidden sm:inline-block text-xs text-[#7B8AA4]">
            {filteredTests.length}টি টেস্ট পাওয়া গেছে
          </span>
        </div>

        {bookedState && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ধন্যবাদ! <strong>{bookedState}</strong>-এর জন্য আপনার অনুরোধ গৃহীত হয়েছে। আমাদের ল্যাব প্রতিনিধি দ্রুত কল দেবেন।</span>
            </div>
            <button onClick={() => setBookedState(null)} className="font-bold underline ml-2">বন্ধ করুন</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl border border-[#E5EBF2] p-6 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100">
                    {test.sample_type}
                  </span>
                  {test.home_collection ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      হোম স্যাম্পল সম্ভব
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      ল্যাব ভিজিট
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#101B32]">{test.name_bn}</h3>
                  <p className="text-xs text-[#7B8AA4] pt-0.5">{test.name_en}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#F1F5F9]">
                  <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EBF2]">
                    <span className="text-[10px] text-[#7B8AA4] block">সরকারি হাসপাতালের রেট:</span>
                    <span className="font-extrabold text-[#0D4C3B] text-sm">৳ {test.govt_rate}</span>
                  </div>
                  <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EBF2]">
                    <span className="text-[10px] text-[#7B8AA4] block">শীর্ষ বেসরকারি ল্যাব রেট:</span>
                    <span className="font-bold text-[#101B32] text-sm">৳ {test.private_rate}</span>
                  </div>
                </div>
              </div>

              {test.home_collection ? (
                <button
                  onClick={() => setBookedState(test.name_bn)}
                  className="w-full py-2.5 rounded-2xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>বাসা থেকে স্যাম্পল বুক করুন</span>
                </button>
              ) : (
                <Link
                  href="/hospitals"
                  className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>নিকটস্থ ল্যাব খুঁজুন</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-6 px-4 text-center text-xs mt-12 border-t border-emerald-900">
        <p>© 2026 JibonJotno. সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}