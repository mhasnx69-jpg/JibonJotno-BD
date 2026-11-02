"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  HeartHandshake,
  Search,
  Phone,
  MapPin,
  PlusCircle,
  X,
  AlertCircle,
  CheckCircle2,
  Calendar,
  MessageCircle,
} from "lucide-react";

interface BloodPost {
  id: string;
  type: "need" | "donate";
  patient_name: string;
  blood_group: string;
  location: string;
  district: string;
  disease: string;
  phone: string;
  urgency: "জরুরি (Emergency)" | "সাধারণ (Within 24h)";
  date: string;
}

export default function BloodBankPage() {
  const [selectedGroup, setSelectedGroup] = useState("সকল গ্রুপ");
  const [selectedDistrict, setSelectedDistrict] = useState("সকল জেলা");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [posts, setPosts] = useState<BloodPost[]>([
    {
      id: "post-1",
      type: "need",
      patient_name: "করিম উল্লাহ",
      blood_group: "O+",
      district: "ঢাকা",
      location: "ঢাকা মেডিকেল কলেজ হাসপাতাল (ওয়ার্ড নং ৪)",
      disease: "থ্যালাসেমিয়া ও রক্তের হিমোগ্লোবিন স্বল্পতা",
      phone: "01711223344",
      urgency: "জরুরি (Emergency)",
      date: "আজকের মধ্যে",
    },
    {
      id: "post-2",
      type: "donate",
      patient_name: "রাকিবুল হাসান (স্বেচ্ছাসেবী রক্তদাতা)",
      blood_group: "A+",
      district: "ঢাকা",
      location: "মিরপুর ২, ঢাকা",
      disease: "সুস্থ রক্তদাতা, শেষ রক্তদান ৪ মাস আগে",
      phone: "01819464150",
      urgency: "সাধারণ (Within 24h)",
      date: "যেকোনো সময় যোগাযোগযোগ্য",
    },
    {
      id: "post-3",
      type: "need",
      patient_name: "সুমাইয়া আক্তার",
      blood_group: "B+",
      district: "চট্টগ্রাম",
      location: "চট্টগ্রাম মেডিকেল কলেজ",
      disease: "জরুরি সিজারিয়ান অপারেশন",
      phone: "01999887766",
      urgency: "জরুরি (Emergency)",
      date: "আজ বিকাল ৫টার মধ্যে",
    },
  ]);

  const [form, setForm] = useState({
    type: "need" as "need" | "donate",
    patient_name: "",
    blood_group: "A+",
    district: "ঢাকা",
    location: "",
    disease: "",
    phone: "",
    urgency: "জরুরি (Emergency)" as "জরুরি (Emergency)" | "সাধারণ (Within 24h)",
  });

  const bloodGroups = ["সকল গ্রুপ", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const districts = ["সকল জেলা", "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "সিলেট", "খুলনা", "বরিশাল", "রংপুর"];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient_name || !form.phone || !form.location) return;

    const newPost: BloodPost = {
      id: "post-" + Date.now(),
      type: form.type,
      patient_name: form.patient_name.trim(),
      blood_group: form.blood_group,
      district: form.district,
      location: form.location.trim(),
      disease: form.disease.trim() || "রোগীর জরুরি রক্তের প্রয়োজন",
      phone: form.phone.trim(),
      urgency: form.urgency,
      date: "সবেমাত্র পোস্টকৃত",
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setForm({
      type: "need",
      patient_name: "",
      blood_group: "A+",
      district: "ঢাকা",
      location: "",
      disease: "",
      phone: "",
      urgency: "জরুরি (Emergency)",
    });
  };

  const filteredPosts = posts.filter((p) => {
    const matchGroup = selectedGroup === "সকল গ্রুপ" || p.blood_group === selectedGroup;
    const matchDistrict = selectedDistrict === "সকল জেলা" || p.district === selectedDistrict;
    return matchGroup && matchDistrict;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans text-[#101B32] pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5EBF2] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#0D4C3B]">
            <ArrowLeft className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>রক্তের পোস্ট করুন</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-rose-700 to-red-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-3">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold inline-block">
            🩸 রক্তের গ্রুপভিত্তিক জরুরি অনুসন্ধান ও পোস্ট
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">ব্লাড ব্যাংক ও স্বেচ্ছায় রক্তদাতা নেটওয়ার্ক</h1>
          <p className="text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
            জরুরি রক্তের প্রয়োজনে রক্তদাতার সন্ধান করুন অথবা রোগীর রোগ, রক্তের গ্রুপ ও লোকেশন উল্লেখ করে রক্তের আবেদন পোস্ট করুন।
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5EBF2] shadow-xs space-y-4">
          <div>
            <span className="text-xs font-bold text-[#7B8AA4] block mb-2">রক্তের গ্রুপ নির্বাচন করুন:</span>
            <div className="flex flex-wrap gap-2">
              {bloodGroups.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    selectedGroup === bg
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-[#F7F9FC] border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-[#7B8AA4]">জেলা:</span>
            <div className="flex flex-wrap gap-1.5">
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    selectedDistrict === d
                      ? "bg-[#0D4C3B] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blood Requests & Donors Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-black text-[#101B32]">
              লাইভ রক্তের আবেদন ও রক্তদাতাদের তালিকা ({filteredPosts.length}টি)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl p-5 border border-[#E5EBF2] shadow-xs flex flex-col justify-between space-y-4 hover:border-rose-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        post.type === "need"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {post.type === "need" ? "🩸 রক্ত প্রয়োজন" : "🤝 রক্ত দিতে চাই"}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-rose-600 text-white font-black text-sm shadow-xs">
                      {post.blood_group}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-base text-[#101B32]">{post.patient_name}</h3>
                    <p className="text-xs font-semibold text-rose-700 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>রোগ / সমস্যা: {post.disease}</span>
                    </p>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 pt-1">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{post.location} ({post.district})</span>
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>সময়সীমা: {post.date}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`tel:${post.phone}`}
                    className="flex-1 py-2.5 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>কল দিন</span>
                  </a>
                  <a
                    href={`https://wa.me/88${post.phone.replace(/[^0-9]/g, "")}?text=Salam,%20ami%20JibonJotno%20theke%20rokter%20post%20dekhe%20jogajog%20korchi.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center justify-center"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-sm text-[#101B32]">রক্তের আবেদন অথবা রক্তদাতা হিসেবে পোস্ট করুন</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: "need" })}
                  className={`py-2.5 rounded-xl font-bold border ${
                    form.type === "need"
                      ? "bg-rose-50 border-rose-600 text-rose-700"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  রক্ত প্রয়োজন (Patient)
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: "donate" })}
                  className={`py-2.5 rounded-xl font-bold border ${
                    form.type === "donate"
                      ? "bg-emerald-50 border-emerald-600 text-emerald-700"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  রক্ত দিতে চাই (Donor)
                </button>
              </div>

              <div>
                <label className="font-bold block mb-1">
                  {form.type === "need" ? "রোগীর নাম / অভিভাবক *" : "আপনার নাম (রক্তদাতা) *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="নাম লিখুন"
                  value={form.patient_name}
                  onChange={(e) => setForm({ ...form, patient_name: e.target.value })}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">রক্তের গ্রুপ *</label>
                  <select
                    value={form.blood_group}
                    onChange={(e) => setForm({ ...form, blood_group: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">জেলা *</label>
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                  >
                    {districts.filter(d => d !== "সকল জেলা").map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">হাসপাতাল / বিস্তারিত লোকেশন *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ঢাকা মেডিকেল, নতুন ভবন, কেবিন ৩"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">রোগ বা কারণ (Disease / Details) *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: থ্যালাসেমিয়া, ডেলিভারি অপারেশন বা ডেঙ্গু"
                  value={form.disease}
                  onChange={(e) => setForm({ ...form, disease: e.target.value })}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">যোগাযোগের মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md transition-all"
              >
                পোস্ট প্রকাশ করুন
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
