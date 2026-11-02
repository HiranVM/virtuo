/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: false, // sometimes three.js double-mounts in strict mode
};

export default nextConfig;

