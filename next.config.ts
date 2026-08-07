import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "*": ["lib/generated/prisma/**/*"],
    "/api/*": ["lib/generated/prisma/**/*"],
    "/api/**/*": ["lib/generated/prisma/**/*"],
    "/skill/*": ["lib/generated/prisma/**/*"],
    "/role/*": ["lib/generated/prisma/**/*"],
  },
};

export default nextConfig;
