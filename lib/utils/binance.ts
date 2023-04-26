import * as crypto from "crypto";

export function stringifyData<V>(value: V): string | V {
  return Array.isArray(value) ? `["${value.join("\",\"")}"]` : value;
}

export function buildQueryString<P>(params: P): string {
  if (!params) {
    return "";
  }

  return Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(stringifyData(value))}`)
    .join("&");
}

export function createSignature(queryString: string, apiSecret: string): string {
  return crypto
    .createHmac("sha256", apiSecret)
    .update(queryString)
    .digest("hex");
}
