"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={(theme) => ({
        backdropFilter: "blur(10px)",
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.7)"
            : "rgba(10,10,20,0.7)",
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              fontWeight: 700,
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Shubham.dev
          </Typography>

          {/* Nav Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                color="inherit"
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right Side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ThemeToggle />

            <Button
              variant="contained"
              color="primary"
              href="#contact"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              Hire Me
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
