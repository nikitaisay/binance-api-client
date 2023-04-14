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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleStream(ws: WebSocket, cb:(data: any) => void): void {
    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
    
    ws.on("close", (code, reason) => {
      console.warn(`WebSocket closed with code ${code} and reason: ${reason}`);
    });
    
    ws.on("message", (message: WebSocket.Data) => {
      try {
        const data = JSON.parse(message.toString());
        cb(data);
      } catch (error) {
        console.error("Error parsing JSON data:", error.message);
      }
    });
  }

  // The Aggregate Trade Streams push trade information that is aggregated for a single taker order.
  public subscribeAggregateTradeStream(options: ISubscribeAggregateTradeStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/${options.symbol.toLowerCase()}@aggTrade${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // The Trade Streams push raw trade information; each trade has a unique buyer and seller.
  public subscribeTradeStream(options: ISubscribeTradeStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/${options.symbol.toLowerCase()}@trade${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // The Kline/Candlestick Stream push updates to the current klines/candlestick every second.
  public subscribeKlineCandlestickStream(options: ISubscribeKlineCandlestickStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/${options.symbol.toLowerCase()}@kline_${options.interval}${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // 24hr rolling window mini-ticker statistics. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
  public subscribeIndividualSymbolMiniTickerStream(options: ISubscribeIndividualSymbolMiniTickerStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/${options.symbol.toLowerCase()}@miniTicker${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // 24hr rolling window mini-ticker statistics for all symbols that changed in an array. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs. Note that only tickers that have changed will be present in the array.
  public subscribeAllMarketMiniTickersStream(options: ISubscribeAllMarketMiniTickersStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/!miniTicker@arr${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // 24hr rolling window ticker statistics for a single symbol. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
  public subscribeIndividualSymbolTickerStream(options: ISubscribeIndividualSymbolTickerStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/${options.symbol.toLowerCase()}@ticker${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // 24hr rolling window ticker statistics for all symbols that changed in an array. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs. Note that only tickers that have changed will be present in the array.
  public subscribeAllMarketTickersStream(options: ISubscribeAllMarketTickersStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/!ticker@arr${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // Rolling window ticker statistics for a single symbol, computed over multiple windows.
  // Note: This stream is different from the <symbol>@ticker stream. The open time O always starts on a minute, while the closing time C is the current time of the update.
  // As such, the effective window might be up to 59999ms wider that <window_size>.
  public subscribeIndividualSymbolRollingWindowStatisticsStream(options: ISubscribeIndividualSymbolRollingWindowStatisticsStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/${options.symbol.toLowerCase()}@ticker_${options.window_size}${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // Rolling window ticker statistics for all market symbols, computed over multiple windows. Note that only tickers that have changed will be present in the array.
  public subscribeAllMarketRollingWindowStatisticsStream(options: ISubscribeAllMarketRollingWindowStatisticsStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/!ticker_${options.window_size}@arr${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // Pushes any update to the best bid or ask's price or quantity in real-time for a specified symbol.
  public subscribeIndividualSymbolBookTickerStream(options: ISubscribeIndividualSymbolBookTickerStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/${options.symbol.toLowerCase()}@bookTicker${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // Top bids and asks, Valid are 5, 10, or 20.
  public subscribePartialBookDepthStream(options: ISubscribePartialBookDepthStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/${options.symbol.toLowerCase()}@depth${options.levels}${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }

  // Order book price and quantity depth updates used to locally manage an order book.
  public subscribeDiffDepthStream(options: ISubscribeDiffDepthStreamOptions): void {
    const ws = new WebSocket(
      `${this.ws_url}/${options.symbol.toLowerCase()}@depth@${options.updateSpeed}${options.id ? `?id=${options.id}` : ""}`
    );

    this.handleStream(ws, options.callback);
  }
}
