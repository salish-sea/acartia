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
} & PropsWithChildren;

/**
 * Helper component wraps divs with leaflet-control classnames so we don't need to remember them :)
 */
export function MapControl({ children, position }: Readonly<Props>) {
  const className = positionClasses[position];

  return (
    <div className={className}>
      <div className="leaflet-control">{children}</div>
    </div>
  );
}
