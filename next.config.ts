import type { NextConfig } from "next";

import { UNSPLASH_SEARCH } from "./src/lib/unsplash";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.0.3"],
  images: {
    // Sample catalog imagery. Only Unsplash photo paths with our exact
    // query string are allowed, so the optimizer can't be used as an open proxy.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
        search: UNSPLASH_SEARCH,
      },
    ],
  },
};

export default nextConfig;
