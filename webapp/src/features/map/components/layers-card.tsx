import { useState } from "react";
import {
  Box,
  ButtonBase,
  Divider,
  Fab,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Close, LayersOutlined } from "@mui/icons-material";
import { MapControl } from "./map-control";

// For marker layers
// https://react-leaflet.js.org/docs/example-layers-control/
// TODO: Consider style components for some of this isntead of sx??
type MapLayerButtonProps = {
  /**
   * Denotes if this option is selected.
   */
  isSelected?: boolean;

  /**
   * The map image thumbnail to display
   */
  src: string;

  /**
   * The label.
   */
  label: string;

  /**
   * On-click callback.
   */
  onClick: () => void;
};

function MapLayerButton({
  isSelected = false,
  src,
  label,
  onClick,
}: Readonly<MapLayerButtonProps>) {
  const theme = useTheme();

  return (
    <ButtonBase disableRipple onClick={onClick} sx={{ display: "block" }}>
      <img
        style={{
          width: "75px",
          height: "75px",
          display: "block",
          borderRadius: "6px",
          ...(isSelected && { boxShadow: theme.shadows[5] }),
        }}
        src={src}
      />
      <Typography
        variant="body2"
        fontFamily="Montserrat"
        fontWeight={isSelected ? "600" : "400"}
        display="block"
        align="center"
        sx={{ mt: 1 }}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
}

// TODO: prevent user from being able to drag map from on top of this component.
type ExpandedProps = {
  /**
   * List of maps.
   */
  maps: Array<{ tiles: string; thumbnail: string; label: string }>;

  /**
   * The index of the currently selected map.
   */
  selected: number;

  /**
   * Callback to close the layers card.
   */
  onClose: () => void;

  /**
   * Set the map tile layer.
   */
  onLayersChange: (index: number) => void;
};
function Expanded({ maps, selected, onClose, onLayersChange }: Readonly<ExpandedProps>) {
  return (
    <Stack
      gap={2.5}
      width="295px"
      padding={3}
      sx={{ backgroundColor: "primary.lightest", borderRadius: 4 }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">Layers</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Stack>

      <Divider />

      <Typography variant="body1">Map Type</Typography>
      <Stack direction="row" justifyContent="space-between">
        {maps.map((map, index) => (
          <MapLayerButton
            key={map.label}
            src={map.thumbnail}
            isSelected={index === selected}
            onClick={() => onLayersChange(index)}
            label={map.label}
          />
        ))}
      </Stack>

      <Divider />

      <Typography variant="body1">Map Overlays</Typography>
      <Stack direction="row" justifyContent="space-between">
        {maps.map((map) => (
          <MapLayerButton
            key={map.label}
            src={map.thumbnail}
            label={map.label}
            onClick={() => {}}
          />
        ))}
      </Stack>
    </Stack>
  );
}

type CollapsedDesktopProps = {
  /**
   * The map image thumbnail to display.
   */
  src: string;

  /**
   * Callback to open layers card.
   */
  onOpen: () => void;

  /**
   * The color of the "Layers" text".
   */
  color: string;
};

function CollapsedDesktop({ src, onOpen, color }: Readonly<CollapsedDesktopProps>) {
  return (
    <ButtonBase
      onClick={onOpen}
      disableRipple
      sx={{ display: { xs: "none", sm: "none", md: "inline-flex" } }}
    >
      <img src={src} style={{ width: "100px", height: "100px", borderRadius: "16px" }}></img>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ position: "relative", top: "30px", right: "90px" }}
      >
        <LayersOutlined fontSize="medium" sx={{ color }} />
        <Typography variant="body2" fontSize="16px" fontWeight={600} color={color}>
          Layers
        </Typography>
      </Stack>
    </ButtonBase>
  );
}

type CollapsedMobileProps = {
  /**
   * Callback to open layers card.
   */
  onOpen: () => void;
};

function CollapsedMobile({ onOpen }: Readonly<CollapsedMobileProps>) {
  return (
    <Fab size="small" onClick={onOpen} sx={{ boxShadow: "none", display: { md: "none" } }}>
      <LayersOutlined fontSize="large" sx={{ color: "text.primary" }} />
    </Fab>
  );
}

type CollapsedProps = CollapsedDesktopProps & CollapsedMobileProps;

function Collapsed({ src, onOpen, color }: Readonly<CollapsedProps>) {
  return (
    <>
      <CollapsedDesktop src={src} onOpen={onOpen} color={color} />
      <CollapsedMobile onOpen={onOpen} />
    </>
  );
}

type LayersCardProps = {
  /**
   * Index of the currently selected map tile layer.
   */
  selected: number;

  /**
   * Set the map tile layer.
   */
  onLayersChange: (index: number) => void;

  /**
   * List of maps.
   */
  maps: Array<{ tiles: string; thumbnail: string; label: string; contrastColor: string }>;
};

/**
 * A component for controlling map layers.
 */
export function LayersCard({ selected, maps, onLayersChange }: Readonly<LayersCardProps>) {
  const thumbnailUrl = maps[(selected + 1) % maps.length]!.thumbnail;
  const thumbnailTextColor = maps[(selected + 1) % maps.length]!.contrastColor;
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <MapControl position="bottomleft">
      <Box sx={{ marginBottom: 3, marginLeft: 3 }}>
        {expanded ? (
          <Expanded
            maps={maps}
            selected={selected}
            onClose={() => setExpanded(false)}
            onLayersChange={onLayersChange}
          />
        ) : (
          <Collapsed
            src={thumbnailUrl}
            onOpen={() => setExpanded(true)}
            color={thumbnailTextColor}
          />
        )}
      </Box>
    </MapControl>
  );
}
