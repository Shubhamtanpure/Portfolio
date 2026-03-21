// app/page.tsx

import HeroSection from "@/components/sections/HeroSection/HeroSection";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection/SkillsSection";
import ImpactSection from "@/components/sections/ImpactSection/ImpactSection";
import ProjectsSection from "@/components/sections/ ProjectsSection/ProjectsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ImpactSection />
    </>
  );
}
