// components/sections/HeroSection/HeroSection.tsx
// SERVER COMPONENT — no "use client".

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/material/Typography";
import HeroClient from "./HeroClient";
import { TECH } from "@/data/skills";

const GRID_COLOR = "rgba(124,115,255,0.05)";
const GLOW_PRIMARY = "rgba(124,115,255,0.16)";
const GLOW_SECONDARY = "rgba(0,212,184,0.10)";

export default function HeroSection() {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(${GRID_COLOR} 1px, transparent 1px),
            linear-gradient(90deg, ${GRID_COLOR} 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* Top-right glow */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 0,
          pointerEvents: "none",
          width: { xs: 300, md: 600 },
          height: { xs: 300, md: 600 },
          background: `radial-gradient(circle at top right, ${GLOW_PRIMARY}, transparent 65%)`,
        }}
      />

      {/* Bottom-left glow */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
          width: { xs: 200, md: 400 },
          height: { xs: 200, md: 400 },
          background: `radial-gradient(circle at bottom left, ${GLOW_SECONDARY}, transparent 65%)`,
        }}
      />

      {/* Main content */}
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          // Vertical padding: top/bottom breathing room on mobile, vertically centered on desktop
          py: { xs: 10, md: 0 },
          // Tighter horizontal padding — default MUI xl container has 24px/48px
          // Reducing it gives more room to both columns on large screens
          px: { xs: 3, sm: 4, md: 5, lg: 5, xl: 6 },
        }}
      >
        <HeroClient techBadges={TECH} />
      </Container>

      {/* Scroll hint */}
      <Box
        sx={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          "@keyframes bob": {
            "0%,100%": { transform: "translateX(-50%) translateY(0)" },
            "50%": { transform: "translateX(-50%) translateY(6px)" },
          },
          animation: "bob 2s ease-in-out infinite",
          opacity: 0.4,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.62rem",
            color: "text.disabled",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "text.disabled" }} />
      </Box>
    </Box>
  );
}
