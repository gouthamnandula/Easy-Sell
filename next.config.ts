import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "tkmekhwamnspqefkqnyw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
