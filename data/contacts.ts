/**
 * 联系方式数据
 *
 * ⭐ 全部把示例值替换成你的真实信息再发布。
 *
 * 添加新平台的步骤：
 *   1. 在 socials 数组里加一项
 *   2. 设置 type 为对应名（详见下方 SocialType）
 *   3. 如果是 link 类型，填 href；如果是 copy 类型（如微信），填 value
 *
 * 关于图标：
 *   ContactInteractive.tsx 里有 ICON_MAP，已经映射了常见 type
 *   想加新 type 就在那里加一行
 */

export type SocialType =
  | "github"
  | "linkedin"
  | "x"
  | "twitter"
  | "wechat"
  | "weixin"
  | "phone"
  | "zhihu"
  | "xiaohongshu"
  | "bilibili"
  | "instagram"
  | "youtube";

export interface Social {
  /** 平台类型，决定显示哪个图标 */
  type: SocialType;
  /** 显示名（hover 时 tooltip 用） */
  label: string;
  /** 行为类型：跳转链接 or 复制文本 */
  action: "link" | "copy";
  /** 跳转 URL（action === "link" 时必填） */
  href?: string;
  /** 要复制的文本（action === "copy" 时必填，如微信号、手机号） */
  value?: string;
}

export const contacts = {
  /** 主邮箱，会在大字卡片中显示，整卡可点复制 */
  email: "songchengzhi0012@gmail.com",

  /** 副标语，在 Section subtitle 处显示 */
  intro:
    "想聊 AI 训练 / Prompt 工程 / 项目合作 / 求职机会，欢迎随时来信。",

  /** 社交平台数组（按数组顺序左→右显示） */
  socials: [
    {
      type: "github",
      label: "GitHub",
      action: "link",
      href: "https://github.com/yourname",
    },
    {
      type: "phone",
      label: "Phone",
      action: "copy",
      value: "13400430125",
    },
    {
      type: "wechat",
      label: "WeChat",
      action: "copy",
      value: "sxt13400430125",
    },
  ] satisfies Social[],
};
