import L from "leaflet";
import { hashCode } from "@/utils/string";

/**
 * Get a map icon with a color determined by a given sighting type.
 * NOTE: This isn't great when it returns a green color.
 *
 * @param type The species type.
 * @returns A custom map icon to use with {@link Marker}
 */
export function mapIcon(type: string) {
  const color = `hsl(${Math.abs(hashCode(type) % 360)}, 70%, 50%)`;

  return L.divIcon({
    className: "",
    iconSize: [16, 16],
    // iconAnchor: [16, 32], // TODO: what is this?
    html: `<div style="width: 16px; height: 16px; background-color: ${color}; border-radius: 50%"></div>`,
  });
}
