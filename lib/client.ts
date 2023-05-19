import { BinanceSpotRealTimeApi } from "./binance/realTime/spot";
import { BinanceUserDataRealTimeApi } from "./binance/realTime/userData";
import { BinanceSpotDataStreamApi } from "./binance/restApi/spot/dataStream";
import { BinanceSpotMarketApi } from "./binance/restApi/spot/market";
import { BinanceSpotTradeApi } from "./binance/restApi/spot/trade";
import { BinanceSpotWalletApi } from "./binance/restApi/spot/wallet";
import { IApiClientInitializeOptions } from "./binance/restApi/types";

export class BinanceApi {
  spot: {
    market: BinanceSpotMarketApi;
    trade: BinanceSpotTradeApi;
    dataStream: BinanceSpotDataStreamApi;
    wallet: BinanceSpotWalletApi;
  };

  realtime: {
    spot: BinanceSpotRealTimeApi;
    userData: BinanceUserDataRealTimeApi;
  };

  constructor(options: IApiClientInitializeOptions) {
    this.spot = {
      market: new BinanceSpotMarketApi(options),
      trade: new BinanceSpotTradeApi(options),
      dataStream: new BinanceSpotDataStreamApi(options),
      wallet: new BinanceSpotWalletApi(options),
    };
    this.realtime = {
      spot: new BinanceSpotRealTimeApi(options),
      userData: new BinanceUserDataRealTimeApi(options),
    };
  }
}
