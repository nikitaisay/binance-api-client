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
    symbol?: 'ETHBTC',
    symbols: ['ETHBTC', 'BTCUSDT'], // Either symbol or symbols must be provided
    windowSize: '1d', // 1d 1m 1h etc
    type: 'FULL'; // FULL or MINI
});
```

## Binance spot trade API
Query order
```javascript
const res = await apiClient.spot.market.queryOrder({
    symbol: 'BNBUSDT',
    orderId: 'some-order-id',
    origClientOrderId?: 'some-client-order-id',
});
```
Get all orders
```javascript
const res = await apiClient.spot.market.getAllOrders({
    symbol: 'BNBUSDT',
    orderId: 'some-order-id',
    startTime: 1684335862286,
    endTime: 1684335862286,
    limit: 500,
});
```
Get current open orders
```javascript
const res = await apiClient.spot.market.getCurrentOpenOrders({
    symbol: 'BNBUSDT',
});
```
Query oco
```javascript
const res = await apiClient.spot.market.queryOco({
   orderListId: 'some-order-list-id', // Order list id
   origClientOrderId: 'id-from-the-client', // Order id from client
});
```
Query all oco
```javascript
const res = await apiClient.spot.market.queryAllOco({
    fromId: 'Trade id to fetch from',
    startTime: 1684335862286,
    endTime: 1684335862286,
    limit: 500,
});
```
