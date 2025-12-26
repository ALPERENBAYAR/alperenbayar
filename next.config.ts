import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smartpro.com.tr",
      },
    ],
  },
};

export default nextConfig;
