import { QueryClient } from "@tanstack/react-query";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { Middleware } from "openapi-fetch";
import type { paths } from "@/lib/api/v1";
import { ApiError } from "@/lib/api/api-error";

const fetchClient = createFetchClient<paths>({ baseUrl: import.meta.env.VITE_BASE_URL });

const middleware: Middleware = {
  /**
   * Fetch does not throw for 4xx, 5xx responses so we must manually do so.
   */
  async onResponse({ response }) {
    if (!response.ok) {
      let body: unknown = null;

      try {
        body = await response.json();
      } catch {
        // non-json response
      }

      throw ApiError.fromResponse(body, response.status);
    }
  },
};

fetchClient.use(middleware);

export const api = createClient(fetchClient);

export const queryClient = new QueryClient();
