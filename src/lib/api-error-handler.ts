import { ApiError } from "./api-error";
import type { ValidationError } from "@/types/api";

export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400: {
        const data = error.data as ValidationError | undefined;
        if (data?.issues?.length) {
          return data.issues.map((i) => i.message).join(", ");
        }
        return (data as { error?: string })?.error || "Invalid request";
      }
      case 401:
        return "Session expired. Please log in again.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "Resource not found.";
      case 409:
        return "This item already exists.";
      case 429:
        return "Too many attempts. Please wait a moment.";
      default: {
        const data = error.data as { error?: string } | undefined;
        return data?.error || "Something went wrong. Please try again.";
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export function isAuthError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

export function isValidationError(error: unknown): error is ApiError & { data: ValidationError } {
  return error instanceof ApiError && error.status === 400;
}

export function getValidationErrors(error: unknown): Array<{ path: string[]; message: string }> {
  if (error instanceof ApiError && error.status === 400) {
    const data = error.data as ValidationError | undefined;
    return data?.issues?.map((i) => ({ path: i.path, message: i.message })) ?? [];
  }
  return [];
}
