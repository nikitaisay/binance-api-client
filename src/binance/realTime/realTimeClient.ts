import * as crypto from "crypto";
import WebSocket from "ws";
import axios from "axios";

import { BINANCE_API_URLS } from "../../constants";

import { 
  IRealTimeApiClientOptions, 
  ISubscribeAggregateTradeStreamOptions, 
  ISubscribeAllMarketMiniTickersStreamOptions, 
  ISubscribeAllMarketRollingWindowStatisticsStreamOptions, 
  ISubscribeAllMarketTickersStreamOptions, 
  ISubscribeDiffDepthStreamOptions, 
  ISubscribeIndividualSymbolBookTickerStreamOptions, 
  ISubscribeIndividualSymbolMiniTickerStreamOptions, 
  ISubscribeIndividualSymbolRollingWindowStatisticsStreamOptions, 
  ISubscribeIndividualSymbolTickerStreamOptions, 
  ISubscribeKlineCandlestickStreamOptions, 
  ISubscribePartialBookDepthStreamOptions, 
  ISubscribeTradeStreamOptions
} from "./types";

export class BinanceRealTimeApiClient {
  readonly ws_url: string;
  readonly api_url: string;

  private readonly apiKey: string;
  private readonly apiSecret: string;

  constructor(options: IRealTimeApiClientOptions) {
    this.ws_url = BINANCE_API_URLS.WEBSOCKET_API;
    this.api_url = BINANCE_API_URLS.SPOT.BASE;
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
  }

  // The Aggregate Trade Streams push trade information that is aggregated for a single taker order.
  public subscribeAggregateTradeStream(options: ISubscribeAggregateTradeStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/${options.symbol.toLowerCase()}@aggTrade`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // The Trade Streams push raw trade information; each trade has a unique buyer and seller.
  public subscribeTradeStream(options: ISubscribeTradeStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/${options.symbol.toLowerCase()}@trade`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // The Kline/Candlestick Stream push updates to the current klines/candlestick every second.
  public subscribeKlineCandlestickStream(options: ISubscribeKlineCandlestickStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/${options.symbol.toLowerCase()}@kline_${options.interval}`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // 24hr rolling window mini-ticker statistics. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
  public subscribeIndividualSymbolMiniTickerStream(options: ISubscribeIndividualSymbolMiniTickerStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/${options.symbol.toLowerCase()}@miniTicker`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // 24hr rolling window mini-ticker statistics for all symbols that changed in an array. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs. Note that only tickers that have changed will be present in the array.
  public subscribeAllMarketMiniTickersStream(options: ISubscribeAllMarketMiniTickersStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/!miniTicker@arr`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // 24hr rolling window ticker statistics for a single symbol. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
  public subscribeIndividualSymbolTickerStream(options: ISubscribeIndividualSymbolTickerStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/${options.symbol.toLowerCase()}@ticker`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // 24hr rolling window ticker statistics for all symbols that changed in an array. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs. Note that only tickers that have changed will be present in the array.
  public subscribeAllMarketTickersStream(options: ISubscribeAllMarketTickersStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/!ticker@arr`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // Rolling window ticker statistics for a single symbol, computed over multiple windows.
  // Note: This stream is different from the <symbol>@ticker stream. The open time O always starts on a minute, while the closing time C is the current time of the update.
  // As such, the effective window might be up to 59999ms wider that <window_size>.
  public subscribeIndividualSymbolRollingWindowStatisticsStream(options: ISubscribeIndividualSymbolRollingWindowStatisticsStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/${options.symbol.toLowerCase()}@ticker_${options.window_size}`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // Rolling window ticker statistics for all market symbols, computed over multiple windows. Note that only tickers that have changed will be present in the array.
  public subscribeAllMarketRollingWindowStatisticsStream(options: ISubscribeAllMarketRollingWindowStatisticsStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/!ticker_${options.window_size}@arr`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // Pushes any update to the best bid or ask's price or quantity in real-time for a specified symbol.
  public subscribeIndividualSymbolBookTickerStream(options: ISubscribeIndividualSymbolBookTickerStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/${options.symbol.toLowerCase()}@bookTicker`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // Top bids and asks, Valid are 5, 10, or 20.
  public subscribePartialBookDepthStream(options: ISubscribePartialBookDepthStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/${options.symbol.toLowerCase()}@depth${options.levels}`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }

  // Order book price and quantity depth updates used to locally manage an order book.
  public subscribeDiffDepthStream(options: ISubscribeDiffDepthStreamOptions) {
    const ws = new WebSocket(`${this.ws_url}/${options.symbol.toLowerCase()}@depth@${options.updateSpeed}`);

    ws.on("message", (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString());
      options.callback(data);
    });
  }
}
