// app/page.tsx

import HeroSection from "@/components/sections/HeroSection/HeroSection";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection/SkillsSection";
import ImpactSection from "@/components/sections/ImpactSection/ImpactSection";
// import ProjectsSection from "@/components/sections/ ProjectsSection/ProjectsSection";
import ProjectsSection from "@/components/sections/ProjectsSection/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ImpactSection />
      <ContactSection />
    </>
  );
}

// app/page.tsx
// TEMPORARY DIAGNOSTIC VERSION
// Each section is wrapped in its own error boundary.
// The crashing section will show a red label instead of crashing everything below it.
// Replace with your normal page.tsx once you find the culprit.

// "use client";

// import React, { Component } from "react";
// import HeroSection from "@/components/sections/HeroSection/HeroSection";
// import AboutSection from "@/components/sections/AboutSection/AboutSection";
// import ExperienceSection from "@/components/sections/ExperienceSection/ExperienceSection";
// import ProjectsSection from "@/components/sections/ProjectsSection/ProjectsSection";
// import SkillsSection from "@/components/sections/SkillsSection/SkillsSection";
// import ImpactSection from "@/components/sections/ImpactSection/ImpactSection";
// import ContactSection from "@/components/sections/ContactSection/ContactSection";

// // ─── Per-section error boundary ───────────────────────────────────────────────

// class SectionBoundary extends Component<
//   { name: string; children: React.ReactNode },
//   { error: string | null }
// > {
//   constructor(props: { name: string; children: React.ReactNode }) {
//     super(props);
//     this.state = { error: null };
//   }

//   static getDerivedStateFromError(error: Error) {
//     return { error: error.message };
//   }

//   componentDidCatch(error: Error, info: React.ErrorInfo) {
//     console.error(`[CRASH] ${this.props.name}:`, error.message);
//     console.error("Component stack:", info.componentStack);
//   }

//   render() {
//     if (this.state.error) {
//       return (
//         <div
//           style={{
//             padding: "24px 32px",
//             margin: "16px",
//             background: "rgba(239,68,68,0.08)",
//             border: "1px solid rgba(239,68,68,0.4)",
//             borderRadius: "12px",
//             fontFamily: "monospace",
//           }}
//         >
//           <div
//             style={{
//               color: "#EF4444",
//               fontWeight: 700,
//               fontSize: "14px",
//               marginBottom: "8px",
//             }}
//           >
//             ❌ {this.props.name} crashed
//           </div>
//           <div
//             style={{
//               color: "#F87171",
//               fontSize: "12px",
//               lineHeight: 1.6,
//               whiteSpace: "pre-wrap",
//             }}
//           >
//             {this.state.error}
//           </div>
//           <div style={{ color: "#9CA3AF", fontSize: "11px", marginTop: "8px" }}>
//             Check browser Console (F12) for full stack trace
//           </div>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export default function HomePage() {
//   return (
//     <>
//       <SectionBoundary name="HeroSection">
//         <HeroSection />
//       </SectionBoundary>

//       <SectionBoundary name="AboutSection">
//         <AboutSection />
//       </SectionBoundary>

//       <SectionBoundary name="ExperienceSection">
//         <ExperienceSection />
//       </SectionBoundary>

//       <SectionBoundary name="ProjectsSection">
//         <ProjectsSection />
//       </SectionBoundary>

//       <SectionBoundary name="SkillsSection">
//         <SkillsSection />
//       </SectionBoundary>

//       <SectionBoundary name="ImpactSection">
//         <ImpactSection />
//       </SectionBoundary>

//       <SectionBoundary name="ContactSection">
//         <ContactSection />
//       </SectionBoundary>
//     </>
//   );
// }
