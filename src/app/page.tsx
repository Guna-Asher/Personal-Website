import { NavBar } from "@/components/nav/nav-bar";
import { Hero } from "@/components/hero/hero";
import { Introduction } from "@/components/intro/introduction";
import { ProjectsSection } from "@/components/projects/projects-section";
import { CurrentlyBuilding } from "@/components/building/currently-building";
import { SkillsSection } from "@/components/skills/skills-section";
import { HowIBuild } from "@/components/process/how-i-build";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";

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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
