import { useState } from "react";
import { ButtonBase, Divider, Fab, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Close, LayersOutlined } from "@mui/icons-material";
import type { MapLayer, OverlayConfigItem } from "@/features/map";
import { MapControl } from "@/features/map";

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
  maps: Array<MapLayer>;

  /**
   * The index of the currently selected map.
   */
  selected: MapLayer;

  /**
   * Callback to close the layers card.
   */
  onClose: () => void;

  /**
   * Set the map tile layer.
   */
  onLayersChange: (index: number) => void;

  /**
   * List of map overlays to render.
   */
  overlays: Array<OverlayConfigItem>;

  /**
   * List of map overlays that are currently selected / active.
   */
  activeOverlays: Array<OverlayConfigItem>;

  /**
   * Callback to toggle a map overlay on or off.
   */
  onToggleOverlay: (overlay: OverlayConfigItem) => void;
};

function Expanded({
  maps,
  selected,
  onClose,
  onLayersChange,
  overlays,
  activeOverlays,
  onToggleOverlay,
}: Readonly<ExpandedProps>) {
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

      <Typography variant="body1" fontWeight={600}>
        Map Type
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        {maps.map((map, index) => (
          <MapLayerButton
            key={map.label}
            src={map.thumbnail}
            isSelected={map.tiles === selected.tiles}
            onClick={() => onLayersChange(index)}
            label={map.label}
          />
        ))}
      </Stack>

      <Divider />

      <Typography variant="body1" fontWeight={600}>
        Map Overlays
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        {overlays.map((overlay) => (
          <MapLayerButton
            key={overlay.label}
            src={overlay.thumbnail}
            isSelected={activeOverlays.some((o) => o.label === overlay.label)}
            label={overlay.label}
            onClick={() => onToggleOverlay(overlay)}
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

/**
 * "Collapsed" view of the layers card button we show on desktop screens.
 */
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

/**
 * "Collapsed" view of the layers card button we show on mobile screens.
 */
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
  selected: MapLayer;

  /**
   * Set the map tile layer.
   */
  onLayersChange: (index: number) => void;

  /**
   * List of maps.
   */
  maps: Array<MapLayer>;

  /**
   * List of map overlays.
   */
  overlays: Array<OverlayConfigItem>;

  /**
   * List of map overlays that are currently selected / active.
   */
  activeOverlays: Array<OverlayConfigItem>;

  /**
   * Callback to toggle a map overlay on or off.
   */
  onToggleOverlay: (overlay: OverlayConfigItem) => void;
};

/**
 * A component for controlling map layers.
 */
export function LayersCard({
  selected,
  maps,
  onLayersChange,
  overlays,
  activeOverlays,
  onToggleOverlay,
}: Readonly<LayersCardProps>) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <MapControl position="bottomleft" sx={{ marginBottom: 3, marginLeft: 3 }}>
      {expanded ? (
        <Expanded
          selected={selected}
          maps={maps}
          onClose={() => setExpanded(false)}
          onLayersChange={onLayersChange}
          overlays={overlays}
          activeOverlays={activeOverlays}
          onToggleOverlay={onToggleOverlay}
        />
      ) : (
        <Collapsed
          src={selected.thumbnail}
          onOpen={() => setExpanded(true)}
          color={selected.contrastColor}
        />
      )}
    </MapControl>
  );
}
