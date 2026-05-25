import Image from "next/image";
import { User, ArrowRight, ChevronDown } from "lucide-react";
import Typewriter from "./Typewriter";
import Button from "./ui/Button";
import { profile } from "@/data/profile";

/**
 * 首页 Hero 区
 *
 * 视觉构成（自上而下）：
 *   1. 头像（青色光晕呼吸 + 圆形边框）
 *   2. 终端风小标签 "> SYSTEM_ONLINE"
 *   3. 大标题（姓名，渐变文字）
 *   4. 身份副标题
 *   5. 打字机循环标语（带闪烁光标）
 *   6. 两个 CTA 按钮（查看项目 / 联系我）
 *   7. 状态指示行（绿色脉冲点 + 终端风状态）
 *   8. 底部"SCROLL"提示 + 流动青色细线
 *
 * 所有文案都来自 data/profile.ts，改那里即可。
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-32"
    >
      {/* ─── 1. 头像 ─── */}
      <div className="relative mx-auto mb-8 w-32 h-32 sm:w-40 sm:h-40">
        {/* 外层呼吸光晕 */}
        <div
          aria-hidden
          className="absolute -inset-4 rounded-full bg-accent/30 blur-2xl avatar-glow"
        />
        {/* 头像本体 */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent/60 bg-surface flex items-center justify-center">
          {profile.avatar ? (
            // 真实头像（在 data/profile.ts 里填 avatar 路径后启用）
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          ) : (
            // 占位图标（青色 User 图标）
            <User className="w-16 h-16 text-accent/70" />
          )}
        </div>
      </div>

      {/* ─── 2. 终端风小标签 ─── */}
      <p className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 text-accent">
        &gt; system_online
      </p>

      {/* ─── 3. 姓名（渐变文字） ─── */}
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-3 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
        {profile.name}
      </h1>

      {/* ─── 4. 身份副标题 ─── */}
      <p className="text-base sm:text-lg md:text-xl text-foreground-muted mb-8">
        {profile.title}
      </p>

      {/* ─── 5. 打字机循环标语 ─── */}
      <div className="font-mono text-sm sm:text-base text-foreground mb-10 min-h-[1.75rem]">
        <span className="text-accent">&gt; </span>
        <Typewriter texts={profile.taglines} />
      </div>

      {/* ─── 6. CTA 按钮（Button 自动识别 href 渲染为 <a>）─── */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <Button variant="primary" size="lg" href="#projects">
          查看项目 <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="lg" href="#contact">
          联系我
        </Button>
      </div>

      {/* ─── 7. 状态指示行 ─── */}
      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="relative flex items-center justify-center w-3 h-3">
          {/* 外圈扩散波纹（自定义 3x 缩放 + 1.8s）*/}
          <span className="absolute inset-0 rounded-full bg-emerald-400 status-ping" />
          {/* 中心点 + 双层 box-shadow 静态发光 */}
          <span
            className="relative inline-block w-2 h-2 rounded-full bg-emerald-400"
            style={{
              boxShadow:
                "0 0 8px rgba(52,211,153,0.9), 0 0 18px rgba(52,211,153,0.5)",
            }}
          />
        </span>
        <span className="text-foreground-muted">
          status:{" "}
          <span className="text-emerald-400">{profile.status}</span>
        </span>
      </div>

      {/* ─── 8. 底部滚动提示：鼠标外框 + 滚轮点 + 向下箭头 ─── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground-muted">
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        {/* 鼠标外形（圆角胶囊）*/}
        <div className="relative w-6 h-10 rounded-full border-2 border-foreground-muted/60">
          {/* 滚轮内部小圆点：从顶部缓慢向下流动并淡出 */}
          <span className="scroll-wheel-dot absolute left-1/2 top-2 w-1 h-2 -translate-x-1/2 rounded-full bg-accent" />
        </div>
        {/* 向下箭头（Tailwind 内置 animate-bounce）*/}
        <ChevronDown className="w-4 h-4 animate-bounce text-foreground-muted/70" />
      </div>
    </section>
  );
}
