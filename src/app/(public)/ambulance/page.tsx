"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PhoneCall,
  MapPin,
  Search,
  ShieldCheck,
  Truck,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface AmbulanceProvider {
  id: string;
  name: string;
  type: string; // ICU, AC, Non-AC, Freezing, Oxygen
  district: string;
  area: string;
  phone: string;
  available_24_7: boolean;
  base_fare: string;
}

const AMBULANCE_DATA: AmbulanceProvider[] = [
  {
    id: "amb-1",
    name: "আল-মারকাজুল ইসলামি ডেডিকেটেড অ্যাম্বুলেন্স",
    type: "ICU ও নরমাল অ্যাম্বুলেন্স",
    district: "ঢাকা",
    area: "মোহাম্মদপুর / সমগ্র ঢাকা",
    phone: "01711429129",
    available_24_7: true,
    base_fare: "মানবিক সেবামূল্য",
  },
  {
    id: "amb-2",
    name: "আঞ্জুমান মফিদুল ইসলাম অ্যাম্বুলেন্স সার্ভিস",
    type: "নরমাল ও ফ্রিজিং অ্যাম্বুলেন্স",
    district: "ঢাকা",
    area: "কাকরাইল / ঢাকা",
    phone: "01711547370",
    available_24_7: true,
    base_fare: "স্বল্পমূল্য / অনুদানভিত্তিক",
  },
  {
    id: "amb-3",
    name: "বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি অ্যাম্বুলেন্স",
    type: "জরুরি রেসকিউ ও আইসিইউ",
    district: "ঢাকা",
    area: "মগবাজার / সমগ্র বাংলাদেশ",
    phone: "01811458524",
    available_24_7: true,
    base_fare: "সরকারি রেট",
  },
  {
    id: "amb-4",
    name: "ঢাকা মেডিকেল কলেজ জরুরি অ্যাম্বুলেন্স পুল",
    type: "সরকারি ডেডিকেটেড অ্যাম্বুলেন্স",
    district: "ঢাকা",
    area: "বকশীবাজার, ঢাকা",
    phone: "01715011744",
    available_24_7: true,
    base_fare: "সরকারি নির্ধারিত ফি",
  },
  {
    id: "amb-5",
    name: "চট্টগ্রাম মেট্রোপলিটন অ্যাম্বুলেন্স ও অক্সিজেন নেটওয়ার্ক",
    type: "আইসিইউ ও অক্সিজেন সিলিন্ডার",
    district: "চট্টগ্রাম",
    area: "জিইসি মোড় / পাঁচলাইশ",
    phone: "01819313233",
    available_24_7: true,
    base_fare: "দূরত্ব অনুযায়ী",
  },
  {
    id: "amb-6",
    name: "রাজশাহী মেডিকেল জরুরি অ্যাম্বুলেন্স ও অক্সিজেন সার্ভিস",
    type: "এসি ও আইসিইউ অ্যাম্বুলেন্স",
    district: "রাজশাহী",
    area: "লক্ষ্মীপুর, রাজশাহী",
    phone: "01711342526",
    available_24_7: true,
    base_fare: "দূরত্ব অনুযায়ী",
  },
];

export default function AmbulancePage() {
  const [searchDistrict, setSearchDistrict] = useState("সকল জেলা");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = AMBULANCE_DATA.filter((item) => {
    const matchesDistrict = searchDistrict === "সকল জেলা" || item.district === searchDistrict;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      {/* হেডার */}
      <div className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <span>জরুরি ২৪/৭ লাইভ ডিরেক্টরি</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* জাতীয় হটলাইন ব্যানার */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-red-800 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-rose-100 border border-white/20">
                🚨 তাৎক্ষণিক সরকারি হেল্পলাইন
              </span>
              <h1 className="text-2xl sm:text-3xl font-black">জরুরি অ্যাম্বুলেন্স ও অক্সিজেন সেবা</h1>
              <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
                যেকোনো মারাত্মক জরুরি অবস্থায় কালক্ষেপণ না করে সরাসরি জাতীয় জরুরি হেল্পলাইনে কল দিন।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:999"
                className="px-5 py-2.5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-black text-sm flex items-center gap-2 shadow-md transition-all hover:scale-105"
              >
                <PhoneCall className="w-4 h-4" />
                <span>৯৯৯ (জাতীয় জরুরি সেবা)</span>
              </a>
              <a
                href="tel:16263"
                className="px-5 py-2.5 rounded-2xl bg-rose-950/60 text-white hover:bg-rose-950 font-bold text-sm flex items-center gap-2 border border-white/20 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>১৬২৬৩ (স্বাস্থ্য বাতায়ন)</span>
              </a>
            </div>
          </div>
        </div>

        {/* ফিল্টার ও সার্চ বার */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="অ্যাম্বুলেন্সের নাম, এলাকা বা ধরণ লিখুন..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
            {["সকল জেলা", "ঢাকা", "চট্টগ্রাম", "রাজশাহী"].map((dist) => (
              <button
                key={dist}
                onClick={() => setSearchDistrict(dist)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  searchDistrict === dist
                    ? "bg-[#0D4C3B] text-white"
                    : "bg-[#F7F9FC] text-[#7B8AA4] hover:text-[#101B32] border border-[#E5EBF2]"
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* অ্যাম্বুলেন্স তালিকা */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#E5EBF2] p-6 hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-rose-50 text-rose-700 border border-rose-100 flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>{item.type}</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>২৪ ঘণ্টা খোলা</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#101B32]">{item.name}</h3>
                  <p className="text-xs text-[#7B8AA4] flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>{item.area}, {item.district}</span>
                  </p>
                </div>

                <div className="text-xs bg-[#F7F9FC] p-3 rounded-2xl border border-[#E5EBF2] flex justify-between items-center">
                  <span className="text-[#7B8AA4]">ভাড়া কাঠামো:</span>
                  <span className="font-bold text-[#101B32]">{item.base_fare}</span>
                </div>
              </div>

              <a
                href={`tel:${item.phone}`}
                className="w-full py-3 rounded-2xl bg-[#ED174C] hover:bg-[#d01442] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>সরাসরি কল দিন ({item.phone})</span>
              </a>
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