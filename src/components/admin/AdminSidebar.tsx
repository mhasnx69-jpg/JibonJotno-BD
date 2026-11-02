"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Pill,
  Stethoscope,
  Building2,
  ShoppingBag,
  BookOpen,
  ShieldCheck,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
  { href: "/admin/medicines", label: "ওষুধ নির্দেশিকা (Medicines)", icon: Pill },
  { href: "/admin/doctors", label: "ডাক্তার ডিরেক্টরি", icon: Stethoscope },
  { href: "/admin/hospitals", label: "হাসপাতাল ও ডায়াগনস্টিক", icon: Building2 },
  { href: "/admin/orders", label: "ফার্মেসি অর্ডার ও প্রেসক্রিপশন", icon: ShoppingBag },
  { href: "/admin/articles", label: "স্বাস্থ্য শিক্ষা ও আর্টিকেল", icon: BookOpen },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0B1527] text-white flex flex-col shrink-0 min-h-screen border-r border-slate-800 font-sans">
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-black text-sm text-white tracking-wide">অ্যাডমিন কনসোল</h2>
          <p className="text-[11px] text-emerald-400 font-medium">জীবনযত্ন CMS & Ops</p>
        </div>
      </div>

      <nav className="p-3 space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#008A5E] text-white shadow-md shadow-emerald-950/40"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
        >
          <span>পাবলিক ওয়েবসাইট</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
