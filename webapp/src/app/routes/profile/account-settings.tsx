import { createRoute } from "@tanstack/react-router";
import { Box, styled } from "@mui/material";
import { profileLayoutRoute } from "@/app/routes/profile/route";
import { AccountSettingsForm } from "@/features/profile";

const PageLayout = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
}));

export function AccountSettings() {
  const { name, email, website = "" } = profileLayoutRoute.useLoaderData();

  return (
    <PageLayout>
      <AccountSettingsForm defaultValues={{ name, email, website }} />
    </PageLayout>
  );
}

export const accountSettingsRoute = createRoute({
  getParentRoute: () => profileLayoutRoute,
  path: "/profile/account-settings",
  component: AccountSettings,
});
