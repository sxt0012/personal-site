/**
 * 技能数据
 *
 * ⭐ icon 字段必须是 lucide-react 的导出名（PascalCase）
 *    可用图标已在 components/Skills.tsx 的 ICON_MAP 注册
 *    要加新图标：① 全部 lucide 图标见 https://lucide.dev/icons/
 *                ② 在 Skills.tsx 顶部 import 并加进 ICON_MAP
 *
 * ⭐ level: 1-5，对应 UI 上 5 格等级条的实心数量
 *    建议保持诚实（精通 5，熟练 4，会用 3，了解 2，听过 1）
 */
export const skills = [
  {
    category: "AI 训练 & 评测",
    icon: "Brain",
    items: [
      { name: "Prompt Engineering", icon: "Sparkles", level: 5 },
      { name: "模型评测 & 红队", icon: "Target", level: 4 },
      { name: "SFT / RLHF / DPO", icon: "Repeat", level: 3 },
      { name: "数据标注规范", icon: "Tags", level: 4 },
    ],
  },
  {
    category: "常用工具",
    icon: "Code2",
    items: [
      { name: "Claude Code", icon: "Code2", level: 4 },
      { name: "Codex", icon: "Link2", level: 3 },
      { name: "Gemini", icon: "GitBranch", level: 3 },
      { name: "DeepSeek", icon: "Database", level: 3 },
    ],
  },
  {
    category: "协作与沟通",
    icon: "Users",
    items: [
      { name: "技术文档", icon: "FileText", level: 4 },
      { name: "跨团队协作", icon: "Users", level: 4 },
      { name: "中英双语写作", icon: "Languages", level: 4 },
      { name: "AI 产品思维", icon: "Lightbulb", level: 3 },
    ],
  },
];
