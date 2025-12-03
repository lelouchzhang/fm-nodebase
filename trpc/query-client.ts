import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
// import superjson from 'superjson';

// 工厂函数：创建 QueryClient 实例
export function makeQueryClient() {
  return new QueryClient({
    // 默认选项配置
    defaultOptions: {
      // 查询的默认配置
      queries: {
        // 数据在 30 秒内被认为是"新鲜"的，不会重复请求
        staleTime: 30 * 1000, // 30秒
      },
      // 序列化（脱水）配置：把服务端数据转为可传输格式
      dehydrate: {
        // -- 默认使用 JSON.stringify 序列化数据，如果使用复杂数据 Date/Map等开启superjson
        // serializeData: superjson.serialize，

        // 默认成功的查询才脱水，pending的查询也脱水
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      // 反序列化（水合）配置：在客户端恢复数据
      hydrate: {
        // deserializeData: superjson.deserialize, // 如果使用数据转换器
      },
    },
  });
}
