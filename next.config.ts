import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qgifuuzvgbofgyasgwdp.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },

  async redirects() {
    return [
      // Apex -> www, permanent. The apex currently answers 307 (temporary),
      // which does not consolidate ranking signals — Google keeps both hosts
      // as separate candidates. `permanent: true` emits 308, the permanent
      // equivalent of 301; Google treats the two identically for
      // canonicalisation. Exact host match, so www is never caught and this
      // cannot loop. Preview deploys (*.vercel.app) are unaffected.
      {
        source: "/:path*",
        has: [{ type: "host", value: "goldentravels.co" }],
        destination: "https://www.goldentravels.co/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
