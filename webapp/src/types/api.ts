/**
 * Export types from our generated OpenApi with custom names from here for use throughout the application.
 */

import type { components } from "@/lib/api/v1";

export type Sighting = components["schemas"]["sighting"];
export type User = components["schemas"]["auth-response"]["user"];
