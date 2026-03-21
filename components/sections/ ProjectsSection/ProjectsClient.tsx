"use client";
// components/sections/ProjectsSection/ProjectsClient.tsx

import React, { useRef, useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { useTheme, alpha } from "@mui/material/styles";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Icosahedron,
  Float,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import type { Project } from "@/data/projects";

// ─── 3D Scene ─────────────────────────────────────────────────────────────────

function RotatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.z += delta * 0.35;
    }
  });
  return (
    <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.3}>
      <Icosahedron ref={ref} args={[1.4, 1]}>
        <MeshDistortMaterial
          color="#7C73FF"
          emissive="#2D29AA"
          emissiveIntensity={0.5}
          wireframe
          distort={0.15}
          speed={1.5}
        />
      </Icosahedron>
      <Icosahedron args={[1.0, 0]}>
        <MeshDistortMaterial
          color="#00D4B8"
          emissive="#008E7A"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          distort={0.2}
          speed={2}
        />
      </Icosahedron>
    </Float>
  );
}

// ─── Category filters ─────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "ai", label: "AI / CV" },
  { id: "saas", label: "SaaS" },
  { id: "iiot", label: "IIoT" },
  { id: "analytics", label: "Analytics" },
] as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  projects: Project[];
}

// ─── Card component ───────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const divider = theme.palette.divider;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 32, scale: 0.95 }
      }
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Box
        sx={{
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: `1px solid ${hovered ? alpha(primary, 0.4) : divider}`,
          transition: "border-color 0.25s, box-shadow 0.25s",
          boxShadow: hovered
            ? `0 16px 48px ${alpha(primary, isDark ? 0.18 : 0.1)}`
            : "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Gradient header */}
        <Box
          sx={{
            height: 140,
            background: project.gradient,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Animated overlay on hover */}
          <motion.div
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              inset: 0,
              background: project.gradient,
              filter: "blur(0px)",
            }}
          />
          {/* Category badge */}
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              px: 1.5,
              py: 0.5,
              borderRadius: "20px",
              bgcolor: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {project.category.toUpperCase()}
            </Typography>
          </Box>

          {/* Impact badge */}
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: 12,
              px: 1.5,
              py: 0.5,
              borderRadius: "20px",
              bgcolor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography
              sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#fff" }}
            >
              ✦ {project.impact}
            </Typography>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1rem",
              color: "text.primary",
              mb: 0.5,
            }}
          >
            {project.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.78rem",
              color: primary,
              fontWeight: 600,
              mb: 1.5,
            }}
          >
            {project.subtitle}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.82rem",
              color: "text.secondary",
              lineHeight: 1.65,
              mb: 2.5,
              flex: 1,
            }}
          >
            {project.description}
          </Typography>

          {/* Metrics row */}
          <Box sx={{ display: "flex", gap: 1, mb: 2.5, flexWrap: "wrap" }}>
            {project.metrics.map((m) => (
              <Box
                key={m.label}
                sx={{
                  flex: 1,
                  minWidth: 80,
                  p: 1,
                  borderRadius: 1.5,
                  bgcolor: alpha(primary, isDark ? 0.08 : 0.05),
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.88rem",
                    fontWeight: 800,
                    color: primary,
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    color: "text.disabled",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    mt: 0.3,
                  }}
                >
                  {m.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Tags */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {project.tags.slice(0, 4).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.65rem",
                  height: 20,
                  borderColor: divider,
                  color: "text.secondary",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ProjectsClient({ projects }: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const divider = theme.palette.divider;

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="projects"
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      {/* BG decoration */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: { xs: 200, md: 500 },
          height: { xs: 200, md: 500 },
          background: `radial-gradient(circle at bottom right, ${alpha(
            secondary,
            isDark ? 0.1 : 0.06
          )}, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{ position: "relative", zIndex: 1, px: { xs: 3, md: 5, lg: 6 } }}
      >
        {/* Heading + 3D canvas row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { md: "flex-end" },
            gap: 4,
            mb: { xs: 6, md: 8 },
          }}
        >
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
            variants={fadeUp}
          >
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
              03 — Projects
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
              Industrial platforms{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                shipped to production
              </Box>
            </Typography>
          </motion.div>

          {/* Mini 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              sx={{
                width: 140,
                height: 140,
                flexShrink: 0,
                display: { xs: "none", md: "block" },
              }}
            >
              <Suspense fallback={null}>
                {/* <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
                  <ambientLight intensity={0.3} />
                  <pointLight
                    position={[3, 3, 3]}
                    intensity={2}
                    color="#7C73FF"
                  />
                  <pointLight
                    position={[-3, -2, 1]}
                    intensity={1.5}
                    color="#00D4B8"
                  />
                  <RotatingIcosahedron />
                </Canvas> */}
              </Suspense>
            </Box>
          </motion.div>
        </Box>

        {/* Filter pills */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          variants={fadeUp}
        >
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 6 }}>
            {CATEGORIES.map((cat) => {
              const active = activeFilter === cat.id;
              return (
                <Button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  variant={active ? "contained" : "outlined"}
                  size="small"
                  sx={{
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    px: 2,
                    ...(active
                      ? {
                          bgcolor: primary,
                          color: "#fff",
                          boxShadow: `0 0 16px ${alpha(primary, 0.4)}`,
                        }
                      : {
                          borderColor: divider,
                          color: "text.secondary",
                          "&:hover": {
                            borderColor: primary,
                            color: primary,
                            bgcolor: alpha(primary, 0.06),
                          },
                        }),
                  }}
                >
                  {cat.label}
                </Button>
              );
            })}
          </Box>
        </motion.div>

        {/* Project grid */}
        <motion.div layout>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  inView={inView}
                />
              ))}
            </AnimatePresence>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
