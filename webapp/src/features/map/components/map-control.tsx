import { Box } from "@mui/material";
import type { CSSProperties } from "@mui/material";
import type { PropsWithChildren } from "react";

const positionClasses = {
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
};

type Props = {
  /**
   * Where to position the map control.
   */
  position: "topleft" | "topright" | "bottomleft" | "bottomright";

  /**
   * Additional styling to apply to the root div of this component.
   */
  sx?: CSSProperties;
} & PropsWithChildren;

/**
 * Helper component wraps divs with leaflet-control classnames so we don't need to remember them :)
 */
export function MapControl({ children, position, sx }: Readonly<Props>) {
  const className = positionClasses[position];

  return (
    <Box className={className} sx={sx}>
      <div className="leaflet-control">{children}</div>
    </Box>
  );
}
