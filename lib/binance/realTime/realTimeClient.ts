import WebSocket from "ws";

import { RequestType } from "../../types";
import { 
  buildQueryString, 
  createSignature, 
  stringifyData 
} from "../../utils/binance";

import { 
  IHandleStreamOptions,
  IRealTimeApiClientOptions,
  TWebSocketMapItem
} from "./types";

export abstract class BinanceRealTimeApiClient {
  protected apiUrl: string;
  protected baseApiUrl: string;
  protected testApiUrl: string;

  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly enableTestnet: boolean;

  private wsConnections: Map<string, TWebSocketMapItem> = new Map();

  constructor(options: IRealTimeApiClientOptions) {
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
    this.enableTestnet = options.enableTestnet;
  }

  private buildQueryString<P>(params: P): string {
    return buildQueryString(params);
  }

  private stringifyData<V>(value: V): string | V {
    return stringifyData(value);
  }

  private createSignature(queryString: string): string {
    return createSignature(queryString, this.apiSecret);
  }

  protected sendSignedMessage<D>(
    stream: WebSocket, 
    data: D, 
    path: string
  ): void {
    const params = {
      ...data,
      timestamp: Date.now(),
    };

    const queryString = this.buildQueryString(params);
    const signature = this.createSignature(queryString);

    const payload = {
      method: RequestType.POST,
      path: `${path}?${queryString}&signature=${signature}`,
      headers: {
        "X-MBX-APIKEY": this.apiKey,
      },
    };

    stream.send(JSON.stringify(payload));
  }

  private getStreamUrl(path: string, listenKey?: string): string {
    return listenKey ? `${path}/${listenKey}` : path;
  }

  private unsubscribeStream(connection: TWebSocketMapItem, id: string): void {
    const unsubscribeMsg = {
      method: "UNSUBSCRIBE",
      params: [connection.type],
      id: parseInt(id),
    };

    connection.ws.send(JSON.stringify(unsubscribeMsg));
    connection.ws.close();
    this.wsConnections.delete(id);
  }

  protected subscribeStream(options: IHandleStreamOptions): WebSocket {
    const ws = new WebSocket(this.getStreamUrl(options.url, options.listenKey));

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

    return ws;
  }

  public closeStream(id: string): void {
    const connection = this.wsConnections.get(id);

    if (connection) {
      this.unsubscribeStream(connection, id);
    }
  }

  public closeAllStreams(): void {
    this.wsConnections.forEach((connection, id) => {
      this.unsubscribeStream(connection, id);
    });
  }

  public getStreamById(id: number): WebSocket | undefined {
    const connection = this.wsConnections.get(`${id}`);

    if (connection) {
      return connection.ws;
    }
  }

  public createStream(options: IHandleStreamOptions): WebSocket {
    return this.subscribeStream(options); 
  }
}
