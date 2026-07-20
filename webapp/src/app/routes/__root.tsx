import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Box } from "@mui/material";
import type { QueryClient } from "@tanstack/react-query";
import { indexRoute } from "@/app/routes";
import { loginRoute } from "@/app/routes/login";
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
      {/* <TanStackRouterDevtools /> */}
    </Box>
  ),
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  profileRoute,
  profileLayoutRoute.addChildren([accountSettingsRoute, deleteAccountRoute]),
]);
