import { 
  test, 
  describe, 
  expect,
  beforeEach
} from "@jest/globals";

import { BinanceSpotTradeApi } from "../../../binance/spot/trade";

describe("BinanceSpotTradeApi", () => {
  let api: BinanceSpotTradeApi;

  beforeEach(() => {
    api = new BinanceSpotTradeApi({
      enableTestnet: true,
      apiKey: process.env.BINANCE_TESTNET_API_KEY,
      apiSecret: process.env.BINANCE_TESTNET_API_SECRET,
    });
  });

  test("Should check that api client is defined", () => {
    expect(api).toBeDefined();
  });

  describe("getCurrentOpenOrders", () => {
    test("Should get current open orders", async () => {
      const data = await api.getCurrentOpenOrders();
      expect(data).toBeDefined();
    });

    test("Should get current open orders for a specific symbol", async () => {
      const data = await api.getCurrentOpenOrders({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    });
  });

  describe("getAllOrders", () => {
    test("Should get all orders", async () => {
      const data = await api.getAllOrders({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    });

    test("Should get all orders within a specific date range", async () => {
      const endTime = Date.now();
      const startTime = endTime - 86400000; // 24 hours ago
      const data = await api.getAllOrders({
        symbol: "BNBUSDT",
        startTime,
        endTime,
      });
      expect(data).toBeDefined();
    });
  });

  describe("queryAllOco", () => {
    test("Should query all OCO", async () => {
      const data = await api.queryAllOco();
      expect(data).toBeDefined();
    });

    test("Should query all oso within a specific date range", async () => {
      const endTime = Date.now();
      const startTime = endTime - 86400000; // 24 hours ago
      const data = await api.queryAllOco({
        startTime,
        endTime,
      });
      expect(data).toBeDefined();
    });
  });

  describe("queryOpenOco", () => {
    test("Should query open OCO", async () => {
      const data = await api.queryOpenOco();
      expect(data).toBeDefined();
    });
  });

  describe("getAccountInformation", () => {
    test("Should get account information", async () => {
      const data = await api.getAccountInformation();
      expect(data).toBeDefined();
    });
  });

  describe("getAccountTradeList", () => {
    test("Should get account trade list", async () => {
      const data = await api.getAccountTradeList({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    });

    test("Should get account trade list within a specific date range", async () => {
      const endTime = Date.now();
      const startTime = endTime - 86400000; // 24 hours ago
      const data = await api.getAccountTradeList({
        symbol: "BNBUSDT",
        startTime,
        endTime,
      });
      expect(data).toBeDefined();
    });
  });

  describe("queryCurrentOrderCountUsage", () => {
    test("Should query current order count usage", async () => {
      const data = await api.queryCurrentOrderCountUsage();
      expect(data).toBeDefined();
    });
  });

  describe("testNewOrder", () => {
    test("Should test new order", async () => {
      const data = await api.testNewOrder({
        symbol: "BNBUSDT",
        side: "BUY",
        type: "MARKET",
        quantity: 1,
      });
      expect(data).toBeDefined();
    });
  });

  describe("testNewLimitOrder", () => {
    test("Should test new limit order", async () => {
      const data = await api.testNewLimitOrder({
        symbol: "BNBUSDT",
        side: "BUY",
        quantity: 1,
        timeInForce: "GTC",
        price: 1000,
      });
      expect(data).toBeDefined();
    });
  });

  describe("testNewMarketOrder", () => {
    test("Should test new market order with quantity param", async () => {
      const data = await api.testNewMarketOrder({
        symbol: "BNBUSDT",
        side: "BUY",
        quantity: 1,
      });
      expect(data).toBeDefined();
    });

    test("Should test new market order with quoteOrderQty param", async () => {
      const data = await api.testNewMarketOrder({
        symbol: "BTCUSDT",
        side: "BUY",
        quoteOrderQty: 1000,
      });
      expect(data).toBeDefined();
    });
  });

  describe("testNewStopLossLimitOrder", () => {
    test("Should test new stop-loss limit order with stopPrice param", async () => {
      const data = await api.testNewStopLossLimitOrder({
        symbol: "BNBUSDT",
        side: "BUY",
        timeInForce: "GTC",
        quantity: 1,
        price: 1000,
        stopPrice: 100,
      });
      expect(data).toBeDefined();
    });

    test("Should test new stop-loss limit order with trailingDelta param", async () => {
      const data = await api.testNewStopLossLimitOrder({
        symbol: "BNBUSDT",
        side: "BUY",
        timeInForce: "GTC",
        quantity: 1,
        price: 1000,
        trailingDelta: 100,
      });
      expect(data).toBeDefined();
    });
  });

  describe("testNewTakeProfitLimitOrder", () => {
    test("Should test new take-profit limit order with stopPrice param", async () => {
      const data = await api.testNewTakeProfitLimitOrder({
        symbol: "BNBUSDT",
        side: "BUY",
        timeInForce: "GTC",
        quantity: 1,
        price: 1000,
        stopPrice: 100,
      });
      expect(data).toBeDefined();
    });

    test("Should test new take-profit limit order with trailingDelta param", async () => {
      const data = await api.testNewTakeProfitLimitOrder({
        symbol: "BNBUSDT",
        side: "BUY",
        quantity: 1,
        timeInForce: "GTC",
        price: 1000,
        trailingDelta: 100,
      });
      expect(data).toBeDefined();
    });
  });

  describe("testNewLimitMakerOrder", () => {
    test("Should test new limit maker order", async () => {
      const data = await api.testNewLimitMakerOrder({
        symbol: "BNBUSDT",
        side: "BUY",
        quantity: 1,
        price: 1000,
      });
      expect(data).toBeDefined();
    });
  });
});
