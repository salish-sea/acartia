import { useCallback, useEffect, useRef } from "react";
import type { Map } from "leaflet";

/**
 * A hook for managing the resizing of a react-leaflet MapContainer component.
 * TODO: Is it bad how we cleanup & re-register on every re-run?
 *
 * @returns a callback to be registered as whenReady on the react-leaflet MapContainer component.
 */
export function useResizeMap(): () => void {
  const observerRef = useRef<ResizeObserver>(null);
  const mapRef = useRef<Map>(null);

  const registerResize = useCallback(({ target }: { target: Map }) => {
    mapRef.current = target;
    const container = target.getContainer();

    observerRef.current = new ResizeObserver(() => {
      target.invalidateSize({ pan: false });
    });

    observerRef.current.observe(container);
  }, []);

  useEffect(() => {
    // Re-register resize-observer on re-render.
    if (mapRef.current) registerResize({ target: mapRef.current });
    // Cleanup resize observer on unmount.
    return () => observerRef.current?.disconnect();
  }, [registerResize]);

  /**
   * LeafletMap's whenReady callback is incorrectly typed so we need to cast here.
   * See: https://github.com/PaulLeCam/react-leaflet/issues/1120
   */
  return registerResize as () => void;
}
