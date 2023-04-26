import { BINANCE_API_URLS } from "../../../constants";
import { RequestType } from "../../../types";

import { BinanceApiClient } from "../httpClient";
import { IApiClientInitializeOptions } from "../types";

import { 
  ICancelAllOpenOrdersOnSymbolOptions,
  ICancelExistingOrderAndSendNewOptions,
  ICancelOcoOptions,
  ICancelOrderOptions,
  IGetAccountInformationOptions,
  IGetAccountTradeListOptions,
  IGetAllOrdersOptions,
  IGetCurrentOpenOrdersOptions,
  INewLimitMakerOrderOptions,
  INewLimitOrderOptions,
  INewMarketOrderOptions,
  INewOcoOptions,
  INewOrderOptions,
  INewStopLossLimitOrderOptions,
  INewTakeProfitLimitOrderOptions,
  IQueryAllOcoOptions,
  IQueryCurrentOrderCountUsageOptions,
  IQueryOcoOptions,
  IQueryOpenOcoOptions,
  IQueryOrderOptions, 
  ITestNewLimitMakerOrderOptions, 
  ITestNewLimitOrderOptions, 
  ITestNewMarketOrderOptions, 
  ITestNewOrderOptions,
  ITestNewStopLossLimitOrderOptions,
  ITestNewTakeProfitLimitOrderOptions
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
      this.throwError(error?.response?.data?.message);
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
      this.throwError(error?.response?.data?.message);
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
      this.throwError(error?.response?.data?.message);
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
      this.throwError(error?.response?.data?.message);
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
      this.throwError(error?.response?.data?.message);
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
      this.throwError(error?.response?.data?.message);
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
      this.throwError(error?.response?.data?.message);
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
      this.throwError(error?.response?.data?.message);
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
      this.throwError(error?.response?.data?.message);
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
      this.throwError(error?.response?.data?.message);
    }
  }

  async testNewLimitOrder(options: ITestNewLimitOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "LIMIT",
    });
  }

  async testNewMarketOrder(options: ITestNewMarketOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "MARKET",
    });
  }

  async testNewStopLossLimitOrder(options: ITestNewStopLossLimitOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "STOP_LOSS_LIMIT",
    });
  }

  async testNewTakeProfitLimitOrder(options: ITestNewTakeProfitLimitOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "TAKE_PROFIT_LIMIT",
    });
  }

  async testNewLimitMakerOrder(options: ITestNewLimitMakerOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "LIMIT_MAKER",
    });
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
      this.throwError(error?.response?.data?.message);
    }
  }

  async newLimitOrder(options: INewLimitOrderOptions) {
    return await this.newOrder({
      ...options, type: "LIMIT",
    });
  }

  async newMarketOrder(options: INewMarketOrderOptions) {
    return await this.newOrder({
      ...options, type: "MARKET",
    });
  }

  async newStopLossLimitOrder(options: INewStopLossLimitOrderOptions) {
    return await this.newOrder({
      ...options, type: "STOP_LOSS_LIMIT",
    });
  }

  async newTakeProfitLimitOrder(options: INewTakeProfitLimitOrderOptions) {
    return await this.newOrder({
      ...options, type: "TAKE_PROFIT_LIMIT",
    });
  }

  async newLimitMakerOrder(options: INewLimitMakerOrderOptions) {
    return await this.newOrder({
      ...options, type: "LIMIT_MAKER",
    });
  }

  async cancelAllOpenOrdersOnSymbol(options: ICancelAllOpenOrdersOnSymbolOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.DELETE,
        path: "/api/v3/openOrders",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async cancelOrder(options: ICancelOrderOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.DELETE,
        path: "/api/v3/order",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  //   Price Restrictions:
  // SELL: Limit Price > Last Price > Stop Price
  // BUY: Limit Price < Last Price < Stop Price
  // Quantity Restrictions:
  // Both legs must have the same quantity
  // ICEBERG quantities however do not have to be the same.
  // Order Rate Limit
  // OCO counts as 2 orders against the order rate limit.
  async newOco(options: INewOcoOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/api/v3/order/oco",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async cancelOco(options: ICancelOcoOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/api/v3/orderList",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async cancelExistingOrderAndSendNew(options: ICancelExistingOrderAndSendNewOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/api/v3/order/cancelReplace",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }
}
