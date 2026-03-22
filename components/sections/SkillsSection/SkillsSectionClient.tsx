"use client";
// components/sections/SkillsSection/SkillsClient.tsx

import React, { useRef, useMemo, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useTheme, alpha } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  Float,
  Stars,
  Ring,
} from "@react-three/drei";
import * as THREE from "three";
import type { SkillGroup } from "@/data/skills";

// ─── 3D Scene ─────────────────────────────────────────────────────────────────

function SkillSphere() {
  const groupRef = useRef<THREE.Group>(null);

  // Satellite spheres orbiting the central sphere
  const satellites = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.2;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 0.5) * 0.8,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: [
          "#7C73FF",
          "#00D4B8",
          "#F59E0B",
          "#EF4444",
          "#10B981",
          "#8B5CF6",
          "#3B82F6",
          "#EC4899",
        ][i],
        scale: 0.12 + Math.random() * 0.1,
      };
    });
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <Float speed={1.5} floatIntensity={0.3}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#7C73FF"
            emissive="#3B35AA"
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.15}
            distort={0.25}
            speed={2}
          />
        </Sphere>
      </Float>

      {/* Orbital ring */}
      <Ring args={[1.9, 2.0, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#7C73FF" opacity={0.3} transparent />
      </Ring>
      <Ring args={[2.4, 2.5, 64]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <meshBasicMaterial color="#00D4B8" opacity={0.2} transparent />
      </Ring>

      {/* Satellite spheres */}
      {satellites.map((sat, i) => (
        <mesh key={i} position={sat.position}>
          <sphereGeometry args={[sat.scale, 16, 16]} />
          <meshStandardMaterial
            color={sat.color}
            emissive={sat.color}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  skillGroups: SkillGroup[];
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeIn" as const },
  }),
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function SkillsClient({ skillGroups }: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const divider = theme.palette.divider;

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="skills"
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        bgcolor: isDark ? "#0A0A14" : "#F8F9FC",
        overflow: "hidden",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${secondary}, ${primary}, transparent)`,
          opacity: 0.4,
        }}
      />

      <Container
        maxWidth="xl"
        sx={{ position: "relative", zIndex: 1, px: { xs: 3, md: 5, lg: 6 } }}
      >
        {/* Heading */}
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
              04 — Skills
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
              Full-stack from{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                browser to factory floor
              </Box>
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 6, lg: 10 },
            alignItems: "flex-start",
          }}
        >
          {/* LEFT: 3D sphere */}
          <Box
            sx={{
              flex: "0 1 40%",
              minWidth: 0,
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              alignItems: "center",
              position: "sticky",
              top: 100,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%" }}
            >
              <Box
                sx={{
                  height: 420,
                  borderRadius: 4,
                  overflow: "hidden",
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(0,0,0,0.02)",
                  border: `1px solid ${divider}`,
                }}
              >
                <Suspense fallback={null}>
                  {/* <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
                    <ambientLight intensity={0.25} />
                    <pointLight
                      position={[5, 5, 5]}
                      intensity={2.5}
                      color="#7C73FF"
                    />
                    <pointLight
                      position={[-4, -3, 2]}
                      intensity={1.5}
                      color="#00D4B8"
                    />
                    <Stars
                      radius={60}
                      depth={30}
                      count={500}
                      factor={2.5}
                      fade
                      speed={0.4}
                    />
                    <SkillSphere />
                  </Canvas> */}
                </Suspense>
              </Box>

              {/* Legend */}
              <Box
                sx={{
                  mt: 3,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 1,
                }}
              >
                {/* {skillGroups.slice(0, 4).map((g) => (
                  <Box
                    key={g.category}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: g.color,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.6rem",
                        color: "text.disabled",
                        textAlign: "center",
                        lineHeight: 1.2,
                      }}
                    >
                      {g.category.split(" ")[0]}
                    </Typography>
                  </Box>
                ))} */}
              </Box>
            </motion.div>
          </Box>

          {/* RIGHT: skill group cards */}
          <Box sx={{ flex: "0 1 60%", minWidth: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {skillGroups.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ x: 4 }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2.5,
                      bgcolor: "background.paper",
                      border: `1px solid ${divider}`,
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        borderColor: alpha(group.color, 0.5),
                        boxShadow: `inset 3px 0 0 ${
                          group.color
                        }, 0 4px 20px ${alpha(
                          group.color,
                          isDark ? 0.12 : 0.07
                        )}`,
                      },
                      position: "relative",
                      overflow: "hidden",
                      // Left accent bar
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "3px",
                        background: group.color,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1.5,
                        pl: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: "1.1rem" }}>
                        {group.icon}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.88rem",
                          color: "text.primary",
                        }}
                      >
                        {group.category}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.75,
                        pl: 1,
                      }}
                    >
                      {group.items.map((item, j) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            delay: i * 0.06 + j * 0.04,
                            duration: 0.35,
                          }}
                        >
                          <Chip
                            label={item}
                            size="small"
                            sx={{
                              fontSize: "0.72rem",
                              height: 26,
                              bgcolor: alpha(group.color, isDark ? 0.12 : 0.07),
                              color: group.color,
                              border: `1px solid ${alpha(group.color, 0.25)}`,
                              fontWeight: 600,
                              "&:hover": { bgcolor: alpha(group.color, 0.2) },
                            }}
                          />
                        </motion.div>
                      ))}
                    </Box>
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
