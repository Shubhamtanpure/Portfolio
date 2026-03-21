"use client";
// components/ui/VSCodeEditor.tsx

import React, { useState, useEffect, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { E, type VSFile, type Token } from "@/data/hero";

export interface VSCodeEditorProps {
  files: VSFile[];
  terminalLines: { c: string; t: string }[];
  extraFiles?: { name: string; color: string }[];
}

const MONO = "'JetBrains Mono','Fira Code','Cascadia Code',monospace";
const TERM_TABS = ["TERMINAL", "PROBLEMS", "OUTPUT"] as const;
const TRAFFIC = ["#ff5f57", "#febc2e", "#28c840"] as const;
const ACT_WIDTHS = [100, 72, 52] as const;
const LINE_H = 22; // px — matches 12.5px font × 1.75 line-height
const EDITOR_H = 400; // code pane height
const TERMINAL_H = 120; // terminal output height

function useCursorBlink(ms = 530) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((p) => !p), ms);
    return () => clearInterval(id);
  }, [ms]);
  return on;
}

function MonoText({
  color,
  size = "12.5px",
  children,
  sx,
}: {
  color: string;
  size?: string;
  children: React.ReactNode;
  sx?: object;
}) {
  return (
    <Typography
      sx={{
        fontFamily: MONO,
        fontSize: size,
        color,
        lineHeight: 1.75,
        whiteSpace: "pre",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

function TitleBar({
  files,
  activeTab,
  onSwitch,
}: {
  files: VSFile[];
  activeTab: number;
  onSwitch: (i: number) => void;
}) {
  return (
    <Box
      sx={{
        bgcolor: E.panel,
        display: "flex",
        alignItems: "center",
        borderBottom: `1px solid ${E.border}`,
        height: 38,
        flexShrink: 0,
      }}
    >
      <Box sx={{ display: "flex", gap: "6px", px: 1.5, flexShrink: 0 }}>
        {TRAFFIC.map((c) => (
          <Box
            key={c}
            sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: c }}
          />
        ))}
      </Box>
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {files.map((f, i) => (
          <Box
            key={f.name}
            onClick={() => onSwitch(i)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              px: 1.8,
              height: 38,
              cursor: "pointer",
              bgcolor: i === activeTab ? E.bg : "transparent",
              borderRight: `1px solid ${E.border}`,
              borderBottom:
                i === activeTab
                  ? `2px solid ${E.blue}`
                  : "2px solid transparent",
              transition: "background 0.15s",
              "&:hover": { bgcolor: i === activeTab ? E.bg : "#2a2a2a" },
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: f.dot,
                flexShrink: 0,
              }}
            />
            <MonoText
              color={i === activeTab ? E.text : E.muted}
              size="12px"
              sx={{ whiteSpace: "nowrap" }}
            >
              {f.name}
            </MonoText>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ActivityBar() {
  return (
    <Box
      sx={{
        width: 44,
        bgcolor: "#333",
        borderRight: `1px solid ${E.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 1,
        gap: 2.5,
        flexShrink: 0,
      }}
    >
      {[true, false, false].map((active, i) => (
        <Box
          key={i}
          sx={{
            width: 22,
            height: 22,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "3px",
            opacity: active ? 1 : 0.35,
            cursor: "pointer",
          }}
        >
          {ACT_WIDTHS.map((w, j) => (
            <Box
              key={j}
              sx={{
                height: 2,
                width: `${w}%`,
                bgcolor: active ? E.text : E.muted,
                borderRadius: 1,
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

function Sidebar({
  files,
  extraFiles = [],
  activeTab,
  onSwitch,
}: {
  files: VSFile[];
  extraFiles?: { name: string; color: string }[];
  activeTab: number;
  onSwitch: (i: number) => void;
}) {
  return (
    <Box
      sx={{
        width: 158,
        bgcolor: E.bgAlt,
        borderRight: `1px solid ${E.border}`,
        py: 0.75,
        flexShrink: 0,
      }}
    >
      <MonoText
        color={E.muted}
        size="10px"
        sx={{
          display: "block",
          px: 1.5,
          pb: 0.75,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontWeight: 700,
        }}
      >
        Explorer
      </MonoText>
      <Box sx={{ px: 1.5, py: 0.4 }}>
        <MonoText color={E.text} size="12px">
          ▾ portfolio
        </MonoText>
      </Box>
      {files.map((f, i) => (
        <Box
          key={f.name}
          onClick={() => onSwitch(i)}
          sx={{
            pl: 3.5,
            pr: 1.5,
            py: 0.4,
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: "pointer",
            bgcolor: i === activeTab ? E.active : "transparent",
            "&:hover": { bgcolor: E.active },
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "2px",
              bgcolor: f.dot,
              flexShrink: 0,
            }}
          />
          <MonoText color={i === activeTab ? E.text : E.muted} size="12px">
            {f.name}
          </MonoText>
        </Box>
      ))}
      {extraFiles.map((f) => (
        <Box
          key={f.name}
          sx={{
            pl: 3.5,
            pr: 1.5,
            py: 0.4,
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: "pointer",
            "&:hover": { bgcolor: E.active },
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "2px",
              bgcolor: f.color,
              flexShrink: 0,
            }}
          />
          <MonoText color={E.muted} size="12px">
            {f.name}
          </MonoText>
        </Box>
      ))}
    </Box>
  );
}

function CodePane({ file, cursorOn }: { file: VSFile; cursorOn: boolean }) {
  const lastIdx = file.lines.length - 1;
  const scrollRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    if (scrollRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = scrollRef.current.scrollTop;
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    if (gutterRef.current) gutterRef.current.scrollTop = 0;
  }, [file.name]);

  return (
    <Box sx={{ flex: 1, display: "flex", minWidth: 0, overflow: "hidden" }}>
      {/* Gutter — mirrors scroll, no own scrollbar */}
      <Box
        ref={gutterRef}
        sx={{
          px: 1,
          pt: "14px",
          pb: "14px",
          color: E.dim,
          fontFamily: MONO,
          fontSize: "12.5px",
          lineHeight: `${LINE_H}px`,
          textAlign: "right",
          userSelect: "none",
          flexShrink: 0,
          minWidth: 38,
          bgcolor: E.bg,
          overflowY: "hidden",
          pointerEvents: "none",
        }}
      >
        {file.lines.map((_, i) => (
          <Box
            key={i}
            sx={{
              height: LINE_H,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {i + 1}
          </Box>
        ))}
      </Box>

      {/* Code — the ONLY scrolling element */}
      <Box
        ref={scrollRef}
        onScroll={onScroll}
        sx={{
          flex: 1,
          pt: "14px",
          pb: "14px",
          pr: 1,
          minWidth: 0,
          overflowY: "auto",
          overflowX: "auto",
          "&::-webkit-scrollbar": { width: "6px", height: "6px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "#555",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": { background: E.muted },
          scrollbarWidth: "thin",
          scrollbarColor: `#555 transparent`,
        }}
      >
        {file.lines.map((tokens: Token[], i) => {
          const isHl = file.hl.includes(i);
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                height: LINE_H,
                flexShrink: 0,
                pl: isHl ? "6px" : "8px",
                bgcolor: isHl ? "rgba(86,156,214,0.09)" : "transparent",
                borderLeft: isHl
                  ? `2px solid ${E.blue}`
                  : "2px solid transparent",
                ml: "-2px",
                whiteSpace: "nowrap",
              }}
            >
              {tokens.map((tok, j) => (
                <Box
                  key={j}
                  component="span"
                  sx={{
                    fontFamily: MONO,
                    fontSize: "12.5px",
                    color: tok.c,
                    whiteSpace: "pre",
                  }}
                >
                  {tok.t}
                </Box>
              ))}
              {i === lastIdx && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: "2px",
                    height: "14px",
                    bgcolor: E.text,
                    ml: "1px",
                    verticalAlign: "middle",
                    opacity: cursorOn ? 1 : 0,
                    transition: "opacity 0.05s",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function TerminalPanel({
  lines,
  cursorOn,
}: {
  lines: { c: string; t: string }[];
  cursorOn: boolean;
}) {
  const lastIdx = lines.length - 1;
  return (
    <Box
      sx={{
        borderTop: `1px solid ${E.border}`,
        bgcolor: E.bgDark,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: E.bg,
          borderBottom: `1px solid ${E.border}`,
          px: 1.5,
        }}
      >
        {TERM_TABS.map((label, i) => (
          <Box
            key={label}
            sx={{
              px: 1.8,
              py: 0.7,
              fontFamily: MONO,
              fontSize: "11.5px",
              color: i === 0 ? E.text : E.muted,
              cursor: "pointer",
              borderBottom:
                i === 0 ? `2px solid ${E.blue}` : "2px solid transparent",
            }}
          >
            {label}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          p: "10px 14px",
          height: TERMINAL_H,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": {
            background: "#555",
            borderRadius: "2px",
          },
          scrollbarWidth: "thin",
          scrollbarColor: `#555 transparent`,
        }}
      >
        {lines.map((line, i) => (
          <Box
            key={i}
            sx={{
              fontFamily: MONO,
              fontSize: "12px",
              color: line.c,
              lineHeight: 1.65,
              whiteSpace: "pre",
              display: "flex",
              alignItems: "center",
            }}
          >
            {line.t}
            {i === lastIdx && (
              <Box
                component="span"
                sx={{
                  ml: "2px",
                  opacity: cursorOn ? 1 : 0,
                  color: E.cyan,
                  transition: "opacity 0.05s",
                }}
              >
                ▌
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function StatusBar({ lang, lineCount }: { lang: string; lineCount: number }) {
  return (
    <Box
      sx={{
        bgcolor: E.accent,
        display: "flex",
        alignItems: "center",
        px: 1.5,
        height: 22,
        gap: 2,
        flexShrink: 0,
      }}
    >
      {["⎇ main", "0 errors"].map((label) => (
        <Typography
          key={label}
          sx={{
            fontFamily: MONO,
            fontSize: "11px",
            color: "rgba(255,255,255,0.92)",
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>
      ))}
      <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
        {[lang, "UTF-8", "Prettier", `Ln ${lineCount}`].map((label) => (
          <Typography
            key={label}
            sx={{
              fontFamily: MONO,
              fontSize: "11px",
              color: "rgba(255,255,255,0.92)",
              fontWeight: 700,
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default function VSCodeEditor({
  files,
  terminalLines,
  extraFiles = [],
}: VSCodeEditorProps) {
  const [activeTab, setActiveTab] = useState(0);
  const cursorOn = useCursorBlink();
  const switchTab = useCallback((i: number) => setActiveTab(i), []);
  const file = files[activeTab];

  return (
    // width: 100% fills the 52% flex column exactly — no fixed px width
    <Box
      sx={{
        bgcolor: E.bg,
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${E.border}`,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: MONO,
        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.35)",
      }}
    >
      <TitleBar files={files} activeTab={activeTab} onSwitch={switchTab} />
      <Box sx={{ display: "flex", height: EDITOR_H }}>
        <ActivityBar />
        <Sidebar
          files={files}
          extraFiles={extraFiles}
          activeTab={activeTab}
          onSwitch={switchTab}
        />
        <CodePane file={file} cursorOn={cursorOn} />
      </Box>
      <TerminalPanel lines={terminalLines} cursorOn={cursorOn} />
      <StatusBar lang={file.lang} lineCount={file.lines.length} />
    </Box>
  );
}
