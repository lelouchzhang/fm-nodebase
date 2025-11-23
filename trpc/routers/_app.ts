// 引入 zod 用于验证输入数据
import { z } from 'zod';
// 从初始化文件导入基础 tools
import { baseProcedure, createTRPCRouter } from '../init';

// 创建主路由器，定义所有可用的 API
export const appRouter = createTRPCRouter({
    // 定义一个叫 "hello" 的 API 端点
    hello: baseProcedure
        // 定义输入验证：需要一个对象，包含 text 字段（必须是字符串）
        .input(
            z.object({
                text: z.string(),
            }),
        )
        // 定义这是一个查询（query）类型的 API
        .query((opts) => {
            // opts 包含输入数据和上下文
            return {
                greeting: `hello ${opts.input.text}`,
            };
        }),
});

// 导出路由器的类型定义（重要！用于客户端类型推断）
export type AppRouter = typeof appRouter;
