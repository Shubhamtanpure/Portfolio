"use client";
// components/layout/Navbar.tsx

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useTheme, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NavItem {
  label: string;
  href: string;
  sectionId?: string; // the id on the <section> element
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero", sectionId: "hero" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Impact", href: "#impact", sectionId: "impact" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

// ─── Smooth scroll helper ─────────────────────────────────────────────────────
// Uses native scrollIntoView so it works even if CSS scroll-behavior isn't set.

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const navbarHeight = 64; // px — matches Toolbar minHeight
  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── Track scroll depth for navbar blur/border ──────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section via IntersectionObserver ────────────────────────────────
  // Watches all section elements and highlights the nav item for the one
  // currently taking up the most viewport space.
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = NAV_ITEMS.filter((n) => n.sectionId).map(
      (n) => n.sectionId!
    );
    const observers: IntersectionObserver[] = [];

    // Map to track intersection ratios for each section
    const ratioMap: Record<string, number> = {};

    const updateActive = () => {
      const top = Object.entries(ratioMap).sort((a, b) => b[1] - a[1])[0];
      if (top && top[1] > 0) setActiveSection(top[0]);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratioMap[id] = entry.intersectionRatio;
          });
          updateActive();
        },
        {
          threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
          rootMargin: "-64px 0px 0px 0px",
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [isHomePage]);

  // ── Click handler ──────────────────────────────────────────────────────────
  const handleNavClick = useCallback(
    (e: React.MouseEvent, item: NavItem) => {
      // External route — let Next.js Link handle it normally
      if (!item.sectionId) return;

      e.preventDefault();
      setDrawerOpen(false);

      if (isHomePage) {
        // Already on home page — just scroll
        scrollToSection(item.sectionId);
      } else {
        // Navigate to home then scroll after hydration
        window.location.href = `/${item.href}`;
      }
    },
    [isHomePage]
  );

  // ── Helpers ────────────────────────────────────────────────────────────────
  const isActive = (item: NavItem) =>
    isHomePage && item.sectionId
      ? activeSection === item.sectionId
      : pathname === item.href;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          backgroundColor: scrolled
            ? isDark
              ? "rgba(10,10,20,0.85)"
              : "rgba(255,255,255,0.85)"
            : isDark
            ? "rgba(10,10,20,0.4)"
            : "rgba(255,255,255,0.4)",
          borderBottom: scrolled
            ? `1px solid ${theme.palette.divider}`
            : "1px solid transparent",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 5, lg: 6 } }}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: 60, md: 64 },
            }}
          >
            {/* ── Logo ── */}
            <Typography
              component={Link}
              href="/"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  scrollToSection("hero");
                }
              }}
              sx={{
                fontWeight: 800,
                fontSize: "1.15rem",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                background: `linear-gradient(135deg, ${primary}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                flexShrink: 0,
              }}
            >
              Shubham.dev
            </Typography>

            {/* ── Desktop nav links ── */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {NAV_ITEMS.map((item) => {
                const active = isActive(item);
                return (
                  <Button
                    key={item.label}
                    component={Link}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    disableRipple
                    sx={{
                      px: 1.5,
                      py: 0.75,
                      fontSize: "0.85rem",
                      fontWeight: active ? 700 : 500,
                      color: active ? primary : "text.secondary",
                      position: "relative",
                      bgcolor: "transparent",
                      "&:hover": {
                        color: primary,
                        bgcolor: alpha(primary, 0.06),
                      },
                      // Active underline pill
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 4,
                        left: "50%",
                        transform: active
                          ? "translateX(-50%) scaleX(1)"
                          : "translateX(-50%) scaleX(0)",
                        width: "60%",
                        height: "2px",
                        borderRadius: "1px",
                        bgcolor: primary,
                        transition: "transform 0.25s ease",
                      },
                      "&:hover::after": {
                        transform: "translateX(-50%) scaleX(1)",
                      },
                      transition: "color 0.2s, background-color 0.2s",
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* ── Right side ── */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ThemeToggle />

              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                size="small"
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  px: 2,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  boxShadow: `0 0 16px ${alpha(primary, 0.35)}`,
                  "&:hover": { boxShadow: `0 0 24px ${alpha(primary, 0.55)}` },
                }}
              >
                Hire Me
              </Button>

              {/* Mobile menu toggle */}
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "text.primary",
                }}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Spacer so content doesn't hide under fixed navbar ── */}
      <Box sx={{ height: { xs: 60, md: 64 } }} />

      {/* ── Mobile drawer ── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: isDark ? "#0A0A14" : "#fff",
            borderLeft: `1px solid ${theme.palette.divider}`,
            pt: 2,
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pb: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "-0.02em",
              background: `linear-gradient(135deg, ${primary}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Shubham.dev
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "text.secondary" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider />

        {/* Drawer nav links */}
        <List sx={{ px: 1, pt: 1 }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            return (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    bgcolor: active ? alpha(primary, 0.1) : "transparent",
                    "&:hover": { bgcolor: alpha(primary, 0.08) },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: "0.95rem",
                          fontWeight: active ? 700 : 500,
                          color: active ? primary : "text.primary",
                        },
                      },
                    }}
                  />
                  {active && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: primary,
                        ml: 1,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ mt: 2 }} />

        {/* Drawer CTA */}
        <Box sx={{ px: 2, pt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              setDrawerOpen(false);
              scrollToSection("contact");
            }}
            sx={{
              fontWeight: 700,
              boxShadow: `0 0 16px ${alpha(primary, 0.35)}`,
            }}
          >
            Hire Me
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
