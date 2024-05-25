/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/my",
        destination: "/my/overview",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  experimental: {
    staleTimes: {
      dynamic: 360,
      static: 360,
    },
  },
};

export default nextConfig;
