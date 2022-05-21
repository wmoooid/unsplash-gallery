/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/architecture',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
