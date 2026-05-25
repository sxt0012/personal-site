"use client";

import { useEffect, useState } from "react";

/**
 * 打字机循环组件
 *
 * 行为：依次「打字 → 停 → 删除 → 间隔 → 切下一句」无限循环
 *
 * Props（都有默认值，一般不用传）：
 *   texts           ：要循环的字符串数组（必填）
 *   typingSpeedMs   ：打字时每个字符的间隔，默认 75
 *   deletingSpeedMs ：删除时每个字符的间隔，默认 40
 *   pauseAfterMs    ：完整打字完毕后停留的时间，默认 2000
 *   pauseBetweenMs  ：删完到切下一句之间的间隔，默认 400
 *
 * 用法：
 *   <Typewriter texts={["第一句", "第二句"]} />
 */
type Phase = "typing" | "paused" | "deleting" | "between";

interface TypewriterProps {
  texts: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseAfterMs?: number;
  pauseBetweenMs?: number;
  className?: string;
}

export default function Typewriter({
  texts,
  typingSpeedMs = 95,
  deletingSpeedMs = 45,
  pauseAfterMs = 2000,
  pauseBetweenMs = 400,
  className,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (!texts.length) return;
    const current = texts[index] ?? "";
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (phase === "typing") {
      if (display.length < current.length) {
        // 多打一个字符
        timer = setTimeout(
          () => setDisplay(current.slice(0, display.length + 1)),
          typingSpeedMs,
        );
      } else {
        // 打完了 → 进入停顿
        setPhase("paused");
      }
    } else if (phase === "paused") {
      timer = setTimeout(() => setPhase("deleting"), pauseAfterMs);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        // 删一个字符
        timer = setTimeout(
          () => setDisplay(current.slice(0, display.length - 1)),
          deletingSpeedMs,
        );
      } else {
        setPhase("between");
      }
    } else if (phase === "between") {
      timer = setTimeout(() => {
        setIndex((i) => (i + 1) % texts.length);
        setPhase("typing");
      }, pauseBetweenMs);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    display,
    phase,
    index,
    texts,
    typingSpeedMs,
    deletingSpeedMs,
    pauseAfterMs,
    pauseBetweenMs,
  ]);

  return (
    <span className={className}>
      {display}
      <span className="typewriter-cursor" aria-hidden>
        |
      </span>
    </span>
  );
}
