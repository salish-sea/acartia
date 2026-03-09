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
      tiles: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // TODO
      thumbnail: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${long},${lat},8,0/128x128?access_token=${mapboxkey}&attribution=false&logo=false`,
      label: "Terrain",
      contrastColor: "white",
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
