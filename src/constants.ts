export const DEFAULT_REQUEST_ERROR_MESSAGE = "Request error occured";

export const BINANCE_API_URLS = {
  PERPETUAL_FUTURES: {
    BASE: "https://fapi.binance.com",
    TESTNET: "https://testnet.binancefuture.com",
  },
  EUROPEAN_OPTIONS: {
    BASE: "https://eapi.binance.com",
    TESTNET: "https://testnet.binance.com",
  },
  SPOT: {
    BASE: "https://api.binance.com",
    TESTNET: "https://testnet.binance.vision",
  },
  DELIVERY_FUTURES: {
    BASE: "https://dapi.binance.com",
    TESTNET: "https://testnet.binancefuture.com",
  },
  WEBSOCKET_SPOT_API: {
    BASE: "wss://stream.binance.com:9443/ws",
    TESTNET: "wss://testnet.binance.vision/ws",
  },
};
