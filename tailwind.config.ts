import type { Config } from "tailwindcss";

// জীবনযত্ন (JibonJotno) ডিজাইন সিস্টেম: বিশ্বস্ত মেডিকেল গ্রিন/টিল কালার এবং বাংলা/ইংরেজি ফন্ট
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669", // প্রাইমারি মেডিকেল ট্রাস্ট কালার
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-hind-siliguri)", "sans-serif"],
        bangla: ["var(--font-hind-siliguri)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
