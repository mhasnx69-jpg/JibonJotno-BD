"use client";

import React, { useState } from "react";
import { Stethoscope, Plus, Trash2, Phone, MapPin } from "lucide-react";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([
    {
      id: "doc-1",
      name: "ডাঃ রফিকুল ইসলাম",
      specialty: "মেডিসিন ও হৃদরোগ বিশেষজ্ঞ",
      degrees: "MBBS, FCPS (Medicine), MD (Cardiology)",
      hospital: "ঢাকা মেডিকেল কলেজ ও হাসপাতাল",
      fee: 1000,
      serial_phone: "01711000001",
    },
    {
      id: "doc-2",
      name: "ডাঃ ফাহমিদা সুলতানা",
      specialty: "গাইনী ও প্রসূতি বিশেষজ্ঞ",
      degrees: "MBBS, DGO, MCPS",
      hospital: "বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়",
      fee: 1200,
      serial_phone: "01811000002",
    },
    {
      id: "doc-3",
      name: "ডাঃ সাজ্জাদ হোসেন",
      specialty: "শিশু রোগ বিশেষজ্ঞ",
      degrees: "MBBS, DCH, MD (Pediatrics)",
      hospital: "বাংলাদেশ শিশু হাসপাতাল ও ইনস্টিটিউট",
      fee: 800,
      serial_phone: "01911000003",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    degrees: "",
    hospital: "",
    fee: "",
    serial_phone: "",
  });

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.specialty) return;
    const newDoc = {
      id: "doc-" + Date.now(),
      name: formData.name.trim(),
      specialty: formData.specialty.trim(),
      degrees: formData.degrees.trim() || "MBBS",
      hospital: formData.hospital.trim() || "বিশেষায়িত চেম্বার",
      fee: Number(formData.fee) || 800,
      serial_phone: formData.serial_phone.trim() || "01700000000",
    };
    setDoctors([newDoc, ...doctors]);
    setFormData({ name: "", specialty: "", degrees: "", hospital: "", fee: "", serial_phone: "" });
  };

  const handleDelete = (id: string) => {
    if (confirm("আপনি কি নিশ্চিত যে এই ডাক্তারকে ডিরেক্টরি থেকে মুছে ফেলতে চান?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="flex-1 p-6 sm:p-8 space-y-6 bg-[#F7F9FC] min-h-screen font-sans">
      <header className="flex justify-between items-center border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-black text-[#101B32] flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-emerald-700" />
            <span>ডাক্তার ডিরেক্টরি ও চেম্বার সিরিয়াল পরিচালনা</span>
          </h1>
          <p className="text-xs text-[#7B8AA4]">সারা দেশের বিশেষজ্ঞ ডাক্তারদের তালিকা ও অ্যাপয়েন্টমেন্ট তথ্য সংরক্ষণ করুন।</p>
        </div>
      </header>

      {/* Add Doctor Form */}
      <div className="bg-white rounded-3xl p-6 border border-[#E5EBF2] shadow-xs">
        <h2 className="text-sm font-black text-[#101B32] mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-700" />
          <span>নতুন বিশেষজ্ঞ ডাক্তার যুক্ত করুন</span>
        </h2>
        <form onSubmit={handleAddDoctor} className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <input
            type="text"
            required
            placeholder="ডাক্তারের নাম (যেমন: ডাঃ আহমেদ শরীফ)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
          />
          <input
            type="text"
            required
            placeholder="বিশেষজ্ঞ বিভাগ (যেমন: গ্যাস্ট্রোএন্টারোলজি)"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
          />
          <input
            type="text"
            placeholder="ডিগ্রি (যেমন: MBBS, FCPS, MD)"
            value={formData.degrees}
            onChange={(e) => setFormData({ ...formData, degrees: e.target.value })}
            className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
          />
          <input
            type="text"
            placeholder="হাসপাতাল / প্রধান চেম্বার"
            value={formData.hospital}
            onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
            className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
          />
          <input
            type="number"
            placeholder="ভিজিটিং ফি (BDT)"
            value={formData.fee}
            onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
            className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
          />
          <input
            type="tel"
            placeholder="সিরিয়াল ফোন নম্বর (017...)"
            value={formData.serial_phone}
            onChange={(e) => setFormData({ ...formData, serial_phone: e.target.value })}
            className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
          />
          <button
            type="submit"
            className="md:col-span-3 py-3 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-bold transition-all shadow-xs"
          >
            ডাক্তার তথ্য সংরক্ষণ করুন
          </button>
        </form>
      </div>

      {/* Doctor List */}
      <div className="bg-white rounded-3xl p-6 border border-[#E5EBF2] shadow-xs space-y-4">
        <h2 className="text-sm font-black text-[#101B32]">তালিকাভুক্ত ডাক্তারবৃন্দ ({doctors.length} জন)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doc) => (
            <div key={doc.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="font-black text-sm text-[#101B32]">{doc.name}</h3>
                <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {doc.specialty}
                </span>
                <p className="text-[11px] text-slate-500 pt-1">{doc.degrees}</p>
                <p className="text-xs text-slate-700 font-medium flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{doc.hospital}</span>
                </p>
                <p className="text-xs text-[#0D4C3B] font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>সিরিয়াল: {doc.serial_phone}</span>
                </p>
              </div>
              <div className="pt-2 border-t flex justify-between items-center text-xs">
                <span className="font-extrabold text-[#101B32]">ফি: ৳{doc.fee}</span>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-bold"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
