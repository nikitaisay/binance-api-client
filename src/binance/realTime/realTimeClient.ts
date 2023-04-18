import WebSocket from "ws";

import { 
  IHandleStreamOptions,
  IRealTimeApiClientOptions 
} from "./types";
import ListenKeyManager from "./listenKeyManager";

export abstract class BinanceRealTimeApiClient {
  protected ws_url: string;
  protected base_ws_url: string;
  protected test_ws_url: string;
  protected applyListenKey = false;

  private readonly listenKeyManager: ListenKeyManager;
  private wsConnections: Map<string, WebSocket> = new Map();

  constructor(options: IRealTimeApiClientOptions) {
    this.listenKeyManager = new ListenKeyManager(options);
  }

  protected async handleStream(options: IHandleStreamOptions): Promise<void> {
    if (this.applyListenKey) {
      await this.initListenKey();
    }

    const ws = new WebSocket(this.getStreamUrl(options.url));
    this.wsConnections.set(options.id.toString(), ws);

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
    
    ws.on("close", (code, reason) => {
      console.warn(`WebSocket closed with code ${code} and reason: ${reason}`);
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
    const ws = this.wsConnections.get(id);

    if (ws) {
      ws.close();
      this.wsConnections.delete(id);
    }
  }

  public closeAllStreams(): void {
    this.wsConnections.forEach((ws, id) => {
      ws.close();
      this.wsConnections.delete(id);
    });
  }
}
