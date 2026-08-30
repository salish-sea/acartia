/**
 * Export types from our generated OpenApi with custom names from here for use throughout the application.
 */

import type { components } from "@/lib/api/v1";

export type ApiError = components["schemas"]["ApiError"];
export type Sighting = components["schemas"]["Sighting"];
export type User = components["schemas"]["User"];
