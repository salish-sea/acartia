import { useQuery } from "@tanstack/react-query";
import type { OverlayMap } from "@/features/map";

type Overlay = {
  /**
   * Overlay id, probably just gonna be used as 'key' for jsx.
   */
  id: string;

  /**
   * Overlay name, if we show a name anywhere, it'll be this.
   */
  name: string;

  /**
   * Overlay latitude, where we put it on the map.
   */
  latitude: number;

  /**
   * Overlay longitude, where we put it on the map!
   */
  longitude: number;
};

/**
 * Retrieve a value from an object given an array of keys.
 * The typing on this feels terrible, pls fix if you know how.
 *
 * @param obj The object to retrieve the value from.
 * @param path An array of keys to index the object on.
 * @returns The value that was retrieved.
 */
function getNested<T, TKeys extends ReadonlyArray<string>>(obj: T, path: TKeys) {
  return path.reduce((acc, key) => acc?.[key], obj as any);
}

/**
 * Map an arbitrary record to an {@link Overlay} object. Expects the keys provided
 * to match keys on the object that should be indexed in order ro retrieve the value.
 * NOTE: A possible way this could be extended is to validate the result of this function
 * with zod & throw or load up a toast notification if the result does not match
 * the schema.
 *
 * @param features List of features to transform into normalised overlay objects.
 * @param map The keys to access each required field from the data.
 * @returns Normalised overlays.
 */
function applyMap<T>(features: Array<T>, map: OverlayMap): Array<Overlay> {
  return features.map((feature) => ({
    id: getNested(feature, map.id.split(".")) as string,
    name: getNested(feature, map.name.split(".")) as string,
    latitude: getNested(feature, map.latitude.split(".")) as number,
    longitude: getNested(feature, map.longitude.split(".")) as number,
  }));
}

/**
 * Custom hook to fetch overlay data dynamically given a url and a map to a normalised
 * shape. The intention of this hook is that we can configure external data sources to fetch
 * overlays from and describe how to retrieve the data that we want from the objects that these
 * data sources return all in configuration. So that we don't need to change the code and rebuild
 * the webapp to add a new overlay. It does make the typing a little dubious though.
 *
 * @param url The url of the datasource to fetch overlay data from.
 * @param map The map object used to extract the fields we want from the data we fetch.
 * @returns Overlays to plot on the map (e.g. hydrophones).
 */
export function useOverlay(
  url: string,
  map: OverlayMap,
  requestOptions?: { body?: object; method?: string },
) {
  return useQuery({
    queryKey: ["overlay", url],
    queryFn: async () => {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: requestOptions?.method ? requestOptions.method : "GET",
        ...(requestOptions?.body && { body: JSON.stringify(requestOptions.body) }),
      });
      return await response.json();
    },
    staleTime: Infinity,
    select: (data) => applyMap(getNested(data, map.features.split(".")), map),
  });
}
