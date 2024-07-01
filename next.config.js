const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8080',
        pathname: '/uploadImgs/**',
      },
      {
        protocol: 'https',
        hostname: 'zeoxer.com',
        pathname: '/uploadImgs/**',
      },
    ],
  },
};

module.exports = nextConfig;
