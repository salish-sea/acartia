import { Marker } from "react-leaflet";
import L from "leaflet";
import { useOverlay } from "../hooks/use-overlay";
import type { OverlayConfigItem } from "../types/overlay";

type Props = Pick<OverlayConfigItem, "url" | "iconUrl" | "map" | "request">;

/**
 * Display an 'overlay' - a collection of features as markers on the map that are separate
 * from the main sightings markers and which can be toggled on or off via the layers map control.
 */
export function Overlay({ url, iconUrl, map, request }: Readonly<Props>) {
  const { data: features } = useOverlay(url, map, request);

  const icon = L.icon({
    iconUrl,
    iconSize: [30, 30],
  });

  return features?.map(({ id, latitude, longitude }) => (
    <Marker key={id} position={[latitude, longitude]} icon={icon} zIndexOffset={1000} />
  ));
}
