/* eslint-disable react-hooks/purity */
"use client";
// components/sections/AboutSection/AboutClient.tsx

import React, { useRef, useMemo, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme, alpha } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { ABOUT_CARDS, TIMELINE } from "@/data/about";

// ─── Color constants (match your MUI palette) ────────────────────────────────

const COL = {
  primary: 0x7c73ff,
  secondary: 0x00d4b8,
  amber: 0xf59e0b,
  red: 0xef4444,
  primaryHex: "#7C73FF",
  secondaryHex: "#00D4B8",
} as const;

// ─── IIoT Network nodes config ───────────────────────────────────────────────
// 6 nodes representing real components in Shubham's stack, arranged in a hex

const NODES = [
  { label: "PLC", color: COL.primary, colorHex: "#7C73FF" },
  { label: "HMI", color: COL.secondary, colorHex: "#00D4B8" },
  { label: "Kafka", color: COL.primary, colorHex: "#7C73FF" },
  { label: "Redis", color: COL.secondary, colorHex: "#00D4B8" },
  { label: "Vision AI", color: COL.amber, colorHex: "#F59E0B" },
  { label: "Dashboard", color: COL.red, colorHex: "#EF4444" },
] as const;

// Connections between node indices [from, to]
const CONNECTIONS = [
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Central IIoT hub — icosahedron with wireframe overlay + orbital ring */
function CoreHub() {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.15;
      // Pulse scale
      const pulse = 1 + Math.sin(Date.now() * 0.002) * 0.04;
      groupRef.current.scale.setScalar(pulse);
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Solid core */}
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={COL.primary}
          emissive={0x3b35aa}
          emissiveIntensity={0.6}
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshBasicMaterial
          color={COL.primary}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Orbital ring */}
      <mesh ref={orbitRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.82, 0.022, 16, 128]} />
        <meshStandardMaterial
          color={COL.secondary}
          emissive={COL.secondary}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

/** Single node: floating ring + inner sphere */
function NetworkNode({
  position,
  color,
  index,
}: {
  position: [number, number, number];
  color: number;
  index: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const baseY = position[1];

  useFrame(() => {
    const t = Date.now() * 0.001;
    const floatY = baseY + Math.sin(t * 1.2 + index) * 0.12;
    if (ringRef.current) {
      ringRef.current.position.y = floatY;
      ringRef.current.rotation.z = t * 0.8 + index;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = floatY;
    }
  });

  return (
    <group>
      <mesh ref={ringRef} position={position}>
        <torusGeometry args={[0.22, 0.025, 16, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={sphereRef} position={position}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

/** Animated pulse packet: travels from node A to node B */
function PulsePacket({
  from,
  to,
  color,
  initialT,
  speed,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: number;
  initialT: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const tRef = useRef(initialT);
  const dirRef = useRef(1);

  useFrame((_, delta) => {
    tRef.current += speed * delta * 60 * dirRef.current;
    if (tRef.current > 1) {
      tRef.current = 0;
      dirRef.current = Math.random() > 0.4 ? 1 : -1;
    }
    if (tRef.current < 0) {
      tRef.current = 1;
      dirRef.current = Math.random() > 0.4 ? 1 : -1;
    }

    if (ref.current) {
      const t = tRef.current;
      ref.current.position.x = from[0] + (to[0] - from[0]) * t;
      ref.current.position.y =
        from[1] + (to[1] - from[1]) * t + Math.sin(Date.now() * 0.002) * 0.1;
      ref.current.position.z = from[2] + (to[2] - from[2]) * t;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}

/** Connection line between two node positions */
function ConnectionLine({
  from,
  to,
  index,
}: {
  from: [number, number, number];
  to: [number, number, number];
  index: number;
}) {
  const matRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame(() => {
    if (matRef.current) {
      matRef.current.opacity =
        0.15 + Math.sin(Date.now() * 0.0015 + index) * 0.15;
    }
  });

  const points = useMemo(
    () => [new THREE.Vector3(...from), new THREE.Vector3(...to)],
    [from, to]
  );
  const geo = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );
  return (
    <line>
      <bufferGeometry attach="geometry" {...geo} />
      <lineBasicMaterial
        ref={matRef}
        attach="material"
        color={COL.primary}
        transparent
        opacity={0.2}
      />
    </line>
  );
}

/** Background particle dust */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={COL.primaryHex}
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.45}
      />
    </Points>
  );
}

/** Full rotating network scene */
function IIoTNetworkScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Compute node positions in a hex ring
  const nodePositions = useMemo<[number, number, number][]>(
    () =>
      NODES.map((_, i) => {
        const angle = (i / NODES.length) * Math.PI * 2;
        const r = 2.2;
        return [
          Math.cos(angle) * r,
          Math.sin(angle) * r * 0.55, // flatten vertically
          Math.sin(angle) * r * 0.35, // slight z depth
        ];
      }),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.08;
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 3, 3]} intensity={3} color={COL.primaryHex} />
      <pointLight
        position={[-3, -2, 2]}
        intensity={2}
        color={COL.secondaryHex}
      />
      <pointLight position={[0, -3, -2]} intensity={1} color="#F59E0B" />

      <Particles />

      <group ref={groupRef}>
        {/* Connection lines */}
        {CONNECTIONS.map(([a, b], i) => (
          <ConnectionLine
            key={i}
            from={nodePositions[a]}
            to={nodePositions[b]}
            index={i}
          />
        ))}

        {/* Pulse packets traveling connections */}
        {CONNECTIONS.map(([a, b], i) => (
          <PulsePacket
            key={i}
            from={nodePositions[a]}
            to={nodePositions[b]}
            color={i % 2 === 0 ? COL.primary : COL.secondary}
            initialT={Math.random()}
            speed={0.004 + Math.random() * 0.003}
          />
        ))}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <NetworkNode
            key={i}
            position={nodePositions[i]}
            color={node.color}
            index={i}
          />
        ))}

        {/* Central hub */}
        <CoreHub />
      </group>
    </>
  );
}

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
  }),
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
} as const;

// ─── Main component ───────────────────────────────────────────────────────────

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
      {/* Background radial */}
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

        {/* Two-column layout */}
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
                I&apos;m a full-stack developer based in Pune, India,
                specialising in industrial SaaS platforms that bridge{" "}
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
                handle the throughput demands of industrial environments.
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

          {/* RIGHT: 3D canvas + legend + about cards */}
          <Box sx={{ flex: "0 1 50%", minWidth: 0 }}>
            {/* ── 3D IIoT Network Canvas ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box
                sx={{
                  height: 300,
                  borderRadius: 3,
                  overflow: "hidden",
                  mb: 2,
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.015)"
                    : "rgba(0,0,0,0.02)",
                  border: `1px solid ${divider}`,
                  position: "relative",
                }}
              >
                <Suspense
                  fallback={
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "0.75rem", color: "text.disabled" }}
                      >
                        Loading scene…
                      </Typography>
                    </Box>
                  }
                >
                  <Canvas camera={{ position: [0, 0, 6.5], fov: 50 }}>
                    <IIoTNetworkScene />
                  </Canvas>
                </Suspense>
              </Box>

              {/* Node legend below canvas */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  mb: 3,
                  px: 0.5,
                }}
              >
                {NODES.map((node) => (
                  <Box
                    key={node.label}
                    sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: node.colorHex,
                        flexShrink: 0,
                        boxShadow: `0 0 6px ${node.colorHex}`,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      {node.label}
                    </Typography>
                  </Box>
                ))}
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
