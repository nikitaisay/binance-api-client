import { BINANCE_API_URLS } from "../../constants";

import ListenKeyManager from "./listenKeyManager";
import { BinanceRealTimeApiClient } from "./realTimeClient";

import { 
  IRealTimeApiClientOptions, 
  TSubscribeUserDataStreamOptions 
} from "./types";

export class BinanceUserDataRealTimeApi extends BinanceRealTimeApiClient {
  private listenKeyManager: ListenKeyManager;

  constructor(options: IRealTimeApiClientOptions) {
    super(options);
    this.base_ws_url = BINANCE_API_URLS.WEBSOCKET_SPOT_API.BASE;
    this.test_ws_url = BINANCE_API_URLS.WEBSOCKET_SPOT_API.TESTNET;
    this.ws_url = options.enableTestnet ? this.test_ws_url : this.base_ws_url;
    this.listenKeyManager = new ListenKeyManager(options);
  }

  public async subscribeUserDataStream(options: TSubscribeUserDataStreamOptions) {
    try {
      await this.listenKeyManager.initListenKey();

      if (this.listenKeyManager.listenKey) {
        this.subscribeStream({
          ...options,
          url: this.ws_url,
          type: this.listenKeyManager.listenKey,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
