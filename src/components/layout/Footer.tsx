import Link from "next/link";
import { ShieldPlus, Heart, PhoneCall, Mail, MapPin } from "lucide-react";

/**
 * JibonJotno (জীবনযত্ন) — Shared Bilingual Footer Component
 */
export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* ব্র্যান্ড ইনফো */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <ShieldPlus className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                জীবনযত্ন <span className="text-brand-400 font-normal">JibonJotno</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              বাংলাদেশের প্রতিটি নাগরিকের জন্য নির্ভরযোগ্য, সহজে ব্যবহারযোগ্য এবং নিরাপদ ডিজিটাল স্বাস্থ্যসেবা ইকোসিস্টেম।
            </p>
          </div>

          {/* দ্রুত লিংক */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">স্বাস্থ্য সেবা</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/medicines" className="hover:text-brand-400 transition-colors">ওষুধের তথ্য ও নির্দেশিকা</Link></li>
              <li><Link href="/pharmacy" className="hover:text-brand-400 transition-colors">অনলাইন ফার্মেসি সেবা</Link></li>
              <li><Link href="/doctors" className="hover:text-brand-400 transition-colors">বিশেষজ্ঞ ডাক্তার ডিরেক্টরি</Link></li>
              <li><Link href="/blood-donors" className="hover:text-brand-400 transition-colors">রক্তদাতা নেটওয়ার্ক</Link></li>
            </ul>
          </div>

          {/* জরুরি তথ্য */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">জরুরি সেবা</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-brand-400" /> <span>জাতীয় জরুরি সেবা: ৯৯৯</span></li>
              <li className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-brand-400" /> <span>স্বাস্থ্য বাতায়ন: ১৬২৬৩</span></li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-400" /> <span>ঢাকা, বাংলাদেশ</span></li>
            </ul>
          </div>

          {/* আইনি ও নীতি */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">নীতিমালা ও শর্তাবলী</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/legal/disclaimer" className="hover:text-brand-400 transition-colors">মেডিকেল ডিসক্লেইমার</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-brand-400 transition-colors">গোপনীয়তা নীতি (Privacy Policy)</Link></li>
              <li><Link href="/legal/terms" className="hover:text-brand-400 transition-colors">ব্যবহারের শর্তাবলী</Link></li>
            </ul>
          </div>
        </div>

        {/* ডিভাইডার ও কপিরাইট */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} JibonJotno (জীবনযত্ন). সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            <span>Made with</span> <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> <span>for the people of Bangladesh</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
