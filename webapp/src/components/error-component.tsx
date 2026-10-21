import { Box, Typography, styled } from "@mui/material";

const PageLayout = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

/**
 * The default error component for the app.
 */
export function ErrorComponent({ error }: Readonly<{ error: Error }>) {
  return (
    <PageLayout>
      <Typography variant="h3">{error.message}</Typography>
    </PageLayout>
  );
}
