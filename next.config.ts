import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ["@vapor-ui/core", "vapor-ui", "vapor-ui/core"],
  experimental: {
    // webpack 기반일 때 ESM 외부 모듈 require 이슈 완화
    esmExternals: "loose",
    // 서버 번들에서 외부 패키지로 남기지 않고 묶어서 처리 (특히 ESM 패키지)
  },
};

export default nextConfig;
