import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/app/routes/__root";
import { queryClient } from "@/lib/api/api";

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});
