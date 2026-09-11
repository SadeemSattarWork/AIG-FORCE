import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      /* Résumés are capped at 5MB in lib/forms.ts; the extra megabyte covers
         multipart boundaries and the rest of the application fields. */
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
