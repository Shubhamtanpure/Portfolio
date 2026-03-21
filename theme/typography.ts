export const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica Neue", sans-serif',
  h1: {
    fontSize: "3.5rem",
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.015em",
  },
  h3: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.3 },
  h4: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4 },
  h5: { fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.5 },
  h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 },
  body1: { fontSize: "1rem", lineHeight: 1.75 },
  body2: { fontSize: "0.875rem", lineHeight: 1.65 },
  caption: { fontSize: "0.75rem", lineHeight: 1.5, letterSpacing: "0.04em" },
  overline: {
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
  },
};
