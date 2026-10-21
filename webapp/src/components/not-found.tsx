import { Box, Typography, styled } from "@mui/material";

const PageLayout = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

/**
 * The page we show when we throw notFound in tanstack-router
 */
export function NotFound() {
  return (
    <PageLayout>
      <Typography variant="h3">Page not found</Typography>
    </PageLayout>
  );
}
