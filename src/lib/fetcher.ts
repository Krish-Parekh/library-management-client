"use client";

import { Cookies } from "react-cookie";
import { AccessTokenKey } from "@/constants/strings";

interface IFetcherParams {
  url: string;
  // eslint-disable-next-line no-undef
  init: RequestInit;
  error: string;
}

async function fetcher({ url, init, error }: IFetcherParams) {
  try {
    const accessToken = new Cookies().get(AccessTokenKey);
    const res = await fetch(url, {
      ...init,
      headers: {
        "Accept-Encoding": "gzip",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        ...init.headers,
      },
    });

    if (res.headers.get("Content-Type") === "text/csv") {
      return await res.text();
    }

    let json;

    try {
      json = await res.json();
    } catch {
      json = {};
    }

    if (res.ok) return json;

    throw new Error(json.error || Object.values(json).join(", "));
  } catch (e) {
    if (e instanceof Error && e.message) {
      throw e;
    } else {
      throw new Error(error);
    }
  }
}

function formatBody<ExtraArgs>(
  arg: ExtraArgs,
  payload?: Record<string, string>
) {
  if (arg) {
    return JSON.stringify(arg);
  }
  if (payload) {
    return JSON.stringify(payload);
  }
  return undefined;
}

export function postJsonFetcher(baseURL: string) {
  return <ExtraArgs>(
    key: string | [string, Record<string, string>],
    options?: Readonly<{ arg: ExtraArgs }>
  ) => {
    const isArray = Array.isArray(key);
    return fetcher({
      url: baseURL + (isArray ? key[0] : key),
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formatBody(options?.arg, isArray ? key[1] : undefined),
      },
      error: "An error occurred while posting the data.",
    });
  };
}

export function deleteFetcher(baseURL: string) {
  return (key: string) =>
    fetcher({
      url: baseURL + key,
      init: { method: "DELETE" },
      error: "An error occurred while deleting the data.",
    });
}

export function postFormFetcher(baseURL: string) {
  return <ExtraArgs>(key: string, options?: Readonly<{ arg: ExtraArgs }>) => {
    const formData = new FormData();
    Object.entries(options?.arg as Record<string, string | File>).forEach(
      ([_key, value]) => {
        formData.append(_key, value);
      }
    );
    return fetcher({
      url: baseURL + key,
      init: {
        method: "POST",
        body: formData,
      },
      error: "An error occurred while posting the data.",
    });
  };
}

export function getFetcher(baseURL: string) {
  return (key: string | [string, string]) =>
    fetcher({
      url: baseURL + (Array.isArray(key) ? key[0] : key),
      init: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      error: "An error occurred while getting the data.",
    });
}

export function putFetcher(baseURL: string) {
  return <ExtraArgs>(key: string, options?: Readonly<{ arg: ExtraArgs }>) =>
    fetcher({
      url: baseURL + key,
      init: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: options ? JSON.stringify(options.arg) : undefined,
      },
      error: "An error occurred while replacing the data.",
    });
}

export function patchFetcher(baseURL: string) {
  return <ExtraArgs>(key: string, options?: Readonly<{ arg: ExtraArgs }>) =>
    fetcher({
      url: baseURL + key,
      init: {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: options ? JSON.stringify(options.arg) : undefined,
      },
      error: "An error occurred while modifying the data.",
    });
}
