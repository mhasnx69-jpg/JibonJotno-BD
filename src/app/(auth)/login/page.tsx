"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const supabase = createClient();

      if (mode === "signup") {
        if (!fullName.trim()) {
          setErrorMsg("দয়া করে আপনার পূর্ণ নাম লিখুন।");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error) throw error;

        // Profiles te customer role set kora
        if (data.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: fullName.trim(),
            role: "customer",
          });
        }

        setSuccessMsg("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন লগইন করুন।");
        setMode("login");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) throw error;

        // Role check kora
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
      setErrorMsg(err instanceof Error ? err.message : "অথেন্টিকেশনে সমস্যা হয়েছে। সঠিক তথ্য দিন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex flex-col font-sans">
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

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E5EBF2] p-8 shadow-xl space-y-6">
          
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0D4C3B] flex items-center justify-center border border-emerald-100 shadow-xs">
              <ShieldCheck className="w-8 h-8 text-[#0D4C3B]" />
            </div>
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-black text-[#101B32]">
              {mode === "login" ? "জীবনযত্ন অ্যাকাউন্টে লগইন" : "নতুন অ্যাকাউন্ট তৈরি করুন"}
            </h1>
            <p className="text-xs text-[#7B8AA4]">
              {mode === "login"
                ? "রোগী ড্যাশবোর্ড বা অ্যাডমিন প্যানেলে প্রবেশ করুন"
                : "সহজে ওষুধ অর্ডার ও স্বাস্থ্যসেবা পেতে যোগ দিন"}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
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
              <label className="text-xs font-bold text-[#101B32]">ইমেইল ঠিকানা (Email) *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7B8AA4] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
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
                <span>অপেক্ষা করুন...</span>
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
                ? "নতুন অ্যাকাউন্ট তৈরি করতে চান? এখানে সাইন আপ করুন"
                : "আগে থেকেই অ্যাকাউন্ট আছে? এখানে ক্লিক করে লগইন করুন"}
            </button>
          </div>

        </div>
      </main>

      <footer className="bg-[#07372B] text-emerald-100 py-4 px-4 text-center text-xs border-t border-emerald-900">
        <p>© 2026 JibonJotno • সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}