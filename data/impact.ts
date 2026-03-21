// data/impact.ts

export interface ImpactMetric {
  id: string;
  value: string;
  suffix?: string;
  label: string;
  sublabel: string;
  color: string;
}

export interface SystemCapability {
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: "errors",
    value: "90",
    suffix: "%",
    label: "Inspection Errors Eliminated",
    sublabel: "Vision Systems · EV Manufacturing",
    color: "#7C73FF",
  },
  {
    id: "traceability",
    value: "100",
    suffix: "%",
    label: "Component Traceability",
    sublabel: "Real-Time IIoT Production Tracking",
    color: "#00D4B8",
  },
  {
    id: "efficiency",
    value: "25",
    suffix: "%",
    label: "Factory Efficiency Gained",
    sublabel: "WorkXpert Manufacturing OS",
    color: "#F59E0B",
  },
  {
    id: "accuracy",
    value: "95",
    suffix: "%",
    label: "Anomaly Detection Accuracy",
    sublabel: "Shocktube Powder Detection System",
    color: "#EF4444",
  },
  {
    id: "assessment",
    value: "20",
    suffix: "%",
    label: "Better Operational Assessments",
    sublabel: "Sargen Factory Benchmarking Tool",
    color: "#10B981",
  },
  {
    id: "platforms",
    value: "3",
    suffix: "+",
    label: "Live SaaS Platforms Shipped",
    sublabel: "Industrial · Enterprise · Multi-tenant",
    color: "#8B5CF6",
  },
];

export const SYSTEM_CAPABILITIES: SystemCapability[] = [
  {
    title: "Real-Time Event Pipelines",
    description:
      "Kafka-powered event-driven architectures processing factory telemetry at scale",
    tags: ["Kafka", "Event-Driven", "NestJS"],
    icon: "⚡",
  },
  {
    title: "Computer Vision Integration",
    description:
      "Edge inference pipelines bridging CV models with enterprise SaaS systems",
    tags: ["CV Pipelines", "Edge Computing", "AI"],
    icon: "👁",
  },
  {
    title: "IIoT Device Communication",
    description:
      "Modbus TCP/IP integration connecting PLCs, HMIs, and cloud databases",
    tags: ["Modbus TCP", "PLC", "HMI"],
    icon: "🏭",
  },
  {
    title: "Multi-Tenant SaaS Architecture",
    description:
      "Scalable tenant isolation, RBAC, and license management for enterprise deployments",
    tags: ["Multi-tenant", "RBAC", "PostgreSQL"],
    icon: "🏗",
  },
];
