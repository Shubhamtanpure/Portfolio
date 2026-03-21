"use client";
// components/sections/ImpactSection/ImpactClient.tsx

import React, { useRef, useEffect, useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useTheme, alpha } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { ImpactMetric, SystemCapability } from "@/data/impact";

// ─── 3D Particle tunnel ───────────────────────────────────────────────────────

function ParticleTunnel() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 2.5;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(theta) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.08;
      // Slowly drift particles towards viewer
      const pos = ref.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 2] += delta * 0.8;
        if (pos[i * 3 + 2] > 6) pos[i * 3 + 2] = -6;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#7C73FF"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix,
  color,
  inView,
}: {
  target: number;
  suffix: string;
  color: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const raf = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, [inView, target]);

  return (
    <Box
      component="span"
      sx={{
        color,
        fontWeight: 900,
        fontSize: "inherit",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {count}
      {suffix}
    </Box>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  metrics: ImpactMetric[];
  capabilities: SystemCapability[];
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImpactClient({ metrics, capabilities }: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const divider = theme.palette.divider;

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-60px" });

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="impact"
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      {/* 3D particle tunnel background */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: isDark ? 0.5 : 0.25,
        }}
      >
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
            <ParticleTunnel />
          </Canvas>
        </Suspense>
      </Box>

      {/* Gradient overlays so content is readable */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: isDark
            ? "linear-gradient(to bottom, rgba(10,10,20,0.7) 0%, rgba(10,10,20,0.4) 50%, rgba(10,10,20,0.7) 100%)"
            : "linear-gradient(to bottom, rgba(248,249,252,0.85) 0%, rgba(248,249,252,0.6) 50%, rgba(248,249,252,0.85) 100%)",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{ position: "relative", zIndex: 2, px: { xs: 3, md: 5, lg: 6 } }}
      >
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          variants={fadeUp}
        >
          <Box sx={{ mb: { xs: 8, md: 12 }, textAlign: "center" }}>
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
              05 — Impact
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "3rem" },
                letterSpacing: "-0.02em",
                color: "text.primary",
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Numbers that matter{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                in production
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                color: "text.secondary",
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Real metrics from real factory floors — systems that reduce
              errors, increase throughput, and run 24/7.
            </Typography>
          </Box>
        </motion.div>

        {/* Metrics grid */}
        <Box
          ref={metricsRef}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 2, md: 3 },
            mb: { xs: 8, md: 12 },
          }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              variants={scaleIn}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 3,
                  bgcolor: isDark ? alpha(m.color, 0.06) : alpha(m.color, 0.04),
                  border: `1px solid ${alpha(m.color, isDark ? 0.2 : 0.15)}`,
                  textAlign: "center",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: m.color,
                  },
                }}
              >
                {/* Glow */}
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    bgcolor: alpha(m.color, 0.06),
                    filter: "blur(20px)",
                    pointerEvents: "none",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: { xs: "2.2rem", md: "3rem" },
                    fontWeight: 900,
                    lineHeight: 1,
                    mb: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  <AnimatedCounter
                    target={parseInt(m.value)}
                    suffix={m.suffix || ""}
                    color={m.color}
                    inView={metricsInView}
                  />
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.82rem", md: "0.9rem" },
                    fontWeight: 700,
                    color: "text.primary",
                    mb: 0.5,
                    lineHeight: 1.3,
                  }}
                >
                  {m.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    color: "text.disabled",
                    lineHeight: 1.4,
                  }}
                >
                  {m.sublabel}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* System capabilities */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={7}
          variants={fadeUp}
        >
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: primary,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              mb: 4,
              textAlign: "center",
            }}
          >
            Core Capabilities
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i + 8}
              variants={fadeUp}
              whileHover={{ y: -4 }}
            >
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: `1px solid ${divider}`,
                  backdropFilter: "blur(10px)",
                  height: "100%",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    borderColor: alpha(primary, 0.4),
                    boxShadow: `0 8px 32px ${alpha(
                      primary,
                      isDark ? 0.12 : 0.07
                    )}`,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: alpha(primary, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                      flexShrink: 0,
                    }}
                  >
                    {cap.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "text.primary",
                        mb: 0.75,
                      }}
                    >
                      {cap.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.83rem",
                        color: "text.secondary",
                        lineHeight: 1.65,
                        mb: 1.5,
                      }}
                    >
                      {cap.description}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                      {cap.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            fontSize: "0.68rem",
                            height: 22,
                            bgcolor: alpha(primary, 0.08),
                            color: primary,
                            fontWeight: 600,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
