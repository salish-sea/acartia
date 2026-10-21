import { Outlet, createRoute, notFound, useLocation } from "@tanstack/react-router";
import { Box, styled } from "@mui/material";
import { rootRoute } from "@/app/routes/__root";
import { BackButtonMobile, ProfileMenu, ProfileMenuDrawer } from "@/features/profile";
import { api } from "@/lib/api";
import { ApiError } from "@/lib/api/api-error";

const PageLayout = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "space-between",
}));

export function Profile() {
  const { data: user } = api.useSuspenseQuery("get", "/profile");
  const pathname = useLocation({ select: (location) => location.pathname });

  return (
    <PageLayout>
      <BackButtonMobile />
      <ProfileMenuDrawer variant="permanent">
        <ProfileMenu user={user} value={pathname} />
      </ProfileMenuDrawer>
      <Outlet />
    </PageLayout>
  );
}

export const profileLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "profile-layout",
  component: Profile,
  loader: async ({ context: { queryClient } }) => {
    try {
      return await queryClient.ensureQueryData(api.queryOptions("get", "/profile"));
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        throw notFound();
      }

      throw error;
    }
  },
});
