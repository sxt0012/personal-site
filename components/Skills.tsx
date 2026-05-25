import {
  Sparkles,
  Brain,
  Bot,
  Target,
  Repeat,
  Tags,
  Code2,
  Link2,
  GitBranch,
  Database,
  Languages,
  Lightbulb,
  Users,
  FileText,
  Wrench,
  BookOpen,
  MessageSquare,
  Cpu,
  Workflow,
  Eye,
  TestTube,
  Award,
  Compass,
  PenTool,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

import SectionTitle from "./ui/SectionTitle";
import FadeIn from "./FadeIn";
import { cn } from "@/lib/cn";
import { skills } from "@/data/skills";

/**
 * "技能与工具"区块
 *
 * 数据来自 data/skills.ts（编辑那里即可），UI 自动渲染
 *
 * 视觉特点：
 *   - 每个分类有自己的 category 图标（青色）
 *   - 技能卡片：图标 + 名称 + 5 格等级条
 *   - hover 时边框变青，背景略亮
 *   - 滚动进入视口时，类别 → 类别内每张卡片，按 50ms 步长错落淡入
 */

// 允许使用的图标白名单（要扩展就在这里加一行 import 和 map）
const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles, Brain, Bot, Target, Repeat, Tags, Code2, Link2,
  GitBranch, Database, Languages, Lightbulb, Users, FileText,
  Wrench, BookOpen, MessageSquare, Cpu, Workflow, Eye, TestTube,
  Award, Compass, PenTool, BarChart3,
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles; // 找不到图标时用 Sparkles 兜底
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle
            index="03_SKILLS"
            subtitle="按掌握度排列，持续学习中。"
          >
            技能与工具
          </SectionTitle>
        </FadeIn>

        <div className="space-y-14">
          {skills.map((category, ci) => {
            const CategoryIcon = getIcon(category.icon);
            return (
              <div key={category.category}>
                {/* 分类标题 */}
                <FadeIn delay={ci * 0.08}>
                  <div className="flex items-center gap-3 mb-6">
                    <CategoryIcon className="w-5 h-5 text-accent" />
                    <h3 className="text-lg font-semibold tracking-tight">
                      {category.category}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-2" />
                  </div>
                </FadeIn>

                {/* 该分类下的技能卡片矩阵 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.items.map((item, i) => {
                    const ItemIcon = getIcon(item.icon);
                    return (
                      <FadeIn
                        key={item.name}
                        delay={ci * 0.08 + 0.1 + i * 0.05}
                      >
                        <div
                          className={cn(
                            "group rounded-lg p-4 h-full",
                            "border border-white/10 bg-white/[0.03] backdrop-blur-sm",
                            "transition-all duration-300 ease-out",
                            "hover:border-accent/40 hover:bg-white/[0.06]",
                            "hover:shadow-[0_0_20px_-8px_var(--color-accent-glow)]",
                          )}
                        >
                          <ItemIcon className="w-5 h-5 text-accent mb-3 transition-transform group-hover:scale-110" />
                          <p className="text-sm font-medium mb-3 text-foreground">
                            {item.name}
                          </p>
                          {/* 等级圆点：5 个，实心数 = level；激活的圆点带青色发光 */}
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((lvl) => {
                              const active = lvl <= item.level;
                              return (
                                <div
                                  key={lvl}
                                  className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    active ? "bg-accent" : "bg-white/15",
                                  )}
                                  style={
                                    active
                                      ? {
                                          boxShadow:
                                            "0 0 6px var(--color-accent-glow)",
                                        }
                                      : undefined
                                  }
                                />
                              );
                            })}
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
