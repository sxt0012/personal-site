/**
 * 项目数据
 *
 * ⭐ 这是你以后最常改的文件。
 *    新增项目：在 projects 数组里复制一个对象、改内容即可。
 *    删除项目：直接删掉对应对象。
 *    保存后浏览器自动热更新。
 *
 * 字段说明：
 *   title       — 项目名（必填）
 *   tagline     — 一句话副标题（英文标语效果好，可选）
 *   description — 详细描述，建议 80-150 字
 *   cover       — 封面图路径，必须以 "/" 开头（本地路径）
 *                 ① 把图片放到 public/projects/ 目录下
 *                 ② 这里写 "/projects/your-image.png"
 *                 留空时会显示渐变占位 + 项目名首字
 *   tech        — 技术栈标签数组，建议 3-5 个
 *   liveUrl     — 在线 Demo 链接（可选）
 *   githubUrl   — GitHub 仓库链接（可选）
 *   type        — 项目类型，左上角小标签会显示。可选值：
 *                 "Project" | "Experiment" | "Tool" | "Research"
 *   featured    — 是否精选；为 true 时右上角显示 "FEATURED" 角标
 */
export type ProjectType = "Project" | "Experiment" | "Tool" | "Research";

export interface Project {
  title: string;
  tagline?: string;
  description: string;
  cover?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  type?: ProjectType;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "[占位] Prompt 评测流水线",
    tagline: "Eval pipeline for LLM prompts",
    description:
      "[占位] 基于 Python + Claude API 搭建的自动化评测工具：批量运行 prompt、对比模型输出、生成可视化报告。把原本需要 2 天的人工对比缩短到 30 分钟。",
    tech: ["Python", "Claude API", "Eval", "Streamlit"],
    type: "Tool",
    featured: true,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourname/repo",
  },
  {
    title: "[占位] RLHF 标注规范库",
    tagline: "Annotation guidelines for alignment",
    description:
      "[占位] 一套面向标注员的 RLHF / 偏好对比标注指南，覆盖 12 个常见场景与边界情况，配套 50 个标准答案样例。在 3 个项目中复用。",
    tech: ["Notion", "Markdown", "对齐", "标注"],
    type: "Research",
    githubUrl: "https://github.com/yourname/repo",
  },
  {
    title: "[占位] AI 训练个人作品集",
    tagline: "This very website you're looking at",
    description:
      "[占位] 用 Next.js + Tailwind + Framer Motion 从零搭建的个人网站，集成 aurora 背景、打字机、滚动触发动画等技术。也是你正在看的这一个。",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    type: "Project",
    githubUrl: "https://github.com/yourname/personal-site",
  },
];
