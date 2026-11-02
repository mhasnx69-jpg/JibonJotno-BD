/** @type {import('next').NextConfig} */
// সিকিউরিটি এবং পারফরম্যান্সের জন্য Next.js কনফিগারেশন
const nextConfig = {
  // ফ্রেমওয়ার্কের নাম হেডারে লুকিয়ে রাখা (Security Best Practice)
  poweredByHeader: false,
  reactStrictMode: true,

  // সব পেজের জন্য বাধ্যতামূলক HTTP Security Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
