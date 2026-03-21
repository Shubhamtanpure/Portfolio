"use client";

import { IconButton, Tooltip, Box } from "@mui/material";
import { useThemeMode } from "@/components/providers/MuiProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Tooltip title="Toggle theme">
      <Box
        sx={(theme) => ({
          borderRadius: "50%",
          backdropFilter: "blur(10px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(0,0,0,0.05)"
              : "rgba(255,255,255,0.08)",
          border: `1px solid ${theme.palette.divider}`,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.08)"
                : "rgba(255,255,255,0.15)",
          },
        })}
      >
        <IconButton
          onClick={toggleTheme}
          sx={(theme) => ({
            color: theme.palette.mode === "light" ? "#1a1a1a" : "#ffffff",
          })}
        >
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
    </Tooltip>
  );
}
