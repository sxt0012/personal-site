import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * 通用玻璃拟态卡片
 *
 * 视觉特点：
 *   - 半透明白色 + backdrop-blur（玻璃质感）
 *   - 极淡白色边框（默认低对比，hover 时变青）
 *   - hover 时：边框变青 + 整卡浮起 + 外发光 + 顶部流光线浮现
 *
 * 用法：
 *   <Card>
 *     <h3>项目名</h3>
 *     <p>简介...</p>
 *   </Card>
 *
 * Props：
 *   - glow：是否启用 hover 发光效果（默认 true，关闭后是纯静态卡片）
 *   - 其余 div 标准属性透传（如 onClick、role）
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export default function Card({
  glow = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl p-6",
        "border border-white/10 bg-white/[0.03] backdrop-blur-md",
        "transition-all duration-300 ease-out",
        glow && [
          "hover:border-accent/50",
          "hover:bg-white/[0.05]",
          "hover:-translate-y-1",
          "hover:shadow-[0_0_30px_-5px_var(--color-accent-glow)]",
        ],
        className,
      )}
      {...props}
    >
      {/* 顶部 1px 渐变流光线，仅 hover 时浮现 */}
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 -top-px h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--color-accent), transparent)",
          }}
        />
      )}
      {children}
    </div>
  );
}
