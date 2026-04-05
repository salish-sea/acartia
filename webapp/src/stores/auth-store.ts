import type { User } from "@/types/api";

export type AuthState = {
  /**
   * The users JWT token.
   */
  token: string | undefined;

  /**
   * The users details.
   */
  user: User | undefined;
};

let state: AuthState = {
  token: undefined,
  user: undefined,
};

const listeners = new Set<() => void>();

/**
 * Store our auth details in-memory. Ideally one day
 * we switch to http-only cookie storage with a traditional
 * stateful session token.
 */
export const authStore = {
  getSnapshot: () => state,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  login: ({ token, user }: AuthState) => {
    console.log("logging in");
    state = { token, user };
    listeners.forEach((listener) => listener());
  },
  logout: () => {
    state = { token: undefined, user: undefined };
    listeners.forEach((listener) => listener());
  },
};
