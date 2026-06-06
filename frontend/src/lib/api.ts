export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not set");
}

export async function postJson<T = unknown>(path: string, body: unknown, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      body: JSON.stringify(body),
      ...init,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error && error.message.includes("Failed to fetch")
        ? `Could not reach backend API at ${API_BASE_URL}. Start the backend server and try again.`
        : error instanceof Error
        ? error.message
        : "Network request failed",
    );
  }

  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    const errorBody = contentType.includes("application/json") ? await res.json() : await res.text();

    let message = res.statusText;
    if (typeof errorBody === "string") {
      message = errorBody;
    } else if (typeof errorBody === "object" && errorBody !== null) {
      const maybeMessage = (errorBody as Record<string, unknown>).message;
      if (typeof maybeMessage === "string") {
        message = maybeMessage;
      }
    }

    throw new Error(message);
  }

  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }

  return (await res.text()) as unknown as T;
}

export async function getJson<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      ...init,
    });
  } catch (error) {
    throw new Error(
      error instanceof Error && error.message.includes("Failed to fetch")
        ? `Could not reach backend API at ${API_BASE_URL}. Start the backend server and try again.`
        : error instanceof Error
        ? error.message
        : "Network request failed",
    );
  }

  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    const errorBody = contentType.includes("application/json") ? await res.json() : await res.text();

    let message = res.statusText;
    if (typeof errorBody === "string") {
      message = errorBody;
    } else if (typeof errorBody === "object" && errorBody !== null) {
      const maybeMessage = (errorBody as Record<string, unknown>).message;
      if (typeof maybeMessage === "string") {
        message = maybeMessage;
      }
    }

    throw new Error(message);
  }

  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }

  return (await res.text()) as unknown as T;
}
