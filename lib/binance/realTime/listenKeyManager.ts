import { BinanceSpotDataStreamApi } from "../restApi/spot/dataStream";

import { TListenKeyManagerOptions } from "./types";

export default class ListenKeyManager {
  private readonly binanceSpotDataStreamApi: BinanceSpotDataStreamApi;
  readonly expirationTime = 40 * 60 * 1000; // 40 minutes in milliseconds

  public listenKey: string;
  public creationTimestamp: number;

  constructor(options: TListenKeyManagerOptions) {
    this.binanceSpotDataStreamApi = new BinanceSpotDataStreamApi(options);
  }

  public keepAlive() {
    const intervalId = setInterval(() => {
      this.pingListenKey();
    }, this.expirationTime);
  } 

  public async initListenKey() {
    const data = await this.binanceSpotDataStreamApi.createListenKey();

    if (data && data.listenKey) {
      this.listenKey = data.listenKey;
      this.creationTimestamp = Date.now();
      this.keepAlive();
    }
  }

  public async pingListenKey() {
    const data = await this.binanceSpotDataStreamApi.pingListenKey({
      listenKey: this.listenKey,
    });

    if (data) {
      this.creationTimestamp = Date.now();
    }
  }

  public getRemainingTime() {
    const currentTime = Date.now();
    const timeElapsed = currentTime - this.creationTimestamp;
    const remainingTime = this.expirationTime - timeElapsed;

    return remainingTime;
  }

  public isExpired() {
    const remainingTime = this.getRemainingTime();

    return remainingTime <= 0;
  }
}
