/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '*.firebasestorage.app', // algunos buckets usan este dominio
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com', // opcional, otro dominio usado por Firebase
      },
    ],
  },
};

export default nextConfig;
