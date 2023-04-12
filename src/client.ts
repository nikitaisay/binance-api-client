import { BinanceSpotMarketApi } from "./binance/spot/market";
import { BinanceSpotTradeApi } from "./binance/spot/trade";

import { IApiClientInitializeOptions } from "./binance/types";

import { IClientInitializeOptions } from "./types";

export class AlgoBinanceClient {
  spot: {
    market: BinanceSpotMarketApi;
    trade: BinanceSpotTradeApi;
  };

  constructor(options: IClientInitializeOptions) {
    this.initializeBinanceClient({ ...options, });
  }

  private initializeBinanceClient(options: IApiClientInitializeOptions) {
    this.initializeBinanceSpotApi(options);
  }

  private initializeBinanceSpotApi(options: IApiClientInitializeOptions) {
    this.spot.market = new BinanceSpotMarketApi(options);
    this.spot.trade = new BinanceSpotTradeApi(options);
  }
}
