import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGithubPages ? "/Rivertyapplication-" : "",
  assetPrefix: isGithubPages ? "/Rivertyapplication-/" : "",
  turbopack: { root: process.cwd() },
};

export default nextConfig;
