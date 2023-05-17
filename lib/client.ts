import { BinanceSpotRealTimeApi } from "./binance/realTime/spot";
import { BinanceUserDataRealTimeApi } from "./binance/realTime/userData";
import { BinanceSpotDataStreamApi } from "./binance/restApi/spot/dataStream";
import { BinanceSpotMarketApi } from "./binance/restApi/spot/market";
import { BinanceSpotTradeApi } from "./binance/restApi/spot/trade";
import { BinanceSpotWalletApi } from "./binance/restApi/spot/wallet";
import { IApiClientInitializeOptions } from "./binance/restApi/types";

export class BinanceApiClient {
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
    this.spot.market = new BinanceSpotMarketApi(options);
    this.spot.trade = new BinanceSpotTradeApi(options);
    this.spot.dataStream = new BinanceSpotDataStreamApi(options);
    this.spot.wallet = new BinanceSpotWalletApi(options);
    
    this.realtime.spot = new BinanceSpotRealTimeApi(options);
    this.realtime.userData = new BinanceUserDataRealTimeApi(options);
  }
}
