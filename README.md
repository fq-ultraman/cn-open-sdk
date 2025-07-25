# cn-open-sdk

一个用于调用中国开放平台API的TypeScript SDK，目前支持淘宝开放平台。

## 安装

```bash
npm install cn-open-sdk
# 或
pnpm add cn-open-sdk
# 或
yarn add cn-open-sdk
```

## 使用方法

### 淘宝开放平台

1. 初始化客户端

```typescript
import { OpenClient } from 'cn-open-sdk';

// 创建淘宝开放平台客户端
const client = new OpenClient('taobao', {
  appkey: 'YOUR_APP_KEY',
  appsecret: 'YOUR_APP_SECRET'
});
```

2. 调用API接口

```typescript
// 调用淘宝API示例
try {
  const response = await client.execute('taobao.item.get', {
    fields: 'num_iid,title,price',
    num_iid: '123456789'
  });
  console.log('API响应:', response);
} catch (error) {
  console.error('API调用失败:', error);
}
```

## 支持的平台

- ✅ 淘宝开放平台 (`taobao`)

## API文档

### OpenClient类

#### 构造函数

```typescript
new OpenClient(platform: string, params: Record<string, any>)
```

- `platform`: 平台名称，目前仅支持 `taobao`
- `params`: 平台参数，淘宝平台需要包含 `appkey` 和 `appsecret`

#### execute方法

```typescript
async execute(method: string, params: Record<string, any>): Promise<any>
```

- `method`: API方法名（如 `taobao.item.get`）
- `params`: API请求参数
- 返回: Promise，解析为API响应数据

## 错误处理

API调用可能会抛出错误，包括但不限于：
- 平台不支持错误
- 参数缺失或格式错误
- API调用失败

建议使用try/catch捕获并处理这些错误。

## 许可证

MIT
