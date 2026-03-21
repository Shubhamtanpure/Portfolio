// ─── Token type ───────────────────────────────────────────────────────────────

export interface Token {
  c: string;
  t: string;
}

export type CodeLine = Token[];

export interface VSFile {
  name: string;
  dot: string;
  lang: string;
  lines: CodeLine[];
  hl: number[]; // 0-indexed highlighted lines
}
