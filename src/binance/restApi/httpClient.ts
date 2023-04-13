import * as crypto from "crypto";
import axios from "axios";

import { DEFAULT_REQUEST_ERROR_MESSAGE } from "../../constants";

import { 
  httpClientError,
  IApiClientInitializeOptions,
  IHttpClientRequestConfig, 
  IHttpClientRequestOptions 
} from "./types";

import { RequestType } from "./enums";

export class BinanceApiClient {
  url: string;
  baseApiUrl: string;
  testnetUrl: string;
  enableTestnet: boolean;

  private readonly apiKey: string;
  private readonly apiSecret: string;

  constructor(options: IApiClientInitializeOptions) {
    this.enableTestnet = options.enableTestnet;
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
  }

  private buildQueryString<P>(params: P): string {
    if (!params) {
      return "";
    }

    return Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(this.stringifyData(value))}`)
      .join("&");
  }

  private stringifyData<V>(value: V): string | V {
    return Array.isArray(value) ? `["${value.join("\",\"")}"]` : value;
  }

  private createSignature(queryString: string): string {
    return crypto
      .createHmac("sha256", this.apiSecret)
      .update(queryString)
      .digest("hex");
  }

  private async signedRequest<P, D>(
    method: RequestType,
    path: string,
    params: P,
    data: D
  ) {
    const timestamp = Date.now();
    const queryString = this.buildQueryString({ ...params, timestamp, });
    const signature = this.createSignature(queryString);
    const requestBody = data ? JSON.stringify(data) : undefined;

    const response = await this.request({
      path,
      method,
      params: {
        ...params,
        signature,
        timestamp,
      },
      headers: {
        "X-MBX-APIKEY": this.apiKey,
      },
      data: requestBody,
    });

    return response.data;
  }

  private async request<P, D>(options: IHttpClientRequestConfig<P, D>) {
    const stringifiedParams = Object.entries(options.params || {})
      .reduce((acc, [key, value]) => {
        acc[key] = this.stringifyData(value);
        return acc;
      }, {});

    const config: Record<string, unknown> = {
      url: options.path,
      method: options.method,
      baseURL: this.url,
      params: stringifiedParams,
      data: options.data,
    };

    if (options.headers) {
      config.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
    }

    return await axios.request(config);
  }

  throwError(error: httpClientError) {
    console.log(error);
    throw new Error(error?.message || DEFAULT_REQUEST_ERROR_MESSAGE);
  }

  async publicRequest<P, D>(options: IHttpClientRequestOptions<P, D>) {
    return await this.request({
      ...options,
      params: options.params,
      data: options.data,
    });
  }

  async keyedRequest<P, D>(options: IHttpClientRequestOptions<P, D>) {
    return await this.request({ 
      ...options,
      params: options.params,
      data: options.data,
      headers: {
        "X-MBX-APIKEY": this.apiKey,
      },
    });
  }

  async privateRequest<P, D>(options: IHttpClientRequestOptions<P, D>) {
    return await this.signedRequest<P, D>(
      options.method, 
      options.path, 
      options.params, 
      options.data
    );
  }
}
