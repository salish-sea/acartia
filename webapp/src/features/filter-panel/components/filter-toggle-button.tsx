import { Fab, IconButton, Stack, styled } from "@mui/material";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";

const DesktopContainer = styled(Fab)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "none",
  marginLeft: "-24px",
  marginRight: "-24px",
  alignSelf: "center",
  flex: "0 0 auto",
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const MobileContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.lightest,
  flex: "0 1 50px",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

interface Props {
  /**
   * If the filter panel is open.
   */
  open: boolean;

  /**
   * Callback to toggle open / close the filter toggle button.
   */
  onClick: () => void;
}

/**
 * Button to open and close the filter toggle button.
 */
export function FilterToggleButton({ open, onClick }: Readonly<Props>) {
  return (
    <>
      <DesktopContainer size="medium" disableRipple onClick={onClick}>
        {open ? <ChevronRightRounded fontSize="large" /> : <ChevronLeftRounded fontSize="large" />}
      </DesktopContainer>
    </>
  );
}

// TODO: Make the whole thing a button, not just the arrow, no need for Icon button, just replace Stack with
// un-styled button I think.

/**
 * Button to open and close the fitler toggle button except mobile.
 */
export function FilterToggleButtonMobile({ open, onClick }: Readonly<Props>) {
  return (
    <MobileContainer direction="row" alignItems="center" justifyContent="center">
      <IconButton onClick={onClick}>
        {open ? <KeyboardDoubleArrowDown /> : <KeyboardDoubleArrowUp />}
      </IconButton>
    </MobileContainer>
  );
}
