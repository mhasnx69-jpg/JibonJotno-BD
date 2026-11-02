"use client";

import React from "react";
import Link from "next/link";
import { AlertOctagon, Lock, ShieldCheck, HeartHandshake, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#07372B] text-emerald-100 mt-16 font-sans">
      
      {/* Bangladesh Legal Disclaimer Banner */}
      <div className="bg-[#04241C] border-b border-emerald-900/60 py-6 px-4 sm:px-8">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm 2xl:text-base font-black text-amber-200">
                জরুরি স্বাস্থ্য ও আইনি বিজ্ঞপ্তি (Medical & Legal Disclaimer)
              </h4>
              <p className="text-[11px] sm:text-xs 2xl:text-sm text-emerald-200/80 leading-relaxed max-w-5xl">
                জীবনযত্ন একটি তথ্যপ্রযুক্তিভিত্তিক স্বাস্থ্য তথ্য ও ডেলিভারি সহায়ক প্ল্যাটফর্ম—এটি কোনো হাসপাতাল বা নিবন্ধিত চিকিৎসাকেন্দ্র নয়। এখানে প্রকাশিত সকল তথ্য জনসচেতনতার উদ্দেশ্যে প্রস্তুত। যেকোনো জরুরি অবস্থায় সরাসরি <strong>৯৯৯</strong> অথবা স্বাস্থ্য বাতায়ন <strong>১৬২৬৩</strong> নম্বরে যোগাযোগ করুন।
              </p>
            </div>
          </div>

          <Link
            href="/disclaimer"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-amber-400 text-emerald-950 font-black text-xs sm:text-sm hover:bg-amber-300 transition-colors shadow-xs"
          >
            আইনি সতর্কতা ও শর্তাবলী
          </Link>
        </div>
      </div>

      {/* Main Grid Links */}
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white text-[#0D4C3B] flex items-center justify-center font-black text-lg">
              +
            </div>
            <span className="text-xl 2xl:text-2xl font-black text-white">জীবনযত্ন</span>
          </div>
          <p className="text-xs 2xl:text-sm text-emerald-200/70 leading-relaxed">
            বাংলাদেশের সকল মানুষের জন্য নির্ভরযোগ্য, নির্ভুল ও ১০০% ক্যাশ অন ডেলিভারি ভিত্তিক ডিজিটাল স্বাস্থ্য তথ্য সেবা।
          </p>
          <div className="text-[11px] 2xl:text-xs text-emerald-300 flex items-center gap-1.5 pt-1">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL এনক্রিপ্টেড ডাটাবেস</span>
          </div>
        </div>

        <div className="space-y-2.5 text-xs 2xl:text-sm">
          <h4 className="font-extrabold text-white text-sm 2xl:text-base">প্রয়োজনীয় সেবা</h4>
          <ul className="space-y-2 text-emerald-200/80">
            <li><Link href="/medicines" className="hover:text-white transition-colors">ঔষধ নির্দেশিকা ও মূল্য তালিকা</Link></li>
            <li><Link href="/pharmacy" className="hover:text-white transition-colors">অনলাইন ফার্মেসি (ক্যাশ অন ডেলিভারি)</Link></li>
            <li><Link href="/health-guides" className="hover:text-white transition-colors">স্বাস্থ্য নির্দেশিকা (২৫+ রোগ)</Link></li>
            <li><Link href="/pediatric-dose" className="hover:text-white transition-colors">শিশুর প্যারাসিটামল ডোজ ক্যালকুলেটর</Link></li>
            <li><Link href="/hospitals" className="hover:text-white transition-colors">আইসিইউ ও হাসপাতালের ম্যাপ</Link></li>
          </ul>
        </div>

        <div className="space-y-2.5 text-xs 2xl:text-sm">
          <h4 className="font-extrabold text-white text-sm 2xl:text-base">জরুরি হটলাইন</h4>
          <ul className="space-y-2 text-emerald-200/80">
            <li><Link href="/ambulance" className="hover:text-white transition-colors">জরুরি অ্যাম্বুলেন্স ও পুলিশ: ৯৯৯</Link></li>
            <li><Link href="/ambulance" className="hover:text-white transition-colors">সরকারি স্বাস্থ্য বাতায়ন: ১৬২৬৩</Link></li>
            <li><Link href="/blood-bank" className="hover:text-white transition-colors">জরুরি রক্ত ব্যাংক নেটওয়ার্ক</Link></li>
            <li><Link href="/order-tracking" className="hover:text-white transition-colors">লাইভ অর্ডার ট্র্যাকিং ও ক্যাশ মেমো</Link></li>
          </ul>
        </div>

        <div className="space-y-2.5 text-xs 2xl:text-sm">
          <h4 className="font-extrabold text-white text-sm 2xl:text-base">আইন ও সুরক্ষা</h4>
          <ul className="space-y-2 text-emerald-200/80">
            <li><Link href="/privacy" className="hover:text-white transition-colors underline font-medium">গোপনীয়তা ও ডেটা সুরক্ষা নীতি</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white transition-colors underline font-medium">আইনি সতর্কতা ও দায়মুক্তি</Link></li>
            <li><span className="text-emerald-400 font-semibold">ঔষধ আইন ১৯৪০ ও ১৯৮২ মেনে পরিচালিত</span></li>
            <li><span className="text-emerald-300">সরকারি ওয়েবসাইট নয় (বেসরকারি সামাজিক উদ্যোগ)</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-900/60 py-4 px-4 text-center text-xs 2xl:text-sm text-emerald-300/80">
        <p>© 2026 জীবনযত্ন (JibonJotno) • সর্বস্বত্ব সংরক্ষিত • সরকারি ওয়েবসাইট নয়।</p>
      </div>
    </footer>
  );
}
