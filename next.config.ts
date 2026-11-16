import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Vercel'de basePath olmazsa asset'ler kk dizinden yuklenir.
  // Eger GitHub Pages'e de deploy edilecekse oradaki build scriptine ozel eklenmeli.
};

export default nextConfig;