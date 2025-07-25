export interface IPlatformClient {
  execute(method: string, params: Record<string, any>): Promise<any>;
}