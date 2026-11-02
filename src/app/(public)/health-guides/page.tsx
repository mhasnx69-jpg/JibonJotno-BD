"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Search,
  ShieldAlert,
  ChevronRight,
  HeartPulse,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface HealthGuide {
  id: string;
  title_bn: string;
  category: string;
  summary: string;
  first_aid: string[];
  warning_signs: string[];
  recommended_actions: string;
}

const HEALTH_GUIDES_DATA: HealthGuide[] = [
  {
    id: "dengue",
    title_bn: "ডেঙ্গু জ্বর (Dengue Fever)",
    category: "মৌসুমি সংক্রামক রোগ",
    summary: "এডিশ মশার কামড়ে হওয়া ভাইরাসজনিত তীব্র জ্বর, হাড় ও চোখের পেছনে ব্যথা।",
    first_aid: [
      "প্রচুর পরিমাণে পানি, ওরস্যালাইন, ডাবের পানি এবং তরল খাবার পান করান।",
      "জ্বর কমাতে শুধু প্যারাসিটামল সেবন করুন। কখনোই অ্যাসপিরিন বা আইবুপ্রোফেন খাবেন না।",
      "দিনে ৩-৪ বার নরম ভেজা কাপড় দিয়ে সারা শরীর আলতো করে স্পঞ্জ করুন।",
    ],
    warning_signs: [
      "মাড়ি বা নাক দিয়ে রক্তপাত",
      "ক্রমাগত বমি ও তীব্র পেটব্যথা",
      "প্লাটিলেট দ্রুত কমে যাওয়া এবং তীব্র দুর্বলতা",
    ],
    recommended_actions: "উদ্বেগজনক লক্ষণ দেখা দিলে অবিলম্বে সিবিসি (CBC) ও এনএস১ টেস্ট করিয়ে হাসপাতালে ভর্তি করান।",
  },
  {
    id: "hypertension",
    title_bn: "উচ্চ রক্তচাপ (High Blood Pressure)",
    category: "দীর্ঘমেয়াদী রোগ",
    summary: "রক্তনালীতে অতিরিক্ত চাপের কারণে হৃদরোগ ও স্ট্রোকের ঝুঁকি তৈরি হয়।",
    first_aid: [
      "রোগীকে শান্ত রাখুন এবং নিরিবিলি খোলামেলা স্থানে বসিয়ে দিন।",
      "অতিরিক্ত লবণ, প্রক্রিয়াজাত খাবার ও ধূমপান থেকে সম্পূর্ণ বিরত রাখুন।",
      "পূর্বে চিকিৎসকের প্রেসক্রাইব করা প্রেশারের ওষুধ নিয়মমতো সেবন নিশ্চিত করুন।",
    ],
    warning_signs: [
      "তীব্র মাথাব্যথা ও ঘাড়ে প্রচণ্ড চাপ",
      "বুকে ব্যথা বা অস্বস্তি এবং শ্বাসকষ্ট",
      "চোখে ঝাপসা দেখা বা হঠাৎ ভারসাম্য হারানো",
    ],
    recommended_actions: "প্রেসার ১৮০/১২০ মিলিমিটার পারদের বেশি হলে অবিলম্বে নিকটস্থ জরুরি বিভাগে নিয়ে যান।",
  },
  {
    id: "diabetes",
    title_bn: "ডায়াবেটিস ও হাইপোগ্লাইসেমিয়া (Diabetes Care)",
    category: "হরমোনজনিত রোগ",
    summary: "রক্তে গ্লুকোজের মাত্রা অস্বাভাবিক বেড়ে যাওয়া বা হঠাৎ বিপজ্জনকভাবে কমে যাওয়া।",
    first_aid: [
      "রক্তে সুগার ৪ মিলিমোলের নিচে নামলে (হাইপো) সাথে সাথে মিষ্টি শরবত বা চকলেট খাওয়ান।",
      "প্রতিদিন নির্দিষ্ট সময়ে সুষম খাবার ও নিয়মিত হাঁটার অভ্যাস গড়ে তুলুন।",
      "পায়ের যে কোনো ক্ষত দ্রুত চিকিৎসকের পরামর্শ অনুযায়ী পরিষ্কার রাখুন।",
    ],
    warning_signs: [
      "হঠাৎ বুক ধড়ফড় করা, অতিরিক্ত ঘাম ও হাত কাঁপুনি",
      "কথা জড়িয়ে যাওয়া বা বিভ্রান্তিকর আচরণ",
      "জ্ঞান হারিয়ে ফেলা",
    ],
    recommended_actions: "গ্লুকোমিটার দিয়ে তাৎক্ষণিক সুগার মাপুন এবং প্রতি ৩ মাস পর পর HbA1c পরীক্ষা করুন।",
  },
  {
    id: "burns",
    title_bn: "আগুনে পোড়া বা গরম তরল লাগা (Burns First Aid)",
    category: "দুর্ঘটনা ও ট্রমা",
    summary: "রান্নাঘর বা বৈদ্যুতিক উৎস থেকে ত্বকের ক্ষতিগ্রস্ত হওয়া।",
    first_aid: [
      "আক্রান্ত স্থানে টানা ১৫-২০ মিনিট সাধারণ তাপমাত্রার পানির ধারা ঢালুন।",
      "কখনোই বরফ, টুথপেস্ট, ডিমের কুসুম বা লবণ লাগাবেন না।",
      "ক্ষতস্থানটি পরিষ্কার শুকনো জীবাণুমুক্ত গজ দিয়ে আলতো করে ঢেকে রাখুন।",
    ],
    warning_signs: [
      "পোড়া অংশে বড় ফোসকা পড়া বা ত্বক সাদা/কালো হয়ে যাওয়া",
      "মুখমণ্ডল বা যৌনাঙ্গের ত্বক পুড়ে যাওয়া",
      "তীব্র যন্ত্রণা ও সংক্রমণের লক্ষণ",
    ],
    recommended_actions: "১০%-এর বেশি ত্বক পুড়ে গেলে অবিলম্বে জাতীয় বার্ন ও প্লাস্টিক সার্জারি ইনস্টিটিউটে নিয়ে যান।",
  },
];

export default function HealthGuidesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<HealthGuide>(HEALTH_GUIDES_DATA[0] as HealthGuide);

  const filteredGuides = HEALTH_GUIDES_DATA.filter((g) =>
    g.title_bn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.summary.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D4C3B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>২০+ রোগের প্রাথমিক চিকিৎসা গাইড</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-gradient-to-r from-[#0D4C3B] to-[#07372B] rounded-3xl p-6 sm:p-8 text-white space-y-3 shadow-xl">
          <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#FFB91F]/20 text-[#FFB91F] border border-[#FFB91F]/30">
            🩺 প্রাথমিক স্বাস্থ্য সচেতনতা
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">রোগ ও প্রাথমিক চিকিৎসা গাইডলাইন</h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            জরুরি অবস্থায় কী করবেন এবং কী করা থেকে বিরত থাকবেন—চিকিৎসকদের অনুমোদিত সঠিক নির্দেশিকা।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="রোগের নাম লিখুন..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-white"
              />
            </div>

            <div className="space-y-2">
              {filteredGuides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedGuide.id === guide.id
                      ? "bg-white border-[#0D4C3B] shadow-sm ring-1 ring-[#0D4C3B]"
                      : "bg-white border-[#E5EBF2] hover:border-[#0D4C3B]/40"
                  }`}
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#0D4C3B]">
                    {guide.category}
                  </span>
                  <h3 className="font-bold text-sm text-[#101B32] pt-1">{guide.title_bn}</h3>
                  <p className="text-xs text-[#7B8AA4] line-clamp-1 pt-0.5">{guide.summary}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b border-[#F1F5F9] pb-4">
                <span className="text-xs font-bold text-[#0D4C3B]">{selectedGuide.category}</span>
                <h2 className="text-xl sm:text-2xl font-black text-[#101B32] pt-1">
                  {selectedGuide.title_bn}
                </h2>
                <p className="text-xs sm:text-sm text-[#7B8AA4] pt-1">{selectedGuide.summary}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0D4C3B] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>জরুরি প্রাথমিক চিকিৎসা (যা অবিলম্বে করবেন)</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#101B32]">
                  {selectedGuide.first_aid.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EBF2]">
                      <span className="font-bold text-[#0D4C3B] shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-rose-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>বিপদচিহ্ন (Danger Signs)</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-rose-900 bg-rose-50 p-4 rounded-2xl border border-rose-200">
                  {selectedGuide.warning_signs.map((sign, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <span className="font-bold block text-emerald-800">পরবর্তী পরামর্শ:</span>
                <p className="leading-relaxed">{selectedGuide.recommended_actions}</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                সতর্কবার্তা: এই প্রাথমিক চিকিৎসা নির্দেশিকা শুধুমাত্র সাময়িক সহায়তার জন্য। যেকোনো জটিলতায় রেজিস্টার্ড চিকিৎসকের পরামর্শ নিন।
              </span>
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