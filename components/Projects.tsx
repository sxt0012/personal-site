import SectionTitle from "./ui/SectionTitle";
import FadeIn from "./FadeIn";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

/**
 * "产品集"区块
 *
 * 布局：响应式网格（移动 1 列 / 平板 2 列 / 桌面 3 列）
 * 动效：每张卡片按 80ms 步长错落淡入
 * 数据：来自 data/projects.ts
 */
export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle
            index="04_PROJECTS"
            subtitle="精选项目集合。Hover 任意一张卡片查看交互效果。"
          >
            产品集
          </SectionTitle>
        </FadeIn>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.08}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        ) : (
          // 空状态（用户清空 projects 数组时显示）
          <p className="text-center font-mono text-sm text-foreground-muted py-12">
            {"// 暂无项目，在 data/projects.ts 添加你的第一个项目"}
          </p>
        )}
      </div>
    </section>
  );
}
