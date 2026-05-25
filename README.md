# 宋雪彤 · Personal Portfolio

一个为 **AI 训练师 / Prompt 工程师**岗位求职打造的科技感个人作品集。

> 🌐 **在线访问**：https://sxt-portfolio.netlify.app
> 📦 **代码仓库**：https://github.com/sxt0012/personal-site

---

## ✨ 核心特性

- 🌌 **多层背景特效**：流动 aurora 光斑 + CRT 扫描线 + 鼠标跟随光晕 + 网格 + 噪点
- ⌨️ **打字机循环标语**：自定义节奏与光标
- 🪟 **玻璃拟态卡片**：hover 时 6 种同步反馈（浮起 / 边框变青 / 流光线 / 图片缩放 / ...）
- 📜 **滚动触发动画**：Framer Motion + IntersectionObserver，错落淡入
- 🧭 **智能导航栏**：滚动后变玻璃 + 当前区块实时高亮 + 移动端汉堡菜单
- 📋 **一键复制**：邮箱、微信号、手机号点一下就复制
- 🖼️ **动态 OG 分享图**：自动生成 1200×630 分享封面（微信 / X / LinkedIn 都有预览）
- 🚀 **自动部署**：`git push` → Netlify 自动重新构建发布

---

## 🛠 技术栈

| 类别 | 选型 | 版本 |
|---|---|---|
| 框架 | Next.js (App Router) | 16.x |
| 语言 | TypeScript | 5.x |
| 样式 | Tailwind CSS | v4 |
| 动画 | Framer Motion | 12.x |
| 图标 | lucide-react | 0.577.0 |
| 字体 | Inter + JetBrains Mono | next/font |
| 部署 | Netlify | — |

---

## 📁 目录结构

```
personal-site/
├── app/                          # Next.js 路由与全局配置
│   ├── layout.tsx                # 全局布局（字体 + metadata + Navbar）
│   ├── page.tsx                  # 首页（拼接 5 大区块）
│   ├── globals.css               # 全局样式 + 主题变量 + 动画 keyframes
│   ├── opengraph-image.tsx       # 动态 OG 分享图生成
│   ├── robots.ts                 # 搜索引擎规则
│   └── sitemap.ts                # 站点地图
│
├── components/                   # 组件
│   ├── Navbar.tsx                # 顶部导航（滚动玻璃化 + 区块高亮 + 汉堡菜单）
│   ├── Hero.tsx                  # ① Hero 区
│   ├── About.tsx                 # ② 关于我（bio + timeline）
│   ├── Skills.tsx                # ③ 技能矩阵
│   ├── Projects.tsx              # ④ 项目集
│   ├── ProjectCard.tsx           # 单张项目卡片
│   ├── Contact.tsx               # ⑤ 联系方式（含 footer）
│   ├── ContactInteractive.tsx    # 复制反馈（client）
│   ├── BackgroundFx.tsx          # 多层背景特效
│   ├── MouseGlow.tsx             # 鼠标跟随光晕（client）
│   ├── Typewriter.tsx            # 打字机（client）
│   ├── FadeIn.tsx                # 滚动触发淡入封装（client）
│   └── ui/                       # 原子级 UI
│       ├── Button.tsx            # 按钮（支持 href 多态）
│       ├── Card.tsx              # 玻璃拟态卡片
│       └── SectionTitle.tsx      # 区块标题
│
├── data/                         # ⭐ 你以后唯一要改的目录
│   ├── profile.ts                # 姓名 / 标语 / 状态 / 头像路径
│   ├── about.ts                  # 自我介绍 / 亮点 / 时间轴 / 简历链接
│   ├── skills.ts                 # 技能分类与等级
│   ├── projects.ts               # 项目列表
│   └── contacts.ts               # 邮箱 / 社交链接
│
├── lib/
│   └── cn.ts                     # className 拼接工具
│
└── public/                       # 静态资源
    ├── favicon.svg               # 标签页图标（青色 $）
    ├── aaas.jpg                  # 头像（在 data/profile.ts 引用）
    └── projects/                 # 项目封面图（你以后放这里）
```

---

## 🎨 5 个最常见的修改任务

### 1️⃣ 改个人信息（姓名 / 标语 / 状态）

打开 [`data/profile.ts`](data/profile.ts)，修改对应字段：

```ts
export const profile = {
  name: "宋雪彤",                            // ← 改这里
  title: "AI Trainer · Prompt Engineer",     // ← 身份定位
  taglines: [                                // ← 打字机循环
    "让 AI 既有用，又靠谱",
    "持续稳定的使用 AI",
    // 加更多句...
  ],
  status: "available_for_hire",              // 求职状态
  avatar: "/aaas.jpg",                       // 头像路径
};
```

**保存后**，本地 dev server 自动热更新；线上版本需要 `git push`。

### 2️⃣ 添加 / 修改项目

打开 [`data/projects.ts`](data/projects.ts)，每个对象 = 一张项目卡。复制一份对象、改内容即可新增项目：

```ts
{
  title: "你的项目名",
  tagline: "一句话 English subtitle",
  description: "80-150 字详细描述...",
  cover: "/projects/your-image.png",     // 16:9 图片放 public/projects/
  tech: ["Python", "Claude API", "Eval"],
  liveUrl: "https://...",
  githubUrl: "https://github.com/...",
  type: "Tool",                          // Tool | Project | Experiment | Research
  featured: true,                        // 右上角 FEATURED 角标
}
```

**字段说明**：
- `cover` 留空 → 自动用青紫渐变 + 项目名首字符作占位
- `liveUrl` / `githubUrl` 任一为空 → 对应按钮自动隐藏
- `type` 自由选 4 个枚举值

### 3️⃣ 换头像

1. 准备一张正方形图片（推荐 ≥ 400×400），放进 `public/` 目录
2. 在 [`data/profile.ts`](data/profile.ts) 修改：`avatar: "/你的文件名.jpg"`

### 4️⃣ 改主题强调色

打开 [`app/globals.css`](app/globals.css) 的 `@theme` 块：

```css
--color-accent: #00f0ff;                          /* 改这里 */
--color-accent-soft: rgba(0, 240, 255, 0.12);     /* 半透明版本 */
--color-accent-glow: rgba(0, 240, 255, 0.5);      /* 发光版本 */
```

> **三个颜色要同步改**（用同一基色的不同透明度），否则发光效果会失调。

### 5️⃣ 加 / 减导航项

打开 [`components/Navbar.tsx`](components/Navbar.tsx) 顶部的 `NAV_LINKS` 数组：

```ts
const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  // 新增的：先确保对应 section 有相同的 id
  // { id: "blog", label: "Blog" },
];
```

⚠️ `id` 必须对应页面里某个 `<section id="xxx">` 元素，否则锚点跳转无效。

---

## 🚀 本地开发

### 前置条件

- Node.js ≥ 20（已装：v24.15.0 ✓）
- npm ≥ 10
- Git

### 跑起来

```bash
# 1. clone（如果换电脑了）
git clone https://github.com/sxt0012/personal-site.git
cd personal-site

# 2. 装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 浏览器打开
# http://localhost:3000
```

**保存任何文件**，浏览器会**自动热更新**，不用手动刷新。

### 检查生产构建是否能通过

部署前可以本地跑一遍：

```bash
npm run build      # 编译生产版本，会暴露 TypeScript 错误
npm run start      # 启动生产版本预览（端口 3000）
```

---

## 📤 部署工作流

**修改 → 上线** 三步：

```bash
# 1. 在本地把改动 add 进暂存区
git add .

# 2. 提交（写一句话说明改了什么）
git commit -m "feat: 加了 X 项目 / 改了简介 / ..."

# 3. 推送到 GitHub
git push
```

**Netlify 会自动检测到新 commit**，1-2 分钟后线上版本更新完成。无需登录 Netlify 控制台。

可以在 [Netlify Deploys 页面](https://app.netlify.com/projects/sxt-portfolio/deploys) 看实时部署进度。

---

## 🩹 故障排查

### Dev server 挂了 / 端口被占用

```bash
# 在 personal-site 目录下
npm run dev
```

如果端口 3000 被占：在 cmd 跑 `npx kill-port 3000` 释放后再启动。

### Build 失败

99% 是 TypeScript 类型错误。看终端输出，定位到具体文件 + 行号。常见原因：

- `data/contacts.ts` 加了新的 `type`（如 `phone`），但没在 [`SocialType`](data/contacts.ts) 联合类型里加
- `data/skills.ts` 用了一个图标名，但不在 [`Skills.tsx ICON_MAP`](components/Skills.tsx) 里

### 一键复制功能没反应

`navigator.clipboard.writeText` 只在以下环境工作：
- ✅ HTTPS（生产 / Netlify）
- ✅ localhost（开发）
- ❌ 局域网 IP `http://192.168.x.x:3000`（不行）

所以**只用 `localhost` 测试**。

### 改了 `data/*.ts` 但页面没变化

- **本地**：保存后浏览器应该几秒内更新；如果没动，硬刷新（Ctrl + F5）
- **线上**：必须 `git push` 才会上线

### 动画 / 滚动效果失效

Windows 系统"辅助功能 → 视觉效果 → 动画效果"如果关了，**只会影响该系统下查看时**——其他人正常。本项目代码已经**不再尊重 `prefers-reduced-motion`**，因为视觉效果是核心展示。

---

## 🔮 未来扩展（占位接口）

### 加博客

```
1. 安装 MDX 支持：
   npm install @next/mdx @mdx-js/loader @mdx-js/react
2. 在 app/blog/[slug]/page.tsx 实现路由
3. content/posts/*.mdx 存文章
4. 在 components/Navbar.tsx 加 "Blog" 导航项
```

### 加深色 / 浅色切换

```
1. 安装 next-themes：npm install next-themes
2. app/layout.tsx 加 <ThemeProvider attribute="class">
3. globals.css 用 @media (prefers-color-scheme) 或 .dark 类切变量
4. 加一个 ThemeToggle 组件放进 Navbar
```

### 加中 / 英 双语

```
1. 安装 next-intl：npm install next-intl
2. data/ 下每个文件加 _en.ts 版本
3. middleware.ts 做语言检测路由
4. Navbar 加语言切换器
```

### 加简历 PDF 下载

```
1. 把简历命名 resume.pdf 放进 public/
2. 编辑 data/about.ts：resumeUrl: "/resume.pdf"
3. About 区块的"下载简历"按钮会自动显示
```

---

## 📊 网站性能 / SEO

### Lighthouse 自测

在线访问 https://sxt-portfolio.netlify.app → 浏览器按 F12 → **Lighthouse** 标签 → 勾选 4 项 → **Analyze**。

预期分数：

| 维度 | 目标 |
|---|---|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 100 |
| SEO | 100 |

### 已配置的 SEO 内容

- ✅ 完整的 `<title>` / `<meta name="description">`
- ✅ Open Graph + Twitter Card
- ✅ 动态 OG 分享图（每次访问 `/opengraph-image` 自动生成）
- ✅ `robots.txt`（允许全站爬取）
- ✅ `sitemap.xml`
- ✅ 语义化 HTML（`<section>` / `<nav>` / `<header>` / `<footer>`）
- ✅ 中文 lang 标记

---

## 📜 致谢

本站基于以下开源项目搭建：

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [lucide-react](https://lucide.dev)
- [tsParticles](https://particles.js.org)

灵感参考：[Vercel](https://vercel.com) · [Linear](https://linear.app) · [Trae.ai](https://trae.ai)

---

## 📝 License

个人作品集，**不开源**，仅供个人求职使用。
代码风格、动效设计欢迎学习与参考。
