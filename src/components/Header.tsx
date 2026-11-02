"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  ChevronDown,
  Droplets,
  Truck,
  FlaskConical,
  Calculator,
  Compass,
  Menu,
  X,
  PhoneCall,
  Globe,
  ShoppingBag,
  LogIn,
  HeartPulse,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const { lang, toggleLang } = useLanguage();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "হোম", href: "/" },
    { label: "ঔষধ নির্দেশিকা", href: "/medicines" },
    { label: "দামের তুলনা", href: "/medicines" },
    { label: "স্বাস্থ্য নির্দেশিকা (২৫+ রোগ)", href: "/health-guides" },
    { label: "আইসিইউ ও ম্যাপ", href: "/hospitals" },
  ];

  const otherServices = [
    {
      title: "রক্ত ব্যাংক ও রক্তদাতা",
      desc: "জরুরি রক্তের সন্ধানে ও ডোনার তালিকা",
      href: "/blood-bank",
      icon: Droplets,
      color: "text-rose-600 bg-rose-50",
    },
    {
      title: "অ্যাম্বুলেন্স ও অক্সিজেন",
      desc: "২৪/৭ আইসিইউ অ্যাম্বুলেন্স সাপোর্ট",
      href: "/ambulance",
      icon: Truck,
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "ডায়াগনস্টিক টেস্ট ও খরচ",
      desc: "ল্যাব টেস্ট ফি ও হোম স্যাম্পল",
      href: "/diagnostic-centers",
      icon: FlaskConical,
      color: "text-teal-600 bg-teal-50",
    },
    {
      title: "শিশুর সিরাপ ডোজ ক্যালকুলেটর",
      desc: "ওজন অনুযায়ী সঠিক ওষুধের মাত্রা",
      href: "/pediatric-dose",
      icon: Calculator,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "লাইভ অর্ডার ট্র্যাকিং",
      desc: "ক্যাশ অন ডেলিভারি অর্ডার স্ট্যাটাস",
      href: "/order-tracking",
      icon: Compass,
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  return (
    <header className="bg-white border-b border-[#E5EBF2] sticky top-0 z-50">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#0D4C3B] text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-xs">
              +
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl 2xl:text-3xl font-black text-[#0D4C3B] tracking-tight leading-none">
                জীবনযত্ন
              </span>
              <span className="text-[10px] sm:text-xs text-[#7B8AA4] font-semibold tracking-wider">
                DIGITAL HEALTHCARE BD
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm 2xl:text-base font-bold transition-colors ${
                    active
                      ? "text-[#0D4C3B] bg-emerald-50"
                      : "text-[#101B32] hover:text-[#0D4C3B] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm 2xl:text-base font-bold flex items-center gap-1 transition-colors ${
                  dropdownOpen
                    ? "text-[#0D4C3B] bg-emerald-50"
                    : "text-[#101B32] hover:text-[#0D4C3B] hover:bg-slate-50"
                }`}
              >
                <span>অন্যান্য সেবা</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#E5EBF2] p-2 space-y-1 z-50">
                  {otherServices.map((svc) => {
                    const Icon = svc.icon;
                    return (
                      <Link
                        key={svc.title}
                        href={svc.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F9FC] transition-colors group"
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${svc.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#101B32] group-hover:text-[#0D4C3B] transition-colors">
                            {svc.title}
                          </p>
                          <p className="text-[11px] text-[#7B8AA4] truncate">{svc.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/ambulance"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs sm:text-sm font-extrabold border border-rose-200 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>জরুরি ৯৯৯ / ১৬২৬৩</span>
            </Link>

            <button
              onClick={toggleLang}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-[#E5EBF2] text-xs font-bold text-[#101B32] hover:bg-slate-50 flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === "bn" ? "EN" : "বাং"}</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0D4C3B] border border-emerald-200 transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline text-xs font-bold">ফার্মেসি</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/login"
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>লগইন</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#E5EBF2] space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-bold text-[#101B32] hover:bg-emerald-50 hover:text-[#0D4C3B]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#F1F5F9] space-y-1">
              <span className="px-3 text-[10px] font-bold text-[#7B8AA4] uppercase">অন্যান্য জরুরি সেবা</span>
              {otherServices.map((svc) => (
                <Link
                  key={svc.title}
                  href={svc.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#101B32] hover:bg-slate-50"
                >
                  {svc.title}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
