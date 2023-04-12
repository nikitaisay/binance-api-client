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
