import { RequestType } from "./enums";

export interface IHttpClientRequestConfig<P, D = null> {
  method: RequestType;
  path: string;
  params?: P;
  headers?: Record<string, unknown>;
  data?: D;
}

export type IHttpClientRequestOptions<P, D> = Omit<IHttpClientRequestConfig<P, D>, "headers">;

export interface httpClientError {
  code: number;
  message: string;
}

export interface IApiClientInitializeOptions {
  enableTestnet: boolean;
  apiKey: string;
  apiSecret: string;
}
