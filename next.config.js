/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5328/:path*", // Proxy to Backend
      },
    ];
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  experimental: {
    proxyTimeout: 10000000,
  },
};

module.exports = nextConfig;
