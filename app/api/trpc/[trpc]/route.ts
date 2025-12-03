// 引入 tRPC 的 fetch 适配器
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
// 导入上下文创建函数和路由器
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";
// 处理所有对 /api/trpc/* 的请求
const handler = (req: Request) =>
  fetchRequestHandler({
    // API 的基础路径
    endpoint: "/api/trpc",
    // 请求对象
    req,
    // 使用我们定义的路由器
    router: appRouter,
    // 创建上下文的函数
    createContext: createTRPCContext,
  });

// 导出 GET 和 POST 处理器，tRPC 会根据请求方法自动处理
export { handler as GET, handler as POST };
