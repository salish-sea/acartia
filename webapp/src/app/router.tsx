import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/app/routes/__root";
import { queryClient } from "@/lib/api";
import { ErrorComponent } from "@/components/error-component";
import { NotFound } from "@/components/not-found";

export const router = createRouter({
  routeTree,
  defaultErrorComponent: ErrorComponent,
  defaultNotFoundComponent: NotFound,
  context: { queryClient },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
