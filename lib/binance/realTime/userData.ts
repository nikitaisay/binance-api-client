import { BINANCE_API_URLS } from "../../constants";

import { BinanceRealTimeApiClient } from "./realTimeClient";

import { 
  IRealTimeApiClientOptions, 
  TSubscribeUserDataStreamOptions 
} from "./types";

export class BinanceUserDataRealTimeApi extends BinanceRealTimeApiClient {
  constructor(options: IRealTimeApiClientOptions) {
    super(options);
    this.base_ws_url = BINANCE_API_URLS.WEBSOCKET_SPOT_API.BASE;
    this.test_ws_url = BINANCE_API_URLS.WEBSOCKET_SPOT_API.TESTNET;
    this.ws_url = options.enableTestnet ? this.test_ws_url : this.base_ws_url;
    this.applyListenKey = true;
  }

  public subscribeUserDataStream(options: TSubscribeUserDataStreamOptions) {
    this.handleStream({
      ...options,
      url: this.ws_url,
      type: "userData",
    });
  }
}
