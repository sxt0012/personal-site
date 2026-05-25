"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * 卡通形象头像（圆脸猫耳萌系 + 丰富互动）
 *
 * 互动总览：
 *   1. 眼睛跟随鼠标（最大偏移 8px，距离饱和 180px，比初版敏感得多）
 *   2. 点击反馈：
 *      - 笑脸 1.2s
 *      - 整体弹一下 (scale 1.12)
 *      - 短暂抖动 0.2s
 *      - 喷射 3-5 个随机符号朝上方扇形飞出
 *      - 周身青色光环扩散一圈
 *      - 右上角冒玻璃拟态说话气泡（9 句随机问候）
 *   3. 随机眨眼：每 3-6 秒自动眨一下
 *   4. 呆毛 + 天线灯持续呼吸
 *   5. 键盘 Enter / Space 也可触发
 */

const POP_SYMBOLS = ["♡", "★", "✦", "♪", "!", "✧", "♥", "✨"];

const GREETINGS = [
  "Hi! ✨",
  "你好呀~",
  "点我做什么 (・ω・)",
  "ヽ(°〇°)ﾉ",
  "(◕‿◕)♡",
  "Boop!",
  "想聊 AI?",
  "(￣▽￣)b",
  "喵~",
];

interface PopEffect {
  id: number;
  symbol: string;
  dx: number;
  dy: number;
}

interface Ring {
  id: number;
}

interface Bubble {
  id: number;
  text: string;
}

export default function CartoonAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [pops, setPops] = useState<PopEffect[]>([]);
  const [rings, setRings] = useState<Ring[]>([]);
  const [bubble, setBubble] = useState<Bubble | null>(null);

  // ─── 互动 1：眼睛跟随鼠标 ───
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);
      // 加强版：饱和距离 180px、最大偏移 8px
      const distance = Math.min(Math.hypot(dx, dy) / 180, 1);
      const maxOffset = 8;
      setPupilOffset({
        x: Math.cos(angle) * maxOffset * distance,
        y: Math.sin(angle) * maxOffset * distance,
      });
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // ─── 互动 3：随机眨眼 ───
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 3000;
      timeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 140);
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // ─── 互动 2：点击夸张反馈 ───
  const handleClick = () => {
    const ts = Date.now();

    // (a) 笑脸
    setIsHappy(true);
    setTimeout(() => setIsHappy(false), 1200);

    // (b) 弹一下
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);

    // (c) 抖动
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 200);

    // (d) 喷 3-5 个 emoji 朝上方扇形飞出（半圆方向）
    const count = 3 + Math.floor(Math.random() * 3);
    const newPops: PopEffect[] = [];
    for (let i = 0; i < count; i++) {
      // 把角度分布在上半圆（-PI ~ 0），加一点随机扰动
      const baseAngle = -Math.PI + (Math.PI * i) / (count - 1 || 1);
      const angle = baseAngle + (Math.random() - 0.5) * 0.4;
      const distance = 70 + Math.random() * 40;
      newPops.push({
        id: ts + i,
        symbol: POP_SYMBOLS[Math.floor(Math.random() * POP_SYMBOLS.length)],
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
      });
    }
    setPops((prev) => [...prev, ...newPops]);
    setTimeout(() => {
      const ids = new Set(newPops.map((p) => p.id));
      setPops((prev) => prev.filter((p) => !ids.has(p.id)));
    }, 1500);

    // (e) 光环扩散
    const ringId = ts + 100;
    setRings((prev) => [...prev, { id: ringId }]);
    setTimeout(() => {
      setRings((prev) => prev.filter((r) => r.id !== ringId));
    }, 800);

    // (f) 说话气泡（随机一句问候）
    const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    const bubbleId = ts + 200;
    setBubble({ id: bubbleId, text: greeting });
    setTimeout(() => {
      setBubble((prev) => (prev?.id === bubbleId ? null : prev));
    }, 2000);
  };

  // 键盘 Enter / Space 触发
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="点击与我打招呼"
      title="点我试试 :)"
      onClick={handleClick}
      onKeyDown={handleKey}
      className="relative mx-auto mb-8 w-36 h-36 sm:w-44 sm:h-44 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
      style={{
        transform: isBouncing ? "scale(1.12)" : "scale(1)",
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* 外圈呼吸光晕 */}
      <div
        aria-hidden
        className="absolute -inset-4 rounded-full bg-accent/30 blur-2xl avatar-glow"
      />

      {/* 点击时扩散光环 */}
      {rings.map((r) => (
        <div
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute inset-2 rounded-full border-2 border-accent avatar-ring"
        />
      ))}

      {/* SVG 卡通本体（包含呆毛 + 猫耳 + 圆脸 + 眼睛 + 腮红 + 嘴） */}
      <svg
        viewBox="0 0 200 220"
        className={cn("relative w-full h-full", isShaking && "avatar-shake")}
      >
        {/* 呆毛（一根弯曲的小线从头顶冒出） */}
        <path
          d="M 100 32 Q 95 18 103 8"
          stroke="#00f0ff"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        >
          <animate
            attributeName="opacity"
            values="0.85;0.5;0.85"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </path>

        {/* 左猫耳：外层 */}
        <path
          d="M 50 72 L 35 25 L 82 54 Z"
          fill="rgba(0, 240, 255, 0.08)"
          stroke="#00f0ff"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 左猫耳：内层粉紫腮 */}
        <path
          d="M 55 66 L 46 38 L 73 55 Z"
          fill="#a855f7"
          opacity="0.5"
        />

        {/* 右猫耳：外层 */}
        <path
          d="M 150 72 L 165 25 L 118 54 Z"
          fill="rgba(0, 240, 255, 0.08)"
          stroke="#00f0ff"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 右猫耳：内层粉紫腮 */}
        <path
          d="M 145 66 L 154 38 L 127 55 Z"
          fill="#a855f7"
          opacity="0.5"
        />

        {/* 头部主圆（更圆润 + 略大） */}
        <circle
          cx="100"
          cy="125"
          r="82"
          fill="rgba(0, 240, 255, 0.06)"
          stroke="#00f0ff"
          strokeWidth="2.5"
        />
        {/* 内圈装饰 */}
        <circle
          cx="100"
          cy="125"
          r="72"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="0.8"
          opacity="0.25"
        />

        {/* ─── 左眼 ─── */}
        <g>
          <ellipse
            cx="74"
            cy="115"
            rx="14"
            ry={isBlinking ? 1 : 12}
            fill="#0a0a0f"
            stroke="#00f0ff"
            strokeWidth="1.5"
            style={{ transition: "ry 0.12s ease" }}
          />
          {!isBlinking && (
            <>
              <circle
                cx={74 + pupilOffset.x}
                cy={115 + pupilOffset.y}
                r="5"
                fill="#00f0ff"
                style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
              />
              <circle
                cx={74 + pupilOffset.x + 1.8}
                cy={115 + pupilOffset.y - 1.8}
                r="1.8"
                fill="#ffffff"
                style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
              />
            </>
          )}
        </g>

        {/* ─── 右眼 ─── */}
        <g>
          <ellipse
            cx="126"
            cy="115"
            rx="14"
            ry={isBlinking ? 1 : 12}
            fill="#0a0a0f"
            stroke="#00f0ff"
            strokeWidth="1.5"
            style={{ transition: "ry 0.12s ease" }}
          />
          {!isBlinking && (
            <>
              <circle
                cx={126 + pupilOffset.x}
                cy={115 + pupilOffset.y}
                r="5"
                fill="#00f0ff"
                style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
              />
              <circle
                cx={126 + pupilOffset.x + 1.8}
                cy={115 + pupilOffset.y - 1.8}
                r="1.8"
                fill="#ffffff"
                style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
              />
            </>
          )}
        </g>

        {/* 紫色腮红（更大更明显） */}
        <ellipse cx="52" cy="150" rx="11" ry="6" fill="#a855f7" opacity="0.55" />
        <ellipse cx="148" cy="150" rx="11" ry="6" fill="#a855f7" opacity="0.55" />

        {/* 嘴巴：默认小笑，点击变大笑 */}
        {isHappy ? (
          <path
            d="M 76 162 Q 100 188 124 162"
            stroke="#00f0ff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M 85 166 Q 100 174 115 166"
            stroke="#00f0ff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* 说话气泡 */}
      {bubble && (
        <div
          key={bubble.id}
          className="avatar-bubble pointer-events-none absolute -right-2 sm:-right-8 -top-2 sm:-top-4 z-10"
        >
          <div className="relative bg-surface/90 border border-accent/60 backdrop-blur-md rounded-2xl rounded-bl-sm px-3 py-1.5 shadow-[0_0_20px_-4px_var(--color-accent-glow)]">
            <span className="font-mono text-xs text-accent whitespace-nowrap">
              {bubble.text}
            </span>
            {/* 气泡小尾巴（左下角朝向头像） */}
            <div
              className="absolute -bottom-1 left-3 w-2 h-2 bg-surface/90 border-l border-b border-accent/60"
              style={{ transform: "rotate(-45deg)" }}
            />
          </div>
        </div>
      )}

      {/* 喷射的小符号 */}
      {pops.map(({ id, symbol, dx, dy }) => (
        <span
          key={id}
          className="pointer-events-none absolute top-1/2 left-1/2 text-2xl font-bold text-accent avatar-pop"
          style={{
            textShadow: "0 0 12px var(--color-accent-glow)",
            ["--dx" as string]: `${dx}px`,
            ["--dy" as string]: `${dy}px`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}
