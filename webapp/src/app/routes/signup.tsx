import { createRoute } from "@tanstack/react-router";
import { Box, styled } from "@mui/material";
import { rootRoute } from "./__root";
import { SignupForm } from "@/features/signup";

const PageLayout = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  justifyContent: "center",
}));

export function Signup() {
  return (
    <PageLayout>
      <SignupForm />
    </PageLayout>
  );
}

export const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: Signup,
});
