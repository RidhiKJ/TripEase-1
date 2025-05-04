/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps catch potential bug
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
  images: {
    unoptimized: true, // Allow unoptimized images
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Disable fs module
      child_process: false, // Disable child_process module
      module: false, // Disable module module
    };
    return config;
  },
};

export default nextConfig;
