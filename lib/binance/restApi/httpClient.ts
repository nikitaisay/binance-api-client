import axios from "axios";

import { 
  buildQueryString, 
  createSignature, 
  stringifyData 
} from "../../utils/binance";
import { RequestType } from "../../types";

import { 
  httpClientError,
  IApiClientInitializeOptions,
  IHttpClientRequestConfig, 
  THttpClientRequestOptions 
} from "./types";

export abstract class BinanceApiClient {
  protected url: string;
  protected baseApiUrl: string;
  protected testnetUrl: string;
  protected enableTestnet: boolean;

  private readonly apiKey: string;
  private readonly apiSecret: string;

  constructor(options: IApiClientInitializeOptions) {
    this.enableTestnet = options.enableTestnet;
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
  }

  private buildQueryString<P>(params: P): string {
    return buildQueryString(params);
  }

  private stringifyData<V>(value: V): string | V {
    return stringifyData(value);
  }

  private createSignature(queryString: string): string {
    return createSignature(queryString, this.apiSecret);
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

  protected throwError(error?: httpClientError) {
    const err = error || { msg: "Ooops, some error occured", };
    throw new Error(`Error making API call: ${JSON.stringify(err)}`);
  }

  protected async publicRequest<P, D>(options: THttpClientRequestOptions<P, D>) {
    return await this.request({
      ...options,
      params: options.params,
      data: options.data,
    });
  }

  protected async keyedRequest<P, D>(options: THttpClientRequestOptions<P, D>) {
    return await this.request({ 
      ...options,
      params: options.params,
      data: options.data,
      headers: {
        "X-MBX-APIKEY": this.apiKey,
      },
    });
  }

  protected async privateRequest<P, D>(options: THttpClientRequestOptions<P, D>) {
    return await this.signedRequest<P, D>(
      options.method, 
      options.path, 
      options.params, 
      options.data
    );
  }
}
