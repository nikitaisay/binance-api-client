export class BinanceApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BinanceApiError";
  }
}
