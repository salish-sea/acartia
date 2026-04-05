import { Outlet, createRootRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Box } from "@mui/material";
import { indexRoute } from "@/app/routes";
import { loginRoute } from "@/app/routes/login";
import { signupRoute } from "@/app/routes/signup";
import { Navbar } from "@/components/navbar";

export const rootRoute = createRootRoute({
  component: () => (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </Box>
  ),
});

export const routeTree = rootRoute.addChildren([indexRoute, loginRoute, signupRoute]);
