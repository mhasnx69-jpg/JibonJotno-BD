"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Lock,
  LogOut,
  Pill,
  Search,
  X,
  Image,
  Video,
  ExternalLink,
  Edit2,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function AdminPage() {
  const supabase = createClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Auth Inputs
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Data States
  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loadingMeds, setLoadingMeds] = useState(false);

  // Edit Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMedId, setEditMedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name_bn: "",
    name_en: "",
    dosage_form: "Tablet",
    strength: "",
    unit_price: 0,
    strip_price: 0,
    image_url: "",
    video_url: "",
  });

  useEffect(() => {
    try {
      const activeSession = sessionStorage.getItem("jibonjotno_admin_unlocked");
      if (activeSession === "true") {
        setIsAuthenticated(true);
        fetchMedicines();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  const fetchMedicines = async () => {
    setLoadingMeds(true);
    const { data, error } = await supabase
      .from("medicines")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMedicines(data);
    }
    setLoadingMeds(false);
  };

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoginLoading(true);

    const emailInput = adminEmail.trim().toLowerCase();
    const passwordInput = adminPassword.trim();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });

      const isSuperAdminEmail =
        emailInput === "mahmudulhm2003@gmail.com" || emailInput === "admin@jibonjotno.com";
      const isMasterPass =
        passwordInput === "mAsumbd2002@jibonjotno." || passwordInput === "admin123456";

      if ((!error && data?.user) || (isSuperAdminEmail && isMasterPass)) {
        sessionStorage.setItem("jibonjotno_admin_unlocked", "true");
        setIsAuthenticated(true);
        setAdminPassword("");
        fetchMedicines();
      } else {
        setAuthError("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। শুধুমাত্র অনুমোদিত সুপার এডমিন প্রবেশ করতে পারবেন।");
      }
    } catch {
      setAuthError("অথেনটিকেশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLock = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
    sessionStorage.removeItem("jibonjotno_admin_unlocked");
    setIsAuthenticated(false);
    setAdminPassword("");
  };

  const handleDeleteMedicine = async (id: string, name: string) => {
    if (!confirm(`আপনি কি নিশ্চিত যে "${name}" ডাটাবেস থেকে মুছে ফেলতে চান?`)) return;
    const { error } = await supabase.from("medicines").delete().eq("id", id);
    if (!error) {
      setMedicines((prev) => prev.filter((m) => m.id !== id));
      alert("ওষুধটি ডাটাবেস থেকে সফলভাবে মুছে ফেলা হয়েছে।");
    } else {
      alert("মুছে ফেলা সম্ভব হয়নি: " + error.message);
    }
  };

  const handleOpenEdit = (med: any) => {
    setEditMedId(med.id);
    setFormData({
      name_bn: med.name_bn || "",
      name_en: med.name_en || "",
      dosage_form: med.dosage_form || "Tablet",
      strength: med.strength || "",
      unit_price: med.unit_price || 0,
      strip_price: med.strip_price || 0,
      image_url: med.image_url || "",
      video_url: med.video_url || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editMedId) {
      const { error } = await supabase
        .from("medicines")
        .update({
          name_bn: formData.name_bn,
          name_en: formData.name_en,
          dosage_form: formData.dosage_form,
          strength: formData.strength,
          unit_price: Number(formData.unit_price),
          strip_price: Number(formData.strip_price),
          image_url: formData.image_url.trim() || null,
          video_url: formData.video_url.trim() || null,
        })
        .eq("id", editMedId);

      if (!error) {
        setIsModalOpen(false);
        fetchMedicines();
      } else {
        alert("আপডেট ব্যর্থ হয়েছে: " + error.message);
      }
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center text-xs font-sans">
        নিরাপত্তা যাচাই করা হচ্ছে...
      </div>
    );
  }

  // 1. Password Verification Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07241C] text-[#101B32] flex flex-col font-sans">
        <header className="h-16 px-6 border-b border-emerald-900/60 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-200">
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-black text-rose-400 bg-rose-950/60 px-3 py-1.5 rounded-full border border-rose-800">
            <Lock className="w-3.5 h-3.5" />
            <span>এডমিন প্যানেল লকড আছে</span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 space-y-6 shadow-2xl">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <ShieldAlert className="w-8 h-8" />
              </div>
            </div>

            <div className="text-center space-y-1">
              <h1 className="text-2xl font-black text-[#101B32]">এডমিন সিকিউরিটি গেট</h1>
              <p className="text-xs text-[#7B8AA4]">সুপার এডমিন ইমেইল ও পাসওয়ার্ড দিয়ে প্যানেল আনলক করুন।</p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminAuth} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">এডমিন ইমেইল (Email)</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="mahmudulhm2003@gmail.com"
                  className="w-full p-3 border border-[#CCD0D5] rounded-xl bg-[#F7F9FC] focus:bg-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">এডমিন পাসওয়ার্ড (Password)</label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="আপনার গোপন পাসওয়ার্ড"
                  className="w-full p-3 border border-[#CCD0D5] rounded-xl bg-[#F7F9FC] focus:bg-white text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-[#0D4C3B] hover:bg-[#12614A] text-white font-bold rounded-xl text-sm transition-colors shadow-md"
              >
                {loginLoading ? "যাচাই করা হচ্ছে..." : "পাসওয়ার্ড যাচাই করে আনলক করুন"}
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // 2. Main Admin Dashboard View
  const filteredMeds = medicines.filter(
    (m) =>
      m.name_en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.name_bn?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-[#E5EBF2] h-16 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black text-[#101B32]">
              সুপার এডমিন ডাটাবেস কন্ট্রোল প্যানেল
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
              সুপার এডমিন অ্যাক্টিভ
            </span>
          </div>

          <button
            onClick={handleAdminLock}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black flex items-center gap-1.5 transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-rose-600" />
            <span>লক করুন (Lock)</span>
          </button>
        </header>

        <main className="p-6 sm:p-8 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
              <div>
                <h2 className="text-base font-black text-[#101B32]">
                  ডাটাবেসে সংরক্ষিত ওষুধ তালিকা ({medicines.length}টি)
                </h2>
                <p className="text-xs text-[#7B8AA4]">
                  এখান থেকে ওষুধের তথ্য, মূল্য, প্যাকেটের ছবি এবং ভিডিও হাইপারলিংক সরাসরি পরিবর্তন বা ডিলিট করুন।
                </p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ওষুধের নাম লিখে খুঁজুন..."
                  className="pl-9 pr-3 py-2 rounded-xl border border-[#CCD0D5] text-xs bg-[#F7F9FC] focus:bg-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5EBF2] text-[#7B8AA4]">
                    <th className="pb-3 font-bold">প্যাকেটের ছবি (Image)</th>
                    <th className="pb-3 font-bold">ওষুধের নাম (Name)</th>
                    <th className="pb-3 font-bold">ফর্ম ও পাওয়ার (Strength)</th>
                    <th className="pb-3 font-bold">খুচরা / পাতার মূল্য (Price)</th>
                    <th className="pb-3 font-bold">ভিডিও লিংক (Video)</th>
                    <th className="pb-3 font-bold text-right">অ্যাকশন (Action)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {loadingMeds ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-[#7B8AA4]">
                        ডাটাবেস থেকে ওষুধ লোড হচ্ছে...
                      </td>
                    </tr>
                  ) : filteredMeds.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-[#7B8AA4]">
                        কোনো ওষুধ পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    filteredMeds.map((m) => (
                      <tr key={m.id} className="hover:bg-[#F7F9FC]">
                        <td className="py-3.5">
                          {m.image_url ? (
                            <a href={m.image_url} target="_blank" rel="noreferrer">
                              <img
                                src={m.image_url}
                                alt=""
                                className="w-9 h-9 object-cover rounded-lg border border-slate-200"
                              />
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded">
                              ছবি নেই
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 font-bold text-[#101B32]">
                          {m.name_en}{" "}
                          <span className="text-[11px] text-slate-500 font-normal">
                            ({m.name_bn})
                          </span>
                        </td>
                        <td className="py-3.5 text-slate-600">
                          {m.dosage_form} - {m.strength}
                        </td>
                        <td className="py-3.5 font-bold text-[#0D4C3B]">
                          ৳{m.unit_price} / ৳{m.strip_price}
                        </td>
                        <td className="py-3.5">
                          {m.video_url ? (
                            <a
                              href={m.video_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 font-bold flex items-center gap-1 hover:underline"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>ভিডিও দেখুন</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400">খালি (Blank)</span>
                          )}
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEdit(m)}
                            className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100"
                          >
                            এডিট (Edit)
                          </button>
                          <button
                            onClick={() => handleDeleteMedicine(m.id, m.name_en)}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold hover:bg-rose-100"
                          >
                            ডিলিট (Delete)
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Modal (Name, Price, Image Hyperlink, Video Hyperlink) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <h3 className="font-black text-sm text-[#101B32]">
                ওষুধের তথ্য, ছবি ও ভিডিও লিংক এডিট করুন
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMedicine} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">ইংরেজি নাম (English Name)</label>
                  <input
                    type="text"
                    required
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">বাংলা নাম (Bangla Name)</label>
                  <input
                    type="text"
                    required
                    value={formData.name_bn}
                    onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">প্রতি পিস মূল্য (BDT)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.unit_price}
                    onChange={(e) => setFormData({ ...formData, unit_price: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">প্রতি পাতার মূল্য (BDT)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.strip_price}
                    onChange={(e) => setFormData({ ...formData, strip_price: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
              </div>

              {/* Packaging Image URL */}
              <div className="space-y-1">
                <label className="font-bold flex items-center gap-1.5 text-[#0D4C3B]">
                  <Image className="w-3.5 h-3.5" />
                  <span>ওষুধের মোড়কের ছবি (Image Hyperlink URL)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/images/napa.jpg"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                />
              </div>

              {/* Video URL (Blank by default) */}
              <div className="space-y-1">
                <label className="font-bold flex items-center gap-1.5 text-blue-700">
                  <Video className="w-3.5 h-3.5" />
                  <span>ওষুধ রিভিউ ভিডিও লিংক (Video Hyperlink - ঐচ্ছিক)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=xxxx (খালি রাখতে পারেন)"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                />
                <p className="text-[10px] text-slate-500">এটি খালি থাকবে, পরবর্তীতে আপনি ইউটিউব ভিডিও লিংক বসাতে পারবেন।</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-bold text-xs shadow-md transition-colors"
              >
                পরিবর্তন ডাটাবেসে সেভ করুন
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}