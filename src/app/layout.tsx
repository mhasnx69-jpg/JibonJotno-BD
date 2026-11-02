import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import HealthChatWidget from "@/components/chat/HealthChatWidget";

export const metadata: Metadata = {
  title: "জীবনযত্ন (JibonJotno) — ডিজিটাল স্বাস্থ্য ও ফার্মেসি সেবা",
  description: "বাংলাদেশের নির্ভরযোগ্য ওষুধ নির্দেশিকা, জেনেরিক দামের তুলনা, জরুরি ব্লাড ব্যাংক ও ক্যাশ অন ডেলিভারি ফার্মেসি।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="antialiased bg-[#F7F9FC] text-[#101B32]" suppressHydrationWarning>
        <LanguageProvider>
          <CartProvider>
            {children}
            <HealthChatWidget />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}