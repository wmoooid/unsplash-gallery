/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/nature',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
