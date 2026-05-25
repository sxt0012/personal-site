import MouseGlow from "./MouseGlow";

/**
 * 全站背景视觉特效（参考 Trae.ai / Vercel / Linear 风格）
 *
 * 层叠顺序（DOM 顺序 = 层叠顺序，后面盖前面）：
 *   1. 基础底色 + 顶部青色聚光
 *   2. Aurora 流动光斑 ×3（青/紫/蓝，主视觉）
 *   3. 细网格 + 径向遮罩（工程质感）
 *   4. SVG 噪点 grain（防塑料感）
 *   5. CRT 静态扫描线纹理
 *   6. CRT 移动扫描条（7s 一周期）
 *   7. 鼠标跟随光晕（client，移动端自动隐藏）
 *   8. 底部渐隐过渡
 *
 * 全部 CSS 动画驱动，最低 JS 开销（仅鼠标光晕用 rAF 节流）。
 * 通过 fixed + -z-10 + pointer-events-none 固定在最底层，不影响内容交互。
 */
export default function BackgroundFx() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* 1. 底色 + 顶部聚光 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(0,240,255,0.18), transparent 65%), #0a0a0f",
        }}
      />

      {/* 2. Aurora 流动光斑 */}
      <div className="absolute inset-0">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* 3. 细网格 + 径向遮罩 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 85%)",
        }}
      />

      {/* 4. SVG 噪点 grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* 5. CRT 扫描线纹理（静态） */}
      <div className="absolute inset-0 scanlines" />

      {/* 6. CRT 扫描条（动态从上扫到下） */}
      <div className="scan-bar" />

      {/* 7. 鼠标跟随光晕（client component） */}
      <MouseGlow />

      {/* 8. 底部渐隐 */}
      <div
        className="absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,15,1), transparent)",
        }}
      />
    </div>
  );
}
