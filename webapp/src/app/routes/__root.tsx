import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Box } from "@mui/material";
import type { QueryClient } from "@tanstack/react-query";
import { indexRoute } from "@/app/routes";
import { aboutRoute } from "@/app/routes/about";
import { loginRoute } from "@/app/routes/login";
import { logoutRoute } from "@/app/routes/logout";
import { signupRoute } from "@/app/routes/signup";
import { profileLayoutRoute } from "@/app/routes/profile/route";
import { accountSettingsRoute } from "@/app/routes/profile/account-settings";
import { deleteAccountRoute } from "@/app/routes/profile/delete-account";
import { profileRoute } from "@/app/routes/profile";
import { Navbar } from "@/components/navbar";

export const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Outlet />
    </Box>
  ),
});

export const routeTree = rootRoute.addChildren([
  aboutRoute,
  indexRoute,
  loginRoute,
  logoutRoute,
  profileRoute,
  profileLayoutRoute.addChildren([accountSettingsRoute, deleteAccountRoute]),
  signupRoute,
]);
