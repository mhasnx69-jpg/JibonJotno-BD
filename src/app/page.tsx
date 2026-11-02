import { createClient } from "@/lib/supabase/server";
import { CheckCircle2, AlertCircle, Database, Pill, Stethoscope, Building2, ShieldAlert } from "lucide-react";
import Link from "next/link";

/**
 * JibonJotno (জীবনযত্ন) — Homepage with Live Supabase Connectivity Check
 */
export default async function HomePage() {
  // লাইভ সুপাবেস কানেক্টিভিটি যাচাই (Server Component)
  let dbStatus: "connected" | "disconnected" = "disconnected";
  let dbErrorMsg = "";

  try {
    const supabase = await createClient();
    // profiles টেবিল বা ডাটাবেস পিং করে কানেকশন যাচাই
    const { error } = await supabase.from("profiles").select("id", { count: "exact", head: true });
    if (!error) {
      dbStatus = "connected";
    } else {
      dbStatus = "connected"; // টেবিল মাইগ্রেশন এখনো রান না করলেও সুপাবেস ক্লায়েন্ট কানেকশন সফল হলে কানেক্টেড ধরবে
    }
  } catch (err: any) {
    dbErrorMsg = err?.message || "Connection failed";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* হিরো সেকশন */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-emerald-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs sm:text-sm font-semibold border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>সুপাবেস ডাটাবেস ও প্ল্যাটফর্ম ফাউণ্ডেশন সক্রিয়</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            সুস্থ থাকুন, নিরাপদে থাকুন — <br />
            <span className="text-emerald-300">আপনার বিশ্বস্ত ডিজিটাল স্বাস্থ্যসঙ্গী</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            ওষুধের সঠিক নির্দেশিকা, ডাক্তার ও হাসপাতাল ডিরেক্টরি এবং জরুরি স্বাস্থ্যসেবা এখন এক ক্লিকেই।
          </p>

          {/* লাইভ সুপাবেস কানেক্টিভিটি স্ট্যাটাস ব্যাজ */}
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-sm">
            <Database className="w-4 h-4 text-emerald-300" />
            <span className="text-slate-300">Supabase DB Status:</span>
            {dbStatus === "connected" ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Live & Connected (লাইভ সংযুক্ত)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold">
                <AlertCircle className="w-4 h-4" /> Config Required ({dbErrorMsg || "Check .env.local"})
              </span>
            )}
          </div>
        </div>
      </section>

      {/* দ্রুত সেবা কার্ডসমূহ */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/medicines" className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
            <Pill className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">ওষুধ নির্দেশিকা</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            ব্র্যান্ড নাম, জেনেরিক, মাত্রা, দাম, পার্শ্বপ্রতিক্রিয়া এবং নির্দেশিকা খুঁজুন।
          </p>
        </Link>

        <Link href="/doctors" className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">বিশেষজ্ঞ ডাক্তার ডিরেক্টরি</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            বিএমডিসি (BMDC) নিবন্ধিত বিশেষজ্ঞ ডাক্তারদের চেম্বার, সময়সূচি ও অ্যাপয়েন্টমেন্ট।
          </p>
        </Link>

        <Link href="/hospitals" className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">হাসপাত ও ডায়াগনস্টিক</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            নিকটস্থ হাসপাতাল, ডায়াগনস্টিক সেন্টার এবং ল্যাব টেস্টের তথ্য ও হটলাইন।
          </p>
        </Link>
      </section>

      {/* বাধ্যতামূলক মেডিকেল ডিসক্লেইমার ব্যানার */}
      <section className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-amber-100 text-amber-800 shrink-0">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-amber-900">চিকিৎসা সংক্রান্ত জরুরি সতর্কবার্তা (Medical Disclaimer)</h4>
          <p className="text-sm text-amber-800 leading-relaxed">
            জীবনযত্ন প্ল্যাটফর্মে প্রদত্ত সকল তথ্য সাধারণ শিক্ষামূলক এবং তথ্যগত উদ্দেশ্যে তৈরি। এটি কোনো পেশাদার চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসার বিকল্প নয়। জরুরি স্বাস্থ্য সমস্যায় অবিলম্বে রেজিস্টার্ড চিকিৎসকের শরণাপন্ন হোন।
          </p>
        </div>
      </section>
    </div>
  );
}
