import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import "./styles.css";

import { router } from "@/app/router";
import { AppProvider } from "@/app/provider";
import { queryClient } from "@/lib/api/index";
import { AppSkeleton } from "@/components/skeletons/app-skeleton";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Suspense fallback={<AppSkeleton />}>
        <AppProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AppProvider>
      </Suspense>
    </StrictMode>,
  );
}
