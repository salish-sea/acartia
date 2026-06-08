import { useSuspenseQuery } from "@tanstack/react-query";

const mapboxkey = import.meta.env.VITE_MAPBOX_KEY;

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type Config = typeof import("public/config.json");

/**
 * Get the application configuration file.
 */
export function useConfig(): Config {
  return useSuspenseQuery<Config, Error>({
    queryKey: ["config"],
    queryFn: async () => {
      const response = await fetch("/public/config.json");
      const text = await response.text();
      return JSON.parse(text.replaceAll("<mapboxkey>", mapboxkey));
    },
  }).data;
}
