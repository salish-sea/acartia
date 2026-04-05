import { QueryClient } from "@tanstack/react-query";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { Middleware } from "openapi-fetch";
import type { paths } from "./v1";
import { authStore } from "@/stores/auth-store";

const fetchClient = createFetchClient<paths>({ baseUrl: import.meta.env.VITE_BASE_URL });

const middleware: Middleware = {
  /**
   * Attach the users JWT if we have it.
   */
  onRequest({ request }) {
    const token = authStore.getSnapshot().token;
    if (token !== undefined) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  },
};

fetchClient.use(middleware);

export const api = createClient(fetchClient);

export const queryClient = new QueryClient();
