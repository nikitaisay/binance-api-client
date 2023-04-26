export interface IClientInitializeOptions {
  enableTestnet: boolean;
  apiKey: string;
  apiSecret: string;
}

export enum RequestType {
  GET = "GET",
  POST = "POST",
  PATH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE"
}
