import type { MetadataRoute } from "next";

/**
 * 站点地图（自动生成 sitemap.xml）
 *
 * 部署后访问 /sitemap.xml 可以看到生成结果
 * TODO: 部署后把 SITE_URL 换成你的真实域名
 */
const SITE_URL = "https://your-domain.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
