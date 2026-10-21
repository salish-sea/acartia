import L from "leaflet";
import { hashCode } from "@/utils/string";

/**
 * Get the color to draw to the map for a given species type.
 *
 * @param type The species type
 * @returns The color as a string to render on the map for that species type.
 */
export const getMapIconColor = (type: string) => `hsl(${Math.abs(hashCode(type) % 360)}, 70%, 50%)`;

/**
 * Get a map icon with a color determined by a given sighting type.
 * NOTE: This isn't great when it returns a green color.
 *
 * @param type The species type.
 * @returns A custom map icon to use with {@link Marker}
 */
export function mapIcon(type: string) {
  return L.divIcon({
    className: "",
    iconSize: [16, 16],
    // iconAnchor: [16, 32], // TODO: what is this?
    html: `<div style="width: 16px; height: 16px; background-color: ${getMapIconColor(type)}; border-radius: 50%"></div>`,
  });
}
