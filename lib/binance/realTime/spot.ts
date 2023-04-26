import WebSocket from "ws";

import { BINANCE_API_URLS } from "../../constants";

import { BinanceRealTimeApiClient } from "./realTimeClient";

import { 
  IRealTimeApiClientOptions, 
  ISubscribeAggregateTradeStreamOptions, 
  TSubscribeAllMarketMiniTickersStreamOptions, 
  ISubscribeAllMarketRollingWindowStatisticsStreamOptions, 
  TSubscribeAllMarketTickersStreamOptions, 
  ISubscribeDiffDepthStreamOptions, 
  ISubscribeIndividualSymbolBookTickerStreamOptions, 
  ISubscribeIndividualSymbolMiniTickerStreamOptions, 
  ISubscribeIndividualSymbolRollingWindowStatisticsStreamOptions, 
  ISubscribeIndividualSymbolTickerStreamOptions, 
  ISubscribeKlineCandlestickStreamOptions, 
  ISubscribePartialBookDepthStreamOptions, 
  ISubscribeTradeStreamOptions, 
  ICreateOrderStreamData
} from "./types";

export class BinanceSpotRealTimeApi extends BinanceRealTimeApiClient {
  constructor(options: IRealTimeApiClientOptions) {
    super(options);
    this.base_ws_url = BINANCE_API_URLS.WEBSOCKET_SPOT_API.BASE;
    this.test_ws_url = BINANCE_API_URLS.WEBSOCKET_SPOT_API.TESTNET;
    this.ws_url = options.enableTestnet ? this.test_ws_url : this.base_ws_url;
  }

  // The Trade Streams push raw trade information; each trade has a unique buyer and seller.
  public subscribeTradeStream(options: ISubscribeTradeStreamOptions): void {
    this.subscribeStream({
      ...options,
      url: `${this.ws_url}/${options.symbol.toLowerCase()}@trade`,
      type: `${options.symbol.toLowerCase()}@trade`,
    });
  }

  // The Kline/Candlestick Stream push updates to the current klines/candlestick every second.
  public subscribeKlineCandlestickStream(options: ISubscribeKlineCandlestickStreamOptions): void {
    this.subscribeStream({
      ...options,
      url: `${this.ws_url}/${options.symbol.toLowerCase()}@kline_${options.interval.toLowerCase()}`,
      type: `${options.symbol.toLowerCase()}@kline_${options.interval.toLowerCase()}`,
    });
  }

  // 24hr rolling window mini-ticker statistics. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
  public subscribeIndividualSymbolMiniTickerStream(options: ISubscribeIndividualSymbolMiniTickerStreamOptions): void {
    this.subscribeStream({ 
      ...options,
      url: `${this.ws_url}/${options.symbol.toLowerCase()}@miniTicker`,
      type: `${options.symbol.toLowerCase()}@miniTicker`,
    });
  }

  // 24hr rolling window mini-ticker statistics for all symbols that changed in an array. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs. Note that only tickers that have changed will be present in the array.
  public subscribeAllMarketMiniTickersStream(options: TSubscribeAllMarketMiniTickersStreamOptions): void {
    this.subscribeStream({
      ...options,
      url: `${this.ws_url}/!miniTicker@arr`,
      type: "!miniTicker@arr",
    });
  }

  // 24hr rolling window ticker statistics for a single symbol. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
  public subscribeIndividualSymbolTickerStream(options: ISubscribeIndividualSymbolTickerStreamOptions): void {
    this.subscribeStream({
      ...options,
      url: `${this.ws_url}/${options.symbol.toLowerCase()}@ticker`,
      type: `${options.symbol.toLowerCase()}@ticker`,
    });
  }

  // 24hr rolling window ticker statistics for all symbols that changed in an array. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs. Note that only tickers that have changed will be present in the array.
  public subscribeAllMarketTickersStream(options: TSubscribeAllMarketTickersStreamOptions): void {
    this.subscribeStream({
      ...options,
      url: `${this.ws_url}/!ticker@arr`,
      type: "!ticker@arr",
    });
  }

  // Rolling window ticker statistics for a single symbol, computed over multiple windows.
  // Note: This stream is different from the <symbol>@ticker stream. The open time O always starts on a minute, while the closing time C is the current time of the update.
  // As such, the effective window might be up to 59999ms wider that <window_size>.
  public subscribeIndividualSymbolRollingWindowStatisticsStream(options: ISubscribeIndividualSymbolRollingWindowStatisticsStreamOptions): void {
    this.subscribeStream({ 
      ...options,
      url: `${this.ws_url}/${options.symbol.toLowerCase()}@ticker_${options.window_size}`,
      type: `${options.symbol.toLowerCase()}@ticker_${options.window_size}`,
    });
  }

  // Rolling window ticker statistics for all market symbols, computed over multiple windows. Note that only tickers that have changed will be present in the array.
  public subscribeAllMarketRollingWindowStatisticsStream(options: ISubscribeAllMarketRollingWindowStatisticsStreamOptions): void {
    this.subscribeStream({
      ...options,
      url: `${this.ws_url}/!ticker_${options.window_size}@arr`,
      type: `!ticker_${options.window_size}@arr`,
    });
  }

  // Pushes any update to the best bid or ask's price or quantity in real-time for a specified symbol.
  public subscribeIndividualSymbolBookTickerStream(options: ISubscribeIndividualSymbolBookTickerStreamOptions): void {
    this.subscribeStream({ 
      ...options,
      url: `${this.ws_url}/${options.symbol.toLowerCase()}@bookTicker`,
      type: `${options.symbol.toLowerCase()}@bookTicker`,
    });
  }

  // Top bids and asks, Valid are 5, 10, or 20.
  public subscribePartialBookDepthStream(options: ISubscribePartialBookDepthStreamOptions): void {
    this.subscribeStream({ 
      ...options,
      url: `${this.ws_url}/${options.symbol.toLowerCase()}@depth${options.levels}`,
      type: `${options.symbol.toLowerCase()}@depth${options.levels}`,
    });
  }

  // Order book price and quantity depth updates used to locally manage an order book.
  public subscribeDiffDepthStream(options: ISubscribeDiffDepthStreamOptions): void {
    this.subscribeStream({ 
      ...options,
      url: `${this.ws_url}/${options.symbol.toLowerCase()}@depth@${options.updateSpeed}`,
      type: `${options.symbol.toLowerCase()}@depth@${options.updateSpeed}`,
    });
  }

  // The Aggregate Trade Streams push trade information that is aggregated for a single taker order.
  public subscribeAggregateTradeStream(options: ISubscribeAggregateTradeStreamOptions): void {
    this.subscribeStream({ 
      ...options,
      url: `${this.ws_url}/${options.symbol.toLowerCase()}@aggTrade`,
      type: `${options.symbol.toLowerCase()}@aggTrade`,
    });
  }

  public createOrder(ws: WebSocket, data: ICreateOrderStreamData): void {
    this.sendSignedMessage(ws, data, "/api/v3/order");
  }
}
