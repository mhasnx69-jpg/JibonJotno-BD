"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, Scale, AlertOctagon, HeartHandshake, PhoneCall } from "lucide-react";

export default function DisclaimerPage() {
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
        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          আইনি সতর্কতা ও নীতি
        </span>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#F1F5F9] pb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#101B32]">আইনি সতর্কতা ও মেডিকেল ডিসক্লেইমার</h1>
              <p className="text-xs text-[#7B8AA4]">সর্বশেষ হালনাগাদ: নভেম্বর ২০২৬ • গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের নীতিমালা অনুযায়ী</p>
            </div>
          </div>

          <div className="space-y-5 text-xs sm:text-sm text-[#334155] leading-relaxed">
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-950 font-medium space-y-2">
              <div className="flex items-center gap-2 font-black text-rose-800">
                <AlertOctagon className="w-5 h-5 shrink-0" />
                <span>জরুরি স্বাস্থ্য সতর্কতা (Emergency Notice)</span>
              </div>
              <p>
                জীবনযত্ন (JibonJotno) কোনো হাসপাতাল বা জরুরি চিকিৎসাকেন্দ্র নয়। আপনার বা রোগীর অবস্থা আশঙ্কাজনক হলে অবিলম্বে জাতীয় জরুরি সেবা <strong>৯৯৯ (999)</strong> অথবা স্বাস্থ্য বাতায়ন <strong>১৬২৬৩ (16263)</strong> নম্বরে কল করুন কিংবা নিকটস্থ সরকারি/বেসরকারি হাসপাতালের জরুরি বিভাগে যোগাযোগ করুন।
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-[#101B32]">১. চিকিৎসকের বিকল্প নয় (No Doctor-Patient Relationship)</h2>
              <p>
                এই ওয়েবসাইটে প্রকাশিত ওষুধের বিবরণ, সেবনমাত্রা, ক্লিনিক্যাল তথ্য, রোগের নির্দেশিকা এবং স্বাস্থ্য ক্যালকুলেটরের ফলাফল শুধুমাত্র সাধারণ জনসচেতনতা ও তথ্যগত সহায়তার জন্য প্রস্তুতকৃত। এটি কোনোভাবেই বিএমডিসি (BMDC) নিবন্ধিত চিকিৎসকের সরাসরি প্রেসক্রিপশন বা ক্লিনিক্যাল ডায়াগনোসিসের বিকল্প নয়। যেকোনো ওষুধ গ্রহণের পূর্বে অবশ্যই বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন।
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-[#101B32]">২. ওষুধ আইন ও প্রেসক্রিপশন বাধ্যবাধকতা (Drugs Act 1940 Compliance)</h2>
              <p>
                ঔষধ প্রশাসন অধিদপ্তর (DGDA), The Drugs Act 1940 এবং The Drugs (Control) Ordinance 1982 অনুযায়ী প্রেসক্রিপশনভুক্ত (Rx) সকল ওষুধের জন্য নিবন্ধিত চিকিৎসকের বৈধ প্রেসক্রিপশন আপলোড করা বাধ্যতামূলক। প্রেসক্রিপশন যাচাই ও অনুমোদনের পরই ফার্মাসিস্ট ওষুধ সরবরাহ করবে।
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-[#101B32]">৩. তথ্যের নির্ভুলতা ও দায়মুক্তি (Limitation of Liability)</h2>
              <p>
                আমরা ওষুধ ও স্বাস্থ্য তথ্যের নির্ভুলতা নিশ্চিত করতে সর্বোচ্চ চেষ্টা করি। তবে প্রস্তুতকারক কোম্পানি কর্তৃক ওষুধের ফর্মুলা পরিবর্তন, সরকারি গ্যাজেটে মূল্যের পরিবর্তন কিংবা ব্যবহারকারীর ভুল ডোজ গ্রহণের ফলে উদ্ভূত কোনো প্রত্যক্ষ বা পরোক্ষ শারীরিক ক্ষতির দায় জীবনযত্ন কর্তৃপক্ষ বহন করবে না।
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-[#101B32]">৪. জরুরি যোগাযোগ</h2>
              <p>
                যেকোনো অভিযোগ, আইনি নোটিশ বা তথ্যের স্পষ্টীকরণের জন্য আমাদের সাথে যোগাযোগ করুন: ইমেইল: <span className="font-semibold text-[#0D4C3B]">legal@jibonjotno.com</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}