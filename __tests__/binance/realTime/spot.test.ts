import { BinanceSpotRealTimeApi } from "../../../lib/binance/realTime/spot";

describe("BinanceSpotRealTimeApi", () => {
  let client: BinanceSpotRealTimeApi;

  beforeEach(() => {
    client = new BinanceSpotRealTimeApi({
      enableTestnet: true,
      apiKey: process.env.BINANCE_TESTNET_API_KEY || "",
      apiSecret: process.env.BINANCE_TESTNET_API_SECRET || "",
    });
  });
  
  test("Should subscribe trade stream", async () => {
    const callback = jest.fn();
    const errorCallback = jest.fn();
    const connectionCallback = jest.fn();
    const closeCallback = jest.fn();
    const id = 1;

    client.subscribeTradeStream({
      symbol: "bnbbtc",
      id,
      callback,
      errorCallback,
      connectionCallback,
      closeCallback,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000)); // wait for client to be connected

    let stream = client.getStreamById(id);
    expect(stream).toBeDefined();

    client.closeAllStreams();
    await new Promise((resolve) => setTimeout(resolve, 3000)); // wait for client to be disconnected
    stream = client.getStreamById(id);

    expect(callback).toHaveBeenCalled();
    expect(connectionCallback).toHaveBeenCalled();
    expect(closeCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(stream).toBe(undefined);
  }, 10000);
});
