import { Box, Divider, styled } from "@mui/material";
import {
  FilterSightingsCard,
  FilterToggleButton,
  FilterToggleButtonMobile,
  SpeciesLegendCard,
} from "@/features/filter-panel";
import { useLocalStorage } from "@/hooks/use-local-storage";

/**
 * Styled Box that is used as the 'Closed' filter panel.
 */
const ClosedPanel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.lightest,
  display: "none",
  width: "36px",
  height: "100%",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

/**
 * Styled Box that shall contain all the controls when the filter panel is open.
 */
const OpenPanel = styled(Box)(({ theme }) => ({
  overflow: "auto",
  flex: "1 0 100%",
  backgroundColor: theme.palette.primary.lightest,
  display: "block",
  width: "100%",
  height: "100%",
  position: "fixed",
  zIndex: 2000,
  top: 64, // Navbar height, surely better way to do this.
  overflowY: "auto",
  [theme.breakpoints.up("md")]: {
    position: "static",
    flex: "0 0 417px",
    zIndex: "auto",
    paddingTop: "64px", // Navbar height, surely better way to do this.
    height: "auto",
  },
}));

/**
 * Right-hand panel of the map page, contains filtering controls for map-sightings.
 */
export function FilterPanel() {
  const [open, setOpen] = useLocalStorage<boolean>("acartia-filter-panel", false);
  const handleToggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <FilterToggleButton open={open} onClick={handleToggleOpen} />
      {open ? (
        <OpenPanel>
          <FilterToggleButtonMobile open={open} onClick={handleToggleOpen} />
          <SpeciesLegendCard />
          <Divider variant="middle" sx={{ mx: "36px" }} />
          <FilterSightingsCard />
        </OpenPanel>
      ) : (
        <>
          <FilterToggleButtonMobile open={open} onClick={handleToggleOpen} />
          <ClosedPanel />
        </>
      )}
    </>
  );
}
