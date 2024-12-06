/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/coins/:path*",
        destination: "https://coinranking1.p.rapidapi.com/coins/:path*",
      },
      {
        source: "/coin/:path*",
        destination: "https://coinranking1.p.rapidapi.com/coin/:path*",
      },
      {
        source: "/api/:path*",
        destination: "https://api.reinholders.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
