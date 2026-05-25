import SectionTitle from "./ui/SectionTitle";
import FadeIn from "./FadeIn";
import ContactInteractive from "./ContactInteractive";
import { contacts } from "@/data/contacts";
import { profile } from "@/data/profile";

/**
 * "联系方式"区块
 *
 * 由 ContactInteractive 处理所有 client 端交互（复制反馈）
 * 本组件只负责整体布局、SectionTitle 和底部小页脚
 */
export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <SectionTitle
            index="05_CONTACT"
            subtitle={contacts.intro}
            centered
          >
            聊聊
          </SectionTitle>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ContactInteractive
            email={contacts.email}
            socials={contacts.socials}
          />
        </FadeIn>
      </div>

      {/* ─── 底部小页脚 ─── */}
      <footer className="mt-24 sm:mt-32 pt-8 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] sm:text-xs text-foreground-subtle">
          <span>
            © {year} {profile.name} · All rights reserved
          </span>
          <span>
            Built with{" "}
            <span className="text-accent">Next.js</span> +{" "}
            <span className="text-accent">Tailwind</span> +{" "}
            <span className="text-accent">Framer Motion</span>
          </span>
        </div>
      </footer>
    </section>
  );
}
