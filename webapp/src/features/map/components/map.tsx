import { useSearch } from "@tanstack/react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { api } from "@/lib/api";
import {
  LayersCard,
  Overlay,
  ZoomControls,
  mapIcon,
  useMapLayers,
  useMapOverlays,
  useResizeMap,
} from "@/features/map";

/**
 * TODO - Maybe we should return dummy list from useOverlays, should probably do suspense query or something for the Layers card?
 * Instead of calling useMapOverlays here perhaps we should move it to be called inside that component.
 */

/**
 * Displays a leaflet map.
 */
export function Map() {
  const registerResize = useResizeMap();
  const { selectedLayer, onLayerChange, maps } = useMapLayers();
  const { overlays, activeOverlays, onToggleOverlay } = useMapOverlays();
  const query = useSearch({ from: "/" });
  const { data: sightings = [] } = api.useQuery("get", "/sightings", { params: { query } });

  return (
    <MapContainer
      center={[48.27, -123.23]} // TODO: Get this from config
      zoom={8}
      zoomControl={false}
      doubleClickZoom={false}
      scrollWheelZoom={true}
      style={{ flex: 1 }}
      attributionControl={false}
      whenReady={registerResize}
    >
      <TileLayer url={selectedLayer.tiles} keepBuffer={10} />
      {activeOverlays.map(({ label, url, iconUrl, map, request }) => (
        <Overlay key={label} url={url} iconUrl={iconUrl} map={map} request={request} />
      ))}
      {sightings.map((sighting) => (
        <Marker
          key={sighting.ssemmi_id}
          position={[sighting.latitude, sighting.longitude]}
          icon={mapIcon(sighting.type)}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
      <LayersCard
        selected={selectedLayer}
        onLayersChange={onLayerChange}
        maps={maps}
        overlays={overlays}
        activeOverlays={activeOverlays}
        onToggleOverlay={onToggleOverlay}
      />
      <ZoomControls />
    </MapContainer>
  );
}
