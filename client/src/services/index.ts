"use server";

import { headers } from "next/headers";

import { CONFIG } from "../config";
import { tryRefreshSessionData } from "@/helper/cookie.helper";

export const retryFetcher = async <T = any>(
  url: string,
  options: RequestInit & {
    isPublicRoute?: boolean;
  } = {
    isPublicRoute: false,
  },
): Promise<{
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
  pagination?: {
    total: number;
    limit: number;
    totalPages: number;
    page: number;
  };
}> => {
  let response;
  if (!options?.isPublicRoute) {
    const reqHeaders = new Headers(await headers());
    reqHeaders.delete("content-length"); // UND_ERR_REQ_CONTENT_LENGTH_MISMATCH
    reqHeaders.delete("content-type");

    await tryRefreshSessionData(reqHeaders);

    response = await fetch(CONFIG.apiEndpoint + url, {
      method: "GET",
      ...options,
      headers: {
        ...Object.fromEntries(reqHeaders.entries()),
        ...(options?.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...options?.headers,
      },
    }).catch((error) => {
      console.log("fetch error");
      console.error(error);

      throw new Response("Lỗi hệ thống", {
        status: 500,
      });
    });
  } else {
    response = await fetch(CONFIG.apiEndpoint + url, options).catch((error) => {
      console.log("fetch error");
      console.error(error);

      throw new Response("Lỗi hệ thống", {
        status: 500,
      });
    });
  }
  if (!response) {
    console.log("fetch error");
    console.error("No response");

    throw new Response("Lỗi hệ thống", {
      status: 500,
    });
  }

  try {
    const data = (await response.json()) as {
      data: T;
      message: string;
      path: string;
      statusCode: number;
      timestamp: string;
    };

    if (response.ok && response.status < 400) {
      console.log(
        "%s %s \x1b[32m%s\x1b[0m",
        options?.method || "GET",
        url,
        response.status,
      );
    } else {
      console.log(
        "%s %s \x1b[31m%s\x1b[0m",
        options?.method || "GET",
        url,
        response.status,
      );
      throw new Error(data.message || "Lỗi hệ thống");
    }
    return data;
  } catch (error) {
    console.log("fetch error");
    console.error(error);

    throw new Response(
      error instanceof Error ? error.message : "Lỗi hệ thống",
      {
        status: 500,
      },
    );
  }
};
