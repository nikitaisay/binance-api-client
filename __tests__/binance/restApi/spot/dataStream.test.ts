import { BinanceSpotDataStreamApi } from "../../../../lib/binance/restApi/spot/dataStream";

describe("BinanceSpotDataStreamApi", () => {
  let api: BinanceSpotDataStreamApi;

  beforeEach(() => {
    api = new BinanceSpotDataStreamApi({
      enableTestnet: true,
      apiKey: process.env.BINANCE_TESTNET_API_KEY,
      apiSecret: process.env.BINANCE_TESTNET_API_SECRET,
    });
  });

  test("Should check that api client is defined", () => {
    expect(api).toBeDefined();
  });

  describe("createListenKey pingListenKey closeListenKey", () => {
    test("Should create, ping, close listen key", async () => {
      const createdKey = await api.createListenKey();
  
      expect(createdKey).toBeDefined();
      expect(createdKey).toHaveProperty("listenKey");

      const pingedKey = await api.pingListenKey({
        listenKey: createdKey.listenKey,
      });

      expect(pingedKey).toBeDefined();

      const closedKey = await api.closeListenKey({
        listenKey: createdKey.listenKey,
      });

      expect(closedKey).toBeDefined();
    });
  });
});
