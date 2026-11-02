import Link from "next/link";
import { LayoutDashboard, Pill, Stethoscope, Building2, ShoppingBag, FileText, Settings, LogOut, ShieldCheck } from "lucide-react";

/**
 * JibonJotno (জীবনযত্ন) — Secured Admin Panel Layout Shell
 */
export default function AdminLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* সাইডবার */}
      <aside className="w-72 bg-slate-900 text-slate-300 hidden lg:flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white font-bold tracking-tight">অ্যাডমিন কনসোল</h2>
            <p className="text-xs text-brand-400 font-medium">জীবনযত্ন CMS & Ops</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 text-sm font-medium">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-600 text-white shadow-sm">
            <LayoutDashboard className="w-5 h-5" />
            <span>ড্যাশবোর্ড</span>
          </Link>
          <Link href="/admin/medicines" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
            <Pill className="w-5 h-5 text-slate-400" />
            <span>ওষুধ নির্দেশিকা (Medicines)</span>
          </Link>
          <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
            <Stethoscope className="w-5 h-5 text-slate-400" />
            <span>ডাক্তার ডিরেক্টরি</span>
          </Link>
          <Link href="/admin/hospitals" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
            <Building2 className="w-5 h-5 text-slate-400" />
            <span>হাসপাতাল ও ডায়াগনস্টিক</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
            <ShoppingBag className="w-5 h-5 text-slate-400" />
            <span>ফার্মেসি অর্ডার ও প্রেসক্রিপশন</span>
          </Link>
          <Link href="/admin/articles" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
            <FileText className="w-5 h-5 text-slate-400" />
            <span>স্বাস্থ্য শিক্ষা ও আর্টিকেল</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-medium">
            <LogOut className="w-5 h-5" />
            <span>ওয়েবসাইটে ফিরে যান</span>
          </Link>
        </div>
      </aside>

      {/* মূল কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 px-6 sm:px-10 flex items-center justify-between shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">অ্যাডমিন ম্যানেজমেন্ট প্যানেল</h1>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              Super Admin Active
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
