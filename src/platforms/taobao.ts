import axios from "axios";
import { createHmac } from "crypto";
import { IPlatformClient } from "../types.js";

interface TaobaoParams {
  appkey: string;
  appsecret: string;
}

export class TaobaoClient implements IPlatformClient {
  private appkey: string;
  private appsecret: string;
  private baseUrl = "https://gw.api.taobao.com/router/rest";

  constructor(params: TaobaoParams) {
    if (!params.appkey || !params.appsecret) {
      throw new Error("Taobao platform requires appkey and appsecret");
    }
    this.appkey = params.appkey;
    this.appsecret = params.appsecret;
  }

  private generateSign(params: Record<string, any>): string {
    // Sort parameters by key
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((obj, key) => {
        obj[key] = params[key];
        return obj;
      }, {} as Record<string, any>);

    // Create sign string
    let signStr = "";
    for (const key in sortedParams) {
      signStr += key + sortedParams[key];
    }

    // Generate MD5 signature and convert to uppercase
    return createHmac("md5", this.appsecret)
      .update(signStr)
      .digest("hex")
      .toUpperCase();
  }

  async execute(method: string, params: Record<string, any>): Promise<any> {
    const requestParams = {
      method,
      app_key: this.appkey,
      format: "json",
      v: "2.0",
      sign_method: "hmac",
      timestamp: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
      ...params,
    };

    // Generate signature
    const signedRequestParams = {
      ...requestParams,
      sign: this.generateSign(requestParams),
    };

    // Send request to Taobao API
    const response = await axios.get(this.baseUrl, {
      params: signedRequestParams,
    });
    return response.data;
  }
}
