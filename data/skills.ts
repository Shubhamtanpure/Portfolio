export const TECH = [
  "TypeScript",
  "React",
  "Next.js",
  "Express.js",
  "NestJS",
  "Kafka",
  "PostgreSQL",
  "Redis",
  "WebSockets",
  "Docker",
  "IIoT / Modbus",
];

// data/skills.ts

export interface SkillGroup {
  category: string;
  icon: string; // emoji fallback
  color: string; // hex accent
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages & Frameworks",
    icon: "⚡",
    color: "#569cd6",
    items: [
      "TypeScript",
      "JavaScript",
      "React.js",
      "Next.js",
      "Node.js",
      "NestJS",
      "Express.js",
    ],
  },
  {
    category: "Backend & Architecture",
    icon: "🏗",
    color: "#4ec9b0",
    items: [
      "Microservices",
      "Event-Driven Systems",
      "Kafka",
      "REST APIs",
      "WebSockets",
      "RBAC",
    ],
  },
  {
    category: "Databases",
    icon: "🗄",
    color: "#ce9178",
    items: ["PostgreSQL", "MongoDB", "MySQL", "TypeORM", "Redis"],
  },
  {
    category: "Frontend & UI",
    icon: "🎨",
    color: "#c586c0",
    items: [
      "Redux Toolkit",
      "RTK Query",
      "Material UI",
      "Tailwind CSS",
      "Storybook",
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "🛠",
    color: "#b5cea8",
    items: ["Docker", "Git", "GitHub", "Postman", "Metabase", "Grafana"],
  },
  {
    category: "Security",
    icon: "🔐",
    color: "#f59e0b",
    items: ["JWT Authentication", "Role-Based Access Control"],
  },
  {
    category: "Industrial / IIoT",
    icon: "🏭",
    color: "#ef4444",
    items: [
      "Modbus TCP/IP",
      "PLC Integration",
      "HMI Systems",
      "SCADA",
      "Edge Computing",
    ],
  },
];

// Flat list for tech badges (used in HeroSection)
// export const TECH: string[] = [
//   "TypeScript", "React", "Next.js", "NestJS", "Node.js",
//   "Kafka", "PostgreSQL", "MongoDB", "Redis",
//   "WebSockets", "Docker", "IIoT / Modbus",
// ];
