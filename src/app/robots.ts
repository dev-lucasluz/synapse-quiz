import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://synapsequiz.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/auth/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
