"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Phone,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentProfile, setCurrentProfile] = useState<any>(null);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState(""); // Email or 11-digit phone
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const supabase = createClient();

  // Check if already logged in
  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", session.user.id)
          .single();
        if (profile) setCurrentProfile(profile);
      }
    }
    checkSession();
  }, []);

  // Format identifier (Email or Phone)
  const formatEmailAuth = (raw: string) => {
    const clean = raw.trim().toLowerCase();
    const isPhone = /^01[3-9]\d{8}$/.test(clean);
    if (isPhone) {
      return `${clean}@user.jibonjotno.local`;
    }
    return clean;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const authEmail = formatEmailAuth(identifier);
      const isMobile = /^01[3-9]\d{8}$/.test(identifier.trim());

      if (mode === "signup") {
        if (!fullName.trim()) {
          setErrorMsg("দয়া করে আপনার পুরো নাম লিখুন।");
          setLoading(false);
          return;
        }

        // 1. Supabase Auth Sign Up
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: authEmail,
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: isMobile ? identifier.trim() : null,
            },
          },
        });

        if (authError) throw authError;

        // 2. public.profiles table-e permanent record store kora
        if (authData.user) {
          await supabase.from("profiles").upsert({
            id: authData.user.id,
            full_name: fullName.trim(),
            role: "customer",
          });
        }

        setSuccessMsg("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন লগইন করুন।");
        setMode("login");
        setPassword("");
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: password,
        });

        if (error) throw error;

        // Check Admin vs Customer
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profile?.role === "admin" || profile?.role === "pharmacist") {
          router.push("/admin");
        } else {
          router.push("/pharmacy");
        }
      }
    } catch (err: unknown) {
      console.error("Auth error:", err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "তথ্য যাচাই করা সম্ভব হয়নি। সঠিক ইমেইল/নম্বর ও পাসওয়ার্ড দিন।"
      );
    } finally {
      setLoading(false);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setCurrentProfile(null);
    setSuccessMsg("আপনি সফলভাবে সাইন আউট হয়েছেন।");
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5EBF2] h-14 px-4 sm:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0D4C3B] hover:text-[#12614A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমে ফিরে যান</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>সুরক্ষিত এনক্রিপ্টেড সংযোগ</span>
        </div>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E5EBF2] p-8 shadow-xl space-y-6">
          
          {/* Jodi user age thekei logged in thake */}
          {currentUser ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0D4C3B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-[#101B32]">
                  স্বাগতম, {currentProfile?.full_name || currentUser.email}!
                </h2>
                <p className="text-xs text-[#7B8AA4]">
                  আপনি বর্তমানে জীবনযত্ন প্ল্যাটফর্মে লগইন অবস্থায় আছেন।
                </p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-[#0D4C3B] border border-emerald-200">
                  রোল: {currentProfile?.role === "admin" ? "অ্যাডমিন (Admin)" : "গ্রাহক (Customer)"}
                </span>
              </div>

              <div className="pt-4 flex flex-col gap-2.5">
                {currentProfile?.role === "admin" ? (
                  <Link
                    href="/admin"
                    className="w-full py-3 rounded-2xl bg-[#0D4C3B] text-white text-xs font-bold hover:bg-[#12614A] transition-colors"
                  >
                    অ্যাডমিন প্যানেলে যান
                  </Link>
                ) : (
                  <Link
                    href="/pharmacy"
                    className="w-full py-3 rounded-2xl bg-[#0D4C3B] text-white text-xs font-bold hover:bg-[#12614A] transition-colors"
                  >
                    ফার্মেসি থেকে ওষুধ কিনুন
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-rose-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>সাইন আউট (Logout) করুন</span>
                </button>
              </div>
            </div>
          ) : (
            // Auth Form (Login / Sign Up)
            <>
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center border border-emerald-100 shadow-xs">
                  <ShieldCheck className="w-8 h-8 text-[#0D4C3B]" />
                </div>
              </div>

              <div className="text-center space-y-1">
                <h1 className="text-2xl font-black text-[#101B32]">
                  {mode === "login" ? "জীবনযত্ন অ্যাকাউন্টে লগইন" : "নতুন অ্যাকাউন্ট নিবন্ধন করুন"}
                </h1>
                <p className="text-xs text-[#7B8AA4]">
                  {mode === "login"
                    ? "আপনার ইমেইল বা মোবাইল নম্বর ও পাসওয়ার্ড দিন"
                    : "ডাটাবেসে স্থায়ী অ্যাকাউন্ট খুলতে তথ্য পূরণ করুন"}
                </p>
              </div>

              {/* Login / Sign Up Tabs */}
              <div className="grid grid-cols-2 p-1 bg-[#F7F9FC] rounded-2xl border border-[#E5EBF2]">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
                    mode === "login"
                      ? "bg-[#0D4C3B] text-white shadow-xs"
                      : "text-[#7B8AA4] hover:text-[#101B32]"
                  }`}
                >
                  লগইন (Sign In)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
                    mode === "signup"
                      ? "bg-[#0D4C3B] text-white shadow-xs"
                      : "text-[#7B8AA4] hover:text-[#101B32]"
                  }`}
                >
                  সাইন আপ (Sign Up)
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#101B32]">আপনার পূর্ণ নাম *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="যেমন: মোঃ মাহমুদুল হাসান"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#101B32]">
                    ইমেইল অথবা মোবাইল নম্বর (১১ ডিজিট) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="যেমন: name@gmail.com অথবা 017xxxxxxxx"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#101B32]">পাসওয়ার্ড (Password) *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5EBF2] text-xs sm:text-sm focus:outline-none focus:border-[#0D4C3B] bg-[#F7F9FC]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-[#7B8AA4] hover:text-[#101B32]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-bold text-xs sm:text-sm transition-colors shadow-md flex items-center justify-center gap-2 disabled:bg-[#7B8AA4]"
                >
                  {loading ? (
                    <span>ডাটাবেসে প্রসেস হচ্ছে...</span>
                  ) : mode === "login" ? (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>লগইন করুন</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>অ্যাকাউন্ট তৈরি সম্পন্ন করুন</span>
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "login" ? "signup" : "login");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className="text-xs font-bold text-[#0D4C3B] hover:underline"
                >
                  {mode === "login"
                    ? "নতুন একাউন্ট করতে চান? এখানে সাইন আপ করুন"
                    : "পূর্বে অ্যাকাউন্ট তৈরি করা থাকলে এখানে লগইন করুন"}
                </button>
              </div>
            </>
          )}

        </div>
      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-4 px-4 text-center text-xs border-t border-emerald-900">
        <p>© 2026 JibonJotno • সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}