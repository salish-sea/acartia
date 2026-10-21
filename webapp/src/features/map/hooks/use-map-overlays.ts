import { useState } from "react";
import type { OverlayConfigItem } from "@/features/map/types/overlay";
import { useConfig } from "@/hooks/use-config";

type Return = {
  /**
   * List of all map overlays to be rendered in the layers card.
   */
  overlays: Array<OverlayConfigItem>;

  /**
   * List of the active map overlays to be rendered on the map.
   */
  activeOverlays: Array<OverlayConfigItem>;

  /**
   * Callback to toggle a map overlay on or off.
   */
  onToggleOverlay: (overlay: OverlayConfigItem) => void;
};

/**
 * Hook for managing map overlay state (e.g. Hydrophones and stuff).
 */
export function useMapOverlays(): Return {
  const { overlays } = useConfig();
  const [activeOverlays, setActiveOverlays] = useState<Array<OverlayConfigItem>>([]);

  const onToggleOverlay = (overlay: OverlayConfigItem) => {
    setActiveOverlays((prev) =>
      prev.some((o) => o.label === overlay.label)
        ? prev.filter((o) => o.label !== overlay.label)
        : [...prev, overlay],
    );
  };

  return { overlays, activeOverlays, onToggleOverlay };
}
