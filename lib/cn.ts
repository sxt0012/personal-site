/**
 * className 拼接工具
 * 支持字符串、false / null / undefined（自动忽略）、嵌套数组
 *
 * 示例：
 *   cn("px-4", isActive && "text-accent", ["rounded", "border"])
 *   → "px-4 text-accent rounded border"
 *
 * 比引入 clsx / classnames 更轻量，对新手也更透明。
 */
type ClassValue = string | false | null | undefined | ClassValue[];

export function cn(...args: ClassValue[]): string {
  const out: string[] = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "string") out.push(arg);
    else if (Array.isArray(arg)) out.push(cn(...arg));
  }
  return out.join(" ");
}
