import { BINANCE_API_URLS } from "../../constants";

import { RequestType } from "../enums";
import { BinanceApiClient } from "../httpClient";
import { IApiClientInitializeOptions } from "../types";

import { 
  IGetAccountInformationOptions,
  IGetAccountTradeListOptions,
  IGetAllOrdersOptions,
  IGetCurrentOpenOrdersOptions,
  INewOrderOptions,
  IQueryAllOcoOptions,
  IQueryCurrentOrderCountUsageOptions,
  IQueryOcoOptions,
  IQueryOpenOcoOptions,
  IQueryOrderOptions, 
  ITestNewOrderOptions
} from "./types";

export class BinanceSpotTradeApi extends BinanceApiClient {
  constructor(options: IApiClientInitializeOptions) {
    super(options);
    this.baseApiUrl = BINANCE_API_URLS.SPOT.BASE;
    this.testnetUrl = BINANCE_API_URLS.SPOT.TESTNET;
    this.url = options.enableTestnet ? this.testnetUrl : this.baseApiUrl;
  }

  async queryOrder(options: IQueryOrderOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/api/v3/order",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  async getCurrentOpenOrders(options: IGetCurrentOpenOrdersOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/api/v3/openOrders",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  async getAllOrders(options: IGetAllOrdersOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/api/v3/allOrders",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  // Either orderListId or origClientOrderId must be provided
  async queryOco(options: IQueryOcoOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/api/v3/orderList",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  async queryAllOco(options: IQueryAllOcoOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/api/v3/allOrderList",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  async queryOpenOco(options: IQueryOpenOcoOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/api/v3/openOrderList",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  async getAccountInformation(options: IGetAccountInformationOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/api/v3/account",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  async getAccountTradeList(options: IGetAccountTradeListOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/api/v3/myTrades",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  async queryCurrentOrderCountUsage(options: IQueryCurrentOrderCountUsageOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/api/v3/rateLimit/order",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  async testNewOrder(options: ITestNewOrderOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/api/v3/order/test",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }

  async newOrder(options: INewOrderOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/api/v3/order",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data);
    }
  }
}
