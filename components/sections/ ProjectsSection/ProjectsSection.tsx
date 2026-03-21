// components/sections/ProjectsSection/ProjectsSection.tsx
// SERVER COMPONENT

import ProjectsClient from "./ProjectsClient";
import { PROJECTS } from "@/data/projects";

export default function ProjectsSection() {
  return <ProjectsClient projects={PROJECTS} />;
}
