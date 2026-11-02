"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldPlus, Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

/**
 * JibonJotno (জীবনযত্ন) — Secure Login Page for Admins and Patients
 */
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      // সফলভাবে লগইন হলে রিডাইরেক্ট করা
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-slate-200 p-8 sm:p-10 space-y-8">
        {/* লোগো ও শিরোনাম */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center text-white mx-auto shadow-md">
            <ShieldPlus className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            জীবনযত্ন অ্যাকাউন্টে লগইন
          </h1>
          <p className="text-sm text-slate-500">
            অ্যাডমিন প্যানেল বা রোগী ড্যাশবোর্ডে প্রবেশ করতে আপনার ইমেইল ও পাসওয়ার্ড দিন।
          </p>
        </div>

        {/* এরর মেসেজ অ্যালার্ট */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-sm text-rose-800">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* লগইন ফর্ম */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">ইমেইল ঠিকানা (Email)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jibonjotno.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 block">পাসওয়ার্ড (Password)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>যাচাই করা হচ্ছে...</span>
              </>
            ) : (
              <span>লগইন করুন</span>
            )}
          </button>
        </form>

        {/* ফুটার লিংক */}
        <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
          <Link href="/" className="hover:text-brand-600 font-medium transition-colors">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
