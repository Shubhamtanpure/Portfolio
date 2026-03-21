"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useTransition,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { lightTheme, darkTheme } from "@/theme/theme";
import { setThemeCookie } from "@/lib/actions";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function MuiProvider({
  children,
  initialMode,
}: {
  children: React.ReactNode;
  initialMode: string;
}) {
  // initialMode comes from cookie via layout.tsx — no flash, no null return
  const [mode, setMode] = useState<ThemeMode>(
    initialMode === "light" ? "light" : "dark"
  );
  const [, startTransition] = useTransition();

  const toggleTheme = () => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(next);
    // Write cookie via server action so it persists across refreshes
    startTransition(() => {
      setThemeCookie(next);
    });
  };

  const theme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ThemeContext.Provider>
  );
}
