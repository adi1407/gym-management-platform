import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Keep file tracing inside this app (avoid parent lockfiles confusing the build)
  outputFileTracingRoot: path.join(__dirname),

  // Don't fail production deploys on lint noise from third-party UI kits
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Standalone is for Docker only — breaks Vercel if always on
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
