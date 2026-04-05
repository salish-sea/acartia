import { useSyncExternalStore } from "react";
import type { AuthState } from "@/stores/auth-store";
import { authStore } from "@/stores/auth-store";

const { login, logout } = authStore;

type Return = {
  /**
   * Callback to log in a user.
   */
  login: (state: AuthState) => void;

  /**
   * Callback to log out a user.
   */
  logout: () => void;
} & AuthState;

/**
 * Reactive binding to the auth store.
 *
 * @returns Login and logout functions and the users JWT token and details.
 */
export function useAuth(): Return {
  const { token, user } = useSyncExternalStore(authStore.subscribe, authStore.getSnapshot);
  return { token, user, login, logout };
}
