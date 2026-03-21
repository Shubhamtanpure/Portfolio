// components/sections/ExperienceSection/ExperienceSection.tsx
// SERVER COMPONENT

import ExperienceClient from "./ExperienceClient";
import { EXPERIENCE, EDUCATION } from "@/data/experience";

export default function ExperienceSection() {
  return <ExperienceClient experience={EXPERIENCE} education={EDUCATION} />;
}
