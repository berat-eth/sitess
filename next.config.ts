import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // iyzipay modülü dinamik require kullandığı için external olarak işaretlenmeli
  serverExternalPackages: ['iyzipay'],
};

export default nextConfig;
