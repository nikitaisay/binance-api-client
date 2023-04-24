import WebSocket from "ws";

import { 
  IHandleStreamOptions,
  IRealTimeApiClientOptions, 
  TWebSocketMapItem
} from "./types";
import ListenKeyManager from "./listenKeyManager";

export abstract class BinanceRealTimeApiClient {
  protected ws_url: string;
  protected base_ws_url: string;
  protected test_ws_url: string;
  protected applyListenKey = false;

  private readonly listenKeyManager: ListenKeyManager;
  private wsConnections: Map<string, TWebSocketMapItem> = new Map();

  constructor(options: IRealTimeApiClientOptions) {
    this.listenKeyManager = new ListenKeyManager(options);
  }

  protected async handleStream(options: IHandleStreamOptions): Promise<void> {
    if (this.applyListenKey) {
      await this.initListenKey();
    }

    const ws = new WebSocket(this.getStreamUrl(options.url));

    this.wsConnections.set(`${options.id}`, { 
      ws, 
      type: options.type, 
    });

    ws.on("error", (error) => {
      if (options.errorCallback) {
        options.errorCallback(error);
      }
    });

    ws.on("open", () => {
      const payload = JSON.stringify({ 
        id: options.id, 
        method: "SUBSCRIBE",
        params: [options.type],
      });

      ws.send(payload);

      if (options.connectionCallback) {
        options.connectionCallback();
      }
    });
    
    ws.on("close", (code, reason) => {
      if (options.closeCallback) {
        options.closeCallback(code, reason.toString());
      }
    });
    
    ws.on("message", (message: WebSocket.Data) => {
      let data: unknown;

      try {
        data = JSON.parse(message.toString());
      } catch (error) {
        console.error("Error parsing JSON data:", error.message);
      }

      options.callback(data);
    });
  }

  private async initListenKey(): Promise<void> {
    if (!this.listenKeyManager.listenKey) {
      await this.listenKeyManager.initListenKey();
    }

    if (this.listenKeyManager.isExpired()) {
      await this.listenKeyManager.pingListenKey();
    }
  }

  private getStreamUrl(path: string): string {
    if (this.applyListenKey && this.listenKeyManager.listenKey) {
      return `${path}/${this.listenKeyManager.listenKey}`;
    }

    return path;
  }

  public closeStream(id: string): void {
    const connection = this.wsConnections.get(id);

    if (connection) {
      const unsubscribeMsg = {
        method: "UNSUBSCRIBE",
        params: [connection.type],
        id: parseInt(id),
      };

      connection.ws.send(JSON.stringify(unsubscribeMsg));
      connection.ws.close();
      this.wsConnections.delete(id);
    }
  }

  public closeAllStreams(): void {
    this.wsConnections.forEach((connection, id) => {
      const unsubscribeMsg = {
        method: "UNSUBSCRIBE",
        params: [connection.type],
        id: parseInt(id),
      };

      connection.ws.send(JSON.stringify(unsubscribeMsg));
      connection.ws.close();
      this.wsConnections.delete(id);
    });
  }

  public getStreamById(id: number): WebSocket | undefined {
    const connection = this.wsConnections.get(`${id}`);

    if (connection) {
      return connection.ws;
    }
  }
}
