import { ApiError } from "./api-error";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiOptions = RequestInit & { token?: string };

async function apiRequest<T>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token && token !== "undefined" && token !== "null") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new ApiError(res.status, data);
  }

  return res.json();
}

export const apiClient = {
  get: <T>(path: string, opts?: ApiOptions) =>
    apiRequest<T>(path, { ...opts, method: "GET" }),

  post: <T>(path: string, body?: unknown, opts?: ApiOptions) =>
    apiRequest<T>(path, {
      ...opts,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(path: string, body?: unknown, opts?: ApiOptions) =>
    apiRequest<T>(path, {
      ...opts,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(path: string, opts?: ApiOptions) =>
    apiRequest<T>(path, { ...opts, method: "DELETE" }),
};
