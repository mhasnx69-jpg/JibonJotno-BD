/** @type {import("next").NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://ezlcmwobkistnahsfmtl.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_b_X4N09M0lnZg7usPe4Zeg_o2Wqu8ko",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_b_X4N09M0lnZg7usPe4Zeg_o2Wqu8ko",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
