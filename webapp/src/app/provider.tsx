import { ThemeProvider } from "@mui/material";
import type { PropsWithChildren } from "react";
import { appTheme } from "@/theme/app-theme";
import { ToastProvider } from "@/components/providers/toast-provider";

/**
 * Global app providers go here.
 */
export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={appTheme}>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
