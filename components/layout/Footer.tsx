import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  Divider,
  Link,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const FOOTER_LINKS = {
  Navigation: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
  ],
  Resources: [
    { label: "Blog", href: "#blog" },
    { label: "System Design", href: "#system-design" },
    { label: "Impact", href: "#impact" },
    { label: "Contact", href: "#contact" },
  ],
};

const SOCIALS = [
  {
    icon: <GitHubIcon fontSize="small" />,
    href: "https://github.com/Shubhamtanpure",
    label: "GitHub",
  },
  {
    icon: <LinkedInIcon fontSize="small" />,
    href: "https://linkedin.com/in/shubham-tanpure-184a6720a",
    label: "LinkedIn",
  },
  {
    icon: <EmailIcon fontSize="small" />,
    href: "mailto:shubhamtanpure8742@gmail.com",
    label: "Email",
  },
];

const TECH_BADGES = [
  "Next.js",
  "NestJS",
  "Kafka",
  "WebSockets",
  "PostgreSQL",
  "Docker",
  "Redis",
  "TypeScript",
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        pt: 8,
        pb: 4,
        mt: 12,
      }}
    >
      <Container maxWidth="lg">
        {/* Top row */}
        <Grid container spacing={6}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 1, letterSpacing: "-0.01em" }}
            >
              Shubham Tanpure
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              Full-Stack Developer building real-time, scalable industrial
              systems with AI, IoT & microservices.
            </Typography>

            {/* Socials */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {SOCIALS.map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    p: 0.9,
                    color: "text.secondary",
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "primary.main",
                      borderColor: "primary.main",
                      background: "rgba(108,99,255,0.08)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <Grid key={group} size={{ xs: 6, md: 2 }}>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ mb: 2, display: "block", letterSpacing: "0.1em" }}
              >
                {group}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    underline="none"
                    sx={{
                      fontSize: "0.875rem",
                      color: "text.secondary",
                      transition: "color 0.2s",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Tech stack column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ mb: 2, display: "block", letterSpacing: "0.1em" }}
            >
              Tech Stack
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {TECH_BADGES.map((tech) => (
                <Box
                  key={tech}
                  sx={{
                    px: 1.5,
                    py: 0.4,
                    borderRadius: "6px",
                    border: "1px solid",
                    borderColor: "divider",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    color: "text.secondary",
                    letterSpacing: "0.03em",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                      background: "rgba(108,99,255,0.06)",
                    },
                  }}
                >
                  {tech}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Divider sx={{ my: 4 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.disabled">
            © {new Date().getFullYear()} Shubham Tanpure. Built with Next.js &
            MUI.
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Pune, India · Open to opportunities
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
