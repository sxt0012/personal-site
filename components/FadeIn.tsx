"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * 滚动触发的淡入容器（基于 framer-motion 的 whileInView）
 *
 * 当容器进入视口时：从「半透明 + 下移 30px」过渡到「完全显示 + 原位」
 * 默认只触发一次（once: true），避免来回滚动时反复重播
 *
 * Props：
 *   delay     — 延迟秒数。同区块多个 FadeIn 错开 delay 可以制造"错落感"
 *   y         — 起始的 Y 轴偏移（px）。默认 30
 *   duration  — 动画时长（秒）。默认 0.6
 *
 * 用法：
 *   <FadeIn>主标题</FadeIn>
 *   <FadeIn delay={0.1}>说明文字</FadeIn>
 *   <FadeIn delay={0.2}>第一张卡片</FadeIn>
 */
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  y = 30,
  duration = 0.75,
  className,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // once: false → 元素离开视口会回到 initial 状态，再进入时重新动画
      // 这样向上滚动也能看到反向的退回效果
      viewport={{ once: false, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // 接近 ease-out，有"减速"质感
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
