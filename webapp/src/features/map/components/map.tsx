import { useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useConfig } from "@/hooks/useConfig";
import { api } from "@/lib/api/api";
import { LayersCard, ZoomControls, mapIcon, useResizeMap } from "@/features/map";

/**
 * Displays a leaflet map.
 */
export function Map() {
  const { maps } = useConfig();
  const [mapUrlIndex, setMapUrlIndex] = useState(0);
  const mapUrl = maps[mapUrlIndex]!.tiles;
  const registerResize = useResizeMap();
  const query = useSearch({ from: "/" });
  const { data: sightings = [] } = api.useQuery("get", "/sightings", { params: { query } });

  const handleChange = (index: number) => {
    // Guard against out of index errors, this should never happen.
    if (index >= maps.length) {
      setMapUrlIndex(0);
    }
    setMapUrlIndex(index);
  };

  return (
    <MapContainer
      center={[48.27, -123.23]} // TODO: Get this from config
      zoom={8}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ flex: 1 }}
      attributionControl={false}
      whenReady={registerResize}
    >
      <TileLayer url={mapUrl} keepBuffer={10} />
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
      <LayersCard selected={mapUrlIndex} onLayersChange={handleChange} maps={maps} />
      <ZoomControls />
    </MapContainer>
  );
}
