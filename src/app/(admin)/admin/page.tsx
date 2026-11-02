import { createClient } from "@/lib/supabase/server";
import { Pill, Stethoscope, Building2, ShoppingBag, Users, FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * JibonJotno (জীবনযত্ন) — Real-time Admin Telemetry & Statistics Dashboard
 */
export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // ডাটাবেস থেকে রিয়েল-টাইম কাউন্ট ফেচ করা
  const [
    { count: medicinesCount },
    { count: doctorsCount },
    { count: hospitalsCount },
    { count: ordersCount },
    { count: usersCount },
  ] = await Promise.all([
    supabase.from("medicines").select("*", { count: "exact", head: true }),
    supabase.from("doctors").select("*", { count: "exact", head: true }),
    supabase.from("healthcare_facilities").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { title: "মোট ওষুধ (Medicines)", count: medicinesCount ?? 0, icon: Pill, href: "/admin/medicines", color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "নিবন্ধিত ডাক্তার", count: doctorsCount ?? 0, icon: Stethoscope, href: "/admin/doctors", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "হাসপাতাল ও ডায়াগনস্টিক", count: hospitalsCount ?? 0, icon: Building2, href: "/admin/hospitals", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "ফার্মেসি অর্ডার", count: ordersCount ?? 0, icon: ShoppingBag, href: "/admin/orders", color: "text-amber-600", bg: "bg-amber-50" },
    { title: "মোট ব্যবহারকারী", count: usersCount ?? 0, icon: Users, href: "/admin/users", color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">অ্যাডমিন ওভারভিউ ও টেলিমিরি</h2>
        <p className="text-sm text-slate-500 mt-1">সুপাবেস ডাটাবেস থেকে সংগৃহীত লাইভ পরিসংখ্যান।</p>
      </div>

      {/* স্ট্যাটিস্টিক্স গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 transition-all flex items-center justify-between group"
            >
              <div className="space-y-2">
                <span className="text-sm font-semibold text-slate-500">{stat.title}</span>
                <h3 className="text-3xl font-extrabold text-slate-900">{stat.count}</h3>
              </div>
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* কুইক অ্যাকশন কার্ড */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900">দ্রুত ম্যানেজমেন্ট শর্টকাট</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/medicines" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 transition-all flex items-center justify-between">
            <span className="font-semibold text-sm text-slate-700">নতুন ওষুধ যুক্ত করুন</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link href="/admin/doctors" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 transition-all flex items-center justify-between">
            <span className="font-semibold text-sm text-slate-700">নতুন ডাক্তার যুক্ত করুন</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link href="/admin/hospitals" className="p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 transition-all flex items-center justify-between">
            <span className="font-semibold text-sm text-slate-700">হাসপাতাল তথ্য আপডেট করুন</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
