import { Button, ButtonGroup, styled } from "@mui/material";
import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { useMap } from "react-leaflet";
import { MapControl } from "./map-control";

const ZoomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.spacing(2),
  width: "47px",
  height: "50px",
  // TODO: put these in the theme you dick
  color: "#6D6B7D",
  borderColor: "#6D6B7D",
  borderWidth: "1px",
  "&:hover": {
    filter: "brightness(90%)",
  },
}));

/**
 * Custom styled zoom controls for our map.
 */
export function ZoomControls() {
  const map = useMap();

  return (
    <MapControl position="bottomright">
      <ButtonGroup orientation="vertical" sx={{ marginBottom: 3, marginRight: 3 }}>
        <ZoomButton onClick={() => map.zoomIn()}>
          <AddRounded fontSize="medium" />
        </ZoomButton>
        <ZoomButton onClick={() => map.zoomOut()}>
          <RemoveRounded fontSize="medium" />
        </ZoomButton>
      </ButtonGroup>
    </MapControl>
  );
}
