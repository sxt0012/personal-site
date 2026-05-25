import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/**
 * 通用按钮组件（多态版）
 *
 * 用法 A — 普通按钮：
 *   <Button onClick={fn}>提交</Button>
 *
 * 用法 B — 锚点跳转 / 外链：
 *   <Button href="#projects">查看项目</Button>
 *   <Button href="https://github.com" target="_blank">GitHub</Button>
 *
 * 自动识别 href 决定渲染 <button> 还是 <a>，HTML 语义正确
 *
 * variant：primary（青色实心）/ secondary（玻璃拟态）/ ghost（纯文字）
 * size：sm / md / lg
 */
type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:brightness-110 hover:shadow-[0_0_24px_var(--color-accent-glow)]",
  secondary:
    "bg-white/[0.04] backdrop-blur-md border border-white/10 text-foreground " +
    "hover:border-accent/60 hover:bg-white/[0.06] hover:text-accent",
  ghost: "text-foreground-muted hover:text-accent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md",
    "font-medium tracking-wide cursor-pointer",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  // 有 href → 渲染 <a>
  if ("href" in props && props.href) {
    return (
      <a
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  // 无 href → 渲染 <button>
  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
