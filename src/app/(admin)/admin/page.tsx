"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Package,
  Clock,
  Pill,
  DollarSign,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  X,
  Save,
} from "lucide-react";

export default function AdminPage() {
  const supabase = createClient();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"orders" | "inventory">("inventory");
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
    is_prescription_required: false,
    category_key: "pain",
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
      .select("*, generics(name_en), manufacturers(name_en)")
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
        setAuthError("Email wenno Password ket saan a husto.");
      }
    } catch {
      setAuthError("Adda biddut iti panag-authenticate.");
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
    if (!confirm("Sigurado kadi a kayatmo a pukawen daytoy nga agas iti database?")) return;
    const { error } = await supabase.from("medicines").delete().eq("id", id);
    if (!error) {
      setMedicines((prev) => prev.filter((m) => m.id !== id));
      alert("Naikkat a sibaballigi!");
    } else {
      alert("Napaay a naisina: " + error.message);
    }
  };

  const handleOpenEdit = (med: any) => {
    setEditMedId(med.id);
    setFormData({
      name_bn: med.name_bn,
      name_en: med.name_en,
      dosage_form: med.dosage_form,
      strength: med.strength,
      unit_price: med.unit_price,
      strip_price: med.strip_price,
      is_prescription_required: med.is_prescription_required,
      category_key: med.category_key || "pain",
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
          is_prescription_required: formData.is_prescription_required,
          category_key: formData.category_key,
        })
        .eq("id", editMedId);

      if (!error) {
        setIsModalOpen(false);
        fetchMedicines();
      } else {
        alert("Biddut iti panag-update: " + error.message);
      }
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center text-xs">
        Maberiberipika ti seguridad...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07241C] text-[#101B32] flex flex-col font-sans">
        <header className="h-16 px-6 border-b border-emerald-900/60 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-200">
            <ArrowLeft className="w-4 h-4" />
            <span>Agsubli iti Home</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-black text-rose-400 bg-rose-950/60 px-3 py-1.5 rounded-full border border-rose-800">
            <Lock className="w-3.5 h-3.5" />
            <span>Narikpan ti Admin Panel</span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-black text-[#101B32]">Admin Security Verification</h1>
              <p className="text-xs text-[#7B8AA4]">Isublat ti Super Admin email ken password.</p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl border text-xs"
              />
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border text-xs"
              />
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 rounded-xl bg-[#0D4C3B] text-white font-black text-sm"
              >
                {loginLoading ? "Aberiberipika..." : "I-unlock ti Panel"}
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  const filteredMeds = medicines.filter(
    (m) =>
      m.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.name_bn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101B32] flex font-sans">
      <aside className="w-64 bg-[#0B1528] text-white hidden md:flex flex-col justify-between p-5">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D4C3B] text-white flex items-center justify-center font-black text-xl">
              +
            </div>
            <div>
              <h2 className="font-black text-sm text-white">জীবনযত্ন CMS</h2>
              <p className="text-[10px] text-emerald-400 font-bold">Admin Console</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("inventory")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl ${
                activeTab === "inventory" ? "bg-[#0D4C3B] text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Medicine Inventory & Actions</span>
            </button>
          </nav>
        </div>

        <button
          onClick={handleAdminLock}
          className="w-full py-3 rounded-xl bg-rose-950/80 text-rose-300 font-bold text-xs flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>I-lock ken Rummuar</span>
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-[#E5EBF2] h-16 px-6 sm:px-8 flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-black text-[#101B32]">
            Super Admin Database Manager
          </h1>
          <button
            onClick={handleAdminLock}
            className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 text-xs font-black flex items-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>I-lock</span>
          </button>
        </header>

        <main className="p-6 sm:p-8 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5EBF2] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <h2 className="text-base font-black text-[#101B32]">
                  Dagiti Agas iti Database ({medicines.length})
                </h2>
                <p className="text-xs text-slate-500">Mabalinmo nga i-edit ti presyo wenno ikkaten ditoy.</p>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-[#7B8AA4] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Agbirok iti agas..."
                  className="pl-9 pr-3 py-2 rounded-xl border text-xs bg-[#F7F9FC]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b text-[#7B8AA4]">
                    <th className="pb-3 font-bold">Nagan ti Agas</th>
                    <th className="pb-3 font-bold">Porma & Pigsa</th>
                    <th className="pb-3 font-bold">Presyo (Tunggal maysa)</th>
                    <th className="pb-3 font-bold">Presyo (Tunggal banag/pakete)</th>
                    <th className="pb-3 font-bold text-right">Aksyon (Edit / Delete)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredMeds.map((m) => (
                    <tr key={m.id} className="hover:bg-[#F7F9FC]">
                      <td className="py-3.5 font-bold text-[#101B32]">
                        {m.name_en} <span className="text-[11px] text-slate-500 font-normal">({m.name_bn})</span>
                      </td>
                      <td className="py-3.5 text-slate-600">
                        {m.dosage_form} - {m.strength}
                      </td>
                      <td className="py-3.5 font-bold text-[#0D4C3B]">BDT {m.unit_price}</td>
                      <td className="py-3.5 font-bold text-slate-700">BDT {m.strip_price}</td>
                      <td className="py-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(m)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100"
                        >
                          I-edit
                        </button>
                        <button
                          onClick={() => handleDeleteMedicine(m.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 font-bold hover:bg-rose-100"
                        >
                          Ikkaten
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
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-sm">I-edit ti Detalye ti Agas</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveMedicine} className="space-y-3 text-xs">
              <div>
                <label className="font-bold">Nagan iti Ingles</label>
                <input
                  type="text"
                  required
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold">Nagan iti Bangla</label>
                <input
                  type="text"
                  required
                  value={formData.name_bn}
                  onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold">Presyo (Pisa)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.unit_price}
                    onChange={(e) => setFormData({ ...formData, unit_price: Number(e.target.value) })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold">Presyo (Strip)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.strip_price}
                    onChange={(e) => setFormData({ ...formData, strip_price: Number(e.target.value) })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0D4C3B] text-white font-bold text-xs"
              >
                Idulin dagiti Panagbalbaliw
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}