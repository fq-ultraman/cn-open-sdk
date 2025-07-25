import { IPlatformClient } from "./types.js";
import { TaobaoClient } from "./platforms/taobao.js";

export class OpenClient {
  private platformClient: IPlatformClient;

  constructor(platform: string, params: Record<string, any>) {
    switch (platform) {
      case "taobao":
        this.platformClient = new TaobaoClient(
          params as { appkey: string; appsecret: string }
        );
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  async execute(method: string, params: Record<string, any>): Promise<any> {
    return this.platformClient.execute(method, params);
  }
}
