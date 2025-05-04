/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps catch potential bugs
  swcMinify: true, // Use SWC for faster builds
  experimental: {
    appDir: true, // If you're using the app/ directory
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      child_process: false,
      module: false,
    };
    return config;
  },
};

export default nextConfig;
