"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useTheme, alpha } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VSCodeEditor from "@/components/ui/VSCodeEditor";
import {
  VS_FILES,
  TERMINAL_LINES,
  EXTRA_FILES,
  ROTATING_TITLES,
  HERO_LINKS,
} from "@/data/hero";

export interface HeroClientProps {
  techBadges: string[];
}

function useRotatingTitle(titles: readonly string[], interval = 2800) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % titles.length);
        setVisible(true);
      }, 350);
    }, interval);
    return () => clearInterval(id);
  }, [titles.length, interval]);

  return { title: titles[index], visible };
}

export default function HeroClient({ techBadges }: HeroClientProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const divider = theme.palette.divider;

  const { title, visible } = useRotatingTitle(ROTATING_TITLES);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "stretch", lg: "center" },
        // Tighter gap so both columns get max width
        gap: { xs: 6, lg: 3 },
        width: "100%",
      }}
    >
      {/* ══ LEFT — 48% ══ */}
      <Box
        sx={{
          flex: "0 1 58%",
          //   minWidth: 0,
          // On mobile: full width
          width: { xs: "100%" },
        }}
      >
        {/* Status pill */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.6,
            mb: 3.5,
            borderRadius: "20px",
            border: `1px solid ${alpha(secondary, 0.35)}`,
            bgcolor: alpha(secondary, isDark ? 0.08 : 0.06),
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: secondary,
              "@keyframes ping": {
                "0%": { boxShadow: `0 0 0 0 ${alpha(secondary, 0.5)}` },
                "70%": { boxShadow: `0 0 0 7px ${alpha(secondary, 0)}` },
                "100%": { boxShadow: `0 0 0 0 ${alpha(secondary, 0)}` },
              },
              animation: "ping 1.8s ease-in-out infinite",
            }}
          />
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: secondary,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Open to opportunities · Pune, India
          </Typography>
        </Box>

        {/* Name — slightly smaller to fit the narrower left column */}
        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: {
              xs: "2.6rem",
              sm: "3.4rem",
              md: "4rem",
              lg: "4.2rem",
              xl: "4.8rem",
            },
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "text.primary",
            mb: 1.5,
          }}
        >
          Shubham
          <Box
            component="span"
            sx={{
              display: "block",
              background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tanpure
          </Box>
        </Typography>

        {/* Rotating role */}
        <Box sx={{ height: 34, mb: 2.5, overflow: "hidden" }}>
          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              fontWeight: 500,
              color: "text.secondary",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-8px)",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box component="span" sx={{ color: primary, fontWeight: 700 }}>
              {"//"}
            </Box>
            {title}
          </Typography>
        </Box>

        {/* Bio */}
        <Typography
          sx={{
            fontSize: { xs: "0.88rem", md: "0.9rem" },
            lineHeight: 1.8,
            color: "text.secondary",
            mb: 3.5,
          }}
        >
          Building industrial-grade SaaS platforms that bridge{" "}
          <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
            AI vision systems
          </Box>
          ,{" "}
          <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
            IIoT pipelines
          </Box>
          , and{" "}
          <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
            enterprise software
          </Box>
          . Turning raw factory data into real-time intelligence — from PLC
          machines to production dashboards.
        </Typography>

        {/* CTAs */}
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            href={HERO_LINKS[0].href}
            startIcon={<EmailOutlinedIcon />}
            sx={{
              boxShadow: `0 0 24px ${alpha(primary, 0.35)}`,
              "&:hover": {
                boxShadow: `0 0 36px ${alpha(primary, 0.55)}`,
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            {HERO_LINKS[0].label}
          </Button>
          <Button
            variant="outlined"
            href={HERO_LINKS[1].href}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
            sx={{
              borderColor: divider,
              color: "text.secondary",
              "&:hover": {
                borderColor: primary,
                color: primary,
                bgcolor: alpha(primary, 0.06),
              },
            }}
          >
            {HERO_LINKS[1].label}
          </Button>
          <Button
            variant="outlined"
            href={HERO_LINKS[2].href}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<LinkedInIcon />}
            sx={{
              borderColor: divider,
              color: "text.secondary",
              "&:hover": {
                borderColor: primary,
                color: primary,
                bgcolor: alpha(primary, 0.06),
              },
            }}
          >
            {HERO_LINKS[2].label}
          </Button>
        </Box>

        {/* Tech badges */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.85 }}>
          {techBadges.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              variant="outlined"
              sx={{
                borderColor: divider,
                color: "text.secondary",
                fontSize: "0.68rem",
                height: 24,
                "&:hover": {
                  borderColor: alpha(primary, 0.5),
                  color: primary,
                  bgcolor: alpha(primary, 0.06),
                },
                transition: "all 0.18s ease",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ══ RIGHT — 52%, desktop only ══ */}
      <Box
        sx={{
          flex: "0 1 42%",
          //   minWidth: 0,
          display: { xs: "none", lg: "flex" },
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <VSCodeEditor
          files={VS_FILES}
          terminalLines={TERMINAL_LINES}
          extraFiles={
            EXTRA_FILES as unknown as { name: string; color: string }[]
          }
        />
      </Box>
    </Box>
  );
}
