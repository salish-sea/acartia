import { createRoute } from "@tanstack/react-router";
import { Box, styled } from "@mui/material";
import { profileLayoutRoute } from "@/app/routes/profile/route";
import { DeleteAccountForm } from "@/features/profile";

const PageLayout = styled(Box)(() => ({
  display: "flex",
  height: "100%",
  width: "100%",
  justifyContent: "center",
}));

export function DeleteAccount() {
  return (
    <PageLayout>
      <DeleteAccountForm />
    </PageLayout>
  );
}

export const deleteAccountRoute = createRoute({
  getParentRoute: () => profileLayoutRoute,
  path: "/profile/delete-account",
  component: DeleteAccount,
});
