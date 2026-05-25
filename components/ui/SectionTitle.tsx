import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * 区块标题组件（贯穿"关于我 / 项目 / 联系方式"等区块）
 *
 * 视觉结构：
 *   //  01_ABOUT_ME           ← index：等宽字体小编号，青色，终端注释风
 *   关于我                     ← children：主标题，大字加粗
 *   一句话补充说明（可选）       ← subtitle：副标题，灰色
 *
 * 用法：
 *   <SectionTitle index="02_PROJECTS" subtitle="精选作品集">
 *     我做过的项目
 *   </SectionTitle>
 */
interface SectionTitleProps {
  /** 等宽字体的小编号，如 "01_ABOUT_ME"。可选 */
  index?: string;
  /** 主标题文字 */
  children: ReactNode;
  /** 副标题，可选 */
  subtitle?: ReactNode;
  /** 是否居中（默认左对齐） */
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({
  index,
  children,
  subtitle,
  centered = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        centered && "text-center",
        className,
      )}
    >
      {index && (
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-accent mb-3">
          <span className="opacity-60">{"//"}</span> {index}
        </p>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        {children}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg text-foreground-muted max-w-2xl",
            centered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
