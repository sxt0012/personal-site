import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

/**
 * 单张项目卡片
 *
 * hover 时触发 6 个同步效果：
 *   1. 整卡上浮 4px
 *   2. 边框变青
 *   3. 卡片外发光
 *   4. 顶部流光线浮现
 *   5. 封面图微缩放 (scale 1.05)
 *   6. 标题颜色变青
 *
 * 封面图：cover 字段填路径就显示图；不填则显示渐变占位 + 首字符
 */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group relative h-full overflow-hidden rounded-xl
                 border border-white/10 bg-white/[0.03] backdrop-blur-md
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.05]
                 hover:shadow-[0_0_40px_-8px_var(--color-accent-glow)]"
    >
      {/* 顶部 1px 渐变流光线（仅 hover 浮现） */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-accent), transparent)",
        }}
      />

      {/* ─── 封面图区域 (16:9) ─── */}
      <div className="relative aspect-video overflow-hidden bg-surface">
        {project.cover ? (
          // 有真实封面图
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          // 渐变占位：青紫双色 + 项目名首字符
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,240,255,0.18), rgba(168,85,247,0.18))",
            }}
          >
            <span className="text-7xl font-bold text-foreground/15 select-none font-mono">
              {project.title.replace("[占位] ", "").charAt(0)}
            </span>
          </div>
        )}

        {/* 左上角：项目类型小标签 */}
        {project.type && (
          <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded bg-background/70 backdrop-blur-sm border border-white/10 text-accent">
            {project.type}
          </div>
        )}

        {/* 右上角：精选角标 */}
        {project.featured && (
          <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded bg-accent text-background font-semibold">
            FEATURED
          </div>
        )}
      </div>

      {/* ─── 文字内容区 ─── */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          {project.tagline && (
            <p className="text-xs font-mono text-foreground-muted mt-1">
              {project.tagline}
            </p>
          )}
        </div>

        <p className="text-sm text-foreground-muted leading-relaxed">
          {project.description}
        </p>

        {/* 技术栈标签 */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-wide px-2 py-0.5 rounded
                         border border-accent/30 bg-accent/5 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 链接按钮（Live Demo / GitHub） */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex items-center gap-5 pt-2 border-t border-white/5 mt-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 pt-3 text-xs font-mono text-foreground-muted hover:text-accent transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 pt-3 text-xs font-mono text-foreground-muted hover:text-accent transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
