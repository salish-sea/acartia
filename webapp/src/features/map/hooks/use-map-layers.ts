import { useState } from "react";
import type { MapLayer } from "@/features/map";
import { useConfig } from "@/hooks/use-config";

type Return = {
  /**
   * List of all map layers to be rendered in the layers panel.
   */
  maps: Array<MapLayer>;

  /**
   * The selected map layer.
   */
  selectedLayer: MapLayer;

  /**
   * Callback to change active map layer to a given index.
   */
  onLayerChange: (index: number) => void;
};

/**
 * Hook for managing which map tile layer thingy is selected.
 */
export function useMapLayers(): Return {
  const { maps } = useConfig();
  const [mapUrlIndex, setMapUrlIndex] = useState<number>(0);
  const selectedLayer = maps[mapUrlIndex]!;

  const onLayerChange = (index: number) => {
    // Guard against out of index errors, this should never happen.
    if (index >= maps.length) {
      setMapUrlIndex(0);
    }
    setMapUrlIndex(index);
  };

  return { maps, selectedLayer, onLayerChange };
}
