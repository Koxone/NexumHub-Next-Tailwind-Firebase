/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Firebase
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.firebasestorage.app', // algunos buckets usan este dominio
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com', // opcional, otro dominio usado por Firebase
        pathname: '/**',
      },

      // GitHub raw files (tu logo en .github/logo.svg)
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      // Avatares de usuarios/orgs
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      // Imágenes subidas en issues/releases
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
        pathname: '/**',
      },
      // Proxy de imágenes externas que usa GitHub en README
      {
        protocol: 'https',
        hostname: 'camo.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
