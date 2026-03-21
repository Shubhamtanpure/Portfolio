"use client";
// components/sections/ExperienceSection/ExperienceClient.tsx

import React, { useRef, useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { useTheme, alpha } from "@mui/material/styles";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Float, Stars, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { ExperienceItem } from "@/data/experience";

// ─── 3D Scene ─────────────────────────────────────────────────────────────────

function OrbitalRings() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });
  return (
    <group ref={group}>
      <Float speed={1} floatIntensity={0.3}>
        <Torus args={[2.2, 0.04, 16, 120]}>
          <MeshWobbleMaterial
            color="#7C73FF"
            emissive="#3B35AA"
            emissiveIntensity={0.6}
            factor={0.1}
            speed={1}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>
        <Torus args={[1.6, 0.04, 16, 120]} rotation={[Math.PI / 3, 0, 0]}>
          <MeshWobbleMaterial
            color="#00D4B8"
            emissive="#008E7A"
            emissiveIntensity={0.6}
            factor={0.1}
            speed={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>
        <Torus args={[1.0, 0.04, 16, 120]} rotation={[Math.PI / 1.5, 0, 0]}>
          <MeshWobbleMaterial
            color="#F59E0B"
            emissive="#B45309"
            emissiveIntensity={0.5}
            factor={0.1}
            speed={2}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>
        {/* Central sphere */}
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#7C73FF"
            emissive="#3B35AA"
            emissiveIntensity={1}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </Float>
    </group>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  experience: ExperienceItem[];
  education: {
    degree: string;
    university: string;
    location: string;
    period: string;
  };
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExperienceClient({ experience, education }: Props) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const divider = theme.palette.divider;

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [activeProject, setActiveProject] = useState<string | null>(
    "Vision Systems – Automated Kit Inspection"
  );

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="experience"
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        bgcolor: isDark ? "#0A0A14" : "#F8F9FC",
        overflow: "hidden",
      }}
    >
      {/* BG accent */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${primary}, ${secondary}, transparent)`,
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
              02 — Experience
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
              Building systems that run{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                real factories
              </Box>
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", xl: "row" },
            gap: { xs: 6, xl: 8 },
            alignItems: "flex-start",
          }}
        >
          {/* LEFT: experience + education */}
          <Box sx={{ flex: "0 1 60%", minWidth: 0 }}>
            {experience.map((job, jobIdx) => (
              <motion.div
                key={job.id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={jobIdx + 1}
                variants={fadeUp}
              >
                {/* Role header */}
                <Box
                  sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: `1px solid ${divider}`,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "1.1rem",
                          color: "text.primary",
                        }}
                      >
                        {job.role}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: primary,
                          fontSize: "0.9rem",
                        }}
                      >
                        {job.company}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 0.5,
                      }}
                    >
                      <Chip
                        label={job.period}
                        size="small"
                        sx={{
                          bgcolor: alpha(primary, 0.1),
                          color: primary,
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
                      />
                      {job.current && (
                        <Chip
                          label="Current"
                          size="small"
                          sx={{
                            bgcolor: alpha(secondary, 0.1),
                            color: secondary,
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: "text.secondary",
                      lineHeight: 1.7,
                    }}
                  >
                    {job.summary}
                  </Typography>
                </Box>

                {/* Projects accordion */}
                <Box sx={{ pl: 2, borderLeft: `2px solid ${divider}`, mb: 4 }}>
                  {job.projects.map((proj, pi) => {
                    const isOpen = activeProject === proj.name;
                    return (
                      <Box key={proj.name} sx={{ mb: 2 }}>
                        <Box
                          onClick={() =>
                            setActiveProject(isOpen ? null : proj.name)
                          }
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: isOpen
                              ? alpha(primary, isDark ? 0.12 : 0.06)
                              : "background.paper",
                            border: `1px solid ${
                              isOpen ? alpha(primary, 0.4) : divider
                            }`,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: alpha(primary, 0.4),
                              bgcolor: alpha(primary, isDark ? 0.08 : 0.04),
                            },
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.88rem",
                              color: isOpen ? primary : "text.primary",
                            }}
                          >
                            {proj.name}
                          </Typography>
                          <Box
                            sx={{
                              fontSize: "0.9rem",
                              color: isOpen ? primary : "text.disabled",
                              transform: isOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.2s",
                            }}
                          >
                            ▾
                          </Box>
                        </Box>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              key="content"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <Box sx={{ pt: 2, pl: 1 }}>
                                {proj.bullets.map((b, bi) => (
                                  <Box
                                    key={bi}
                                    sx={{
                                      display: "flex",
                                      gap: 1.5,
                                      mb: 1.5,
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 5,
                                        height: 5,
                                        borderRadius: "50%",
                                        bgcolor: primary,
                                        mt: "7px",
                                        flexShrink: 0,
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: "0.85rem",
                                        color: "text.secondary",
                                        lineHeight: 1.65,
                                      }}
                                    >
                                      {b}
                                    </Typography>
                                  </Box>
                                ))}
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.75,
                                    mt: 2,
                                  }}
                                >
                                  {proj.tags.map((tag) => (
                                    <Chip
                                      key={tag}
                                      label={tag}
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        fontSize: "0.68rem",
                                        height: 22,
                                        borderColor: divider,
                                        color: "text.secondary",
                                        "&:hover": {
                                          borderColor: alpha(primary, 0.5),
                                          color: primary,
                                        },
                                      }}
                                    />
                                  ))}
                                </Box>
                              </Box>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Box>
                    );
                  })}
                </Box>
              </motion.div>
            ))}

            {/* Education card */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={4}
              variants={fadeUp}
            >
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: `1px solid ${divider}`,
                  background: isDark
                    ? `linear-gradient(135deg, ${alpha(
                        secondary,
                        0.06
                      )}, ${alpha(primary, 0.04)})`
                    : `linear-gradient(135deg, ${alpha(
                        secondary,
                        0.04
                      )}, ${alpha(primary, 0.03)})`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: secondary,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    mb: 1.5,
                  }}
                >
                  Education
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "text.primary",
                  }}
                >
                  {education.degree}
                </Typography>
                <Typography
                  sx={{
                    color: secondary,
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    mt: 0.5,
                  }}
                >
                  {education.university}, {education.location}
                </Typography>
                <Typography
                  sx={{ color: "text.disabled", fontSize: "0.8rem", mt: 0.5 }}
                >
                  {education.period}
                </Typography>
              </Box>
            </motion.div>
          </Box>

          {/* RIGHT: 3D orbital rings */}
          <Box
            sx={{
              flex: "0 1 40%",
              minWidth: 0,
              display: { xs: "none", xl: "block" },
              position: "sticky",
              top: 120,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box
                sx={{
                  height: 480,
                  borderRadius: 4,
                  overflow: "hidden",
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(0,0,0,0.02)",
                  border: `1px solid ${divider}`,
                }}
              >
                <Suspense fallback={null}>
                  {/* <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.2} />
                    <pointLight
                      position={[4, 4, 4]}
                      intensity={2}
                      color="#7C73FF"
                    />
                    <pointLight
                      position={[-4, -2, 2]}
                      intensity={1.5}
                      color="#00D4B8"
                    />
                    <Stars
                      radius={80}
                      depth={40}
                      count={600}
                      factor={3}
                      fade
                      speed={0.4}
                    />
                    <OrbitalRings />
                  </Canvas> */}
                </Suspense>
              </Box>

              {/* Labels under the 3D scene */}
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                {[
                  { label: "Full-Stack", color: primary },
                  { label: "Industrial AI", color: secondary },
                  { label: "IIoT", color: "#F59E0B" },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: item.color,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
