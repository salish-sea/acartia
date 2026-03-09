import { createRoute } from "@tanstack/react-router";
import { Box, styled } from "@mui/material";
import { rootRoute } from "./__root";
import { LoginForm } from "@/features/login";

const PageLayout = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  justifyContent: "center",
}));

export function Login() {
  return (
    <PageLayout>
      <LoginForm />
    </PageLayout>
  );
}

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
