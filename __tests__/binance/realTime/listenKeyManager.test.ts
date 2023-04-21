import ListenKeyManager from "../../../lib/binance/realTime/listenKeyManager";

describe("ListenKeyManager", () => {
  const manager = new ListenKeyManager({
    enableTestnet: true,
    apiKey: process.env.BINANCE_TESTNET_API_KEY,
    apiSecret: process.env.BINANCE_TESTNET_API_SECRET,
  });

  test("Should init listen key", async () => {
    await manager.initListenKey();

    expect(manager.listenKey).toBeDefined();
    expect(manager.creationTimestamp).toBeDefined();
  });

  test("Should ping listen key", async () => {
    const oldListenKeyCreationTimestamp = manager.creationTimestamp;
    await manager.pingListenKey();

    expect(manager.listenKey).toBeDefined();
    expect(manager.creationTimestamp).toBeGreaterThan(oldListenKeyCreationTimestamp);
  });

  test("Should check is listen key expired", () => {
    expect(manager.isExpired()).toBe(false);
  });
});
