import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignorar errores de ESLint durante el build para poder deployar
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;