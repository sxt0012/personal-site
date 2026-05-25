import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { profile } from "@/data/profile";

/* ──────────────────────────────────────────────────────────────
   字体加载
   ────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/* ──────────────────────────────────────────────────────────────
   站点元数据
   - title / description：浏览器标签页 + 搜索引擎摘要
   - openGraph / twitter：微信 / LinkedIn / X 分享时的预览
   - icons：标签页小图标（svg 矢量）
   - keywords：辅助 SEO
   ────────────────────────────────────────────────────────────── */
const SITE_DESCRIPTION =
  "AI 训练师 · Prompt 工程师 · 持续打磨高质量的人机协作体验。一个用 Next.js 构建的个人作品集。";

export const metadata: Metadata = {
  // 部署的真实域名，影响 OG 分享图、Twitter card 等绝对 URL 的解析
  metadataBase: new URL("https://sxt-portfolio.netlify.app"),
  title: {
    default: `${profile.name} | AI Trainer · Prompt Engineer`,
    template: `%s | ${profile.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI Trainer",
    "Prompt Engineering",
    "LLM",
    "RLHF",
    "AI 训练师",
    "Prompt 工程师",
    "大模型对齐",
    "模型评测",
    "个人作品集",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: `${profile.name} | AI Trainer · Prompt Engineer`,
    description: SITE_DESCRIPTION,
    siteName: `${profile.name} · Personal Site`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | AI Trainer`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

/* ──────────────────────────────────────────────────────────────
   视口与主题色
   themeColor 会影响移动端浏览器顶部状态栏的颜色
   ────────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
