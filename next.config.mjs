/** @type {import('next').NextConfig} */

// When BUILD_TARGET=pages we produce a fully static export for GitHub Pages
// (served from a repo sub-path). A normal build (e.g. Vercel) serves from root
// with optimized images.
const isPages = process.env.BUILD_TARGET === "pages";
const basePath = isPages ? "/craigs-defense-armory" : "";

const nextConfig = {
  // Type-safety is enforced separately via `tsc --noEmit`; don't let stray
  // lint warnings block a production/export build.
  eslint: { ignoreDuringBuilds: true },
  output: isPages ? "export" : undefined,
  trailingSlash: isPages,
  basePath,
  images: {
    unoptimized: isPages,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "**.higgsfield.ai" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "**.amazonaws.com" },
    ],
  },
};

export default nextConfig;
