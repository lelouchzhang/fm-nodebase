// 从初始化文件导入基础 tools
import { createTRPCRouter } from "../init";
import { workflowsRouter } from "@/features/workflows/server/routes";

// 创建主路由器，定义所有可用的 API
export const appRouter = createTRPCRouter({
  workflows: workflowsRouter
});

// 导出路由器的类型定义（重要！用于客户端类型推断）
export type AppRouter = typeof appRouter;
