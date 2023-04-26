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

  async testConnectivity() {
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

  async checkServerTime() {
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

  async getExchangeInfo(options: IGetExchangeInfoOptions = {}) {
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

  async getOrderBook(options: IGetOrderBookOptions) {
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

  async getRecentTradesList(options: IGetRecentTradesListOptions) {
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

  async getAggregateTradesList(options: IGetAggregateTradesListOptions) {
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

  async getCandlestickData(options: IGetCandlestickDataOptions) {
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

  async getCurrentAveragePrice(options: IGetCurrentAveragePriceOptions) {
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

  async get24hrTickerPriceChangeStatistics(options: IGet24hrTickerPriceChangeStatisticsOptions = {}) {
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

  async getSymbolPriceTicker(options: IGetSymbolPriceTickerOptions = {}) {
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

  async getSymbolOrderBookTicker(options: IGetSymbolPriceTickerOptions = {}) {
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

  async getRollingWindowPriceChangeStatistics(options: IGetRollingWindowPriceChangeStatisticsOptions = {}) {
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
