import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone on local network to bypass HMR blocking
  allowedDevOrigins: ["localhost", "172.20.10.4"]
} as NextConfig;

export default nextConfig;
