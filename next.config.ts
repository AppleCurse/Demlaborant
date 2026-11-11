import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.e2b.app"],
  images: {
    unoptimized: process.env.GITHUB_ACTIONS === "true",
  },
};

export default nextConfig;
