import { BINANCE_API_URLS } from "../../../constants";

import { RequestType } from "../enums";
import { BinanceApiClient } from "../httpClient";

import { IApiClientInitializeOptions } from "../types";

import { IListenKeyRequestOptions } from "./types";

export class BinanceSpotDataStreamApi extends BinanceApiClient {
  constructor(options: IApiClientInitializeOptions) {
    super(options);
    this.baseApiUrl = BINANCE_API_URLS.SPOT.BASE;
    this.testnetUrl = BINANCE_API_URLS.SPOT.TESTNET;
    this.url = options.enableTestnet ? this.testnetUrl : this.baseApiUrl;
  }

  async createListenKey() {
    try {
      const res = await this.keyedRequest({
        method: RequestType.POST,
        path: "/api/v3/userDataStream",
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async pingListenKey(options: IListenKeyRequestOptions) {
    try {
      const res = await this.keyedRequest({
        method: RequestType.PUT,
        path: "/api/v3/userDataStream",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async closeListenKey(options: IListenKeyRequestOptions) {
    try {
      const res = await this.keyedRequest({
        method: RequestType.DELETE,
        path: "/api/v3/userDataStream",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }
}
