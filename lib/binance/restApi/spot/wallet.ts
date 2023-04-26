import { BinanceApiClient } from "../httpClient";
import { IApiClientInitializeOptions } from "../types";
import { RequestType } from "../enums";

import { BINANCE_API_URLS } from "../../../constants";

import { 
  IBUSDConvertTransferOptions,
  IDustTransferOptions,
  IFundingWalletOptions,
  IGetAPIKeyPermissionOptions,
  IGetAccountAPITradingStatusOptions,
  IGetAccountStatusOptions,
  IGetAsseDetailOptions,
  IGetAssetDividendRecordOptions,
  IGetAssetsThatCanBeConvertedIntoBNBOptions,
  IGetBUSDConvertHistoryOptions,
  IGetCloudMiningPaymentAndRefundHistoryOptions,
  IGetDailyAccountSnapshotOptions, 
  IGetDepositAddressOptions, 
  IGetDepositHistoryOptions, 
  IGetDustLogOptions, 
  IGetTradeFeeOptions, 
  IGetWithdrawHistoryOptions, 
  IQueryUserUniversalTransferHistoryOptions, 
  IUserAssetOptions, 
  IUserUniversalTransferHistoryOptions, 
  IWithdrawOptions 
} from "./types";

export class BinanceSpotWalletApi extends BinanceApiClient {
  constructor(options: IApiClientInitializeOptions) {
    super(options);
    this.baseApiUrl = BINANCE_API_URLS.SPOT.BASE;
    this.testnetUrl = BINANCE_API_URLS.SPOT.TESTNET;
    this.url = options.enableTestnet ? this.testnetUrl : this.baseApiUrl;
  }

  async checkSystemStatus() {
    try {
      const res = await this.publicRequest({
        method: RequestType.GET,
        path: "/sapi/v1/system/status",
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getAllCoinsInformation() {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/capital/config/getall",
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getDailyAccountSnapshot(options: IGetDailyAccountSnapshotOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/accountSnapshot",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async withdraw(options: IWithdrawOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/sapi/v1/capital/withdraw/apply",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getDepositHistory(options: IGetDepositHistoryOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/capital/deposit/hisrec",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getWithdrawHistory(options: IGetWithdrawHistoryOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/capital/withdraw/history",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getDepositAddress(options: IGetDepositAddressOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/capital/deposit/address",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getAccountStatus(options: IGetAccountStatusOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/account/status",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getAccountAPITradingStatus(options: IGetAccountAPITradingStatusOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/account/apiTradingStatus",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getDustLog(options: IGetDustLogOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/asset/dribblet",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getAssetsThatCanBeConvertedIntoBNB(options: IGetAssetsThatCanBeConvertedIntoBNBOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/sapi/v1/asset/dust-btc",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async dustTransfer(options: IDustTransferOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/sapi/v1/asset/dust",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getAssetDividendRecord(options: IGetAssetDividendRecordOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/asset/assetDividend",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getAsseDetail(options: IGetAsseDetailOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/asset/assetDetail",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getTradeFee(options: IGetTradeFeeOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/asset/tradeFee",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async queryUserUniversalTransferHistory(options: IQueryUserUniversalTransferHistoryOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/asset/transfer",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async userUniversalTransferHistory(options: IUserUniversalTransferHistoryOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/sapi/v1/asset/transfer",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  // Currently supports querying the following business assets：Binance Pay, Binance Card, Binance Gift Card, Stock Token
  async fundingWallet(options: IFundingWalletOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/sapi/v1/asset/get-funding-asset",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  // Get user assets, just for positive data.
  async getUserAsset(options: IUserAssetOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/sapi/v3/asset/getUserAsset",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getAPIKeyPermission(options: IGetAPIKeyPermissionOptions = {}) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/account/apiRestrictions",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  // Convert transfer, convert between BUSD and stablecoins.
  async BUSDConvertTransfer(options: IBUSDConvertTransferOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.POST,
        path: "/sapi/v1/asset/convert-transfer",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getBUSDConvertHistory(options: IGetBUSDConvertHistoryOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/asset/convert-transfer/queryByPage",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }

  async getCloudMiningPaymentAndRefundHistory(options: IGetCloudMiningPaymentAndRefundHistoryOptions) {
    try {
      const res = await this.privateRequest({
        method: RequestType.GET,
        path: "/sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage",
        params: options,
      });
      return res;
    } catch (error) {
      this.throwError(error?.response?.data?.message);
    }
  }
}
