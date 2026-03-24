const mapboxkey = import.meta.env.VITE_MAPBOX_KEY;

const [long, lat] = [122, 47];

const config = {
  maps: [
    {
      tiles: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxkey}`,
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/${long},${lat},8,0/128x128?access_token=${mapboxkey}&attribution=false&logo=false`,
      label: "Default",
      contrastColor: "black",
    },
    {
      tiles: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxkey}`,
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${long},${lat},8,0/128x128?access_token=${mapboxkey}&attribution=false&logo=false`,
      label: "Satellite",
      contrastColor: "white",
    },
    {
      tiles: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxkey}`,
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${long},${lat},8,0/128x128?access_token=${mapboxkey}&attribution=false&logo=false`,
      label: "Terrain",
      contrastColor: "black",
    },
  ],
  overlays: [
    {
      url: "https://live.orcasound.net/graphql",
      thumbnail: "/hydrophones.png",
      iconUrl: "https://live.orcasound.net/_next/static/media/hydrophone-default.7c429feb.svg",
      label: "Hydrophones",
      // This is like crappy json path / xpath.
      map: {
        features: "data.feeds",
        id: "id",
        name: "name",
        latitude: "latLng.lat",
        longitude: "latLng.lng",
      },
      request: {
        body: {
          query: "\n query Feeds {\n feeds {\n id\n name\n latLng {\n lat\n lng\n }\n }\n }\n ",
        },
        method: "POST",
      },
    },
  ],
};

/**
 * Get the application configuration file.
 * TODO: fetch & cache this from the backend using react query probably to take advantage of the query cache.
 */
export function useConfig() {
  return config;
}
