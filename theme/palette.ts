export const lightPalette = {
  mode: "light" as const,
  primary: {
    main: "#6C63FF",
    light: "#9D97FF",
    dark: "#4B44CC",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#00BFA6",
    light: "#5DF2D6",
    dark: "#008E7A",
    contrastText: "#ffffff",
  },
  background: {
    default: "#F8F9FC",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#0F0F1A",
    secondary: "#4A4A68",
    disabled: "#9999BB",
  },
  divider: "rgba(0,0,0,0.08)",
};

export const darkPalette = {
  mode: "dark" as const,
  primary: {
    main: "#7C73FF",
    light: "#A89DFF",
    dark: "#5549DD",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#00D4B8",
    light: "#5DFFD8",
    dark: "#009E87",
    contrastText: "#000000",
  },
  background: {
    default: "#0A0A14",
    paper: "#12121F",
  },
  text: {
    primary: "#EEEEF5",
    secondary: "#9999BB",
    disabled: "#55556A",
  },
  divider: "rgba(255,255,255,0.08)",
};
