"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { profile } from "@/data/profile";

/**
 * 全站固定导航栏
 *
 * 特性：
 *   1. 滚动前透明，滚动 > 16px 后变玻璃拟态 + 模糊
 *   2. 桌面端横向链接，前缀序号 01./02./...，当前区块高亮
 *   3. 移动端汉堡菜单 → 点击展开全屏覆盖大字菜单
 *   4. Logo "$ Name" 点击回顶部
 *   5. 当前区块检测：IntersectionObserver 看哪个 section 处在视口"激活区"
 *
 * 改导航项：直接编辑下方 NAV_LINKS 常量
 */

// 修改导航项就改这里。id 必须对应页面里 section 的 id
const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ─── 监听滚动，决定是否切换为玻璃拟态 ───
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── 监听当前激活的 section ───
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 取所有正在视口"激活带"内的元素，挑最靠上的那个
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // 视口顶部往下 30% 到底部往上 60% 之间为"激活带"
        // 章节顶部进入这个带子就被算作当前章节
        rootMargin: "-30% 0px -60% 0px",
      },
    );

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 移动端菜单打开时禁止 body 滚动
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ───────── 顶部导航条 ───────── */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/65 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            className="font-mono text-sm font-bold tracking-tight text-foreground hover:text-accent transition-colors"
          >
            <span className="text-accent">$</span> {profile.name}
          </a>

          {/* 桌面端链接 */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={cn(
                      "relative px-3 py-2 rounded-md text-sm font-mono transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    <span className="opacity-50 mr-1">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    {link.label}
                    {/* 激活时下方青色发光线 */}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                        style={{
                          boxShadow: "0 0 8px var(--color-accent-glow)",
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* 移动端汉堡按钮 */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-md text-foreground hover:bg-white/[0.05] transition-colors"
            aria-label="打开菜单"
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </header>

      {/* ───────── 移动端全屏菜单 ───────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col md:hidden animate-fade-in">
          {/* 顶部条：Logo + 关闭按钮 */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
            <span className="font-mono text-sm font-bold">
              <span className="text-accent">$</span> {profile.name}
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/[0.05] transition-colors"
              aria-label="关闭菜单"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 大字菜单 */}
          <ul className="flex-1 flex flex-col items-start justify-center gap-8 px-10">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-mono text-3xl tracking-tight transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    <span className="text-accent/60 mr-3 text-xl align-middle">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* 底部提示 */}
          <p className="px-10 pb-10 font-mono text-xs text-foreground-subtle">
            {"// 点击任意链接平滑滚动到对应区块"}
          </p>
        </div>
      )}
    </>
  );
}
