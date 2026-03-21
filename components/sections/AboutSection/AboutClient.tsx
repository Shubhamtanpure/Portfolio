"use client";
// components/sections/AboutSection/AboutClient.tsx

import React, { useRef, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme, alpha } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  TorusKnot,
  Float,
  MeshDistortMaterial,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";

// ─── 3D Scene ─────────────────────────────────────────────────────────────────

function RotatingKnot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3;
      ref.current.rotation.y += delta * 0.5;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <TorusKnot ref={ref} args={[1, 0.32, 200, 20]}>
        <MeshDistortMaterial
          color="#7C73FF"
          emissive="#3B35AA"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.1}
          distort={0.3}
          speed={2}
        />
      </TorusKnot>
    </Float>
  );
}

function AboutScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#7C73FF" />
      <pointLight position={[-5, -3, 2]} intensity={1} color="#00D4B8" />
      <Stars radius={60} depth={30} count={800} factor={3} fade speed={0.5} />
      <RotatingKnot />
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ABOUT_CARDS = [
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

const TIMELINE = [
  { year: "2019", label: "Started B.E. Computer Science at SPPU" },
  { year: "2023", label: "Graduated with honours" },
  { year: "Dec 2024", label: "Joined Elansol Technologies as Jr. Developer" },
  { year: "2025", label: "Shipping 3+ live industrial SaaS platforms" },
];

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutClient() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const divider = theme.palette.divider;

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="about"
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      {/* Subtle background */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: isDark
            ? "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,115,255,0.06), transparent)"
            : "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,115,255,0.04), transparent)",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{ position: "relative", zIndex: 1, px: { xs: 3, md: 5, lg: 6 } }}
      >
        {/* Section heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
        >
          <Box sx={{ mb: { xs: 6, md: 10 } }}>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: primary,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              01 — About
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.8rem" },
                letterSpacing: "-0.02em",
                color: "text.primary",
                lineHeight: 1.1,
              }}
            >
              Engineer at the intersection of{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                software & industry
              </Box>
            </Typography>
          </Box>
        </motion.div>

        {/* Main two-column layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 8, lg: 10 },
            alignItems: "flex-start",
          }}
        >
          {/* LEFT: bio + timeline */}
          <Box sx={{ flex: "0 1 50%", minWidth: 0 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              variants={fadeUp}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.9,
                  color: "text.secondary",
                  mb: 4,
                }}
              >
                I'm a full-stack developer based in Pune, India, specialising in
                industrial SaaS platforms that bridge{" "}
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  AI, IoT, and Computer Vision
                </Box>{" "}
                with enterprise-grade software. At Elansol Technologies, I build
                systems that run on real factory floors — from EV inspection
                lines to IIoT production monitoring.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.9,
                  color: "text.secondary",
                  mb: 6,
                }}
              >
                My focus is on{" "}
                <Box
                  component="span"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  real-time, event-driven architectures
                </Box>{" "}
                — Kafka pipelines, WebSocket streams, and microservices that
                handle the throughput demands of industrial environments. I
                believe in clean separation of concerns, type-safe APIs, and
                software that performs under production pressure.
              </Typography>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
              variants={fadeUp}
            >
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: primary,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  mb: 3,
                }}
              >
                Timeline
              </Typography>
              <Box sx={{ position: "relative", pl: 3 }}>
                {/* Vertical line */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 8,
                    bottom: 8,
                    width: "1px",
                    bgcolor: divider,
                  }}
                />
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={i + 3}
                    variants={fadeUp}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        mb: 3,
                        position: "relative",
                      }}
                    >
                      {/* Dot */}
                      <Box
                        sx={{
                          position: "absolute",
                          left: -3 - 12,
                          top: 6,
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor:
                            i === TIMELINE.length - 1
                              ? primary
                              : "background.paper",
                          border: `2px solid ${
                            i === TIMELINE.length - 1 ? primary : divider
                          }`,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color:
                              i === TIMELINE.length - 1
                                ? primary
                                : "text.disabled",
                            letterSpacing: "0.05em",
                            mb: 0.3,
                          }}
                        >
                          {item.year}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>

          {/* RIGHT: 3D canvas + cards */}
          <Box sx={{ flex: "0 1 50%", minWidth: 0 }}>
            {/* Three.js canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box
                sx={{
                  height: 280,
                  borderRadius: 3,
                  overflow: "hidden",
                  mb: 4,
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(0,0,0,0.02)",
                  border: `1px solid ${divider}`,
                }}
              >
                <Suspense fallback={null}>
                  <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                    {/* <AboutScene /> */}
                  </Canvas>
                </Suspense>
              </Box>
            </motion.div>

            {/* About cards */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              {ABOUT_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={i}
                  variants={scaleIn}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2.5,
                      bgcolor: "background.paper",
                      border: `1px solid ${divider}`,
                      height: "100%",
                      cursor: "default",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        borderColor: alpha(card.color, 0.5),
                        boxShadow: `0 8px 30px ${alpha(
                          card.color,
                          isDark ? 0.15 : 0.08
                        )}`,
                      },
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: card.color,
                        opacity: 0,
                        transition: "opacity 0.2s",
                      },
                      "&:hover::before": { opacity: 1 },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "1.4rem", mb: 1, lineHeight: 1 }}
                    >
                      {card.icon}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.78rem",
                        color: "text.secondary",
                        lineHeight: 1.6,
                      }}
                    >
                      {card.body}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
