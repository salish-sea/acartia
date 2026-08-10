import { Navigate, createRoute, notFound, redirect } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import type { User } from "@/types/api";
import { fetchClient } from "@/lib/api";

/**
 * Logout route logs you out and redirects to the map page.
 * This is nicer than a function but we need to do some extra stuff.
 */
export const logoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/logout",
  component: () => <Navigate to="/" />,
  beforeLoad: async ({ context: { queryClient } }) => {
    const profile: User = queryClient.getQueryData(["get", "/profile"]);

    // You are not allowed to log-out if you aren't logged in xD.
    if (!profile) {
      throw notFound();
    }

    await fetchClient.POST("/auth/logout");
    queryClient.removeQueries({ queryKey: ["get", "/profile"] });
    throw redirect({ to: "/" });
  },
});
