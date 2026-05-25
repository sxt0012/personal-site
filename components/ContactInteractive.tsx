"use client";

import { useState, useCallback } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Copy,
  Check,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Social, SocialType } from "@/data/contacts";

/**
 * Contact 区的所有交互（一键复制 + hover 反馈）
 *
 * 设计要点：
 *   - 整张邮箱大字卡可点击 → 复制邮箱 → 右侧按钮变绿打勾
 *   - 微信按钮（copy 类型）点击复制微信号 → 图标变绿勾
 *   - 所有反馈 2 秒后自动恢复
 *   - 用 navigator.clipboard.writeText，现代浏览器 https 下原生支持
 */

// 社交平台 → 图标映射（要扩展就在这里加）
const ICON_MAP: Partial<Record<SocialType, LucideIcon>> = {
  github: Github,
  linkedin: Linkedin,
  x: Twitter,
  twitter: Twitter,
  wechat: MessageCircle,
  weixin: MessageCircle,
  phone: Phone,
};

interface Props {
  email: string;
  socials: Social[];
}

export default function ContactInteractive({ email, socials }: Props) {
  // 邮箱卡片的复制状态
  const [emailCopied, setEmailCopied] = useState(false);
  // 哪个社交按钮刚被复制（同时只可能有一个）
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 写入剪贴板（兼容失败时静默返回 false）
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleEmailCopy = async () => {
    if (await copyToClipboard(email)) {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const handleSocialCopy = async (key: string, value: string) => {
    if (await copyToClipboard(value)) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* ─── 邮箱大字卡片（整卡可点复制） ─── */}
      <button
        onClick={handleEmailCopy}
        className="group relative flex items-center gap-3 sm:gap-4 px-5 sm:px-7 py-4 sm:py-5
                   rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md
                   transition-all duration-300 cursor-pointer
                   hover:border-accent/50 hover:bg-white/[0.05] hover:-translate-y-0.5
                   hover:shadow-[0_0_30px_-8px_var(--color-accent-glow)]"
      >
        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
        <span className="font-mono text-sm sm:text-lg md:text-xl text-foreground">
          {email}
        </span>
        {/* 右侧复制按钮（状态可切换） */}
        <span
          className={cn(
            "ml-1 sm:ml-2 px-2.5 py-1 rounded-md border text-[10px] sm:text-xs font-mono",
            "flex items-center gap-1.5 transition-all flex-shrink-0",
            emailCopied
              ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-400"
              : "border-white/10 bg-white/[0.04] text-foreground-muted group-hover:border-accent/30 group-hover:text-accent",
          )}
        >
          {emailCopied ? (
            <>
              <Check className="w-3 h-3" /> 已复制
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> 复制
            </>
          )}
        </span>
      </button>

      {/* ─── 社交图标按钮组 ─── */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {socials.map((social) => {
          const Icon = ICON_MAP[social.type] ?? Mail; // 没注册的图标用 Mail 兜底
          const key = `${social.type}:${social.label}`;
          const isCopied = copiedKey === key;

          // 共享样式
          const buttonClass =
            "group relative w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md " +
            "flex items-center justify-center transition-all duration-300 cursor-pointer " +
            "hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.06] " +
            "hover:shadow-[0_0_20px_-5px_var(--color-accent-glow)]";

          const iconNode = isCopied ? (
            <Check className="w-5 h-5 text-emerald-400" />
          ) : (
            <Icon className="w-5 h-5 text-foreground-muted transition-colors group-hover:text-accent" />
          );

          const tooltipNode = (
            <span
              className="absolute top-full mt-2 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap
                         bg-background/90 border border-white/10 text-foreground-muted
                         opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              {isCopied ? "已复制" : social.label}
            </span>
          );

          // 跳转类型 → 渲染 <a>
          if (social.action === "link" && social.href) {
            return (
              <a
                key={key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass}
                aria-label={social.label}
              >
                {iconNode}
                {tooltipNode}
              </a>
            );
          }

          // 复制类型 → 渲染 <button>
          return (
            <button
              key={key}
              onClick={() => social.value && handleSocialCopy(key, social.value)}
              className={buttonClass}
              aria-label={`复制 ${social.label}`}
            >
              {iconNode}
              {tooltipNode}
            </button>
          );
        })}
      </div>
    </div>
  );
}
