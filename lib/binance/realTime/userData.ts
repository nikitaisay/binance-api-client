import WebSocket from "ws";

import { BINANCE_API_URLS } from "../../constants";

import ListenKeyManager from "./listenKeyManager";
import { BinanceRealTimeApiClient } from "./realTimeClient";
import { 
  IRealTimeApiClientOptions, 
  TStreamOptions 
} from "./types";

export class BinanceUserDataRealTimeApi extends BinanceRealTimeApiClient {
  private listenKeyManager: ListenKeyManager;
  private intervals: Map<string,  NodeJS.Timer> = new Map();

  constructor(options: IRealTimeApiClientOptions) {
    super();
    this.baseApiUrl = BINANCE_API_URLS.WEBSOCKET_SPOT_API.BASE;
    this.testApiUrl = BINANCE_API_URLS.WEBSOCKET_SPOT_API.TESTNET;
    this.apiUrl = options.enableTestnet ? this.testApiUrl : this.baseApiUrl;
    this.listenKeyManager = new ListenKeyManager(options);
  }

  private clearInterval(id: string): void {
    const interval = this.intervals.get(id);

    if (interval) {
      clearInterval(interval);
      this.intervals.delete(id);
    }
  }

  public async subscribeUserDataStream(options: TStreamOptions): Promise<void> {
    await this.listenKeyManager.initListenKey();

    if (this.listenKeyManager.listenKey && !this.listenKeyManager.isExpired()) {
      const interval = setInterval(async () => {
        await this.listenKeyManager.pingListenKey();
      }, this.listenKeyManager.expirationTime);

      const ws = new WebSocket(`${this.apiUrl}`);

      this.intervals.set(`${options.id}`, interval);
      this.addConnetion(options.id, ws, this.listenKeyManager.listenKey);

      ws.on("error", (error) => {
        if (options.errorCallback) {
          options.errorCallback(error);
        }
      });

      ws.on("open", () => {
        const payload = JSON.stringify({ 
          id: options.id, 
          method: "SUBSCRIBE",
          params: [this.listenKeyManager.listenKey],
          apiKey: options,
        });
  
        ws.send(payload);
  
        if (options.connectionCallback) {
          options.connectionCallback();
        }
      });

      ws.on("close", (code, reason) => {
        this.closeStream(`${options.id}`);

        if (options.closeCallback) {
          options.closeCallback(code, reason.toString());
        }
      });

      ws.on("message", (message: WebSocket.Data) => {
        let data: unknown;
  
        try {
          data = JSON.parse(message.toString());
        } catch (error) {
          console.error(`Error parsing JSON data: ${error.message}`);

          if (options.errorCallback) {
            options.errorCallback(error);
          }
        }
  
        options.callback(data);
      });
    }
  }

  public closeAllStreams(): void {
    this.wsConnections.forEach((connection, id) => {
      this.unsubscribeStream(connection, id);
      this.clearInterval(id);
    });
  }

  public closeStream(id: string): void {
    const connection = this.wsConnections.get(id);

    if (connection) {
      this.unsubscribeStream(connection, id);
      this.clearInterval(id);
    }
  }
}
