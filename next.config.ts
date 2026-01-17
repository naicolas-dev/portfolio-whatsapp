import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com', // Permite sua foto de perfil
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com', // Permite os avatares coloridos
      },
    ],
  },
};

export default nextConfig;