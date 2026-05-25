import { Download } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";
import FadeIn from "./FadeIn";
import { about } from "@/data/about";

/**
 * "关于我"区块
 *
 * 布局：
 *   桌面：左 3 列（bio + highlights + 简历按钮）右 2 列（时间轴）
 *   移动：上下堆叠
 *
 * 动效：进入视口时左右两侧错落淡入
 */
export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle
            index="02_ABOUT_ME"
            subtitle="一段简短的自我介绍，让 HR 在 10 秒内 get 到你的核心价值。"
          >
            关于我
          </SectionTitle>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* 左侧：bio + 亮点 + 简历下载 */}
          <div className="lg:col-span-3 space-y-8">
            <FadeIn delay={0.1}>
              <p className="text-base sm:text-lg leading-relaxed text-foreground-muted">
                {about.bio}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <ul className="space-y-2">
                {about.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="font-mono text-xs sm:text-sm text-foreground"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </FadeIn>

            {about.resumeUrl && (
              <FadeIn delay={0.3}>
                <a href={about.resumeUrl} download>
                  <Button variant="primary">
                    <Download className="w-4 h-4" /> 下载简历
                  </Button>
                </a>
              </FadeIn>
            )}
          </div>

          {/* 右侧：时间轴 */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.15}>
              <p className="font-mono text-xs text-accent mb-8 tracking-[0.25em]">
                {"// TIMELINE"}
              </p>
            </FadeIn>

            <div className="relative">
              {/* 左侧垂直连接线 */}
              <div
                aria-hidden
                className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10"
              />

              <div className="space-y-8">
                {about.timeline.map((event, i) => (
                  <FadeIn key={i} delay={0.2 + i * 0.1}>
                    <div className="relative pl-8">
                      {/* 时间节点圆点：外圈青色环 + 内部实心 */}
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-background border-2 border-accent">
                        <div className="absolute inset-1 rounded-full bg-accent" />
                      </div>
                      <p className="font-mono text-xs text-accent mb-1">
                        {event.date}
                      </p>
                      <h4 className="font-semibold mb-1 text-foreground">
                        {event.title}
                      </h4>
                      <p className="text-sm text-foreground-muted leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
