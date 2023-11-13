/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.imgur.com',
      'api.lorem.space',
      'icons-store.com.mx',
      'placeimg.com',
    ],
  },
};

module.exports = nextConfig;
