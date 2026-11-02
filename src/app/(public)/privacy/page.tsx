"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Database, FileCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] font-sans flex flex-col">
      <header className="bg-white border-b border-[#E5EBF2] h-14 px-4 sm:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমে ফিরে যান</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>ডেটা সুরক্ষা ও গোপনীয়তা</span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#F1F5F9] pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center border border-emerald-100">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#101B32]">গোপনীয়তা ও ডেটা সুরক্ষা নীতি</h1>
              <p className="text-xs text-[#7B8AA4]">Privacy Policy • সাইবার নিরাপত্তা ও ডেটা গোপনীয়তা মানদণ্ড</p>
            </div>
          </div>

          <div className="space-y-5 text-xs sm:text-sm text-[#334155] leading-relaxed">
            <p>
              জীবনযত্ন (JibonJotno) ব্যবহারকারীর ব্যক্তিগত ও স্বাস্থ্য তথ্যের গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। সাইবার নিরাপত্তা আইন এবং ডিজিটাল ডেটা সুরক্ষা নীতিমালার আলোকে আমরা আপনার তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করি।
            </p>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-[#101B32]">১. সংগৃহীত তথ্যাবলী</h2>
              <p>
                অর্ডার প্রক্রিয়া ও ডেলিভারির সুবিধার্থে আমরা ব্যবহারকারীর নাম, ফোন নম্বর, ডেলিভারি ঠিকানা এবং আপলোডকৃত প্রেসক্রিপশন এনক্রিপ্টেড ডাটাবেসে সংরক্ষণ করি।
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-[#101B32]">২. প্রেসক্রিপশন ও মেডিকেল ডেটা গোপনীয়তা</h2>
              <p>
                ব্যবহারকারীর আপলোডকৃত প্রেসক্রিপশন ও স্বাস্থ্য সংক্রান্ত কোনো তথ্য তৃতীয় পক্ষের কাছে বিক্রি বা বিপণনের কাজে ব্যবহার করা হয় না। এটি শুধুমাত্র রেজিস্টার্ড ফার্মাসিস্টের মাধ্যমে ওষুধ যাচাই ও প্রস্তুতকরণের উদ্দেশ্যে ব্যবহৃত হয়।
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-[#101B32]">৩. ডেটা এনক্রিপশন ও পাসওয়ার্ড নিরাপত্তা</h2>
              <p>
                ব্যবহারকারীর সকল পাসওয়ার্ড ও সেনসিটিভ ডেটা ইন্ডাস্ট্রি স্ট্যান্ডার্ড এনক্রিপশনের (Supabase Row-Level Security ও SSL 256-bit) মাধ্যমে সংরক্ষিত থাকে।
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}