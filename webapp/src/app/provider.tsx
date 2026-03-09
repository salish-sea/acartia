import { ThemeProvider } from "@mui/material";
import type { PropsWithChildren } from "react";
import { appTheme } from "@/theme/app-theme";

export function AppProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
}
