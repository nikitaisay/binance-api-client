![Logo](https://public.bnbstatic.com/image/cms/blog/20230203/a783cc16-c9d4-4954-bdc0-39482e8dc735.png)

# JavaScript & TypeScript Binance API SDK

JavaScript SDK for the Binance APIs and WebSockets, with TypeScript support.
This project is designed to help you make your own projects that interact with the Binance API. You can stream candlestick chart data, market depth, or use other advanced features such as setting stop losses and iceberg orders. This project seeks to have complete API coverage including WebSockets.

## Installation

```bash
  npm install @nkt_isay/binance_api_client --save
```

## Getting started

```javascript
  import { BinanceApiClient } from 'binance_api_client';

  const apiClient = new BinanceApiClient({
    enableTestnet: false,
    apiKey: 'YOUR-API-KEY',
    apiSecret: 'YOUR-API-SECRET'
  });
```

## Binance spot market API
Get exchange info
```javascript
const res = await apiClient.spot.market.getExchangeInfo({
    symbol: 'ETHBTC'
});
```
Get order book
```javascript
const res = await apiClient.spot.market.getOrderBook({
    symbol: 'ETHBTC'
});
```
Get recent trades list
```javascript
const res = await apiClient.spot.market.getRecentTradesList({
    symbol: 'ETHBTC'
});
```
Get aggregate trades list
```javascript
const res = await apiClient.spot.market.getAggregateTradesList({
    symbol: 'ETHBTC',
    limit: 500,
    fromId: 'TRADE_ID',
    startTime: 1684335862286,
    endTime: 1684335862286
});
```
Get candlestick data
```javascript
const res = await apiClient.spot.market.getCandlestickData({
    symbol: 'ETHBTC',
    interval: '1m', // 1m, 1h, 1d, etc
    startTime: 1684335862286,
    endTime: 1684335862286,
    limit: 100, // Default 100; max 1000
});
```
Get 24hr ticker price change statistics
```javascript
const res = await apiClient.spot.market.get24hrTickerPriceChangeStatistics({
    symbol: 'ETHBTC,
    type: 'FULL', // Supported values: FULL or MINI.
});
```
Get current average price
```javascript
const res = await apiClient.spot.market.getCurrentAveragePrice({
    symbol: 'ETHBTC,
});
```
Get symbol price ticker
```javascript
const res = await apiClient.spot.market.getSymbolPriceTicker({
    symbol: 'ETHBTC',
});
```
Get symbol order book ticker
```javascript
const res = await apiClient.spot.market.getSymbolOrderBookTicker({
    symbol: 'ETHBTC',
});
```
Get rolling window price change statistics
```javascript
const res = await apiClient.spot.market.getRollingWindowPriceChangeStatistics({
    symbol: 'ETHBTC',
    symbols: ['ETHBTC', 'BTCUSDT'], // Either symbol or symbols must be provided
    windowSize: '1d', // 1d 1m 1h etc
    type: 'FULL'; // FULL or MINI
});
```

## Binance spot trade API
Query order
```javascript
const res = await apiClient.spot.trade.queryOrder({
    symbol: 'BNBUSDT',
    orderId: 'some-order-id',
    origClientOrderId?: 'some-client-order-id',
});
```
Get all orders
```javascript
const res = await apiClient.spot.trade.getAllOrders({
    symbol: 'BNBUSDT',
    orderId: 'some-order-id',
    startTime: 1684335862286,
    endTime: 1684335862286,
    limit: 500,
});
```
Get current open orders
```javascript
const res = await apiClient.spot.trade.getCurrentOpenOrders({
    symbol: 'BNBUSDT',
});
```
Query oco
```javascript
const res = await apiClient.spot.trade.queryOco({
   orderListId: 'some-order-list-id', // Order list id
   origClientOrderId: 'id-from-the-client', // Order id from client
});
```
Query all oco
```javascript
const res = await apiClient.spot.trade.queryAllOco({
    fromId: 'Trade id to fetch from',
    startTime: 1684335862286,
    endTime: 1684335862286,
    limit: 500,
});
```
Query open oco
```javascript
const res = await apiClient.spot.trade.queryOpenOco();
```
Get account information
```javascript
const res = await apiClient.spot.trade.getAccountInformation();
```
Get account trade list
```javascript
const res = await apiClient.spot.trade.getAccountTradeList({
    symbol: 'BNBUSDT',
    orderId: 'order-id', // This can only be used in combination with symbol.
    startTime: 1684335862286,
    endTime: 1684335862286,
    fromId: 'trade-id-to-fetch-from',
    limit: 500,
});
```
Query current order count usage
```javascript
const res = await apiClient.spot.trade.queryCurrentOrderCountUsage();
```
Create new limit order
```javascript
const res = await apiClient.spot.trade.newLimitOrder({
  symbol: 'BNBUSDT',
  side: 'SELL',
  timeInForce: 'GTC', // GTC/FOK/IOC
  quantity: 1,
  price: 2400,
});
```
Create new market order
```javascript
const res = await apiClient.spot.trade.newMarketOrder({
  symbol: 'BNBUSDT',
  side: 'SELL',
  quoteOrderQty: 1,
  quantity: 1
});
```
Create new stop loss limit order
```javascript
const res = await apiClient.spot.trade.newStopLossLimitOrder({
  symbol: 'BNBUSDT',
  side: 'BUY',
  timeInForce: 'GTC', // GTC/FOK/IOC
  quantity: 1,
  price: 2345,
  stopPrice: 2345,
  trailingDelta: 2345,
});
```
Create new take profit limit order
```javascript
const res = await apiClient.spot.trade.newTakeProfitLimitOrder({
  symbol: 'BNBUSDT',
  side: 'BUY',
  timeInForce: 'GTC', // GTC/FOK/IOC
  quantity: 1,
  price: 2345,
  stopPrice: 2345,
  trailingDelta: 2345,
});
```
Create new limit maker order
```javascript
const res = await apiClient.spot.trade.newLimitMakerOrder({
  symbol: 'BNBUSDT',
  side: 'BUY',
  quantity: 1,
  price: 2345
});
```
Cancel all open orders on symbol
```javascript
const res = await apiClient.spot.trade.cancelAllOpenOrdersOnSymbol({
  symbol: 'BNBUSDT',
});
```
Cancel order
```javascript
const res = await apiClient.spot.trade.cancelOrder({
  symbol: 'BNBUSDT',
  orderId: 1,
  origClientOrderId: 'ID',
  newClientOrderId: 'ID',
});
```
Create new oco order
```javascript
const res = await apiClient.spot.trade.newOco({
  symbol: 'BNBUSDT',
  listClientOrderId: 'ID',
  side: 'SELL',
  quantity: 1,
  limitClientOrderId: 'ID',
  isIsolated: 'FALSE', // for isolated margin or not, "TRUE", "FALSE"，default "FALSE"
  price: 2500,
  limitIcebergQty: 2500,
  stopClientOrderId: 'ID', // A unique Id for the stop loss/stop loss limit leg
  stopPrice: 2500,
  stopLimitPrice: 2500, // If provided, stopLimitTimeInForce is required.
  stopIcebergQty: 1,
  stopLimitTimeInForce: 'GTC', // Valid values are GTC/FOK/IOC
  sideEffectType: 'NO_SIDE_EFFECT', // NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY; default NO_SIDE_EFFECT.
});
```
Cancel oco order
```javascript
const res = await apiClient.spot.trade.cancelOco({
  symbol: 'BNBUSDT',
  orderListId: 1,
  listClientOrderId: 'ID', // Either orderListId or listClientOrderId must be provided
  newClientOrderId: 'ID', // Used to uniquely identify this cancel. Automatically generated by default
});
```
Cancel existing order and send new one
```javascript
const res = await apiClient.spot.trade.cancelExistingOrderAndSendNew({
  symbol: 'BNBUSDT',
  side: 'SELL',
  type: 'LIMIT_MAKER',
  cancelReplaceMode: 'STOP_ON_FAILURE', // - `STOP_ON_FAILURE` If the cancel request fails, the new order placement will not be attempted. `ALLOW_FAILURES` If new order placement will be attempted even if cancel request fails.
  timeInForce: 'GTC',
  quantity: 1,
  quoteOrderQty: 1,
  price: 2500,
  cancelNewClientOrderId: 'ID', // Used to uniquely identify this cancel. Automatically generated by default
  cancelOrigClientOrderId: 'ID', // Either the cancelOrigClientOrderId or cancelOrderId must be provided. If both are provided, cancelOrderId takes precedence.
  cancelOrderId: 1, // Either the cancelOrigClientOrderId or cancelOrderId must be provided. If both are provided, cancelOrderId takes precedence.
  newClientOrderId: 'ID', // Used to identify the new order.
  strategyId: 1,
  strategyType: 1000000, // The value cannot be less than 1000000
  stopPrice: 2500, // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  trailingDelta: 2500, // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  icebergQty: 2500, // Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
});
```


## Binance spot WebSocket API
Subscribe to trade data stream
```javascript
const res = await apiClient.realtime.spot.subscribeTradeStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
    symbol: 'BNBUSDT',
});
```
Subscribe to kline/candlestick data stream
```javascript
const res = await apiClient.realtime.spot.subscribeKlineCandlestickStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
    symbol: 'BNBUSDT',
    interval: '1m',
});
```
Subscribe to individual symbol mini ticker data stream
```javascript
const res = await apiClient.realtime.spot.subscribeIndividualSymbolMiniTickerStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
    symbol: 'BNBUSDT',
});
```
Subscribe to all market mini tickers data stream
```javascript
const res = await apiClient.realtime.spot.subscribeAllMarketMiniTickersStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
});
```
Subscribe to individual symbol ticker data stream
```javascript
const res = await apiClient.realtime.spot.subscribeIndividualSymbolTickerStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
    symbol: 'BNBUSDT',
});
```
Subscribe to all market tickers data stream
```javascript
const res = await apiClient.realtime.spot.subscribeAllMarketTickersStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
});
```
Subscribe to individual symbol rolling window statistics data stream
```javascript
const res = await apiClient.realtime.spot.subscribeIndividualSymbolRollingWindowStatisticsStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
    symbol: 'BNBUSDT',
    window_size: '1h',
});
```
Subscribe to all market rolling window statistics data stream
```javascript
const res = await apiClient.realtime.spot.subscribeAllMarketRollingWindowStatisticsStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
    window_size: '1h',
});
```
Subscribe to individual symbol book ticker data stream
```javascript
const res = await apiClient.realtime.spot.subscribeIndividualSymbolBookTickerStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
   symbol: 'BNBUSDT',
});
```
Subscribe to partial book depth data stream
```javascript
const res = await apiClient.realtime.spot.subscribePartialBookDepthStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
    symbol: 'BNBUSDT',
    levels: 1,
});
```
Subscribe to diff depth data stream
```javascript
const res = await apiClient.realtime.spot.subscribeDiffDepthStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
    symbol: 'BNBUSDT',
    updateSpeed: '1000ms',
});
```
Subscribe to aggregate trade data stream
```javascript
const res = await apiClient.realtime.spot.subscribeAggregateTradeStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
    symbol: 'BNBUSDT',
});
```

## Binance user data WebSocket API
Subscribe to user data stream
```javascript
const res = await apiClient.realtime.userData.subscribeUserDataStream({
    callback: (data) => handleData(data),
    errorCallback: (error) => handleError(error),
    closeCallback: (code, reason) => handleClosing(code, reason),
    connectionCallback: () => handleConnection(),
    id: 1,
});
```
