@AGENTS.md

# 项目约定（给以后帮我改这个项目的 AI Agent）

这是一个**已上线**的个人作品集网站，部署在 https://sxt-portfolio.netlify.app

## 关键原则

1. **数据与视图分离**：所有用户可见的文案在 `data/*.ts`，组件里**不要硬编码**任何展示文字
2. **改文字 → 改 data 文件；改视觉 → 改组件**。不要混
3. 改完任何文件，**告诉用户怎么验证**（本地 `http://localhost:3000`），不要直接说"完成"
4. 推 GitHub 即自动部署，但用户每次 `git push` 之前要先在本地确认效果

## 技术约定

- **Next.js 16 (App Router) + Tailwind v4**，**不要套老版本的 API**（详见 `AGENTS.md`）
- **lucide-react 0.577.0**（按名导入 API，**不是** v1.x 的 `<Icon name="...">` 新 API）
- **服务端 / 客户端组件区分**：
  - 任何用了 `useState` / `useEffect` / `motion.*` 的必须加 `"use client"`
  - 数据类组件（SectionTitle、Card 静态版）保持 server 默认
- **主题变量在 `app/globals.css` 的 `@theme` 块**，改这里全站生效
- **颜色用 Tailwind 工具类**：`text-accent` / `bg-surface` / `text-foreground-muted` 等。**不要写 `#00f0ff` 这样的硬编码**

## 修改任何视觉细节前

- 先看 `app/globals.css` 里有没有相关 keyframe / 工具类，**优先复用**
- 动画节奏要和现有保持一致（`duration: 0.75s`, `ease: [0.22, 1, 0.36, 1]`）

## 改完之后

- 跑一次 `npm run build` 看能否通过（用户的部署门槛）
- 如果改了 `data/contacts.ts` 的 `SocialType`，记得同步改 `ContactInteractive.tsx` 的 `ICON_MAP`
- 如果加了新的 lucide 图标到 `data/skills.ts`，记得同步加进 `Skills.tsx` 的 `ICON_MAP`

## 用户偏好

- **中文回复**（用户是中文母语）
- **新手友好**：术语用大白话解释一次
- **改动前说"改什么、为什么"**，改动后说"怎么验证"
- **每完成一个阶段停下**等用户确认，不要一次性做太多
