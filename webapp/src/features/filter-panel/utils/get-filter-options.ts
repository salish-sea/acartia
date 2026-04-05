import type { Sighting } from "@/types/api";

type Return = { speciesOptions: Set<string>; contributorOptions: Set<string> };

/**
 * Get species and contributor options from filter panel from list of sightings.
 * Doing this sucks, once you filter on a subset of species, you can no longer access
 * the species you filtered out.
 * Better solution is a separate options endpoint, not sure what to call it.
 * Something like GET /sightings/species?startDate=<>&endDate=<>
 * and GET /sightings/contributors?startDate=<>&endDate=<>
 * Not sure if this is the best idea.
 * Possible other idea is to only query the backend on start and end date.
 * Species, contributor and trusted filtering is frontend only?
 * Need to stew this over.
 *
 * @param sightings List of sightings to return species and contributors for.
 * @returns The list of species and contributors.
 */
export function getFilterOptions(sightings: Array<Sighting>): Return {
  const speciesOptions = new Set(sightings.map((sighting) => sighting.type));
  const contributorOptions = new Set(sightings.map((sighting) => sighting.data_source_name));
  return { speciesOptions, contributorOptions };
}
