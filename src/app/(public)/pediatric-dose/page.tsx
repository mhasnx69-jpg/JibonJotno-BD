"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Baby,
  Calculator,
  ShieldAlert,
  Info,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function PediatricDosePage() {
  const [weightKg, setWeightKg] = useState<number>(10);
  const [selectedMed, setSelectedMed] = useState<"paracetamol" | "azithromycin">("paracetamol");

  // প্যারাসিটামল ক্যালকুলেশন: সাধারণত প্রতি কেজিতে ১৫ মিলিগ্রাম (প্রতি ডোজে)
  // সাধারণ ১২০ মিলিগ্রাম/৫মিলি সিরাপে: (ওজন * ১৫) / ২৪ মিলি
  const paracetamolDoseMg = Math.round(weightKg * 15);
  const paracetamolSyrupMl = Number(((weightKg * 15) / 24).toFixed(1));
  const paracetamolSpoon = (paracetamolSyrupMl / 5).toFixed(1);

  // অ্যাজিথ্রোমাইসিন ক্যালকুলেশন: প্রতি কেজিতে ১০ মিলিগ্রাম (প্রতি দিনে একবার)
  // ২০০ মিলিগ্রাম/৫মিলি সিরাপে: (ওজন * ১০) / ৪০ মিলি
  const azithromycinDoseMg = Math.round(weightKg * 10);
  const azithromycinSyrupMl = Number(((weightKg * 10) / 40).toFixed(1));

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
          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            <Baby className="w-3.5 h-3.5 text-orange-600" />
            <span>শিশুর ওজনভিত্তিক সিরাপ ডোজ ক্যালকুলেটর</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-gradient-to-r from-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white space-y-3 shadow-xl">
          <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-orange-100 border border-white/20">
            ⚖️ সঠিক পরিমাপ ও সতর্কতা
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">শিশুর সিরাপ ডোজ ক্যালকুলেটর</h1>
          <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
            শিশুর বয়স নয়, শারীরিক ওজনের ওপর ভিত্তি করে প্যারাসিটামল সিরাপের সঠিক মিলি ও চামচ পরিমাপ করুন।
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#101B32] block">
                শিশুর শারীরিক ওজন (কেজি / kg):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="3"
                  max="40"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(3, parseFloat(e.target.value) || 3))}
                  className="w-32 px-4 py-2.5 rounded-xl border border-[#E5EBF2] text-sm font-bold bg-[#F7F9FC] focus:outline-none focus:border-[#0D4C3B]"
                />
                <span className="text-xs text-[#7B8AA4]">কেজি (৩ থেকে ৪০ কেজি)</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#101B32] block">ওষুধের ধরন নির্বাচন করুন:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMed("paracetamol")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedMed === "paracetamol"
                      ? "bg-[#0D4C3B] text-white shadow-xs"
                      : "bg-[#F7F9FC] text-[#7B8AA4] border border-[#E5EBF2]"
                  }`}
                >
                  প্যারাসিটামল (জ্বর ও ব্যথা)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMed("azithromycin")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedMed === "azithromycin"
                      ? "bg-[#0D4C3B] text-white shadow-xs"
                      : "bg-[#F7F9FC] text-[#7B8AA4] border border-[#E5EBF2]"
                  }`}
                >
                  অ্যান্টিবায়োটিক (প্রেসক্রিপশন)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#F7F9FC] rounded-2xl border border-[#E5EBF2] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5EBF2] pb-3">
              <span className="text-xs font-bold text-[#7B8AA4]">গণনাকৃত সাধারণ মাত্রা:</span>
              <span className="text-xs font-extrabold text-[#0D4C3B]">ওজন: {weightKg} কেজি</span>
            </div>

            {selectedMed === "paracetamol" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E5EBF2]">
                    <span className="text-[11px] text-[#7B8AA4] block">প্রস্তাবিত প্রতি ডোজের মাত্রা:</span>
                    <span className="text-2xl font-black text-[#0D4C3B]">{paracetamolSyrupMl} মিলি (ml)</span>
                    <span className="text-xs text-[#7B8AA4] block pt-1">
                      প্রায় {paracetamolSpoon} চা চামচ (১২০ মিলিগ্রাম/৫মিলি সিরাপে)
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E5EBF2]">
                    <span className="text-[11px] text-[#7B8AA4] block">সেবনের বিরতি ও নিয়ম:</span>
                    <span className="text-sm font-bold text-[#101B32] flex items-center gap-1 pt-1">
                      <Clock className="w-4 h-4 text-[#0D4C3B]" />
                      <span>প্রতি ৬ থেকে ৮ ঘণ্টা পর পর</span>
                    </span>
                    <span className="text-[11px] text-rose-600 block pt-1">
                      ২৪ ঘণ্টায় ৪ বারের বেশি কখনোই নয়।
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#E5EBF2]">
                    <span className="text-[11px] text-[#7B8AA4] block">দৈনিক মোট মাত্রা:</span>
                    <span className="text-2xl font-black text-orange-700">{azithromycinSyrupMl} মিলি (ml)</span>
                    <span className="text-xs text-[#7B8AA4] block pt-1">
                      ২০০ মিলিগ্রাম/৫মিলি সিরাপ অনুযায়ী
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-[#E5EBF2]">
                    <span className="text-[11px] text-[#7B8AA4] block">সেবনের নিয়ম:</span>
                    <span className="text-sm font-bold text-[#101B32] block pt-1">
                      দিনে ১ বার, খাবার ১ ঘণ্টা আগে বা ২ ঘণ্টা পর
                    </span>
                    <span className="text-[11px] text-[#7B8AA4] block pt-1">
                      সাধারণত ৩ থেকে ৫ দিনের কোর্স
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">জরুরি সতর্কবার্তা:</span> এই ক্যালকুলেটর শুধুমাত্র আন্তর্জাতিক পেডিয়াট্রিক ফর্মুলার ওপর ভিত্তি করে সাধারণ ধারণার জন্য তৈরি। নবজাতক (৩ মাসের কম বয়সী শিশু) বা দীর্ঘস্থায়ী রোগের ক্ষেত্রে কোনো ওষুধ খাওয়ানোর পূর্বে অবশ্যই রেজিস্টার্ড শিশু বিশেষজ্ঞের প্রেসক্রিপশন অনুযায়ী সঠিক ডোজ জেনে নিন।
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