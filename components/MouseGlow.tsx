"use client";

import { useEffect, useRef } from "react";

/**
 * 鼠标跟随光晕
 *
 * 性能要点：
 *  - 不直接修改 transform/left/top，而是更新 CSS 变量 --mx / --my
 *  - 用 requestAnimationFrame 节流，鼠标快速移动时也只在每帧更新一次
 *  - radial-gradient 由浏览器在 background 上绘制，不触发重排
 *  - mix-blend-mode: screen 让光晕与下层 aurora 自然叠加发光
 *  - 移动端没有鼠标，hidden md:block 直接不渲染
 */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let x = -1000;
    let y = -1000;

    const handleMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y}px`);
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block"
      style={{
        background:
          "radial-gradient(circle 200px at var(--mx, -1000px) var(--my, -1000px), rgba(0,240,255,0.5), transparent 65%)",
        mixBlendMode: "plus-lighter",
      }}
    />
  );
}
