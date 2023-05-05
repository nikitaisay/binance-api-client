import WebSocket from "ws";

import { 
  IHandleStreamOptions,
  TWebSocketMapItem
} from "./types";

export abstract class BinanceRealTimeApiClient {
  protected apiUrl: string;
  protected baseApiUrl: string;
  protected testApiUrl: string;
  protected wsConnections: Map<string, TWebSocketMapItem> = new Map();

  protected unsubscribeStream(connection: TWebSocketMapItem, id: string): void {
    const unsubscribeMsg = {
      method: "UNSUBSCRIBE",
      params: [connection.type],
      id: parseFloat(id),
    };

    connection.ws.send(JSON.stringify(unsubscribeMsg));
    connection.ws.close();
    this.wsConnections.delete(id);
  }

  protected addConnetion(
    id: number, 
    ws: WebSocket, 
    type: string
  ): void {
    this.wsConnections.set(`${id}`, { ws, type, });
  }

  protected subscribeStream(options: IHandleStreamOptions): WebSocket {
    const ws = new WebSocket(options.url);
    this.addConnetion(options.id, ws, options.type);

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
        console.error("Error parsing JSON data:", error.message);

        if (options.errorCallback) {
          options.errorCallback(error);
        }
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
}
