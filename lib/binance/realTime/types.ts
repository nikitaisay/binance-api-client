import WebSocket from "ws";

export interface IRealTimeApiClientOptions {
  apiKey: string;
  apiSecret: string;
  enableTestnet: boolean;
}

export type TListenKeyManagerOptions = IRealTimeApiClientOptions;

export type TWebSocketMapItem = {
  ws: WebSocket;
  type: string;
};

export interface IHandleStreamOptions {
  url: string;
  callback: (data: unknown) => void;
  errorCallback?: (error: Error) => void;
  closeCallback?: (code: number, reason: string) => void;
  connectionCallback?: (data?: unknown) => void;
  type: string;
  id: number;
}

export type TStreamOptions = Omit<IHandleStreamOptions, "url" | "type">;

export interface ISubscribeAggregateTradeStreamOptions extends TStreamOptions {
  symbol: string;
}

export interface ISubscribeTradeStreamOptions extends TStreamOptions {
  symbol: string;
}

export interface ISubscribeKlineCandlestickStreamOptions extends TStreamOptions {
  symbol: string;
  interval: string;
}

export interface ISubscribeIndividualSymbolMiniTickerStreamOptions extends TStreamOptions {
  symbol: string;
}

export type TSubscribeAllMarketMiniTickersStreamOptions = TStreamOptions;

export interface ISubscribeIndividualSymbolTickerStreamOptions extends TStreamOptions {
  symbol: string;
}

export type TSubscribeAllMarketTickersStreamOptions = TStreamOptions;

export interface ISubscribeIndividualSymbolRollingWindowStatisticsStreamOptions extends TStreamOptions {
  symbol: string;
  window_size: string; // 1h,4h,1d
}

export interface ISubscribeAllMarketRollingWindowStatisticsStreamOptions extends TStreamOptions {
  window_size: string; // 1h,4h,1d
}

export interface ISubscribeIndividualSymbolBookTickerStreamOptions extends TStreamOptions {
  symbol: string;
}

export interface ISubscribePartialBookDepthStreamOptions extends TStreamOptions {
  symbol: string;
  levels: number;
}

export interface ISubscribeDiffDepthStreamOptions extends TStreamOptions {
  symbol: string;
  updateSpeed: string; // 1000ms or 100ms
}
