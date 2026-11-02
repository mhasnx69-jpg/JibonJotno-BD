import Link from "next/link";
import {
  Search,
  Mic,
  Camera,
  Pill,
  Scale,
  BookOpen,
  MapPin,
  Heart,
  CalendarClock,
  PhoneCall,
  FlaskConical,
  Baby,
  Truck,
  ArrowRight,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Menu,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans selection:bg-[#DDF8EA] selection:text-[#0D4C3B]">
      {/* 1. Header (Exact Match to Screenshot) */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5EBF2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand & Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl font-black text-[#0D4C3B] tracking-tight">
              জীবনযত্ন
            </Link>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DDF8EA] text-[#0D4C3B]">
              ডিজিটাল স্বাস্থ্য
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/ambulance"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#ED174C] text-white hover:bg-[#d01442] transition-colors shadow-sm"
            >
              <span>🚨</span>
              <span>জরুরি</span>
            </Link>

            <Link
              href="/pharmacy"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#0D4C3B] text-white hover:bg-[#07372B] transition-colors shadow-sm"
            >
              <span>💊</span>
              <span>ফার্মেসি</span>
            </Link>

            {/* Language Switcher */}
            <div className="hidden sm:inline-flex items-center bg-[#F7F9FC] border border-[#E5EBF2] rounded-full p-0.5 text-xs font-semibold">
              <button
                type="button"
                className="px-2.5 py-1 rounded-full bg-[#0D4C3B] text-white shadow-xs"
              >
                বাংলা
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded-full text-[#7B8AA4] hover:text-[#101B32]"
              >
                EN
              </button>
            </div>

            <button
              type="button"
              aria-label="মেনু খুলুন"
              className="p-2 rounded-xl text-[#7B8AA4] hover:text-[#101B32] hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* 2. Hero Section (Deep Forest Green Container) */}
        <section className="bg-gradient-to-b from-[#0D4C3B] to-[#07372B] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-200 border border-white/15">
                ৩৫,৯৪১+ VERIFIED MEDICINES & EQUIPMENT
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FFB91F]/20 text-[#FFB91F] border border-[#FFB91F]/30">
                ⚡ ১০০% ক্যাশ অন ডেলিভারি (CASH ON DELIVERY)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              সহজ ও সঠিক স্বাস্থ্য তথ্য আপনার হাতের মুঠোয়
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
              ঔষধের বিবরণ, জেনেরিক নামের তুলনা, ২০+ রোগের প্রাথমিক চিকিৎসা, জরুরি রক্তসেবা ও আইসিইউ ম্যাপ।
            </p>

            {/* Medicine Search Box */}
            <form action="/medicines" method="GET" className="pt-2 max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-lg border border-emerald-100">
                <Search className="w-5 h-5 text-[#7B8AA4] ml-3 shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="ঔষধের নাম, জেনেরিক বা রোগ লিখে খুঁজুন (যেমন: Napa, Sergel, Omiron)..."
                  className="w-full px-3 py-2 text-sm text-[#101B32] placeholder-[#7B8AA4] focus:outline-none bg-transparent"
                />
                <button
                  type="button"
                  aria-label="কণ্ঠস্বর অনুসন্ধান"
                  className="p-2 text-[#7B8AA4] hover:text-[#0D4C3B] rounded-full transition-colors shrink-0"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs sm:text-sm font-bold transition-colors shrink-0 shadow-sm"
                >
                  খুঁজুন
                </button>
              </div>
            </form>

            {/* Prescription Upload Card */}
            <div className="pt-4 max-w-2xl mx-auto">
              <div className="bg-[#093d30]/90 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-600/40 flex items-center justify-center shrink-0 text-[#FFB91F]">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-white">
                      প্রেসক্রিপশনের ছবি তুলে এক-ক্লিকে অর্ডার
                    </h2>
                    <p className="text-[11px] text-emerald-200">
                      ঔষধ খুঁজতে না চাইলে ছবি দিন, ফার্মাসিস্ট নিজে বিল করে ফোন দেবেন।
                    </p>
                  </div>
                </div>
                <Link
                  href="/refill"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#FFB91F] hover:bg-[#e5a619] text-[#101B32] text-xs font-bold whitespace-nowrap transition-colors text-center shadow-sm"
                >
                  ছবি আপলোড করুন ➔
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Quick Navigation Strip (5 items matching screenshot) */}
        <nav
          aria-label="প্রধান নেভিগেশন তালিকা"
          className="bg-white rounded-2xl border border-[#E5EBF2] p-2 shadow-xs"
        >
          <div className="grid grid-cols-5 text-center text-xs font-semibold text-[#7B8AA4]">
            <Link
              href="/"
              className="py-2 flex flex-col items-center gap-1 text-[#0D4C3B] border-b-2 border-[#0D4C3B]"
            >
              <span>🏠</span>
              <span>হোম</span>
            </Link>
            <Link href="/medicines" className="py-2 flex flex-col items-center gap-1 hover:text-[#101B32]">
              <span>💊</span>
              <span>ঔষধ</span>
            </Link>
            <Link href="/refill" className="py-2 flex flex-col items-center gap-1 hover:text-[#101B32]">
              <span>📷</span>
              <span>Rx অর্ডার</span>
            </Link>
            <Link href="/blood-bank" className="py-2 flex flex-col items-center gap-1 hover:text-[#101B32]">
              <span>🩸</span>
              <span>রক্ত</span>
            </Link>
            <Link href="/order-tracking" className="py-2 flex flex-col items-center gap-1 hover:text-[#101B32]">
              <span>🚚</span>
              <span>ট্র্যাক</span>
            </Link>
          </div>
        </nav>

        {/* 4. Section: Core Healthcare Features */}
        <section aria-labelledby="core-features-title" className="space-y-4">
          <h2
            id="core-features-title"
            className="text-sm sm:text-base font-bold text-[#101B32] flex items-center gap-2"
          >
            <span>✨</span>
            <span>প্রধান সেবাসমূহ (Core Healthcare Features)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1: ঔষধ নির্দেশিকা */}
            <Link
              href="/medicines"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Pill className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-[#101B32]">ঔষধ নির্দেশিকা</h3>
                <p className="text-xs text-[#7B8AA4] leading-relaxed">
                  ৩৫,৯৪১+ ওষুধের ডোজ, ব্যবহার ও ক্লিনিক্যাল বিবরণী।
                </p>
                <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                  <span>ওষুধ খুঁজুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* 2: দামের তুলনা */}
            <Link
              href="/medicines"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#FFB91F] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-[#101B32]">দামের তুলনা</h3>
                <p className="text-xs text-[#7B8AA4] leading-relaxed">
                  একই জেনেরিকের বিভিন্ন কোম্পানির বিকল্প ব্র্যান্ড ও সাশ্রয়ী দাম।
                </p>
                <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                  <span>মূল্য তুলনা করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* 3: স্বাস্থ্য আর্টিকেল */}
            <Link
              href="/health-guides"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-[#101B32]">স্বাস্থ্য আর্টিকেল (২০+ রোগ)</h3>
                <p className="text-xs text-[#7B8AA4] leading-relaxed">
                  ডেঙ্গু, উচ্চ রক্তচাপ, ডায়াবেটিসসহ ২০+ রোগের প্রাথমিক চিকিৎসা গাইড।
                </p>
                <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                  <span>গাইড পড়ুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>

            {/* 4: জরুরি ও আইসিইউ ম্যাপ */}
            <Link
              href="/hospitals"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#ED174C]/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#ED174C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-[#101B32]">জরুরি ও আইসিইউ ম্যাপ</h3>
                <p className="text-xs text-[#7B8AA4] leading-relaxed">
                  ৯৯৯, ১৬২৬৩ হটলাইন এবং রিয়েল ম্যাপে দেশের সকল আইসিইউ হাসপাতাল।
                </p>
                <div className="pt-2 text-xs font-semibold text-[#ED174C] inline-flex items-center gap-1">
                  <span>ম্যাপ ও নম্বর দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* 5. Section: Specialized Services */}
        <section aria-labelledby="specialized-services-title" className="space-y-4">
          <h2
            id="specialized-services-title"
            className="text-sm sm:text-base font-bold text-[#101B32] flex items-center gap-2"
          >
            <span>⚡</span>
            <span>জরুরি স্বাস্থ্যসেবা ও স্মার্ট টুলস (Specialized Services)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Specialized 1: ব্লাড ব্যাংক */}
            <Link
              href="/blood-bank"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all relative group"
            >
              <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-[#ED174C]">
                জরুরি নেটওয়ার্ক
              </span>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#ED174C] flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-16 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">ব্লাড ব্যাংক ও রক্তদাতা</h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    রক্তের গ্রুপ অনুযায়ী সরাসরি রক্তদাতাদের ফোন নম্বর ও জরুরি রক্তের আবেদন।
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#ED174C] inline-flex items-center gap-1">
                    <span>রক্তদাতা খুঁজুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Specialized 2: মাসিক রিফিল */}
            <Link
              href="/refill"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all relative group"
            >
              <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0D4C3B]">
                অটো-সাবস্ক্রিপশন
              </span>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-16 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">মাসিক রিফিল ও পিল রিমাইন্ডার</h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    ওষুধ শেষ হওয়ার ৩ দিন আগে এসএমএস অ্যালার্ট ও স্বয়ংক্রিয় ডেলিভারি রিফিল।
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>রিফিল চালু করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Specialized 3: অ্যাম্বুলেন্স */}
            <Link
              href="/ambulance"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all relative group"
            >
              <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                ২৪/৭ সার্ভিস
              </span>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-16 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">অ্যাম্বুলেন্স ও অক্সিজেন সিলিন্ডার</h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    আইসিইউ ডেডিকেটেড অ্যাম্বুলেন্স ও ২৪ ঘণ্টার দ্রুত অক্সিজেন সিলিন্ডার।
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>কল নম্বর দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Specialized 4: ডায়াগনস্টিক টেস্ট */}
            <Link
              href="/diagnostic-centers"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">ডায়াগনস্টিক টেস্ট ও হোম স্যাম্পল</h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    সরকারি ও শীর্ষ ল্যাবের টেস্টের ন্যায্য তালিকা ও বাসা থেকে স্যাম্পল বুকিং।
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>ল্যাব খরচ দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Specialized 5: শিশুর সিরাপ ডোজ */}
            <Link
              href="/pediatric-dose"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Baby className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">শিশুর সিরাপ ডোজ ক্যালকুলেটর</h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    শিশুর ওজন অনুযায়ী প্যারাসিটামল ও অ্যান্টিবায়োটিকের মিলি/চামচ সাধারণ নির্দেশিকা।
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>মাত্রা হিসাব করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Specialized 6: লাইভ অর্ডার ট্র্যাকিং */}
            <Link
              href="/order-tracking"
              className="bg-white rounded-2xl border border-[#E5EBF2] p-5 hover:border-[#0D4C3B]/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-sm text-[#101B32]">লাইভ অর্ডার ট্র্যাকিং ও ক্যাশ মেমো</h3>
                  <p className="text-xs text-[#7B8AA4] leading-relaxed">
                    ট্র্যাকিং আইডি দিয়ে ৪-ধাপের ডেলিভারি অগ্রগতি ও ক্যাশ মেমো প্রিন্ট।
                  </p>
                  <div className="pt-2 text-xs font-semibold text-[#0D4C3B] inline-flex items-center gap-1">
                    <span>অর্ডার ট্র্যাক করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* 6. Footer (Screenshot Exact: Deep Green Background + Mandatory Disclaimers) */}
      <footer className="bg-[#07372B] text-emerald-100 py-10 px-4 sm:px-6 lg:px-8 border-t border-emerald-900 mt-12">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-black text-white tracking-tight">
              জীবনযত্ন (JibonJotno)
            </h2>
            <p className="text-xs text-emerald-200 max-w-xl mx-auto leading-relaxed">
              বাংলাদেশের সাধারণ মানুষের জন্য নির্ভরযোগ্য, সুরক্ষিত ও ১০০% ক্যাশ অন ডেলিভারি ভিত্তিক ডিজিটাল স্বাস্থ্য তথ্য সেবা।
            </p>
          </div>

          {/* Links & Disclaimer Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {/* Mandatory Government Non-Affiliation Tag */}
            <span
              title="জীবনযত্ন কোনো সরকারি সংস্থা বা অধিদপ্তরের অফিসিয়াল প্ল্যাটফর্ম নয়।"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-amber-300 font-semibold cursor-help"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>সরকারি ওয়েবসাইট নয়</span>
            </span>

            <Link href="/privacy" className="hover:text-white transition-colors">
              গোপনীয়তা ও ডেটা সুরক্ষা নীতি
            </Link>
            <span className="text-emerald-700">•</span>
            <Link href="/blood-bank" className="hover:text-white transition-colors">
              রক্ত ব্যাংক
            </Link>
            <span className="text-emerald-700">•</span>
            <Link href="/order-tracking" className="hover:text-white transition-colors">
              অর্ডার ট্র্যাকিং
            </Link>
            <span className="text-emerald-700">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>256-Bit SSL Secured</span>
            </span>
          </div>

          {/* Dynamic Copyright */}
          <div className="pt-4 border-t border-emerald-900/60 text-[11px] text-emerald-400">
            © {new Date().getFullYear()} JibonJotno. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}