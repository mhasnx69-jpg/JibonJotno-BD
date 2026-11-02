import Link from "next/link";
import { ShieldPlus, Stethoscope, Pill, Building2, PhoneCall, LayoutDashboard } from "lucide-react";

/**
 * JibonJotno (জীবনযত্ন) — Shared Bilingual Header Component
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* জরুরি হটলাইন টপ বার */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-brand-300 animate-pulse" />
            <span>জরুরি স্বাস্থ্য সেবা হটলাইন: <strong className="text-white">৯৯৯ (999)</strong> বা ১৬২৬৩</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-emerald-200">
            <span>বাংলাদেশ হেলথ ডিরেক্টরি</span>
            <span>•</span>
            <span>জরুরি রক্ত ও অ্যাম্বুলেন্স সেবা</span>
          </div>
        </div>
      </div>

      {/* মূল নেভিগেশন বার */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* লোগো ও ব্র্যান্ডিং */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md group-hover:bg-brand-700 transition-colors">
            <ShieldPlus className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
              জীবনযত্ন <span className="text-brand-600 text-lg font-semibold">JibonJotno</span>
            </span>
            <p className="text-xs text-slate-500 font-medium">ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম</p>
          </div>
        </Link>

        {/* নেভিগেশন লিংকসমূহ */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-slate-700 text-sm">
          <Link href="/medicines" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-brand-500" />
            <span>ওষুধ নির্দেশিকা</span>
          </Link>
          <Link href="/doctors" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-brand-500" />
            <span>ডাক্তার ডিরেক্টরি</span>
          </Link>
          <Link href="/hospitals" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-brand-500" />
            <span>হাসপাতাল ও ডায়াগনস্টিক</span>
          </Link>
        </nav>

        {/* ডান পাশের অ্যাকশন বাটন */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-500" />
            <span>অ্যাডমিন প্যানেল</span>
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold shadow-sm hover:bg-brand-700 transition-colors"
          >
            লগইন / রেজিস্টার
          </Link>
        </div>
      </div>
    </header>
  );
}
