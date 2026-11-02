import type { Metadata, Viewport } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

export const metadata: Metadata = {
  title: {
    default: "JibonJotno (জীবনযত্ন) — Digital Healthcare Platform for Bangladesh",
    template: "%s | JibonJotno (জীবনযত্ন)",
  },
  description:
    "বাংলাদেশের বিশ্বস্ত ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম — ওষুধের সঠিক তথ্য, বিশেষজ্ঞ ডাক্তার, হাসপাতাল ডিরেক্টরি, রক্তদাতা এবং অনলাইন ফার্মেসি সেবা।",
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="bn" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
