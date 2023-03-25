import { APIClientError, APIServerError } from "./errors";

interface IMessage {
  message: string;
}

function hasMessage(data: unknown): data is IMessage {
  return (data as IMessage)?.message !== undefined;
}

async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);

  const contentType = response.headers.get("content-type");

  let data: unknown;
  try {
    data = await (contentType?.includes("application/json")
      ? response.json()
      : response.text());
  } catch (error) {
    console.error(error);
    throw new Error("Invalid response");
  }

  if (!response.ok) {
    let message: string;
    if (typeof data === "string") {
      message = data;
    } else if (hasMessage(data)) {
      message = data.message;
    } else {
      console.error(data, "Unknown data type");
      message = response.statusText || response.status.toString();
    }

    let error;
    if (response.status >= 500) {
      error = new APIServerError(message);
    } else if (response.status >= 400) {
      error = new APIClientError(message);
    } else {
      error = new Error(message);
    }

    throw error;
  }

  return data as T;
}

export default {
  async get<T>(path: string, config?: RequestInit): Promise<T> {
    const init = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...config,
    };
    return await http<T>(path, init);
  },
  async post<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
    const init = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...config,
    };
    return await http<U>(path, init);
  },
  async put<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
    const init = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...config,
    };
    return await http<U>(path, init);
  },
  async delete<T>(path: string, config?: RequestInit): Promise<T> {
    const init = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      ...config,
    };
    return await http<T>(path, init);
  },
};
