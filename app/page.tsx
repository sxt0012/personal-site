import BackgroundFx from "@/components/BackgroundFx";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

/**
 * 首页（完整版）
 * 第 7 步交付：Hero + About + Skills + Projects + Contact 五大区块全就位
 * 下一步：导航栏 + 响应式打磨（第 8 步）
 */
export default function Home() {
  return (
    <main className="relative">
      <BackgroundFx />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
