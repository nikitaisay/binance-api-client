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
    orderId: 'order-id'; // This can only be used in combination with symbol.
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
  side: "SELL",
  quoteOrderQty: 1,
  quantity: 1
});
```
Create new stop loss limit order
```javascript
const res = await apiClient.spot.trade.newStopLossLimitOrder({
  symbol: 'BNBUSDT'; // Trading symbol, e.g. BNBUSDT
  side: "SELL" | "BUY";
  timeInForce: string; // GTC/FOK/IOC
  quantity: number; // Order quantity
  price: number; // Order price
  stopPrice?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
  trailingDelta?: number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TA
});
```
