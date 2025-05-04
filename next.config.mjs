/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // helps catch potential problems
  experimental: {
    serverActions: true // enable if you're using server actions (optional)
  },
  images: {
    domains: ['your-image-source.com'], // replace with any external domains used for <Image />
  },
  eslint: {
    ignoreDuringBuilds: true // avoids build failure due to linting issues
  },
  typescript: {
    ignoreBuildErrors: false // set to true only if you're deploying with TS errors (not recommended)
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      child_process: false,
      module: false,
    };
    return config;
  }
};

export default nextConfig;
