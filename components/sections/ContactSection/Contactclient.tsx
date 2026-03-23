/* eslint-disable react-hooks/purity */
"use client";
// components/sections/ContactSection/ContactClient.tsx

import React, { useRef, useState, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme, alpha } from "@mui/material/styles";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SendIcon from "@mui/icons-material/Send";

// ─── Config ───────────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: <EmailOutlinedIcon fontSize="small" />,
    label: "Email",
    value: "shubhamtanpure8742@gmail.com",
    href: "mailto:shubhamtanpure8742@gmail.com",
    color: "#7C73FF",
  },
  {
    icon: <WhatsAppIcon fontSize="small" />,
    label: "WhatsApp",
    value: "+91 73875 43632",
    href: "https://wa.me/917387543632",
    color: "#25D366",
  },
  {
    icon: <GitHubIcon fontSize="small" />,
    label: "GitHub",
    value: "github.com/Shubhamtanpure",
    href: "https://github.com/Shubhamtanpure",
    color: "#7C73FF",
  },
  {
    icon: <LinkedInIcon fontSize="small" />,
    label: "LinkedIn",
    value: "shubhamtanpure",
    href: "https://linkedin.com/in/shubhamtanpure",
    color: "#0A66C2",
  },
  {
    icon: <LocationOnOutlinedIcon fontSize="small" />,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: null,
    color: "#00D4B8",
  },
];

const WHATSAPP_NUMBER = "917387543632"; // country code + number, no +

// ─── 3D background: flowing particles ────────────────────────────────────────

function ContactParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 400;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#7C73FF"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

// ─── Framer variants ──────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
    },
  }),
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactClient() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const divider = theme.palette.divider;

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Form state
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [apiMsg, setApiMsg] = useState("");

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "At least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Email submit ────────────────────────────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setApiMsg(data.message);
        setForm(EMPTY_FORM);
        setErrors({});
      } else {
        setStatus("error");
        setApiMsg(data.message);
      }
    } catch {
      setStatus("error");
      setApiMsg("Network error — please try again.");
    }
  };

  // ── WhatsApp ────────────────────────────────────────────────────────────────
  // Builds a wa.me deep link with the form message pre-filled.
  // If form has content, uses that. Otherwise opens blank chat.
  const handleWhatsApp = () => {
    const text = form.message.trim()
      ? encodeURIComponent(
          `Hi Shubham, I'm ${form.name || "reaching out"} (${
            form.email || "no email"
          }). ${form.message}`
        )
      : encodeURIComponent(
          "Hi Shubham, I found your portfolio and would like to connect!"
        );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank",
      "noopener"
    );
  };

  // ── Field change ────────────────────────────────────────────────────────────
  const onChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (status !== "idle") setStatus("idle");
    };

  // ── Shared TextField sx ─────────────────────────────────────────────────────
  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(primary, 0.5),
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: primary,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: divider },
    "& .MuiInputLabel-root.Mui-focused": { color: primary },
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="contact"
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        bgcolor: isDark ? "#0A0A14" : "#F8F9FC",
        overflow: "hidden",
      }}
    >
      {/* 3D particle background */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: isDark ? 0.6 : 0.3,
        }}
      >
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
            <ContactParticles />
          </Canvas>
        </Suspense>
      </Box>

      {/* Gradient overlay so content stays readable */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: isDark
            ? "linear-gradient(to bottom, rgba(10,10,20,0.6) 0%, rgba(10,10,20,0.3) 50%, rgba(10,10,20,0.6) 100%)"
            : "linear-gradient(to bottom, rgba(248,249,252,0.8) 0%, rgba(248,249,252,0.5) 50%, rgba(248,249,252,0.8) 100%)",
        }}
      />

      {/* Top accent line */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${primary}, ${secondary}, transparent)`,
          opacity: 0.5,
          zIndex: 2,
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
          <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: "center" }}>
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
              06 — Contact
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.8rem" },
                letterSpacing: "-0.02em",
                color: "text.primary",
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              Let&apos;s build something{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                together
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                color: "text.secondary",
                maxWidth: 500,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Open to full-time roles, freelance projects, and interesting
              engineering conversations.
            </Typography>
          </Box>
        </motion.div>

        {/* Two column layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 6, lg: 8 },
            alignItems: "flex-start",
          }}
        >
          {/* ══ LEFT: contact info + quick actions ══ */}
          <Box sx={{ flex: "0 1 38%", minWidth: 0 }}>
            {/* Availability badge */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              variants={fadeUp}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 0.8,
                  mb: 4,
                  borderRadius: "20px",
                  border: `1px solid ${alpha(secondary, 0.35)}`,
                  bgcolor: alpha(secondary, isDark ? 0.08 : 0.06),
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: secondary,
                    "@keyframes ping": {
                      "0%": { boxShadow: `0 0 0 0 ${alpha(secondary, 0.5)}` },
                      "70%": { boxShadow: `0 0 0 8px ${alpha(secondary, 0)}` },
                      "100%": { boxShadow: `0 0 0 0 ${alpha(secondary, 0)}` },
                    },
                    animation: "ping 1.8s ease-in-out infinite",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: secondary,
                    letterSpacing: "0.04em",
                  }}
                >
                  Available for opportunities
                </Typography>
              </Box>
            </motion.div>

            {/* Contact info rows */}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 5 }}
            >
              {CONTACT_INFO.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={i + 2}
                  variants={fadeUp}
                >
                  <Box
                    component={item.href ? "a" : "div"}
                    href={item.href ?? undefined}
                    target={
                      item.href?.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      item.href?.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.75,
                      borderRadius: 2,
                      bgcolor: "background.paper",
                      border: `1px solid ${divider}`,
                      textDecoration: "none",
                      color: "inherit",
                      transition:
                        "border-color 0.2s, box-shadow 0.2s, transform 0.15s",
                      ...(item.href && {
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: alpha(item.color, 0.5),
                          boxShadow: `0 4px 16px ${alpha(
                            item.color,
                            isDark ? 0.15 : 0.08
                          )}`,
                          transform: "translateX(4px)",
                        },
                      }),
                    }}
                  >
                    {/* Icon circle */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 1.5,
                        bgcolor: alpha(item.color, isDark ? 0.15 : 0.08),
                        border: `1px solid ${alpha(item.color, 0.2)}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: item.color,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          color: "text.disabled",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          fontWeight: 600,
                          lineHeight: 1,
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          color: item.href ? item.color : "text.secondary",
                          fontWeight: 500,
                          mt: 0.3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                    {item.href && (
                      <Box
                        sx={{
                          ml: "auto",
                          color: "text.disabled",
                          fontSize: "0.8rem",
                          flexShrink: 0,
                        }}
                      >
                        ↗
                      </Box>
                    )}
                  </Box>
                </motion.div>
              ))}
            </Box>

            {/* Quick WhatsApp button */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={8}
              variants={fadeUp}
            >
              <Button
                fullWidth
                variant="contained"
                startIcon={<WhatsAppIcon />}
                onClick={handleWhatsApp}
                sx={{
                  py: 1.5,
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(135deg, #20BA57, #0E7A6E)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
                  },
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
                }}
              >
                Message on WhatsApp
              </Button>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "text.disabled",
                  textAlign: "center",
                  mt: 1,
                }}
              >
                Opens WhatsApp with your message pre-filled
              </Typography>
            </motion.div>
          </Box>

          {/* ══ RIGHT: email contact form ══ */}
          <Box sx={{ flex: "0 1 62%", minWidth: 0 }}>
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
              variants={fadeUp}
            >
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  border: `1px solid ${divider}`,
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(12px)",
                  // Gradient top stripe
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
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "text.primary",
                    mb: 0.75,
                  }}
                >
                  Send a message
                </Typography>
                <Typography
                  sx={{ fontSize: "0.85rem", color: "text.secondary", mb: 3.5 }}
                >
                  I'll reply within 24–48 hours. You'll also get an
                  auto-confirmation email.
                </Typography>

                {/* Status alerts */}
                {status === "success" && (
                  <Alert
                    severity="success"
                    sx={{ mb: 3, borderRadius: 2 }}
                    onClose={() => setStatus("idle")}
                  >
                    {apiMsg || "Message sent! I'll be in touch soon."}
                  </Alert>
                )}
                {status === "error" && (
                  <Alert
                    severity="error"
                    sx={{ mb: 3, borderRadius: 2 }}
                    onClose={() => setStatus("idle")}
                  >
                    {apiMsg || "Something went wrong. Please try again."}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleEmailSubmit} noValidate>
                  {/* Name + Email row */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <TextField
                      label="Your name"
                      value={form.name}
                      onChange={onChange("name")}
                      error={!!errors.name}
                      helperText={errors.name}
                      fullWidth
                      required
                      sx={fieldSx}
                    />
                    <TextField
                      label="Email address"
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      error={!!errors.email}
                      helperText={errors.email}
                      fullWidth
                      required
                      sx={fieldSx}
                    />
                  </Box>

                  {/* Subject */}
                  <TextField
                    label="Subject (optional)"
                    value={form.subject}
                    onChange={onChange("subject")}
                    fullWidth
                    sx={{ ...fieldSx, mb: 2 }}
                  />

                  {/* Message */}
                  <TextField
                    label="Message"
                    value={form.message}
                    onChange={onChange("message")}
                    error={!!errors.message}
                    helperText={errors.message}
                    fullWidth
                    required
                    multiline
                    rows={5}
                    placeholder="Tell me about your project, role, or just say hi..."
                    sx={{ ...fieldSx, mb: 3 }}
                  />

                  {/* Action buttons */}
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {/* Primary: send email */}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={status === "loading"}
                      endIcon={
                        status === "loading" ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <SendIcon fontSize="small" />
                        )
                      }
                      sx={{
                        flex: 1,
                        py: 1.4,
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        boxShadow: `0 0 20px ${alpha(primary, 0.35)}`,
                        "&:hover": {
                          boxShadow: `0 0 32px ${alpha(primary, 0.55)}`,
                          transform: "translateY(-1px)",
                        },
                        "&:disabled": { transform: "none" },
                        transition: "all 0.2s ease",
                      }}
                    >
                      {status === "loading" ? "Sending…" : "Send via Email"}
                    </Button>

                    {/* Secondary: send via WhatsApp using form content */}
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleWhatsApp}
                      startIcon={<WhatsAppIcon />}
                      sx={{
                        flex: 1,
                        py: 1.4,
                        fontSize: "0.88rem",
                        fontWeight: 700,
                        borderColor: "#25D366",
                        color: "#25D366",
                        "&:hover": {
                          borderColor: "#25D366",
                          bgcolor: "rgba(37,211,102,0.06)",
                          transform: "translateY(-1px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      Send via WhatsApp
                    </Button>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      color: "text.disabled",
                      mt: 2,
                      textAlign: "center",
                    }}
                  >
                    Your message is sent directly to me — no third-party
                    services.
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
