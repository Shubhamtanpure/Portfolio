// components/sections/SkillsSection/SkillsSection.tsx
// SERVER COMPONENT

import SkillsClient from "./SkillsSectionClient";
import { SKILL_GROUPS } from "@/data/skills";

export default function SkillsSection() {
  return <SkillsClient skillGroups={SKILL_GROUPS} />;
}
