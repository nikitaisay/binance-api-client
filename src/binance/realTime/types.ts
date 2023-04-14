export interface IRealTimeApiClientOptions {
  apiKey: string;
  apiSecret: string;
}

export interface IStreamOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (data: any) => void;
  id?: number;
}

export interface ISubscribeAggregateTradeStreamOptions extends IStreamOptions {
  symbol: string;
}

export interface ISubscribeTradeStreamOptions extends IStreamOptions {
  symbol: string;
}

export interface ISubscribeKlineCandlestickStreamOptions extends IStreamOptions {
  symbol: string;
  interval: string;
}

export interface ISubscribeIndividualSymbolMiniTickerStreamOptions extends IStreamOptions {
  symbol: string;
}

export type ISubscribeAllMarketMiniTickersStreamOptions = IStreamOptions;

export interface ISubscribeIndividualSymbolTickerStreamOptions extends IStreamOptions {
  symbol: string;
}

export type ISubscribeAllMarketTickersStreamOptions = IStreamOptions;

export interface ISubscribeIndividualSymbolRollingWindowStatisticsStreamOptions extends IStreamOptions {
  symbol: string;
  window_size: string; // 1h,4h,1d
}

export interface ISubscribeAllMarketRollingWindowStatisticsStreamOptions extends IStreamOptions {
  window_size: string; // 1h,4h,1d
}

export interface ISubscribeIndividualSymbolBookTickerStreamOptions extends IStreamOptions {
  symbol: string;
}

export interface ISubscribePartialBookDepthStreamOptions extends IStreamOptions {
  symbol: string;
  levels: number;
}

export interface ISubscribeDiffDepthStreamOptions extends IStreamOptions {
  symbol: string;
  updateSpeed: string; // 1000ms or 100ms
}
