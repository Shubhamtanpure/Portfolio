// data/experience.ts

export interface ProjectEntry {
  name: string;
  bullets: string[];
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  summary: string;
  projects: ProjectEntry[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "elansol",
    role: "Software Developer",
    company: "Elansol Technologies Pvt. Ltd.",
    location: "Pune, India",
    period: "Dec 2024 – Present",
    current: true,
    summary:
      "Develop industrial AI, IoT, and Computer Vision–integrated SaaS platforms for manufacturing automation and factory analytics.",
    projects: [
      {
        name: "Vision Systems – Automated Kit Inspection",
        bullets: [
          "Built an AI-driven automated inspection system for EV manufacturing",
          "Engineered high-performance data communication between edge vision nodes and centralized systems",
          "Developed real-time BI dashboards converting vision metadata into production KPIs",
          "Reduced inspection errors by 90% and improved production traceability by 40%",
        ],
        tags: ["AI/CV", "NestJS", "React", "WebSockets", "BI Dashboards"],
      },
      {
        name: "WorkXpert – AI Digital SOP & Manufacturing OS",
        bullets: [
          "Architected a multi-tenant SaaS platform for digital work instructions and manufacturing process automation",
          "Implemented license management and subscription systems for enterprise deployments",
          "Designed synchronization engines connecting IoT shop-floor data with productivity dashboards",
          "Improved factory workflow efficiency by 25% and reduced manual process errors significantly",
        ],
        tags: ["Multi-tenant SaaS", "IoT", "NestJS", "PostgreSQL", "RBAC"],
      },
      {
        name: "Real-Time Production Traceability System",
        bullets: [
          "Developed distributed IIoT architecture connecting PLC machines, HMI stations, and enterprise databases",
          "Implemented Modbus TCP/IP communication between industrial hardware and software systems",
          "Used Redis and WebSockets for real-time monitoring and inter-station communication",
          "Achieved 100% component traceability and live production monitoring",
        ],
        tags: ["IIoT", "Modbus TCP", "Redis", "WebSockets", "PLC/HMI"],
      },
      {
        name: "Shocktube Powder Detection",
        bullets: [
          "Real-time anomaly detection system achieving 95% monitoring accuracy",
        ],
        tags: ["Anomaly Detection", "Computer Vision", "Real-time"],
      },
      {
        name: "Sargen Factory Assessment Tool",
        bullets: [
          "Built multi-evaluator factory benchmarking workflows improving operational assessments by 20%",
        ],
        tags: ["Benchmarking", "React", "NestJS"],
      },
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Engineering – Computer Science",
  university: "Savitribai Phule Pune University",
  location: "Pune",
  period: "2019 – 2023",
};
