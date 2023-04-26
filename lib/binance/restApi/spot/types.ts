export interface IGet24hrTickerPriceChangeStatisticsOptions {
  symbol?: string;
  symbols?: string[];
  type?: string; // Supported values: FULL or MINI.
}

export interface IGetAggregateTradesListOptions {
  symbol: string;
  limit?: number; // Default 500; max 1000
  fromId?: string;
  startTime?: number;
  endTime?: number;
}

export interface IGetCandlestickDataOptions {
  symbol: string;
  interval: string; // 1m, 1h, 1d, etc
  startTime?: number;
  endTime?: number;
  limit?: number; // Default 100; max 1000
}

export interface IGetCurrentAveragePriceOptions {
  symbol: string;
}

export interface IGetExchangeInfoOptions {
  symbol?: string;
  symbols?: string[];
  permissions?: string | string[]; // SPOT or MARGIN or LEVERAGED
}

export interface IGetOrderBookOptions {
  symbol: string;
  limit?: number; // If limit > 5000, then the response will truncate to 5000
}

export interface IGetRecentTradesListOptions {
  symbol: string;
  limit?: number; // Default 500; max 1000.
}

export interface IGetRollingWindowPriceChangeStatisticsOptions {
  symbol?: string;
  symbols?: string[]; // Either symbol or symbols must be provided
  windowSize?: string; // 1d 1m 1h etc
  type?: string; // FULL or MINI
}

export interface IGetSymbolPriceTickerOptions {
  symbol?: string;
  symbols?: string[];
}

export interface IGetAccountInformationOptions {
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface IGetAccountTradeListOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  orderId?: string; // This can only be used in combination with symbol.
  startTime?: number; // UTC timestamp in ms
  endTime?: number; // UTC timestamp in ms
  fromId?: string; // Trade id to fetch from. Default gets most recent trades.
  limit?: number; // Default 500; max 1000.
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface IGetAllOrdersOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  orderId?: number; // Order id
  startTime?: number; // UTC timestamp in ms
  endTime?: number; // UTC timestamp in ms
  limit?: number; // Default 500; max 1000.
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface IGetCurrentOpenOrdersOptions {
  symbol?: string; // Trading symbol, e.g. BNBUSDT
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface INewOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  type: "LIMIT" | "MARKET" | "STOP_LOSS" | "STOP_LOSS_LIMIT" | "TAKE_PROFIT" | "TAKE_PROFIT_LIMIT" | "LIMIT_MAKER";
  timeInForce?: string; // GTC/FOK/IOC
  quantity?: number; // Order quantity
  quoteOrderQty?: number; // Quote quantity
  price?: number; // Order price
  newClientOrderId?: string; // A unique id among open orders. Automatically generated if not sent.
  strategyId?: number;
  strategyType?: number; // The value cannot be less than 1000000.
  stopPrice?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  trailingDelta?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders. For more details on SPOT implementation on trailing stops, please refer to Trailing Stop FAQ
  icebergQty?: number; // Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
  newOrderRespType?: string; // Set the response JSON. ACK, RESULT, or FULL; MARKET and LIMIT order types default to FULL, all other orders default to ACK.
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface IQueryAllOcoOptions {
  fromId?: string; // Trade id to fetch from. Default gets most recent trades.
  startTime?: number; // UTC timestamp in ms
  endTime?: number; // UTC timestamp in ms
  limit?: number; // Default 500; max 1000.
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface IQueryCurrentOrderCountUsageOptions {
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

// Either orderListId or origClientOrderId must be provided
export interface IQueryOcoOptions {
  orderListId?: string; // Order list id
  origClientOrderId?: string; // Order id from client
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface IQueryOpenOcoOptions {
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

// Either orderId or origClientOrderId must be sent.
export interface IQueryOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  orderId?: number; // Order id
  origClientOrderId?: string; // Order id from client
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ITestNewOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  type: "LIMIT" | "MARKET" | "STOP_LOSS" | "STOP_LOSS_LIMIT" | "TAKE_PROFIT" | "TAKE_PROFIT_LIMIT" | "LIMIT_MAKER";
  timeInForce?: string; // GTC/FOK/IOC
  quantity?: number; // Order quantity
  quoteOrderQty?: number; // Quote quantity
  price?: number; // Order price
  newClientOrderId?: string; // A unique id among open orders. Automatically generated if not sent.
  strategyId?: number;
  strategyType?: number; // The value cannot be less than 1000000.
  stopPrice?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  trailingDelta?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders. For more details on SPOT implementation on trailing stops, please refer to Trailing Stop FAQ
  icebergQty?: number; // Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
  newOrderRespType?: string; // Set the response JSON. ACK, RESULT, or FULL; MARKET and LIMIT order types default to FULL, all other orders default to ACK.
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ITestNewLimitOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  timeInForce: string; // GTC/FOK/IOC
  quantity: number; // Order quantity
  price: number; // Order price
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ITestNewMarketOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  quantity?: number; // Order quantity
  quoteOrderQty?: number; // Quote quantity
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ITestNewStopLossLimitOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  timeInForce: string; // GTC/FOK/IOC
  quantity: number; // Order quantity
  price: number; // Order price
  stopPrice?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  trailingDelta?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders. For more details on SPOT implementation on trailing stops, please refer to Trailing Stop FAQ
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ITestNewTakeProfitLimitOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  quantity: number; // Order quantity
  timeInForce: string; // GTC/FOK/IOC
  price: number; // Order price
  stopPrice?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  trailingDelta?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders. For more details on SPOT implementation on trailing stops, please refer to Trailing Stop FAQ
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ITestNewLimitMakerOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  quantity: number; // Order quantity
  price: number; // Order price
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface INewLimitOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  timeInForce: string; // GTC/FOK/IOC
  quantity: number; // Order quantity
  price: number; // Order price
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface INewMarketOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  quantity?: number; // Order quantity
  quoteOrderQty?: number; // Quote quantity
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface INewStopLossLimitOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  timeInForce: string; // GTC/FOK/IOC
  quantity: number; // Order quantity
  price: number; // Order price
  stopPrice?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  trailingDelta?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders. For more details on SPOT implementation on trailing stops, please refer to Trailing Stop FAQ
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface INewTakeProfitLimitOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  quantity: number; // Order quantity
  timeInForce: string; // GTC/FOK/IOC
  price: number; // Order price
  stopPrice?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  trailingDelta?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders. For more details on SPOT implementation on trailing stops, please refer to Trailing Stop FAQ
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface INewLimitMakerOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  quantity: number; // Order quantity
  price: number; // Order price
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ICancelAllOpenOrdersOnSymbolOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ICancelExistingOrderAndSendNewOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  type: string; // Order type
  cancelReplaceMode: "STOP_ON_FAILURE" | "ALLOW_FAILURES"; // - `STOP_ON_FAILURE` If the cancel request fails, the new order placement will not be attempted. `ALLOW_FAILURES` If new order placement will be attempted even if cancel request fails.
  timeInForce?: string; // Order time in force
  quantity?: number; // Order quantity
  quoteOrderQty?: number; // Quote quantity
  price?: number; // Order price
  cancelNewClientOrderId?: string; // Used to uniquely identify this cancel. Automatically generated by default
  cancelOrigClientOrderId?: string; // Either the cancelOrigClientOrderId or cancelOrderId must be provided. If both are provided, cancelOrderId takes precedence.
  cancelOrderId?: number; // Either the cancelOrigClientOrderId or cancelOrderId must be provided. If both are provided, cancelOrderId takes precedence.
  newClientOrderId?: string; // Used to identify the new order.
  strategyId?: number;
  strategyType?: number; // The value cannot be less than 1000000
  stopPrice?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  trailingDelta?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  icebergQty?: number; // Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
  newOrderRespType?: string; // Set the response JSON. MARKET and LIMIT order types default to FULL, all other orders default to ACK.
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ICancelOrderOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  orderId?: number; // Order id
  origClientOrderId?: string;
  newClientOrderId?: string; // Used to uniquely identify this cancel. Automatically generated by default.
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface INewOcoOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  listClientOrderId?: string; // A unique Id for the entire orderList
  side: "SELL" | "BUY";
  quantity: number;
  limitClientOrderId?: string; // A unique Id for the limit order
  isIsolated?: string; // for isolated margin or not, "TRUE", "FALSE"，default "FALSE"
  price: number;
  limitIcebergQty?: number;
  stopClientOrderId?: string; // A unique Id for the stop loss/stop loss limit leg
  stopPrice: number;
  stopLimitPrice?: number; // If provided, stopLimitTimeInForce is required.
  stopIcebergQty?: number;
  stopLimitTimeInForce?: string; // Valid values are GTC/FOK/IOC
  newOrderRespType?: string; // Set the response JSON.
  sideEffectType?: string; // NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY; default NO_SIDE_EFFECT.
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface ICancelOcoOptions {
  symbol: string; // Trading symbol, e.g. BNBUSDT
  orderListId?: number; // Either orderListId or listClientOrderId must be provided
  listClientOrderId?: string; // Either orderListId or listClientOrderId must be provided
  newClientOrderId?: string; // Used to uniquely identify this cancel. Automatically generated by default
  recvWindow?: number; // default 5000 The value cannot be greater than 60000
}

export interface IListenKeyRequestOptions {
  listenKey: string;
}

export interface IGetDailyAccountSnapshotOptions {
  type: "SPOT" | "MARGIN" | "FUTURES";
  startTime?: number;
  endTime?: number;
  limit?: number;
  recvWindow?: number;
}

export interface IWithdrawOptions {
  coin: string; // Coin name
  withdrawOrderId?: string; // Client id for withdraw
  network?: string; // Get the value from `GET /sapi/v1/capital/config/getall`
  address: string;
  addressTag?: string; // Secondary address identifier for coins like XRP,XMR etc.
  amount: number;
  transactionFeeFlag?: boolean; // When making internal transfer `true` ->  returning the fee to the destination account; `false` -> returning the fee back to the departure account.
  name?: string;
  walletType?: number; // The wallet type for withdraw，0-Spot wallet, 1- Funding wallet. Default is Spot wallet
  recvWindow?: number;
}

export interface IGetDepositHistoryOptions {
  coin?: string;
  status?: number; // 0(0:pending,6: credited but cannot withdraw, 7=Wrong Deposit,8=Waiting User confirm, 1:success)
  startTime?: number;
  endTime?: number;
  offset?: number;
  limit?: number;
  recvWindow?: number;
}

export interface IGetWithdrawHistoryOptions {
  coin?: string;
  withdrawOrderId?: string;
  status?: number; // * `0` - Email Sent `1` - Cancelled `2` - Awaiting Approval `3` - Rejected `4` - Processing `5` - Failure `6` - Completed
  startTime?: number;
  endTime?: number;
  offset?: number;
  limit?: number;
  recvWindow?: number;
}

export interface IGetDepositAddressOptions {
  coin: string;
  network?: string;
  recvWindow?: number;
}

export interface IGetAccountStatusOptions {
  recvWindow?: number;
}

export interface IGetAccountAPITradingStatusOptions {
  recvWindow?: number;
}

export interface IGetDustLogOptions {
  startTime?: number;
  endTime?: number;
  recvWindow?: number;
}

export interface IGetAssetsThatCanBeConvertedIntoBNBOptions {
  recvWindow?: number;
}

export interface IDustTransferOptions {
  recvWindow?: number;
  asset: string; // The asset being converted. For example, asset=BTC&asset=USDT
}

export interface IGetAssetDividendRecordOptions {
  recvWindow?: number;
  asset?: string;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface IGetAsseDetailOptions {
  recvWindow?: number;
  asset?: string;
}

export interface IGetTradeFeeOptions {
  recvWindow?: number;
  symbol?: string;
}

export interface IQueryUserUniversalTransferHistoryOptions {
  type: string; // Universal transfer type
  startTime?: number;
  endTime?: number;
  current?: number; // Current querying page. Start from 1. Default:1
  size?: number; // Default:10 Max:100
  fromSymbol?: string; // Must be sent when type are ISOLATEDMARGIN_MARGIN and ISOLATEDMARGIN_ISOLATEDMARGIN
  toSymbol?: string; // Must be sent when type are MARGIN_ISOLATEDMARGIN and ISOLATEDMARGIN_ISOLATEDMARGIN
  recvWindow?: number;
  symbol?: string;
}

export interface IUserUniversalTransferHistoryOptions {
  type: string; // Universal transfer type
  asset: string;
  amount: number;
  fromSymbol?: string;
  toSymbol?: string;
  recvWindow?: number;
}

export interface IFundingWalletOptions {
  asset?: string;
  needBtcValuation?: string; // true or false
  recvWindow?: number;
}

export interface IGetUserAssetOptions {
  asset?: string;
  needBtcValuation?: string; // true or false
  recvWindow?: number;
}

export interface IGetAPIKeyPermissionOptions {
  recvWindow?: number;
}

export interface IBUSDConvertTransferOptions {
  clientTranId: string; // The unique user-defined transaction id, min length 20
  asset: string;
  amount: number;
  targetAsset: string; // Target asset you want to convert
  accountType?: string; // Only MAIN and CARD, default MAIN
  recvWindow?: number;
}

export interface IGetBUSDConvertHistoryOptions {
  tranId?: number; // The transaction id
  clientTranId?: string; // The user-defined transaction id
  asset?: string;
  startTime: number;
  endTime: number;
  accountType?: string; // MAIN: main account. CARD: funding account. If it is blank, we will query spot and card wallet, otherwise, we just query the corresponding wallet
  current?: number; // current page, default 1, the min value is 1
  size?: number; // page size, default 10, the max value is 100
  recvWindow?: number;
}

export interface IGetCloudMiningPaymentAndRefundHistoryOptions {
  tranId?: number; // The transaction id
  clientTranId?: string; // The user-defined transaction id
  asset?: string;
  startTime: number;
  endTime: number;
  accountType?: string; // MAIN: main account. CARD: funding account. If it is blank, we will query spot and card wallet, otherwise, we just query the corresponding wallet
  current?: number; // current page, default 1, the min value is 1
  size?: number; // page size, default 10, the max value is 100
  recvWindow?: number;
}

export interface IUserAssetOptions {
  asset?: string;
  needBtcValuation?: string;
  recvWindow?: number;
}
