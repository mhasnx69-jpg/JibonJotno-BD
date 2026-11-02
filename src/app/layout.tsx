import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "জীবনযত্ন (JibonJotno) — ডিজিটাল স্বাস্থ্য তথ্য ও সেবা",
  description: "সহজ ও সঠিক স্বাস্থ্য তথ্য আপনার হাতের মুঠোয়।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen bg-[#F7F9FC] text-[#101B32] antialiased">
        <LanguageProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}