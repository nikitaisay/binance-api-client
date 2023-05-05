import { BinanceSpotDataStreamApi } from "../restApi/spot/dataStream";

import { TListenKeyManagerOptions } from "./types";

export default class ListenKeyManager {
  private readonly binanceSpotDataStreamApi: BinanceSpotDataStreamApi;

  public readonly expirationTime = 40 * 60 * 1000; // 40 minutes in milliseconds
  public listenKey: string;
  public creationTimestamp: number;

  constructor(options: TListenKeyManagerOptions) {
    this.binanceSpotDataStreamApi = new BinanceSpotDataStreamApi(options);
  }

  public async initListenKey(): Promise<void> {
    const data = await this.binanceSpotDataStreamApi.createListenKey();

    if (data && data.listenKey) {
      this.listenKey = data.listenKey;
      this.creationTimestamp = Date.now();
    }
  }

  public async pingListenKey(): Promise<void> {
    const data = await this.binanceSpotDataStreamApi.pingListenKey({
      listenKey: this.listenKey,
    });

    if (data) {
      this.creationTimestamp = Date.now();
    }
  }

  public getRemainingTime(): number {
    const currentTime = Date.now();
    const timeElapsed = currentTime - this.creationTimestamp;

    return this.expirationTime - timeElapsed;
  }

  public isExpired(): boolean {
    return this.getRemainingTime() <= 0;
  }
}
