// data/about.ts

export interface AboutCard {
  icon: string;
  title: string;
  body: string;
  color: string;
}

export interface TimelineItem {
  year: string;
  label: string;
}

export const ABOUT_CARDS: AboutCard[] = [
  {
    icon: "🏭",
    title: "Industrial Software",
    body: "Building SaaS platforms that run real factories — connecting PLCs, HMIs, and edge AI nodes to enterprise dashboards.",
    color: "#7C73FF",
  },
  {
    icon: "⚡",
    title: "Real-Time Systems",
    body: "Kafka event pipelines, WebSocket streams, and Redis pub/sub powering live production monitoring at machine speed.",
    color: "#00D4B8",
  },
  {
    icon: "👁",
    title: "AI & Computer Vision",
    body: "Bridging CV inference pipelines with enterprise software — turning visual data into production KPIs and quality metrics.",
    color: "#F59E0B",
  },
  {
    icon: "🏗",
    title: "Scalable Architecture",
    body: "Microservices, multi-tenant SaaS, RBAC security models — designing systems that grow with enterprise scale demands.",
    color: "#EF4444",
  },
];

export const TIMELINE: TimelineItem[] = [
  { year: "2019", label: "Started B.E. Computer Science at SPPU" },
  { year: "2023", label: "Graduated with honours" },
  { year: "Dec 2024", label: "Joined Elansol Technologies as Jr. Developer" },
  { year: "2025", label: "Shipping 3+ live industrial SaaS platforms" },
];
