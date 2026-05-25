import type { MetadataRoute } from "next";

/**
 * 搜索引擎爬虫规则
 *
 * 部署到 Vercel 后访问 /robots.txt 会看到这份配置
 * TODO: 部署后把 SITE_URL 换成你的真实域名（如 https://yourname.vercel.app）
 */
const SITE_URL = "https://chimerical-cuchufli-6f3dac.netlify.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
