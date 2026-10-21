import { createRoute } from "@tanstack/react-router";
import { Box, styled } from "@mui/material";
import { rootRoute } from "./__root";
import { AboutAcartia } from "@/features/about";

const PageLayout = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  justifyContent: "center",
}));

export function About() {
  return (
    <PageLayout>
      <AboutAcartia />
    </PageLayout>
  );
}

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
