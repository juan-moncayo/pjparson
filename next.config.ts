import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    remotePatterns: [
      // Instagram images
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'instagram.**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent-**.cdninstagram.com',
      },
      // Google Profile images for reviews
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      // HoneyBook images
      {
        protocol: 'https',
        hostname: '**.honeybook.com',
      },
      {
        protocol: 'https',
        hostname: 'widget.honeybook.com',
      },
      {
        protocol: 'https',
        hostname: 'd25purrcgqtc5w.cloudfront.net',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers para soportar HoneyBook
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.honeybook.com widget.honeybook.com d25purrcgqtc5w.cloudfront.net *.googletagmanager.com *.google-analytics.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com *.honeybook.com",
              "font-src 'self' fonts.gstatic.com data:",
              "img-src 'self' data: blob: *.honeybook.com www.honeybook.com *.googleusercontent.com *.fbcdn.net *.cdninstagram.com",
              "connect-src 'self' *.honeybook.com api.honeybook.com *.google-analytics.com *.googletagmanager.com maps.googleapis.com",
              "frame-src 'self' *.honeybook.com *.google.com",
              "media-src 'self' blob: data:",
              "object-src 'none'",
              "base-uri 'self'"
            ].join('; ')
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },

  // Variables de entorno públicas para el frontend
  env: {
    NEXT_PUBLIC_HONEYBOOK_PLACEMENT_ID: process.env.NEXT_PUBLIC_HONEYBOOK_PLACEMENT_ID,
  },

  // Optimizaciones adicionales
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Configuración para mejor performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;