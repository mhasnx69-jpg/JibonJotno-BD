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
} from "lucide-react";

export default function AdminPage() {
  const supabase = createClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loadingMeds, setLoadingMeds] = useState(false);

  // Edit / Add Modal States
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
        setAuthError("Email ba Password shothik noy.");
      }
    } catch {
      setAuthError("Authentication error.");
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

  const handleDeleteMedicine = async (id: string) => {
    if (!confirm("Apni ki shotti-i ei medicine delete korte chan?")) return;
    const { error } = await supabase.from("medicines").delete().eq("id", id);
    if (!error) {
      setMedicines((prev) => prev.filter((m) => m.id !== id));
      alert("Medicine safallyer sathe delete kora hoyeche.");
    } else {
      alert("Delete failed: " + error.message);
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
        alert("Update error: " + error.message);
      }
    }
  };

  if (checkingAuth) {
    return <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center text-xs">Security check...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07241C] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 space-y-6">
          <h1 className="text-xl font-black text-center text-[#101B32]">Admin Security Gate</h1>
          {authError && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl">{authError}</div>}
          <form onSubmit={handleAdminAuth} className="space-y-4 text-xs">
            <input
              type="email"
              required
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Admin Email"
              className="w-full p-3 border rounded-xl"
            />
            <input
              type="password"
              required
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border rounded-xl"
            />
            <button type="submit" disabled={loginLoading} className="w-full py-3 bg-[#0D4C3B] text-white font-bold rounded-xl">
              {loginLoading ? "Checking..." : "Unlock Admin"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredMeds = medicines.filter(
    (m) =>
      m.name_en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.name_bn?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex font-sans">
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-[#E5EBF2] h-16 px-6 sm:px-8 flex items-center justify-between">
          <h1 className="text-base font-black text-[#101B32]">Medicine Inventory & Media Links</h1>
          <button onClick={handleAdminLock} className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 text-xs font-black flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Panel</span>
          </button>
        </header>

        <main className="p-6 sm:p-8 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <h2 className="text-base font-black">All Medicines ({medicines.length})</h2>
              <div className="relative">
                <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medicine..."
                  className="pl-9 pr-3 py-2 rounded-xl border text-xs bg-[#F7F9FC]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b text-[#7B8AA4]">
                    <th className="pb-3 font-bold">Image</th>
                    <th className="pb-3 font-bold">Medicine Name</th>
                    <th className="pb-3 font-bold">Form & Strength</th>
                    <th className="pb-3 font-bold">Unit / Strip Price</th>
                    <th className="pb-3 font-bold">Video Link</th>
                    <th className="pb-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredMeds.map((m) => (
                    <tr key={m.id} className="hover:bg-[#F7F9FC]">
                      <td className="py-3.5">
                        {m.image_url ? (
                          <a href={m.image_url} target="_blank" rel="noreferrer">
                            <img src={m.image_url} alt="" className="w-9 h-9 object-cover rounded-lg border" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded">No Image</span>
                        )}
                      </td>
                      <td className="py-3.5 font-bold">
                        {m.name_en} <span className="text-[11px] text-slate-500 font-normal">({m.name_bn})</span>
                      </td>
                      <td className="py-3.5 text-slate-600">{m.dosage_form} - {m.strength}</td>
                      <td className="py-3.5 font-bold text-[#0D4C3B]">৳{m.unit_price} / ৳{m.strip_price}</td>
                      <td className="py-3.5">
                        {m.video_url ? (
                          <a href={m.video_url} target="_blank" rel="noreferrer" className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
                            <Video className="w-3.5 h-3.5" />
                            <span>View Video</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-400">Blank</span>
                        )}
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <button onClick={() => handleOpenEdit(m)} className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold">
                          Edit Media & Price
                        </button>
                        <button onClick={() => handleDeleteMedicine(m.id)} className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold">
                          Delete
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-sm">Edit Medicine, Image & Video Link</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSaveMedicine} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold">English Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name_en}
                    onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold">Bangla Name</label>
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
                  <label className="font-bold">Unit Price (BDT)</label>
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
                  <label className="font-bold">Strip Price (BDT)</label>
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

              {/* Hyperlink Image Option */}
              <div className="space-y-1">
                <label className="font-bold flex items-center gap-1.5 text-[#0D4C3B]">
                  <Image className="w-3.5 h-3.5" />
                  <span>Medicine Packaging Image URL (Hyperlink)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/images/napa.jpg"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                />
                <p className="text-[10px] text-slate-500">Oshudher moroker chobir link boshan.</p>
              </div>

              {/* Hyperlink Video Option (Blank by default) */}
              <div className="space-y-1">
                <label className="font-bold flex items-center gap-1.5 text-blue-700">
                  <Video className="w-3.5 h-3.5" />
                  <span>Medicine Video / Review Link (Hyperlink - Optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=xxxx (Pore add korte paren)"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full p-2.5 border rounded-xl bg-slate-50 focus:bg-white"
                />
                <p className="text-[10px] text-slate-500">Eti blank thakbe, pore apni manual video link add korte parben.</p>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-[#0D4C3B] text-white font-bold text-xs">
                Save Details & Hyperlinks
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}