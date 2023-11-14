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
      'm.media-amazon.com',
      'www.dhresource.com',
      'www.google.com',
      'i.pinimg.com',
      'liquordeliverysk.ca',
      'image.shutterstock.com',
      'imgur.com',
      'cdn.myoutfits.biz',
      'www.comercialbenavides.net',
      'cdn.britannica.com',
      'img.freepik.com',
    ],
  },
};

module.exports = nextConfig;
