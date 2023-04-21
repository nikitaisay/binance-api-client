import { BinanceUserDataRealTimeApi } from "../../../lib/binance/realTime/userData";

describe("BinanceUserDataRealTimeApi", () => {
  let client: BinanceUserDataRealTimeApi;

  beforeEach(() => {
    client = new BinanceUserDataRealTimeApi({
      enableTestnet: true,
      apiKey: process.env.BINANCE_TESTNET_API_KEY,
      apiSecret: process.env.BINANCE_TESTNET_API_SECRET,
    });
  });

  test("Should subscribe user data stream", async () => {
    const callback = jest.fn();
    const errorCallback = jest.fn();
    const connectionCallback = jest.fn();
    const closeCallback = jest.fn();

    client.subscribeUserDataStream({
      id: 1,
      callback,
      errorCallback,
      connectionCallback,
      closeCallback,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000)); // wait for client to be connected
    client.closeAllStreams();
    await new Promise((resolve) => setTimeout(resolve, 3000)); // wait for client to be disconnected

    const stream = client.getStreamById(1);

    expect(callback).toHaveBeenCalled();
    expect(connectionCallback).toHaveBeenCalled();
    expect(closeCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(stream).toBe(undefined);
  }, 10000);
});
