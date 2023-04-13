import { BinanceSpotMarketApi } from "./binance/restApi/spot/market";
import { BinanceSpotTradeApi } from "./binance/restApi/spot/trade";

import { IApiClientInitializeOptions } from "./binance/restApi/types";

import { IClientInitializeOptions } from "./types";

export class AlgoBinanceClient {
  api: {
    spot: {
      market: BinanceSpotMarketApi;
      trade: BinanceSpotTradeApi;
    };
  };

  constructor(options: IClientInitializeOptions) {
    this.initializeBinanceClient({ ...options, });
  }

  private initializeBinanceClient(options: IApiClientInitializeOptions) {
    this.initializeBinanceSpotApi(options);
  }

  private initializeBinanceSpotApi(options: IApiClientInitializeOptions) {
    this.api.spot.market = new BinanceSpotMarketApi(options);
    this.api.spot.trade = new BinanceSpotTradeApi(options);
  }
}
