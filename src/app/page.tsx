import { NavBar } from "@/components/nav/nav-bar";
import { Hero } from "@/components/hero/hero";
import { Introduction } from "@/components/intro/introduction";
import { ProjectsSection } from "@/components/projects/projects-section";
import { CurrentlyBuilding } from "@/components/building/currently-building";
import { SkillsSection } from "@/components/skills/skills-section";
import { HowIBuild } from "@/components/process/how-i-build";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";
import { Marquee } from "@/components/ui/marquee";

const statusLine = [
  "STATUS · OPEN TO WORK",
  "ENV · PRODUCTION-MINDED",
  "REGION · INDIA",
  "DEPLOY · CONTINUOUS LEARNING",
  "BUILD · PASSING",
];

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Introduction />
        <ProjectsSection />
        <CurrentlyBuilding />
        <SkillsSection />
        <HowIBuild />
        <Marquee items={statusLine} reverse />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
