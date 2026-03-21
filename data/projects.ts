// data/projects.ts

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  impact: string;
  tags: string[];
  gradient: string; // CSS gradient for placeholder card
  category: "ai" | "saas" | "iiot" | "analytics";
  metrics: { value: string; label: string }[];
  links?: { github?: string; live?: string };
}

export const PROJECTS: Project[] = [
  {
    id: "vision-inspection",
    name: "Vision Inspection System",
    subtitle: "AI-Driven EV Kit Inspection",
    description:
      "Automated inspection platform for EV manufacturing using computer vision pipelines. Integrates edge inference nodes with centralized enterprise systems for real-time defect detection and production KPI reporting.",
    impact: "90% reduction in inspection errors",
    tags: ["Computer Vision", "NestJS", "React", "WebSockets", "Kafka"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    category: "ai",
    metrics: [
      { value: "90%", label: "Error reduction" },
      { value: "40%", label: "Better traceability" },
      { value: "Real-time", label: "KPI dashboards" },
    ],
  },
  {
    id: "workxpert",
    name: "WorkXpert",
    subtitle: "AI Digital SOP & Manufacturing OS",
    description:
      "Multi-tenant SaaS platform for digital work instructions and manufacturing process automation. Features license management, IoT shop-floor synchronization, and enterprise RBAC deployments.",
    impact: "25% factory efficiency gained",
    tags: ["Multi-tenant SaaS", "IoT", "NestJS", "PostgreSQL", "RBAC"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    category: "saas",
    metrics: [
      { value: "25%", label: "Efficiency gain" },
      { value: "Multi-tenant", label: "Architecture" },
      { value: "Enterprise", label: "RBAC" },
    ],
  },
  {
    id: "traceability",
    name: "Production Traceability System",
    subtitle: "Real-Time IIoT Architecture",
    description:
      "Distributed IIoT system connecting PLC machines, HMI stations, and enterprise databases via Modbus TCP/IP. Redis and WebSockets power real-time monitoring across all production stations.",
    impact: "100% component traceability",
    tags: ["IIoT", "Modbus TCP", "Redis", "WebSockets", "PLC/HMI"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    category: "iiot",
    metrics: [
      { value: "100%", label: "Traceability" },
      { value: "Live", label: "Production monitoring" },
      { value: "Modbus", label: "TCP/IP comms" },
    ],
  },
  {
    id: "shocktube",
    name: "Shocktube Powder Detection",
    subtitle: "Real-Time Anomaly Detection",
    description:
      "Real-time anomaly detection system for shocktube powder monitoring in industrial environments. Achieves high accuracy through continuous sensor data analysis and threshold alerting pipelines.",
    impact: "95% monitoring accuracy",
    tags: ["Anomaly Detection", "Real-time", "Computer Vision", "NestJS"],
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    category: "ai",
    metrics: [
      { value: "95%", label: "Accuracy" },
      { value: "Real-time", label: "Alerts" },
      { value: "Industrial", label: "Grade" },
    ],
  },
  {
    id: "sargen",
    name: "Sargen Assessment Tool",
    subtitle: "Factory Benchmarking Workflows",
    description:
      "Multi-evaluator factory assessment platform with structured benchmarking workflows, scoring matrices, and comparative reporting. Enables standardized operational assessments across facilities.",
    impact: "20% better operational assessments",
    tags: ["Benchmarking", "React", "NestJS", "PostgreSQL"],
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    category: "analytics",
    metrics: [
      { value: "20%", label: "Better assessments" },
      { value: "Multi-eval", label: "Workflows" },
      { value: "Structured", label: "Reporting" },
    ],
  },
];
