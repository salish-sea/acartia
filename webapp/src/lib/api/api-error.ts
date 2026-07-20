import z from "zod";

const ApiErrorSchema = z.object({ message: z.string(), error: z.string(), status: z.number() });

/**
 * Javascript Error representation of the api error json object from our openapi schema.
 */
export class ApiError extends Error {
  readonly error: string;
  readonly status: number;

  constructor(message: string, error: string, status: number) {
    super(message);
    this.error = error;
    this.status = status;
  }

  /**
   * Parse an unknown api response object into an {@link ApiError} object. Fall back to
   * a generic message if the response object is not the correct shape.
   *
   * @param body The response body object to parse.
   * @param status The http status code from the response header.
   * @returns The parsed {@link ApiError} object
   */
  static fromResponse(body: unknown, status: number) {
    const parsed = ApiErrorSchema.safeParse(body);

    if (parsed.success) {
      return new ApiError(parsed.data.message, parsed.data.error, parsed.data.status);
    }

    return new ApiError("An unexpected error occured", "Error", status);
  }
}
