// 从初始化文件导入基础 tools
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";

// 创建主路由器，定义所有可用的 API
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: { email: "<EMAIL>" },
    });
    return { success: true, message: "inngest created workflow succeeed" };
  }),
});

// 导出路由器的类型定义（重要！用于客户端类型推断）
export type AppRouter = typeof appRouter;
