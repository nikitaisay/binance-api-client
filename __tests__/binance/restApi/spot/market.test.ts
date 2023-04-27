import { BinanceSpotMarketApi } from "../../../../lib/binance/restApi/spot/market";

describe("BinanceSpotMarketApi", () => {
  let api: BinanceSpotMarketApi;

  beforeEach(() => {
    api = new BinanceSpotMarketApi({
      enableTestnet: true,
      apiKey: process.env.BINANCE_TESTNET_API_KEY || "",
      apiSecret: process.env.BINANCE_TESTNET_API_SECRET || "",
    });
  });

  test("Should check that api client is defined", () => {
    expect(api).toBeDefined();
  });

  describe("testConnectivity", () => {
    test("Should test connectivity", async () => {
      const data = await api.testConnectivity();
      expect(data).toBeDefined();
    });
  });

  describe("checkServerTime", () => {
    test("Should check server time", async () => {
      const data = await api.checkServerTime();
      expect(data).toBeDefined();
    });
  });

  describe("getExchangeInfo", () => {
    test("Should get exchange info", async () => {
      const data = await api.getExchangeInfo();
      expect(data).toBeDefined();
    }); 

    test("Should get exchange info for specific symbol", async () => {
      const data = await api.getExchangeInfo({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    }); 

    test("Should get exchange info for specific symbols", async () => {
      const data = await api.getExchangeInfo({
        symbols: ["BTCUSDT"],
      });
      expect(data).toBeDefined();
    }); 

    test("Should get exchange info for specific permissions", async () => {
      const data = await api.getExchangeInfo({
        permissions: ["SPOT"],
      });
      expect(data).toBeDefined();
    }); 
  });

  describe("getOrderBook", () => {
    test("Should get order book for specific symbol", async () => {
      const data = await api.getOrderBook({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    }); 

    test("Should get order book for specific symbol with limitations", async () => {
      const data = await api.getOrderBook({
        symbol: "BNBUSDT",
        limit: 1,
      });
      expect(data).toBeDefined();
      expect(data).toHaveProperty("bids");
      expect(data.bids).toHaveLength(1);
    }); 
  });

  describe("getRecentTradesList", () => {
    test("Should get recent trades list for specific symbol", async () => {
      const data = await api.getRecentTradesList({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    }); 

    test("Should get recent trades list for specific symbol with limits", async () => {
      const data = await api.getRecentTradesList({
        symbol: "BNBUSDT",
        limit: 1,
      });
      expect(data).toBeDefined();
      expect(data).toHaveProperty("bids");
      expect(data.bids).toHaveLength(1);
    }); 
  });

  describe("getAggregateTradesList", () => {
    test("Should get aggregate trades list for specific symbol", async () => {
      const data = await api.getAggregateTradesList({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    });

    test("Should get aggregate trades list for specific symbol with limits", async () => {
      const data = await api.getAggregateTradesList({
        symbol: "BNBUSDT",
        limit: 10,
      });
      expect(data).toBeDefined();
      expect(data).toHaveLength(10);
    });

    test("Should get aggregate trades list for specific symbol within a specific time range", async () => {
      const startTime = Date.now();
      const endTime = startTime - 86400000; // 24 hours ago
        
      const data = await api.getAggregateTradesList({
        symbol: "BNBUSDT",
        startTime,
        endTime,
      });
      expect(data).toBeDefined();
    });
  });

  describe("getCandlestickData", () => {
    test("Should get candlestick data for specific symbol with interval", async () => {
      const data = await api.getCandlestickData({
        symbol: "BNBUSDT",
        interval: "1d",
      });
      expect(data).toBeDefined();
    });

    test("Should get candlestick data for specific symbol with interval within a specific time range", async () => {
      const startTime = Date.now();
      const endTime = startTime - 86400000; // 24 hours ago

      const data = await api.getCandlestickData({
        symbol: "BNBUSDT",
        interval: "1d",
        startTime,
        endTime,
      });
      expect(data).toBeDefined();
    });

    test("Should get candlestick data for specific symbol with interval with specific limits", async () => {
      const data = await api.getCandlestickData({
        symbol: "BNBUSDT",
        limit: 1,
        interval: "1d",
      });
      expect(data).toBeDefined();
      expect(data).toHaveLength(1);
    });
  });

  describe("getCurrentAveragePrice", () => {
    test("Should get current average price for specific symbol", async () => {
      const data = await api.getCurrentAveragePrice({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    });
  });

  describe("get24hrTickerPriceChangeStatistics", () => {
    test("Should get 24hr ticker price change statistics", async () => {
      const data = await api.get24hrTickerPriceChangeStatistics();
      expect(data).toBeDefined();
    });

    test("Should get 24hr ticker price change statistics for specific symbol", async () => {
      const data = await api.get24hrTickerPriceChangeStatistics({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    });

    test("Should get 24hr ticker price change statistics for specific symbols", async () => {
      const data = await api.get24hrTickerPriceChangeStatistics({
        symbols: ["BNBUSDT"],
      });
      expect(data).toBeDefined();
    });

    test("Should get 24hr ticker price change statistics for specific symbol with type", async () => {
      const data = await api.get24hrTickerPriceChangeStatistics({
        symbol: "BNBUSDT",
        type: "MINI",
      });
      expect(data).toBeDefined();
    });
  });

  describe("getSymbolPriceTicker", () => {
    test("Should get symbol price ticker", async () => {
      const data = await api.getSymbolPriceTicker();
      expect(data).toBeDefined();
    });

    test("Should get symbol price ticker for specific symbol", async () => {
      const data = await api.getSymbolPriceTicker({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    });

    test("Should get symbol price ticker for specific symbols", async () => {
      const data = await api.getSymbolPriceTicker({
        symbols: ["BNBUSDT"],
      });
      expect(data).toBeDefined();
    });
  });

  describe("getSymbolOrderBookTicker", () => {
    test("Should get symbol order book ticker", async () => {
      const data = await api.getSymbolOrderBookTicker();
      expect(data).toBeDefined();
    });

    test("Should get symbol order book ticker for specific symbol", async () => {
      const data = await api.getSymbolOrderBookTicker({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    });

    test("Should get symbol order book ticker for specific symbols", async () => {
      const data = await api.getSymbolOrderBookTicker({
        symbols: ["BNBUSDT"],
      });
      expect(data).toBeDefined();
    });
  });

  describe("getRollingWindowPriceChangeStatistics", () => {
    test("Should get rolling window price change statistics for specific symbols", async () => {
      const data = await api.getRollingWindowPriceChangeStatistics({
        symbols: ["BNBUSDT"],
      });
      expect(data).toBeDefined();
    });

    test("Should get rolling window price change statistics for specific symbol", async () => {
      const data = await api.getRollingWindowPriceChangeStatistics({
        symbol: "BNBUSDT",
      });
      expect(data).toBeDefined();
    });

    test("Should get rolling window price change statistics for specific symbol and window size", async () => {
      const data = await api.getRollingWindowPriceChangeStatistics({
        symbols: ["BNBUSDT"],
        windowSize: "1d",
      });
      expect(data).toBeDefined();
    });

    test("Should get rolling window price change statistics for specific symbol and type", async () => {
      const data = await api.getRollingWindowPriceChangeStatistics({
        type: "MINI",
        symbols: ["BNBUSDT"],
      });
      expect(data).toBeDefined();
    });
  });
});
