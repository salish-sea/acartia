import type { UseQueryResult } from "@tanstack/react-query";
import type { ApiError, User } from "@/types/api";
import { api } from "@/lib/api";

/**
 * Retrieves the currently logged in user, or undefined if the user is not signed in.
 *
 * @returns The currently logged in user.
 */
export function useAuthentication(): UseQueryResult<User, ApiError> {
  return api.useQuery("get", "/profile", {}, { staleTime: Infinity });
}
