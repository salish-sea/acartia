import { ArrowBackRounded } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

const BackButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 85,
  left: 15,
  backgroundColor: theme.palette.action.active,
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

/**
 * When viewing the profile page on mobile you cannot see the side-menu for navigating
 * between profile pages. This button will be there instead to go back to a full-page
 * mobile-only menu.
 */
export function BackButtonMobile() {
  // cbf making a 'custon link' at the moment, not important for a component like this anyway.
  const navigate = useNavigate();
  const handleClick = async () => await navigate({ to: "/profile" });

  return (
    <BackButton onClick={handleClick}>
      <ArrowBackRounded sx={{ color: "text.primary" }} />
    </BackButton>
  );
}
