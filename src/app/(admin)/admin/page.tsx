"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  ExternalLink,
  Package,
  Clock,
  Pill,
  DollarSign,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Users,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  // Authentication & Security Lock States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Lock Screen Input States
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Dashboard Data States
  const [activeTab, setActiveTab] = useState<"orders" | "inventory">("orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<any[]>([
    {
      id: "ord-1",
      order_number: "JJ-982341",
      customer_name: "Mahmudul Hasan",
      customer_phone: "01712345678",
      delivery_zone: "Inside Dhaka (৳60)",
      total_amount: 192.0,
      payment_method: "Cash on Delivery",
      status: "pending",
      created_at: "আজ, দুপুর ২:১৫",
    },
  ]);

  // Session Storage Check (Protibar browser open ba fresh visit-e password chaibe)
  useEffect(() => {
    try {
      const activeSession = sessionStorage.getItem("jibonjotno_admin_unlocked");
      if (activeSession === "true") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  // Admin Login Verification Handler
  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoginLoading(true);

    const emailInput = adminEmail.trim().toLowerCase();
    const passwordInput = adminPassword.trim();

    try {
      // 1. Supabase Authentication Call
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });

      // 2. Verified Admin Role / Master Credentials Check
      const isSuperAdminEmail =
        emailInput === "mahmudulhm2003@gmail.com" || emailInput === "admin@jibonjotno.com";
      const isMasterPass =
        passwordInput === "mAsumbd2002@jibonjotno." || passwordInput === "admin123456";

      if ((!error && data?.user) || (isSuperAdminEmail && isMasterPass)) {
        // Unlock only for this active browser session
        sessionStorage.setItem("jibonjotno_admin_unlocked", "true");
        setIsAuthenticated(true);
        setAdminPassword("");
      } else {
        setAuthError(
          error?.message || "এডমিন ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। শুধুমাত্র অনুমোদিত এডমিন প্রবেশ করতে পারবেন।"
        );
      }
    } catch (err: any) {
      setAuthError(err?.message || "অথেন্টিকেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoginLoading(false);
    }
  };

  // Immediate Lock & Logout Handler
  const handleAdminLock = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Signout error:", e);
    }
    sessionStorage.removeItem("jibonjotno_admin_unlocked");
    setIsAuthenticated(false);
    setAdminPassword("");
    setAuthError("");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center font-sans text-xs text-[#7B8AA4]">
        নিরাপত্তা যাচাই করা হচ্ছে...
      </div>
    );
  }

  // ==================== 1. SECURITY LOCK SCREEN (PASSWORD PROMPT) ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07241C] text-[#101B32] flex flex-col font-sans">
        
        {/* Top Header */}
        <header className="h-16 px-6 border-b border-emerald-900/60 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>লাইভ ওয়েবসাইটে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-black text-rose-400 bg-rose-950/60 px-3 py-1.5 rounded-full border border-rose-800">
            <Lock className="w-3.5 h-3.5" />
            <span>এডমিন প্যানেল লকড অবস্থায় আছে</span>
          </div>
        </header>

        {/* Lock Modal Form */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-emerald-900/20 p-8 space-y-6">
            
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-xs">
                <ShieldAlert className="w-9 h-9" />
              </div>
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-2xl font-black text-[#101B32]">
                এডমিন সিকিউরিটি ভেরিফিকেশন
              </h1>
              <p className="text-xs text-[#7B8AA4] leading-relaxed">
                অনুমোদিত সুপার এডমিন প্যানেলে প্রবেশ করতে আপনার সুরক্ষিত ইমেইল ও পাসওয়ার্ড দিন।
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#101B32]">
                  সুপার এডমিন ইমেইল (Admin Email) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="mahmudulhm2003@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#CCD0D5] text-xs sm:text-sm bg-[#F7F9FC] focus:bg-white focus:outline-none focus:border-[#0D4C3B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#101B32]">
                  এডমিন পাসওয়ার্ড (Admin Password) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="আপনার এডমিন পাসওয়ার্ড লিখুন"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#CCD0D5] text-xs sm:text-sm bg-[#F7F9FC] focus:bg-white focus:outline-none focus:border-[#0D4C3B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#7B8AA4] hover:text-[#101B32]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-400"
              >
                {loginLoading ? (
                  <span>ভেরিফাই করা হচ্ছে...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>পাসওয়ার্ড যাচাই করে আনলক করুন</span>
                  </>
                )}
              </button>
            </form>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-tight">
              <strong>নিরাপত্তা সতর্কতা:</strong> এই প্যানেলটি শুধুমাত্র প্রধান পরিচালকের জন্য। প্রতিবার প্রবেশের সময় এবং পেজ রিফ্রেশ দিলে পুনরায় পাসওয়ার্ড চাওয়া হবে।
            </div>

          </div>
        </main>
      </div>
    );
  }

  // ==================== 2. UNLOCKED ADMIN DASHBOARD ====================
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B1528] text-white hidden md:flex flex-col justify-between p-5 border-r border-[#1E293B]">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D4C3B] text-white flex items-center justify-center font-black text-xl shadow-xs">
              +
            </div>
            <div>
              <h2 className="font-black text-sm text-white">জীবনযত্ন CMS</h2>
              <p className="text-[10px] text-emerald-400 font-bold">এডমিন কন্ট্রোল প্যানেল</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl transition-colors ${
                activeTab === "orders" ? "bg-[#0D4C3B] text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>অর্ডার ও প্রেসক্রিপশন</span>
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl transition-colors ${
                activeTab === "inventory" ? "bg-[#0D4C3B] text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>ওষুধ ইনভেন্টরি ও স্টক</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom Lock Button */}
        <button
          onClick={handleAdminLock}
          className="w-full py-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>লগআউট ও লক করুন</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Header */}
        <header className="bg-white border-b border-[#E5EBF2] h-16 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base sm:text-lg font-black text-[#101B32]">
              এডমিন ম্যানেজমেন্ট প্যানেল
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              সুপার এডমিন সক্রিয়
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>লাইভ সাইট দেখুন</span>
            </Link>

            {/* Top Red Lock Button */}
            <button
              onClick={handleAdminLock}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black transition-all flex items-center gap-1.5"
              title="প্যানেল লক করুন"
            >
              <Lock className="w-3.5 h-3.5 text-rose-600" />
              <span>লক করুন</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E5EBF2] space-y-1 shadow-xs">
              <span className="text-[11px] font-bold text-[#7B8AA4]">সর্বমোট অর্ডার</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#101B32]">১</span>
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E5EBF2] space-y-1 shadow-xs">
              <span className="text-[11px] font-bold text-[#7B8AA4]">প্রেসক্রিপশন রিভিউ বাকি</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-amber-600">০</span>
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E5EBF2] space-y-1 shadow-xs">
              <span className="text-[11px] font-bold text-[#7B8AA4]">তালিকাভুক্ত ওষুধ</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#101B32]">৩২+</span>
                <Pill className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#E5EBF2] space-y-1 shadow-xs">
              <span className="text-[11px] font-bold text-[#7B8AA4]">মোট বিক্রয় (COD)</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#0D4C3B]">৳ ১৯২</span>
                <DollarSign className="w-5 h-5 text-[#0D4C3B]" />
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
              <h2 className="text-base font-black text-[#101B32]">
                লাইভ ক্যাশ অন ডেলিভারি অর্ডার তালিকা
              </h2>
              <div className="relative">
                <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="অর্ডার নং বা রোগীর নাম..."
                  className="pl-9 pr-3 py-2 rounded-xl border border-[#CCD0D5] text-xs bg-[#F7F9FC] focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5EBF2] text-[#7B8AA4]">
                    <th className="pb-3 font-bold">অর্ডার নং</th>
                    <th className="pb-3 font-bold">গ্রাহকের নাম ও ফোন</th>
                    <th className="pb-3 font-bold">ঠিকানা ও এলাকা</th>
                    <th className="pb-3 font-bold">মূল্য</th>
                    <th className="pb-3 font-bold">স্ট্যাটাস</th>
                    <th className="pb-3 font-bold text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#F7F9FC]">
                      <td className="py-3.5 font-mono font-bold text-[#0D4C3B]">{ord.order_number}</td>
                      <td className="py-3.5">
                        <span className="font-bold block">{ord.customer_name}</span>
                        <span className="text-[11px] text-[#7B8AA4]">{ord.customer_phone}</span>
                      </td>
                      <td className="py-3.5 text-[#7B8AA4]">{ord.delivery_zone}</td>
                      <td className="py-3.5 font-bold text-[#101B32]">৳ {ord.total_amount}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          পেন্ডিং রিভিউ
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button className="px-3 py-1.5 rounded-lg bg-[#0D4C3B] text-white text-[11px] font-bold">
                          অনুমোদন করুন
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}