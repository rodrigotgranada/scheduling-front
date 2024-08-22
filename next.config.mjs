/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://127.0.0.1:8000/uploads/:path*' // Redireciona para o backend
      }
    ];
  },
  images: {
    domains: ['ui-avatars.com', 'firebasestorage.googleapis.com'],
  },
}

export default nextConfig;
