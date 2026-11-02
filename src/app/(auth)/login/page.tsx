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
  X,
  Phone,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [currentProfile, setCurrentProfile] = useState<any>(null);

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Facebook-Style Sign Up Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupIdentifier, setSignupIdentifier] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const supabase = createClient();

  // Check login session
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

  // Format Email / Phone (Bangladesh 11-digit phone mapping)
  const formatEmailAuth = (raw: string) => {
    const clean = raw.trim().toLowerCase();
    const isPhone = /^01[3-9]\d{8}$/.test(clean);
    if (isPhone) {
      return `${clean}@user.jibonjotno.local`;
    }
    return clean;
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const authEmail = formatEmailAuth(loginIdentifier);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: loginPassword,
      });

      if (error) throw error;

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
    } catch (err: unknown) {
      console.error("Login error:", err);
      setLoginError(
        err instanceof Error
          ? err.message
          : "ইমেইল/মোবাইল নম্বর বা পাসওয়ার্ড সঠিক নয়।"
      );
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Facebook-Style Sign Up Modal Submit
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    setSignupSuccess("");
    setSignupLoading(true);

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (!fullName) {
      setSignupError("আপনার পুরো নাম লিখুন।");
      setSignupLoading(false);
      return;
    }

    try {
      const authEmail = formatEmailAuth(signupIdentifier);
      const isMobile = /^01[3-9]\d{8}$/.test(signupIdentifier.trim());

      // 1. Supabase Auth Registration
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: authEmail,
        password: signupPassword,
        options: {
          data: {
            full_name: fullName,
            phone: isMobile ? signupIdentifier.trim() : null,
          },
        },
      });

      if (authError) throw authError;

      // 2. Insert into public.profiles table
      if (authData.user) {
        await supabase.from("profiles").upsert({
          id: authData.user.id,
          full_name: fullName,
          role: "customer",
        });
      }

      setSignupSuccess("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন লগইন করুন।");
      setLoginIdentifier(signupIdentifier);
      setTimeout(() => {
        setIsModalOpen(false);
        setSignupSuccess("");
      }, 1500);
    } catch (err: unknown) {
      console.error("Signup error:", err);
      setSignupError(
        err instanceof Error ? err.message : "নিবন্ধন সম্পন্ন করা যায়নি। সঠিক তথ্য দিন।"
      );
    } finally {
      setSignupLoading(false);
    }
  };

  // Handle Logout
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setCurrentProfile(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#1C1E21] flex flex-col font-sans">
      
      {/* Top Simple Header */}
      <header className="bg-white border-b border-[#CCD0D5] h-14 px-4 sm:px-8 flex items-center justify-between">
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

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side: Facebook Style Branding */}
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D4C3B] tracking-tight">
              জীবনযত্ন
            </h1>
            <p className="text-xl sm:text-2xl text-[#1C1E21] font-medium leading-snug">
              সহজ ও সঠিক স্বাস্থ্য তথ্য, ডিজিটাল ফার্মেসি এবং জরুরি স্বাস্থ্যসেবা এক ঠিকানায়।
            </p>
            <div className="hidden lg:flex items-center gap-2 pt-4 text-xs text-[#606770]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>৩৫,৯৪১+ ওষুধ • ২৪/৭ অ্যাম্বুলেন্স • ব্লাড ব্যাংক নেটওয়ার্ক</span>
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="w-full max-w-md mx-auto">
            {currentUser ? (
              // Logged in state
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#DADDE1] text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0D4C3B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-[#101B32]">
                    স্বাগতম, {currentProfile?.full_name || currentUser.email}!
                  </h2>
                  <p className="text-xs text-[#606770]">
                    আপনি বর্তমানে জীবনযত্ন প্ল্যাটফর্মে সফলভাবে লগইন অবস্থায় আছেন।
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-[#0D4C3B] border border-emerald-200">
                    রোল: {currentProfile?.role === "admin" ? "অ্যাডমিন (Admin)" : "গ্রাহক (Customer)"}
                  </span>
                </div>

                <div className="pt-4 flex flex-col gap-2.5">
                  {currentProfile?.role === "admin" ? (
                    <Link
                      href="/admin"
                      className="w-full py-3 rounded-xl bg-[#0D4C3B] text-white text-sm font-bold hover:bg-[#12614A] transition-colors"
                    >
                      অ্যাডমিন প্যানেলে প্রবেশ করুন
                    </Link>
                  ) : (
                    <Link
                      href="/pharmacy"
                      className="w-full py-3 rounded-xl bg-[#0D4C3B] text-white text-sm font-bold hover:bg-[#12614A] transition-colors"
                    >
                      ফার্মেসি থেকে ওষুধ অর্ডার করুন
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-rose-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>সাইন আউট (Logout) করুন</span>
                  </button>
                </div>
              </div>
            ) : (
              // Facebook Style Login Box
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#DADDE1] space-y-4">
                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="ইমেইল ঠিকানা বা মোবাইল নম্বর"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#CCD0D5] text-sm focus:outline-none focus:border-[#0D4C3B] bg-white text-[#1C1E21]"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="পাসওয়ার্ড"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#CCD0D5] text-sm focus:outline-none focus:border-[#0D4C3B] bg-white text-[#1C1E21] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3.5 text-[#606770] hover:text-[#1C1E21]"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3.5 rounded-xl bg-[#0D4C3B] hover:bg-[#093d30] text-white font-extrabold text-base transition-colors shadow-md flex items-center justify-center gap-2 disabled:bg-slate-400"
                  >
                    {loginLoading ? "লগইন হচ্ছে..." : "লগইন করুন"}
                  </button>
                </form>

                <div className="text-center pt-1">
                  <a href="#" className="text-xs text-[#0D4C3B] hover:underline">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </a>
                </div>

                <hr className="border-[#DADDE1] my-4" />

                {/* Facebook Style Create New Account Button */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(true);
                      setSignupError("");
                      setSignupSuccess("");
                    }}
                    className="px-6 py-3.5 rounded-xl bg-[#42B72A] hover:bg-[#36A420] text-white font-bold text-sm sm:text-base transition-all shadow-md hover:scale-[1.02] inline-flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>নতুন অ্যাকাউন্ট তৈরি করুন</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Facebook-Style Sign Up Modal Pop-up */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#DADDE1] overflow-hidden space-y-4">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-[#DADDE1] flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#1C1E21]">সাইন আপ করুন</h2>
                <p className="text-xs text-[#606770]">খুব সহজেই আপনার জীবনযত্ন অ্যাকাউন্ট খুলুন।</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-[#606770] hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <div className="p-5 pt-0 space-y-3.5">
              {signupError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{signupError}</span>
                </div>
              )}

              {signupSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{signupSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-3">
                {/* Name split like FB */}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="নামের প্রথমাংশ"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#CCD0D5] text-xs sm:text-sm bg-[#F5F6F7] focus:bg-white focus:outline-none focus:border-[#0D4C3B]"
                  />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="নামের শেষাংশ"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#CCD0D5] text-xs sm:text-sm bg-[#F5F6F7] focus:bg-white focus:outline-none focus:border-[#0D4C3B]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    value={signupIdentifier}
                    onChange={(e) => setSignupIdentifier(e.target.value)}
                    placeholder="মোবাইল নম্বর অথবা ইমেইল ঠিকানা"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#CCD0D5] text-xs sm:text-sm bg-[#F5F6F7] focus:bg-white focus:outline-none focus:border-[#0D4C3B]"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="নতুন পাসওয়ার্ড (কমপক্ষে ৬ ডিজিট)"
                    className="w-full px-3 py-2.5 rounded-lg border border-[#CCD0D5] text-xs sm:text-sm bg-[#F5F6F7] focus:bg-white focus:outline-none focus:border-[#0D4C3B] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-2.5 top-2.5 text-[#606770] hover:text-[#1C1E21]"
                  >
                    {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-[10px] text-[#606770] leading-tight">
                  সাইন আপ এ ক্লিক করার মাধ্যমে আপনি আমাদের শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মতি দিচ্ছেন।
                </p>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={signupLoading}
                    className="w-48 py-2.5 rounded-lg bg-[#42B72A] hover:bg-[#36A420] text-white font-extrabold text-sm transition-all shadow-md disabled:bg-slate-400 mx-auto"
                  >
                    {signupLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ সম্পন্ন করুন"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#DADDE1] py-4 px-4 text-center text-xs text-[#737373]">
        <p>© 2026 জীবনযত্ন (JibonJotno) • সরকারি ওয়েবসাইট নয় • সকল অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
}