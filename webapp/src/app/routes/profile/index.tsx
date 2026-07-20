import { createRoute, useLocation } from "@tanstack/react-router";
import { Box, styled, useTheme } from "@mui/material";
import { rootRoute } from "@/app/routes/__root";
import { ProfileMenu } from "@/features/profile";
import { api } from "@/lib/api";

const PageLayout = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

export function AccountSettings() {
  const theme = useTheme();
  const { data: user } = api.useSuspenseQuery("get", "/profile");
  const pathname = useLocation({ select: (location) => location.pathname });

  return (
    <PageLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: 425,
          padding: 3,
          boxSizing: "border-box",
        }}
      >
        <ProfileMenu user={user} value={pathname} />
      </Box>
    </PageLayout>
  );
}

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: AccountSettings,
});
