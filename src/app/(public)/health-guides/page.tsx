"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Activity,
  HeartPulse,
  Flame,
  AlertTriangle,
  ShieldAlert,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Stethoscope,
} from "lucide-react";

interface GuideItem {
  id: string;
  category: string;
  title_bn: string;
  title_en: string;
  urgency: "Emergency" | "Critical" | "Standard";
  symptoms: string[];
  first_aid_dos: string[];
  first_aid_donts: string[];
  hotline?: string;
}

const OFFLINE_HEALTH_GUIDES: GuideItem[] = [
  {
    id: "g-1",
    category: "জরুরি সংকেত",
    title_bn: "হার্ট অ্যাটাক (Heart Attack)",
    title_en: "Heart Attack First Aid",
    urgency: "Emergency",
    symptoms: [
      "বুকে তীব্র ব্যথা বা প্রচণ্ড চাপ অনুভব হওয়া, যা বাম হাত, ঘাড় বা চোয়ালে ছড়ায়",
      "প্রচণ্ড ঘাম হওয়া, শ্বাসকষ্ট এবং বমি ভাব",
      "মাথা ঘোরানো এবং হঠাৎ শারীরিক দুর্বলতা",
    ],
    first_aid_dos: [
      "রোগীকে অবিলম্বে আরামদায়কভাবে বসিয়ে দিন (শুয়ে দেবেন না)",
      "তাৎক্ষণিকভাবে ৩২৫ মিলিগ্রাম অ্যাসপিরিন (যেমন Ecospirin/Disprin) চিবিয়ে খেতে দিন (যদি অ্যালার্জি না থাকে)",
      "অবিলম্বে জাতীয় জরুরি সেবা ৯৯৯ বা হৃদরোগ হাসপাতালে নেওয়ার ব্যবস্থা করুন",
    ],
    first_aid_donts: [
      "রোগীকে একা রেখে যাবেন না বা তাকে নিজে গাড়ি চালাতে দেবেন না",
      "রোগীকে পানি বা ভারী কোনো খাবার খাওয়ানোর চেষ্টা করবেন না",
      "গ্যাসের ব্যথা মনে করে সময় নষ্ট করবেন না",
    ],
    hotline: "৯৯৯ অথবা ১৬২৬৩",
  },
  {
    id: "g-2",
    category: "জরুরি সংকেত",
    title_bn: "ব্রেন স্ট্রোক (Brain Stroke - FAST Rule)",
    title_en: "Acute Stroke Protocol",
    urgency: "Emergency",
    symptoms: [
      "F (Face): মুখের একপাশ বাঁকা হয়ে যাওয়া বা অবশ হওয়া",
      "A (Arms): এক হাত বা পা উপরে তুলতে না পারা বা দুর্বল লাগা",
      "S (Speech): কথা জড়িয়ে যাওয়া বা স্পষ্ট কথা বলতে না পারা",
      "T (Time): অবিলম্বে রোগীকে ৩ ঘণ্টার মধ্যে নিউরোলজি হাসপাতালে নেওয়া",
    ],
    first_aid_dos: [
      "রোগীর লক্ষণ দেখা দেওয়ার সঠিক সময় লিখে রাখুন",
      "রোগীকে একপাশে কাত করে শুইয়ে দিন যাতে শ্বাসপ্রশ্বাস বন্ধ না হয়",
      "দ্রুত সিটি স্ক্যান (CT Scan) সুবিধা আছে এমন হাসপাতালে স্থানান্তর করুন",
    ],
    first_aid_donts: [
      "কোনো ব্যথানাশক বা অ্যাসপিরিন ওষুধ দেবেন না (রক্তক্ষরণজনিত স্ট্রোক হলে বিপদ বাড়বে)",
      "রোগীর মুখে কোনো ধরনের পানি বা তরল খাবার দেবেন না",
      "রোগীর মাথায় তেল মালিশ করে সময় নষ্ট করবেন না",
    ],
    hotline: "১৬২৬৩",
  },
  {
    id: "g-3",
    category: "মৌসুমি রোগ",
    title_bn: "ডেঙ্গু জ্বর ও শক সিন্ড্রোম (Dengue Management)",
    title_en: "Dengue Clinical Guideline",
    urgency: "Critical",
    symptoms: [
      "হঠাৎ তীব্র জ্বর (১০৩-১০৫ ডিগ্রি), শরীর ও চোখের পেছনে তীব্র ব্যথা",
      "জ্বরের ৩-৪ দিন পর তীব্র পেটব্যথা ও ক্রমাগত বমি হওয়া",
      "শরীরে লাল র‍্যাশ, দাঁতের মাড়ি বা নাক দিয়ে রক্তপাত এবং চরম ক্লান্তি",
    ],
    first_aid_dos: [
      "জ্বর কমানোর জন্য শুধুমাত্র প্যারাসিটামল সেবন করুন ও শরীর ভেজা কাপড় দিয়ে মুছুন",
      "প্রচুর পরিমাণে ওরাল স্যালাইন, ডাবের পানি, লেবুর শরবত ও তরল খাবার দিন",
      "প্রতিদিন রক্তের প্লাটিলেট ও হেমাটোক্রিট (CBC) পরীক্ষা করুন",
    ],
    first_aid_donts: [
      "কোনো অবস্থাতেই ব্যথানাশক (NSAIDs যেমন: Diclofenac, Ibuprofen) খাবেন না",
      "ডাক্তারের পরামর্শ ছাড়া কোনো অ্যান্টিবায়োটিক সেবন করবেন না",
      "পানিশূন্যতা সৃষ্টি হতে দেবেন না",
    ],
    hotline: "১৬২৬৩",
  },
  {
    id: "g-4",
    category: "দুর্ঘটনা ও ট্রমা",
    title_bn: "সাপে কাটা (Snake Bite Emergency)",
    title_en: "Snake Bite Protocol",
    urgency: "Emergency",
    symptoms: [
      "দংশনের স্থানে দুটি দাঁতের দাগ, তীব্র জ্বালা ও দ্রুত ফুলে যাওয়া",
      "চোখের পাতা ভারী হয়ে আসা, ঝাপসা দেখা বা ঘুম ঘুম ভাব",
      "মুখে অতিরিক্ত লালা ঝরা ও গিলতে বা শ্বাস নিতে কষ্ট হওয়া",
    ],
    first_aid_dos: [
      "দংশিত অঙ্গটি সম্পূর্ণ স্থির রাখুন (ভাঙা হাড়ের মতো কাঠের টুকরো বা স্প্লিন্ট দিয়ে বাঁধুন)",
      "রোগীকে আশ্বস্ত ও শান্ত রাখুন, আতঙ্কিত হলে বিষ দ্রুত রক্তে ছড়ায়",
      "অবিলম্বে ১০০ ভায়াল অ্যান্টিভেনম সুবিধাসম্পন্ন নিকটস্থ সরকারি মেডিকেল বা সদর হাসপাতালে নিন",
    ],
    first_aid_donts: [
      "দংশিত স্থানে দড়ি দিয়ে শক্ত গিঁট দেবেন না বা ব্লেড দিয়ে কাটবেন না",
      "মুখ দিয়ে বিষ চুষে বের করার চেষ্টা করবেন না",
      "ওঝা বা কবিরাজের কাছে নিয়ে মহামূল্যবান সময় নষ্ট করবেন না",
    ],
    hotline: "৯৯৯",
  },
  {
    id: "g-5",
    category: "দুর্ঘটনা ও ট্রমা",
    title_bn: "আগুনে পোড়া (Burns & Scalds)",
    title_en: "Burn First Aid",
    urgency: "Critical",
    symptoms: ["ত্বক লাল হয়ে যাওয়া, প্রচণ্ড জ্বালাপোড়া ও ফোসকা পড়া"],
    first_aid_dos: [
      "পোড়া স্থানে কমপক্ষে ২০ মিনিট সাধারণ তাপমাত্রার পরিষ্কার পানি ঢালুন",
      "পরিষ্কার শুকনো সুতি কাপড় দিয়ে আলতো করে ঢেকে রাখুন",
      "পোড়া বেশি হলে প্রচুর পানি ও ওরাল স্যালাইন খেতে দিন",
    ],
    first_aid_donts: [
      "পোড়া স্থানে বরফ, ডিমের কুসুম, টুথপেস্ট বা গোবর লাগাবেন না",
      "পোড়ার ফোসকা কোনো অবস্থাতেই ফাটাবেন না",
      "পোড়া চামড়া টেনে তোলার চেষ্টা করবেন না",
    ],
    hotline: "১৬২৬৩",
  },
  {
    id: "g-6",
    category: "শিশু স্বাস্থ্য",
    title_bn: "শিশুর ডায়রিয়া ও পানিশূন্যতা",
    title_en: "Pediatric Diarrhea",
    urgency: "Standard",
    symptoms: [
      "ঘন ঘন পানির মতো পাতলা পায়খানা এবং বমি",
      "চোখ কোটরে ঢুকে যাওয়া, অতিরিক্ত তৃষ্ণা ও প্রস্রাব কমে যাওয়া",
    ],
    first_aid_dos: [
      "প্রতিবার পাতলা পায়খানার পর পর্যাপ্ত ওরাল স্যালাইন (ORS) চামচে করে খাওয়ান",
      "মায়ের বুকের দুধ ও স্বাভাবিক খাবার স্বাভাবিক নিয়মে চালিয়ে যান",
      "১০-১৪ দিন বয়স অনুযায়ী জিংক (Zinc) সিরাপ নিয়মিত খাওয়ান",
    ],
    first_aid_donts: [
      "ডায়রিয়া বন্ধ করার জন্য কোনো ধরনের অ্যান্টি-ডায়েরিয়াল ওষুধ খাওয়াবেন না",
      "স্যালাইন তৈরিতে গরম পানি ব্যবহার করবেন না বা অতিরিক্ত ঘন করবেন না",
      "খাবার বন্ধ করবেন না",
    ],
    hotline: "১৬২৬৩",
  },
];

export default function HealthGuidesPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("সকল নির্দেশিকা");

  const categories = ["সকল নির্দেশিকা", "জরুরি সংকেত", "মৌসুমি রোগ", "দুর্ঘটনা ও ট্রমা", "শিশু স্বাস্থ্য"];

  const filtered = OFFLINE_HEALTH_GUIDES.filter((item) => {
    const q = search.toLowerCase();
    const matchCat = activeTab === "সকল নির্দেশিকা" || item.category === activeTab;
    const matchSearch =
      item.title_bn.toLowerCase().includes(q) ||
      item.title_en.toLowerCase().includes(q) ||
      item.symptoms.some((s) => s.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] font-sans flex flex-col">
      <header className="bg-white border-b border-[#E5EBF2] h-14 sm:h-16 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমে ফিরে যান</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            অফলাইন প্রস্তুত স্বাস্থ্য তথ্য
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl 2xl:max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Banner */}
        <div className="bg-[#0D4C3B] rounded-3xl p-6 sm:p-10 text-white space-y-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
              OFFLINE EMERGENCY CLINICAL DIRECTORY
            </span>
            <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-black">
              জরুরি স্বাস্থ্য নির্দেশিকা ও প্রাথমিক চিকিৎসা
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              জরুরি পরিস্থিতিতে তাৎক্ষণিক জীবনরক্ষাকারী করণীয়, বর্জনীয় ও সরকারি হটলাইন। ইন্টারনেট সংযোগ ছাড়াও তথ্যগুলো পড়ার উপযোগী করে তৈরি।
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-2xl">
            <Search className="w-4 h-4 text-[#7B8AA4] absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="রোগ বা উপসর্গের নাম লিখুন (যেমন: হার্ট অ্যাটাক, ডেঙ্গু, পোড়া)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-[#101B32] text-xs sm:text-sm focus:outline-none shadow-md"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === cat
                    ? "bg-[#FFB91F] text-[#101B32] shadow-sm"
                    : "bg-white/10 hover:bg-white/20 text-emerald-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid (Responsive 1/2/3 Cols for Mobile, Tablet, Desktop, TV) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#E5EBF2] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-[#7B8AA4] bg-[#F7F9FC] px-2.5 py-1 rounded-md border border-[#E5EBF2]">
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      item.urgency === "Emergency"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {item.urgency === "Emergency" ? "তাত্ক্ষণিক জরুরি" : "সতর্কতা প্রয়োজন"}
                  </span>
                </div>

                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#101B32]">
                    {item.title_bn}
                  </h2>
                  <p className="text-xs text-[#7B8AA4]">{item.title_en}</p>
                </div>

                {/* Symptoms */}
                <div className="space-y-1.5 bg-[#F7F9FC] p-3 rounded-2xl border border-[#E5EBF2]">
                  <h3 className="text-xs font-bold text-[#101B32] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-600" />
                    <span>প্রধান লক্ষণসমূহ:</span>
                  </h3>
                  <ul className="text-[11px] sm:text-xs text-[#334155] space-y-1 pl-4 list-disc">
                    {item.symptoms.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* DOs */}
                <div className="space-y-1.5 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200">
                  <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>জরুরি করণীয় (Do's):</span>
                  </h3>
                  <ul className="text-[11px] sm:text-xs text-emerald-950 space-y-1 pl-4 list-disc font-medium">
                    {item.first_aid_dos.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                {/* DONTs */}
                <div className="space-y-1.5 bg-rose-50/70 p-3 rounded-2xl border border-rose-200">
                  <h3 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-rose-700" />
                    <span>যা কখনোই করবেন না (Don'ts):</span>
                  </h3>
                  <ul className="text-[11px] sm:text-xs text-rose-950 space-y-1 pl-4 list-disc font-medium">
                    {item.first_aid_donts.map((dt, idx) => (
                      <li key={idx}>{dt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {item.hotline && (
                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                  <span className="text-[#7B8AA4] font-medium">হটলাইন:</span>
                  <a
                    href="tel:999"
                    className="font-extrabold text-rose-600 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200 hover:bg-rose-100 transition-colors flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{item.hotline}</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
