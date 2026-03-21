// data/hero.ts
// Pure static data — no React, no "use client".
// Import freely from server components.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Token {
  c: string;
  t: string;
}

export type CodeLine = Token[];

export interface VSFile {
  name: string;
  dot: string;
  lang: string;
  hl: number[];
  lines: CodeLine[];
}

// ─── VS Dark+ editor palette ─────────────────────────────────────────────────

export const E = {
  bg: "#1e1e1e",
  bgAlt: "#252526",
  bgDark: "#0e0e0e",
  panel: "#323233",
  border: "#3c3c3c",
  active: "#37373d",
  overlay: "#4a4a4a", // scrollbar thumb
  text: "#d4d4d4",
  muted: "#8c8c8c",
  dim: "#4a4a4a",
  blue: "#569cd6",
  lblue: "#4fc1ff",
  cyan: "#4ec9b0",
  green: "#6a9955",
  str: "#ce9178",
  num: "#b5cea8",
  prop: "#9cdcfe",
  kw: "#c586c0",
  accent: "#007acc",
} as const;

// ─── Token helpers ────────────────────────────────────────────────────────────

const kw = (t: string): Token => ({ c: E.kw, t });
const bl = (t: string): Token => ({ c: E.blue, t });
const lb = (t: string): Token => ({ c: E.lblue, t });
const cy = (t: string): Token => ({ c: E.cyan, t });
const gr = (t: string): Token => ({ c: E.green, t });
const str = (t: string): Token => ({ c: E.str, t });
const num = (t: string): Token => ({ c: E.num, t });
const pr = (t: string): Token => ({ c: E.prop, t });
const tx = (t: string): Token => ({ c: E.text, t });

// ─── VS Code files ────────────────────────────────────────────────────────────

export const VS_FILES: VSFile[] = [
  {
    name: "shubham.ts",
    dot: E.blue,
    lang: "TypeScript",
    hl: [7, 8, 9, 10, 14, 15, 16, 17, 18],
    lines: [
      [kw("interface "), cy("Developer"), tx(" {")],
      [tx("  "), pr("name"), tx(":"), cy("     string"), tx(";")],
      [tx("  "), pr("role"), tx(":"), cy("     string"), tx(";")],
      [tx("  "), pr("location"), tx(":"), cy(" string"), tx(";")],
      [tx("}")],
      [],
      [bl("const "), lb("shubham"), tx(": "), cy("Developer"), tx(" = {")],
      [tx("  "), pr("name"), tx(":     "), str('"Shubham Tanpure"'), tx(",")],
      [
        tx("  "),
        pr("role"),
        tx(":     "),
        str('"Full-Stack Developer"'),
        tx(","),
      ],
      [tx("  "), pr("location"), tx(": "), str('"Pune, India"'), tx(",")],
      [tx("};")],
      [],
      [gr("// impact metrics")],
      [bl("const "), lb("impact"), tx(" = {")],
      [
        tx("  "),
        pr("errorsReduced"),
        tx(":  "),
        num("90"),
        tx(","),
        gr(" // %"),
      ],
      [
        tx("  "),
        pr("traceability"),
        tx(":  "),
        num("100"),
        tx(","),
        gr(" // %"),
      ],
      [tx("  "), pr("efficiency"), tx(":   "), num("25"), tx(","), gr(" // %")],
      [tx("  "), pr("platforms"), tx(":   "), num("3"), tx("+")],
      [tx("};")],
      [],
      [gr("// ▸ currently shipping WorkXpert")],
    ],
  },
  {
    name: "stack.yml",
    dot: E.cyan,
    lang: "YAML",
    hl: [1, 2, 3, 4, 5, 8, 9],
    lines: [
      [pr("stack:")],
      [tx("  "), pr("frontend"), tx(":")],
      [tx("    - "), str("React / Next.js")],
      [tx("    - "), str("TypeScript")],
      [tx("    - "), str("Material UI")],
      [tx("  "), pr("backend"), tx(":")],
      [tx("    - "), str("NestJS / Node.js")],
      [tx("    - "), str("REST + WebSockets")],
      [tx("    - "), str("Kafka (event-driven)")],
      [tx("  "), pr("database"), tx(":")],
      [tx("    - "), str("PostgreSQL + TypeORM")],
      [tx("    - "), str("MongoDB / Redis")],
      [tx("  "), pr("infra"), tx(":")],
      [tx("    - "), str("Docker / Linux")],
      [tx("    - "), str("Modbus TCP / IIoT")],
      [tx("    - "), str("PLC + HMI systems")],
    ],
  },
  {
    name: "projects.json",
    dot: E.str,
    lang: "JSON",
    hl: [3, 4, 5, 8, 9, 10, 13, 14, 15],
    lines: [
      [tx("{")],
      [tx("  "), pr('"projects"'), tx(": [")],
      [tx("    {")],
      [
        tx("      "),
        pr('"name"'),
        tx(": "),
        str('"Vision Inspection System"'),
        tx(","),
      ],
      [
        tx("      "),
        pr('"impact"'),
        tx(": "),
        str('"90% error reduction"'),
        tx(","),
      ],
      [tx("      "), pr('"tech"'), tx(": "), str('"AI + CV + NestJS"')],
      [tx("    },")],
      [tx("    {")],
      [tx("      "), pr('"name"'), tx(": "), str('"WorkXpert MfgOS"'), tx(",")],
      [
        tx("      "),
        pr('"impact"'),
        tx(": "),
        str('"25% efficiency gain"'),
        tx(","),
      ],
      [tx("      "), pr('"tech"'), tx(": "), str('"Kafka + React + IoT"')],
      [tx("    },")],
      [tx("    {")],
      [
        tx("      "),
        pr('"name"'),
        tx(": "),
        str('"Traceability System"'),
        tx(","),
      ],
      [tx("      "), pr('"coverage"'), tx(": "), num("100"), tx(",")],
      [tx("      "), pr('"tech"'), tx(": "), str('"IIoT + Redis + WS"')],
      [tx("    }")],
      [tx("  ]")],
      [tx("}")],
    ],
  },
];

export const TERMINAL_LINES: { c: string; t: string }[] = [
  { c: E.green, t: "# shubham@portfolio ~" },
  { c: E.lblue, t: "$ npm run dev" },
  { c: E.cyan, t: "  ▸ Next.js 15 ready on http://localhost:3000" },
  { c: E.green, t: "  ✓ TypeScript compiled — 0 errors" },
  { c: E.blue, t: "  ✓ MUI theme + dark mode loaded" },
  { c: E.str, t: "  ▸ WorkXpert: connected to IIoT pipeline" },
  { c: E.num, t: "  ▸ Kafka consumer: listening on factory.events" },
  { c: E.cyan, t: "  ✓ Ready — serving industrial SaaS dashboard" },
];

export const EXTRA_FILES = [{ name: "readme.md", color: "#f38ba8" }] as const;

// ─── Hero page data ───────────────────────────────────────────────────────────

export const ROTATING_TITLES = [
  "Full-Stack Developer",
  "Industrial SaaS Engineer",
  "AI & IoT Systems Builder",
  "Real-Time Systems Architect",
] as const;

export const HERO_TECH_BADGES = [
  "TypeScript",
  "React",
  "Next.js",
  "NestJS",
  "Kafka",
  "PostgreSQL",
  "Redis",
  "WebSockets",
  "Docker",
  "IIoT / Modbus",
] as const;

export const HERO_LINKS = [
  {
    label: "Get in touch",
    href: "mailto:shubhamtanpure8742@gmail.com",
    variant: "contained" as const,
  },
  {
    label: "GitHub",
    href: "https://github.com/Shubhamtanpure",
    variant: "outlined" as const,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shubham-tanpure-184a6720a",
    variant: "outlined" as const,
  },
] as const;
