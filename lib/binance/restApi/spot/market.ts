import { validateRequiredParams } from "../../../utils/decorators";
import { BINANCE_API_URLS } from "../../../constants";
import { RequestType } from "../../../types";

import { BinanceApiClient } from "../httpClient";
import { IApiClientInitializeOptions } from "../types";

import { 
  IGet24hrTickerPriceChangeStatisticsOptions,
  IGetAggregateTradesListOptions,
  IGetCandlestickDataOptions,
  IGetCurrentAveragePriceOptions,
  IGetExchangeInfoOptions, 
  IGetOrderBookOptions, 
  IGetRecentTradesListOptions, 
  IGetRollingWindowPriceChangeStatisticsOptions, 
  IGetSymbolPriceTickerOptions
} from "./types";

export class BinanceSpotMarketApi extends BinanceApiClient {
  constructor(options: IApiClientInitializeOptions) {
    super(options);
    this.baseApiUrl = BINANCE_API_URLS.SPOT.BASE;
    this.testnetUrl = BINANCE_API_URLS.SPOT.TESTNET;
    this.url = options.enableTestnet ? this.testnetUrl : this.baseApiUrl;
  }

  public async testConnectivity() {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/ping",
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async checkServerTime() {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/time",
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getExchangeInfo(options: IGetExchangeInfoOptions = {}) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/exchangeInfo",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async getOrderBook(options: IGetOrderBookOptions) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/depth",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async getRecentTradesList(options: IGetRecentTradesListOptions) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/depth",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async getAggregateTradesList(options: IGetAggregateTradesListOptions) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/aggTrades",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol", "interval"])
  public async getCandlestickData(options: IGetCandlestickDataOptions) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/klines",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  @validateRequiredParams(["symbol"])
  public async getCurrentAveragePrice(options: IGetCurrentAveragePriceOptions) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/avgPrice",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async get24hrTickerPriceChangeStatistics(options: IGet24hrTickerPriceChangeStatisticsOptions = {}) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/ticker/24hr",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getSymbolPriceTicker(options: IGetSymbolPriceTickerOptions = {}) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/ticker/price",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getSymbolOrderBookTicker(options: IGetSymbolPriceTickerOptions = {}) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/ticker/bookTicker",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  public async getRollingWindowPriceChangeStatistics(options: IGetRollingWindowPriceChangeStatisticsOptions = {}) {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/api/v3/ticker",
        params: options,
      });
      return res.data;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }
}
