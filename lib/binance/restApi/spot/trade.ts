import { validateRequiredParams } from "../../../utils/decorators";
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

  @validateRequiredParams(["symbol"])
  public async queryOrder(options: IQueryOrderOptions) {
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

  public async getCurrentOpenOrders(options: IGetCurrentOpenOrdersOptions = {}) {
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

  @validateRequiredParams(["symbol"])
  public async getAllOrders(options: IGetAllOrdersOptions) {
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
  public async queryOco(options: IQueryOcoOptions = {}) {
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

  public async queryAllOco(options: IQueryAllOcoOptions = {}) {
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

  public async queryOpenOco(options: IQueryOpenOcoOptions = {}) {
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

  public async getAccountInformation(options: IGetAccountInformationOptions = {}) {
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

  @validateRequiredParams(["symbol"])
  public async getAccountTradeList(options: IGetAccountTradeListOptions) {
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

  public async queryCurrentOrderCountUsage(options: IQueryCurrentOrderCountUsageOptions = {}) {
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

  @validateRequiredParams(["symbol", "side", "type"])
  public async testNewOrder(options: ITestNewOrderOptions) {
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

  @validateRequiredParams(["symbol", "side", "timeInForce", "quantity", "price"])
  public async testNewLimitOrder(options: ITestNewLimitOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "LIMIT",
    });
  }

  @validateRequiredParams(["symbol", "side"])
  public async testNewMarketOrder(options: ITestNewMarketOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "MARKET",
    });
  }

  @validateRequiredParams(["symbol", "side", "timeInForce", "quantity", "price"])
  public async testNewStopLossLimitOrder(options: ITestNewStopLossLimitOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "STOP_LOSS_LIMIT",
    });
  }

  @validateRequiredParams(["symbol", "side", "timeInForce", "quantity", "price"])
  public async testNewTakeProfitLimitOrder(options: ITestNewTakeProfitLimitOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "TAKE_PROFIT_LIMIT",
    });
  }

  @validateRequiredParams(["symbol", "side", "quantity", "price"])
  public async testNewLimitMakerOrder(options: ITestNewLimitMakerOrderOptions) {
    return await this.testNewOrder({
      ...options, type: "LIMIT_MAKER",
    });
  }

  @validateRequiredParams(["symbol", "side", "type"])
  public async newOrder(options: INewOrderOptions) {
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

  @validateRequiredParams(["symbol", "side", "timeInForce", "quantity", "price"])
  public async newLimitOrder(options: INewLimitOrderOptions) {
    return await this.newOrder({
      ...options, type: "LIMIT",
    });
  }

  @validateRequiredParams(["symbol", "side"])
  public async newMarketOrder(options: INewMarketOrderOptions) {
    return await this.newOrder({
      ...options, type: "MARKET",
    });
  }

  @validateRequiredParams(["symbol", "side", "quantity", "timeInForce", "price"])
  public async newStopLossLimitOrder(options: INewStopLossLimitOrderOptions) {
    return await this.newOrder({
      ...options, type: "STOP_LOSS_LIMIT",
    });
  }

  @validateRequiredParams(["symbol", "side", "quantity", "timeInForce", "price"])
  public async newTakeProfitLimitOrder(options: INewTakeProfitLimitOrderOptions) {
    return await this.newOrder({
      ...options, type: "TAKE_PROFIT_LIMIT",
    });
  }

  @validateRequiredParams(["symbol", "side", "quantity", "price"])
  public async newLimitMakerOrder(options: INewLimitMakerOrderOptions) {
    return await this.newOrder({
      ...options, type: "LIMIT_MAKER",
    });
  }

  @validateRequiredParams(["symbol"])
  public async cancelAllOpenOrdersOnSymbol(options: ICancelAllOpenOrdersOnSymbolOptions) {
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

  @validateRequiredParams(["symbol"])
  public async cancelOrder(options: ICancelOrderOptions) {
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
  @validateRequiredParams(["symbol", "side", "quantity", "price", "stopPrice"])
  public async newOco(options: INewOcoOptions) {
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

  @validateRequiredParams(["symbol"])
  public async cancelOco(options: ICancelOcoOptions) {
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

  @validateRequiredParams(["symbol", "side", "type", "cancelReplaceMode"])
  public async cancelExistingOrderAndSendNew(options: ICancelExistingOrderAndSendNewOptions) {
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
