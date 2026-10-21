import { Drawer, styled } from "@mui/material";

export const ProfileMenuDrawer = styled(Drawer)(({ theme }) => ({
  width: 375,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 375,
    boxSizing: "border-box",
    padding: theme.spacing(18, 3),
    // This component is really dumb. I hate it. This basically negates all of the positioning it tries to do.
    // We are literally only using it instead of a <div/> in case there are some semantics gained (idek).
    position: "static",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
