import type { MetadataRoute } from "next";
import { domains } from "@/lib/domains";
import { roles } from "@/lib/roles";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${SITE_URL}${path}`;

  const pages: [string, number][] = [
    ["/", 1],
    ["/for-companies", 0.9],
    ["/for-experts", 0.9],
    ["/for-experts/roles", 0.9],
    ["/experts", 0.8],
    ["/supported-countries", 0.7],
    ["/about", 0.7],
    ["/contact", 0.7],
    ["/insights", 0.6],
    ["/privacy", 0.3],
    ["/terms", 0.3],
  ];

  return [
    ...pages.map(([path, priority]) => ({
      url: url(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...domains.map((d) => ({
      url: url(`/experts/${d.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...roles.map((r) => ({
      url: url(`/for-experts/roles/${r.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
