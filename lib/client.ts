
import { BinanceSpotRealTimeApi } from "./binance/realTime/spot";
import { BinanceUserDataRealTimeApi } from "./binance/realTime/userData";

import { BinanceSpotDataStreamApi } from "./binance/restApi/spot/dataStream";
import { BinanceSpotMarketApi } from "./binance/restApi/spot/market";
import { BinanceSpotTradeApi } from "./binance/restApi/spot/trade";
import { BinanceSpotWalletApi } from "./binance/restApi/spot/wallet";

import { IClientInitializeOptions } from "./types";

export class BinanceApiClient {
  public api: {
    spot: {
      market: BinanceSpotMarketApi;
      trade: BinanceSpotTradeApi;
      dataStream: BinanceSpotDataStreamApi;
      wallet: BinanceSpotWalletApi;
    };
  };

  public realTime: {
    spot: BinanceSpotRealTimeApi;
    userData: BinanceUserDataRealTimeApi;
  };

  constructor(options: IClientInitializeOptions) {
    this.api = {
      spot: {
        market: new BinanceSpotMarketApi(options),
        trade: new BinanceSpotTradeApi(options),
        dataStream: new BinanceSpotDataStreamApi(options),
        wallet: new BinanceSpotWalletApi(options),
      },
    };

    this.realTime = {
      spot: new BinanceSpotRealTimeApi(options),
      userData: new BinanceUserDataRealTimeApi(options),
    };
  }
}