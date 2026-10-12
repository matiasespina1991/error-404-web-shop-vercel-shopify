export default {
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  serverExternalPackages: ["sanitize-html"],
  turbopack: { root: process.cwd() },
  experimental: {
    inlineCss: true,
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};
