import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Prevents loading issues in standard or serverless environments
  },
};

export default nextConfig;
