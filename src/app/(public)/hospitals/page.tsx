"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import HospitalMap, { HospitalLocation } from "@/components/map/HospitalMap";
import {
  ArrowLeft,
  MapPin,
  PhoneCall,
  Search,
  Activity,
  ShieldCheck,
  Building2,
  Clock,
  Navigation,
} from "lucide-react";

const HOSPITALS_DATA: HospitalLocation[] = [
  {
    id: "hosp-1",
    name: "ঢাকা মেডিকেল কলেজ ও হাসপাতাল (DMCH)",
    type: "সরকারি",
    lat: 23.72598,
    lng: 90.39763,
    district: "ঢাকা",
    area: "বকশীবাজার, ঢাকা",
    icu_available: true,
    total_icu_beds: 50,
    phone: "02-55165001",
  },
  {
    id: "hosp-2",
    name: "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU)",
    type: "সরকারি",
    lat: 23.73977,
    lng: 90.39572,
    district: "ঢাকা",
    area: "শাহবাগ, ঢাকা",
    icu_available: true,
    total_icu_beds: 40,
    phone: "02-9661051",
  },
  {
    id: "hosp-3",
    name: "জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল (NICVD)",
    type: "সরকারি",
    lat: 23.77123,
    lng: 90.37056,
    district: "ঢাকা",
    area: "শেরেবাংলা নগর, ঢাকা",
    icu_available: true,
    total_icu_beds: 35,
    phone: "02-9122560",
  },
  {
    id: "hosp-4",
    name: "কুর্মিটোলা জেনারেল হাসপাতাল",
    type: "সরকারি",
    lat: 23.82424,
    lng: 90.41249,
    district: "ঢাকা",
    area: "বিমানবন্দর সড়ক, ঢাকা ক্যান্ট.",
    icu_available: true,
    total_icu_beds: 30,
    phone: "02-55067201",
  },
  {
    id: "hosp-5",
    name: "স্কয়ার হাসপাতাল লিমিটেড",
    type: "বেসরকারি",
    lat: 23.75331,
    lng: 90.38166,
    district: "ঢাকা",
    area: "পান্থপথ, ঢাকা",
    icu_available: true,
    total_icu_beds: 45,
    phone: "10616",
  },
  {
    id: "hosp-6",
    name: "ইউনাইটেড হাসপাতাল লিমিটেড",
    type: "বেসরকারি",
    lat: 23.80556,
    lng: 90.41583,
    district: "ঢাকা",
    area: "গুলশান-২, ঢাকা",
    icu_available: true,
    total_icu_beds: 35,
    phone: "10666",
  },
];

export default function HospitalsPage() {
  const { lang, setLang, t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState("সকল জেলা");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHospitals = HOSPITALS_DATA.filter((h) => {
    const matchesDistrict = selectedDistrict === "সকল জেলা" || h.district === selectedDistrict;
    const matchesSearch =
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.area.toLowerCase().includes(searchTerm.toLowerCase());
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
            <span>{t("হোমে ফিরে যান", "Back to Home")}</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="inline-flex items-center bg-[#F7F9FC] border border-[#E5EBF2] rounded-full p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLang("bn")}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === "bn" ? "bg-[#0D4C3B] text-white shadow-xs" : "text-[#7B8AA4]"
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  lang === "en" ? "bg-[#0D4C3B] text-white shadow-xs" : "text-[#7B8AA4]"
                }`}
              >
                EN
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t("আইসিইউ ও জরুরি হাসপাতাল ডিরেক্টরি", "ICU & Hospital Directory")}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ব্যানার */}
        <div className="bg-gradient-to-r from-[#0D4C3B] to-[#07372B] rounded-3xl p-6 sm:p-8 text-white space-y-3 shadow-xl">
          <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#FFB91F]/20 text-[#FFB91F] border border-[#FFB91F]/30">
            {t("🏥 ২৪ ঘণ্টা জরুরি স্বাস্থ্যসেবা", "🏥 24/7 Emergency Care")}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            {t("আইসিইউ ও জরুরি হাসপাতাল লাইভ ম্যাপ", "Live ICU & Emergency Hospital Map")}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            {t(
              "ম্যাপে যেকোনো হাসপাতালে ক্লিক করে সরাসরি জরুরি আইসিইউ বেড সংখ্যা, হটলাইন নম্বর এবং গুগল ম্যাপস ডিরেকশন দেখুন।",
              "Click on any hospital on the map to see real-time ICU beds, hotline phone numbers, and Google Maps directions."
            )}
          </p>
        </div>

        {/* Interactive Leaflet Map */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#101B32] flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#0D4C3B]" />
              <span>{t("রিয়েল-টাইম আইসিইউ হাসপাতাল ম্যাপ (ঢাকা ও আশপাশ)", "Real-time ICU Map (Dhaka & Surrounding)")}</span>
            </h2>
            <span className="text-[11px] text-[#7B8AA4]">পিন চিহ্নিত হাসপাতালে ক্লিক করুন</span>
          </div>
          <HospitalMap hospitals={filteredHospitals} />
        </div>

        {/* সার্চ ও ফিল্টার */}
        <div className="bg-white rounded-3xl border border-[#E5EBF2] p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("হাসপাতাল বা এলাকার নাম লিখুন...", "Search hospital or area name...")}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
            {["সকল জেলা", "ঢাকা"].map((dist) => (
              <button
                key={dist}
                onClick={() => setSelectedDistrict(dist)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedDistrict === dist
                    ? "bg-[#0D4C3B] text-white"
                    : "bg-[#F7F9FC] text-[#7B8AA4] hover:text-[#101B32] border border-[#E5EBF2]"
                }`}
              >
                {dist}
              </button>
            ))}
          </div>
        </div>

        {/* হাসপাতাল গ্রিড কার্ডস */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-3xl border border-[#E5EBF2] p-6 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      hosp.type === "সরকারি"
                        ? "bg-emerald-50 text-[#0D4C3B] border border-emerald-100"
                        : "bg-blue-50 text-blue-700 border border-blue-100"
                    }`}
                  >
                    {hosp.type} {t("হাসপাতাল", "Hospital")}
                  </span>
                  {hosp.icu_available && (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                      {t("আইসিইউ বেড", "ICU Beds")}: {hosp.total_icu_beds}+
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#101B32]">{hosp.name}</h3>
                  <p className="text-xs text-[#7B8AA4] flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0D4C3B] shrink-0" />
                    <span>{hosp.area}, {hosp.district}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
                <a
                  href={`tel:${hosp.phone}`}
                  className="w-full py-2.5 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t("জরুরি কল", "Call Hotline")} ({hosp.phone})</span>
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${hosp.lat},${hosp.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t("গুগল ম্যাপে ডিরেকশন", "Google Maps Direction")}</span>
                </a>
              </div>
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