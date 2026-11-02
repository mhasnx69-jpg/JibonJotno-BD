"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Search,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Droplet,
  Users,
  CheckCircle2,
} from "lucide-react";

interface BloodDonor {
  id: string;
  name: string;
  group: string;
  district: string;
  area: string;
  phone: string;
  last_donation: string;
}

const BLOOD_DONORS: BloodDonor[] = [
  {
    id: "bd-1",
    name: "সন্ধানী ব্লাড ব্যাংক (ডিএমসি ইউনিট)",
    group: "সকল গ্রুপ",
    district: "ঢাকা",
    area: "ঢাকা মেডিকেল কলেজ, বকশীবাজার",
    phone: "01711200000",
    last_donation: "জরুরি রক্ত সংরক্ষণাগার",
  },
  {
    id: "bd-2",
    name: "বাংলাদেশ রেড ক্রিসেন্ট জাতীয় রক্ত কেন্দ্র",
    group: "সকল গ্রুপ",
    district: "ঢাকা",
    area: "৭/৫ ঔরঙ্গজেব রোড, মোহাম্মদপুর",
    phone: "01811458524",
    last_donation: "ব্লাড ব্যাংক ও কম্পোনেন্ট",
  },
  {
    id: "bd-3",
    name: "বাঁধন (স্বেচ্ছায় রক্তদাতাদের সংগঠন)",
    group: "সকল গ্রুপ",
    district: "ঢাকা",
    area: "টিএসসি, ঢাকা বিশ্ববিদ্যালয়",
    phone: "01521400000",
    last_donation: "বিশ্ববিদ্যালয় রক্তদাতা নেটওয়ার্ক",
  },
  {
    id: "bd-4",
    name: "মোঃ তানভীর হাসান (স্বেচ্ছাসেবী রক্তদাতা)",
    group: "O+",
    district: "ঢাকা",
    area: "মিরপুর-১০, ঢাকা",
    phone: "01712345678",
    last_donation: "৩ মাস পূর্বে রক্তদান করেছেন (প্রস্তুত)",
  },
  {
    id: "bd-5",
    name: "আরিফুল ইসলাম (স্বেচ্ছাসেবী রক্তদাতা)",
    group: "A+",
    district: "চট্টগ্রাম",
    area: "জিইসি মোড়, চট্টগ্রাম",
    phone: "01819876543",
    last_donation: "৪ মাস পূর্বে রক্তদান করেছেন (প্রস্তুত)",
  },
  {
    id: "bd-6",
    name: "ফারহানা আক্তার (স্বেচ্ছাসেবী রক্তদাতা)",
    group: "B+",
    district: "রাজশাহী",
    area: "বোয়ালিয়া, রাজশাহী",
    phone: "01733221100",
    last_donation: "৫ মাস পূর্বে রক্তদান করেছেন (প্রস্তুত)",
  },
  {
    id: "bd-7",
    name: "কবির হোসেন (স্বেচ্ছাসেবী রক্তদাতা)",
    group: "AB+",
    district: "ঢাকা",
    area: "উত্তরা সেক্টর ৭",
    phone: "01911998877",
    last_donation: "প্রস্তুত",
  },
];

const BLOOD_GROUPS = ["সকল গ্রুপ", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function BloodBankPage() {
  const [selectedGroup, setSelectedGroup] = useState("সকল গ্রুপ");
  const [selectedDistrict, setSelectedDistrict] = useState("সকল জেলা");

  const filteredDonors = BLOOD_DONORS.filter((item) => {
    const matchesGroup =
      selectedGroup === "সকল গ্রুপ" || item.group === selectedGroup || item.group === "সকল গ্রুপ";
    const matchesDistrict =
      selectedDistrict === "সকল জেলা" || item.district === selectedDistrict;
    return matchesGroup && matchesDistrict;
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
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>লাইভ রক্তদাতা ও ব্লাড ব্যাংক নেটওয়ার্ক</span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ব্যানার */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white space-y-3 shadow-xl">
          <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/20 text-rose-100 border border-white/20">
            🩸 রক্তের গ্রুপ ভিত্তিক জরুরি অনুসন্ধান
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">ব্লাড ব্যাংক ও স্বেচ্ছায় রক্তদাতা</h1>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
            জরুরি রক্তের প্রয়োজনে রক্তের গ্রুপ এবং জেলা নির্বাচন করে সরাসরি রক্তদাতা অথবা ব্লাড ব্যাংকে যোগাযোগ করুন।
          </p>
        </div>

        {/* ফিল্টার বক্স */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 shadow-xs space-y-4">
          <div>
            <span className="text-xs font-bold text-[#101B32] block mb-2">রক্তের গ্রুপ নির্বাচন করুন:</span>
            <div className="flex flex-wrap gap-2">
              {BLOOD_GROUPS.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    selectedGroup === bg
                      ? "bg-rose-600 text-white shadow-xs scale-105"
                      : "bg-[#F7F9FC] text-[#7B8AA4] hover:text-[#101B32] border border-[#E5EBF2]"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#F1F5F9] overflow-x-auto">
            <span className="text-xs font-bold text-[#7B8AA4] shrink-0">জেলা:</span>
            {["সকল জেলা", "ঢাকা", "চট্টগ্রাম", "রাজশাহী"].map((dist) => (
              <button
                key={dist}
                onClick={() => setSelectedDistrict(dist)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedDistrict === dist
                    ? "bg-[#0D4C3B] text-white"
                    : "bg-[#F7F9FC] text-[#7B8AA4] hover:text-[#101B32]"
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* ডোনার তালিকা */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDonors.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#E5EBF2] p-6 hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-700">
                    গ্রুপ: {item.group}
                  </span>
                  <span className="text-[11px] font-bold text-[#7B8AA4] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ভেরিফাইড</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#101B32]">{item.name}</h3>
                  <p className="text-xs text-[#7B8AA4] flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>{item.area}, {item.district}</span>
                  </p>
                </div>

                <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                  {item.last_donation}
                </p>
              </div>

              <a
                href={`tel:${item.phone}`}
                className="w-full py-3 rounded-2xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
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