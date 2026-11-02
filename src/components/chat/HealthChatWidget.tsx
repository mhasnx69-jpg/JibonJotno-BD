"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MessageSquare, X, Send, HelpCircle, Sparkles, MessageCircle } from "lucide-react";

export default function HealthChatWidget() {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState<number | null>(null);
  const [customMsg, setCustomMsg] = useState("");

  const whatsappNumber = "8801819464150";

  const faqs = isEn
    ? [
        {
          id: 1,
          question: "How do I order medicines?",
          answer: "Go to the Medicine Directory, click 'Add to Bag', and enter your name, phone number, and address at checkout for 100% Cash on Delivery."
        },
        {
          id: 2,
          question: "What is the delivery charge and time?",
          answer: "Inside Dhaka: 60 BDT (within 12-24 hours). Outside Dhaka: 120 BDT (within 24-72 hours via courier)."
        },
        {
          id: 3,
          question: "How can I find emergency blood donors?",
          answer: "Visit our Blood Bank page to filter donors by blood group and district, or post an urgent blood request directly."
        },
        {
          id: 4,
          question: "How do I check live ICU bed availability?",
          answer: "Visit the ICU & Hospital Map page to check real-time vacant ICU beds and 24/7 emergency hotlines across Bangladesh."
        },
        {
          id: 5,
          question: "How do I order prescription medicines?",
          answer: "Send a photo of your prescription directly to our WhatsApp (01819464150) and our registered pharmacist will verify and process your order."
        }
      ]
    : [
        {
          id: 1,
          question: "ওষুধ অর্ডার করবো কীভাবে?",
          answer: "ওষুধের পাতায় গিয়ে 'ব্যাগে যুক্ত করুন' বাটনে চাপ দিয়ে চেকআউটে নাম, ঠিকানা ও মোবাইল দিয়ে অর্ডার সম্পন্ন করুন। সম্পূর্ণ ক্যাশ অন ডেলিভারিতে হোম ডেলিভারি পেয়ে যাবেন।"
        },
        {
          id: 2,
          question: "ডেলিভারি চার্জ কত এবং কতক্ষণ সময় লাগে?",
          answer: "ঢাকার ভেতরে ডেলিভারি চার্জ ৬০ টাকা (১২-২৪ ঘণ্টার মধ্যে)। ঢাকার বাইরে ১২০ টাকা (২৪-৭২ ঘণ্টার মধ্যে নির্ভরযোগ্য কুরিয়ারে)।"
        },
        {
          id: 3,
          question: "জরুরি রক্ত বা রক্তদাতার সন্ধান কীভাবে পাবো?",
          answer: "আমাদের 'ব্লাড ব্যাংক' পেজে গিয়ে আপনার রক্তের গ্রুপ সিলেক্ট করে সরাসরি ডোনারকে কল দিন অথবা নিজে পোস্ট করুন।"
        },
        {
          id: 4,
          question: "আইসিইউ (ICU) বেড খালি আছে কি না কীভাবে দেখবো?",
          answer: "হাসপাতাল ডিরেক্টরি পেজে সারা দেশের সরকারি ও বেসরকারি হাসপাতালের রিয়েল-টাইম ফাঁকা আইসিইউ বেড এবং হেল্পলাইন নম্বর দেখতে পারবেন।"
        },
        {
          id: 5,
          question: "প্রেসক্রিপশনের ওষুধ কীভাবে কিনতে পারবো?",
          answer: "চেকআউট পেজে অথবা সরাসরি আমাদের হোয়াটসঅ্যাপে (01819464150) প্রেসক্রিপশনের ছবি পাঠালে ফার্মাসিস্ট যাচাই করে ওষুধ পাঠিয়ে দেবেন।"
        }
      ];

  const selectedFaq = faqs.find((f) => f.id === selectedFaqId) || null;

  const handleSendToWhatsApp = (text?: string) => {
    const defaultText = isEn
      ? "Hello JibonJotno, I need assistance regarding medicines or healthcare services."
      : "হ্যালো জীবনযত্ন, আমার জরুরি স্বাস্থ্য পরামর্শ বা ওষুধ নিয়ে কিছু জানার আছে।";
    const message = encodeURIComponent(text || customMsg || defaultText);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#0D4C3B] hover:bg-[#12614A] text-white shadow-2xl transition-all hover:scale-105 border border-emerald-400/40"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-emerald-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
          </div>
          <span className="text-xs font-black tracking-wide">
            {isEn ? "Emergency Chat & FAQ" : "জরুরি চ্যাট ও প্রশ্নোত্তর"}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-[340px] sm:w-[380px] overflow-hidden flex flex-col h-[520px] transition-all">
          <div className="bg-[#07241C] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black">
                  {isEn ? "JibonJotno Smart Help Desk" : "জীবনযত্ন স্মার্ট হেল্প ডেস্ক"}
                </h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  {isEn ? "24/7 Healthcare Support" : "সার্বক্ষণিক স্বাস্থ্য সহায়তা"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedFaqId(null);
              }}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F7F9FC] text-xs">
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-emerald-900">
              <p className="font-extrabold text-[11px] mb-1">
                {isEn ? "Welcome! How can we help you today?" : "স্বাগতম! কীভাবে সাহায্য করতে পারি?"}
              </p>
              <p className="text-[10px] text-emerald-800 leading-relaxed">
                {isEn
                  ? "Click any question below for an instant answer or message us directly on WhatsApp."
                  : "নিচের যেকোনো প্রশ্নে ক্লিক করে সরাসরি উত্তর দেখুন অথবা যেকোনো প্রয়োজনে আমাদের অফিশিয়াল হোয়াটসঅ্যাপে নক করুন।"}
              </p>
            </div>

            <div
              onClick={() => handleSendToWhatsApp()}
              className="cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-700 p-3 rounded-2xl text-white shadow-sm flex items-center justify-between hover:opacity-95 transition-all"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-black text-emerald-200 tracking-wider block">
                  {isEn ? "Direct Support" : "সরাসরি সহায়তা"}
                </span>
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  {isEn ? "WhatsApp: 01819464150" : "হোয়াটসঅ্যাপ: ০১৮১৯৪৬৪১৫০"}
                </span>
              </div>
              <span className="px-2.5 py-1 bg-white text-[#0D4C3B] font-black rounded-lg text-[10px]">
                {isEn ? "Chat Now" : "চ্যাট করুন"}
              </span>
            </div>

            {selectedFaq && (
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-[#101B32] text-xs">
                    {isEn ? "Q: " : "প্রশ্ন: "}{selectedFaq.question}
                  </span>
                  <button
                    onClick={() => setSelectedFaqId(null)}
                    className="text-[10px] text-slate-400 hover:text-slate-600 underline"
                  >
                    {isEn ? "Close" : "বন্ধ করুন"}
                  </button>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed border-t pt-2">
                  {selectedFaq.answer}
                </p>
              </div>
            )}

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {isEn ? "Frequently Asked Questions:" : "সাধারণ জিজ্ঞাসাসমূহ:"}
              </span>
              {faqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => setSelectedFaqId(faq.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                    selectedFaqId === faq.id
                      ? "bg-emerald-100/70 border-emerald-400 text-emerald-950"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="truncate pr-2">{faq.question}</span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder={isEn ? "Type your question here..." : "উত্তর খুঁজে না পেলে এখানে লিখুন..."}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendToWhatsApp();
                }}
                className="flex-1 p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
              <button
                onClick={() => handleSendToWhatsApp()}
                className="p-2.5 bg-[#0D4C3B] hover:bg-[#12614A] text-white rounded-xl shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[9px] text-center text-slate-400">
              {isEn ? "Emergency Hotline: " : "জরুরি মুহূর্তে কল করুন: "}
              <span className="font-bold text-[#0D4C3B]">01819464150</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}