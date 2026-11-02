"use client";

import React, { useState } from "react";
import { BookOpen, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([
    {
      id: "art-1",
      title: "ডায়াবেটিস নিয়ন্ত্রণে ৫টি দৈনন্দিন খাদ্যাভ্যাস",
      category: "জীবনযাত্রা ও পুষ্টি",
      author: "ডাঃ তানজিনা হক",
      status: "Published",
    },
    {
      id: "art-2",
      title: "অ্যান্টিবায়োটিকের সঠিক ব্যবহার ও কোর্স সম্পূর্ণ করার গুরুত্ব",
      category: "ওষুধ সচেতনতা",
      author: "রেজিস্টার্ড ফার্মাসিস্ট পরিষদ",
      status: "Published",
    },
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("সাধারণ স্বাস্থ্য");
  const [content, setContent] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const newArt = {
      id: "art-" + Date.now(),
      title: title.trim(),
      category: category,
      author: "জীবনযত্ন মেডিকেল ডেস্ক",
      status: "Published",
    };
    setArticles([newArt, ...articles]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="flex-1 p-8 space-y-6">
        <header className="border-b pb-4 border-slate-200">
          <h1 className="text-xl font-black text-[#101B32] flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-700" />
            <span>স্বাস্থ্য শিক্ষা ও মেডিকেল ব্লগ CMS</span>
          </h1>
          <p className="text-xs text-[#7B8AA4]">রোগীদের স্বাস্থ্য সচেতনতা ও রোগ প্রতিরোধমূলক আর্টিকেল পরিচালনা করুন।</p>
        </header>

        <div className="bg-white rounded-3xl p-6 border border-[#E5EBF2] shadow-xs">
          <h2 className="text-sm font-black text-[#101B32] mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-700" />
            <span>নতুন মেডিকেল আর্টিকেল লিখুন</span>
          </h2>
          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <input
              type="text"
              required
              placeholder="আর্টিকেলের শিরোনাম (যেমন: গ্যাস্ট্রিকের সমস্যায় ঘরোয়া প্রতিকার)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-xl bg-slate-50 focus:bg-white"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 border rounded-xl bg-slate-50 focus:bg-white"
              >
                <option value="সাধারণ স্বাস্থ্য">সাধারণ স্বাস্থ্য</option>
                <option value="ওষুধ সচেতনতা">ওষুধ সচেতনতা</option>
                <option value="শিশু ও মাতৃত্ব">শিশু ও মাতৃত্ব</option>
                <option value="হৃদরোগ ও ডায়াবেটিস">হৃদরোগ ও ডায়াবেটিস</option>
              </select>
              <input
                type="text"
                readOnly
                value="লেখক: জীবনযত্ন মেডিকেল টিম"
                className="p-3 border rounded-xl bg-slate-100 text-slate-500"
              />
            </div>
            <textarea
              rows={4}
              placeholder="আর্টিকেলের বিস্তারিত বিবরণ..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border rounded-xl bg-slate-50 focus:bg-white"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-[#0D4C3B] hover:bg-[#12614A] text-white font-bold transition-all"
            >
              আর্টিকেল প্রকাশ করুন
            </button>
          </form>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E5EBF2] shadow-xs space-y-3">
          <h2 className="text-sm font-black text-[#101B32]">প্রকাশিত আর্টিকেল তালিকা</h2>
          <div className="space-y-2">
            {articles.map((art) => (
              <div key={art.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 flex justify-between items-center text-xs">
                <div>
                  <h3 className="font-black text-[#101B32]">{art.title}</h3>
                  <div className="text-slate-500 text-[11px] pt-0.5">{art.category} • {art.author}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {art.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
