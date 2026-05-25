import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/**
 * 动态 Open Graph 图片（1200×630）
 *
 * 自动用 data/profile.ts 里的 name + title 生成分享图
 * 分享到微信 / X / LinkedIn / Slack 时会显示这张图
 *
 * 部署后访问 https://你的域名/opengraph-image 可以预览
 */
export const alt = `${profile.name} | AI Trainer · Prompt Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          // 青色 + 紫色双光晕 + 深色底
          background:
            "radial-gradient(ellipse 80% 60% at 25% 20%, rgba(0,240,255,0.28) 0%, transparent 55%)," +
            "radial-gradient(ellipse 80% 60% at 75% 80%, rgba(168,85,247,0.28) 0%, transparent 55%)," +
            "#0a0a0f",
          color: "#e5e7eb",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* 顶部终端风标签 */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#00f0ff",
            letterSpacing: "4px",
            marginBottom: "28px",
          }}
        >
          &gt; AI_TRAINER · PROMPT_ENGINEER
        </div>

        {/* 大名字 */}
        <div
          style={{
            display: "flex",
            fontSize: 128,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
            marginBottom: "32px",
            letterSpacing: "-2px",
          }}
        >
          {profile.name}
        </div>

        {/* 副标题 */}
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#9ca3af",
          }}
        >
          {profile.title}
        </div>

        {/* 右下角站点水印 */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 20,
            color: "#6b7280",
            letterSpacing: "2px",
          }}
        >
          /// personal_site
        </div>

        {/* 左下角青色发光小点 */}
        <div
          style={{
            position: "absolute",
            bottom: 76,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: "#00f0ff",
              boxShadow: "0 0 20px rgba(0,240,255,0.8)",
            }}
          />
          <span style={{ fontSize: 18, color: "#6b7280" }}>
            online · available
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
