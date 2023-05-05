import { validateRequiredParams } from "../../../utils/decorators";
import { BINANCE_API_URLS } from "../../../constants";
import { RequestType } from "../../../types";

import { IApiClientInitializeOptions } from "../types";

import { BinanceApiClient } from "../httpClient";

import { IListenKeyRequestOptions } from "./types";

export class BinanceSpotDataStreamApi extends BinanceApiClient {
  constructor(options: IApiClientInitializeOptions) {
    super(options);
    this.baseApiUrl = BINANCE_API_URLS.SPOT.BASE;
    this.testnetUrl = BINANCE_API_URLS.SPOT.TESTNET;
    this.url = options.enableTestnet ? this.testnetUrl : this.baseApiUrl;
  }

  public async createListenKey() {
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

  @validateRequiredParams(["listenKey"])
  public async pingListenKey(options: IListenKeyRequestOptions) {
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

  @validateRequiredParams(["listenKey"])
  public async closeListenKey(options: IListenKeyRequestOptions) {
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
