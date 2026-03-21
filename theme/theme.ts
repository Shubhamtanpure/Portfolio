import { createTheme, Theme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette";
import { typography } from "./typography";

const baseTheme = {
  typography,
  shape: { borderRadius: 12 },
  transitions: {
    duration: { shortest: 150, shorter: 200, short: 250, standard: 300 },
  },
};

export const lightTheme: Theme = createTheme({
  ...baseTheme,
  palette: lightPalette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 24px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 500 },
      },
    },
  },
});

export const darkTheme: Theme = createTheme({
  ...baseTheme,
  palette: darkPalette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 24px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 500 },
      },
    },
  },
});
