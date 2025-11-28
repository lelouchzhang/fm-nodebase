// 引入 tRPC 的核心函数
import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
// 引入 React 的缓存函数 :: NextJS 15
import { cache } from 'react';

/**
 * 创建上下文（Context）的函数
 * 上下文就是每次 API 调用时都能访问的"共享信息"
 * 比如：当前登录的用户、数据库连接等
 */
export const createTRPCContext = cache(async () => {
    /**
     * @see: <https://trpc.io/docs/server/context>
     */
    // 这里返回一个对象，包含所有 API 可能用到的共享信息上下文。
    // 示例：返回一个用户ID，实际项目中可能是从请求头解析出的 JWT token
    return { userId: 'user_123' };
});

// 初始化 tRPC 实例
// 不要直接导出整个 t 对象，因为变量名 t 太笼统，容易和其他库的 t（如多语言库）冲突
const t = initTRPC.create({
    /**
     * @see <https://trpc.io/docs/server/data-transformers>
     */
    // transformer: superjson, // 注释掉了，后面会解释
});

// 1. 创建路由器的函数
export const createTRPCRouter = t.router;
// 2. 创建调用器的工厂函数（后面会用到）
export const createCallerFactory = t.createCallerFactory;
// 3. 基础的过程（procedure）创建器
export const baseProcedure = t.procedure;
// 4. 受保护的过程（procedure）创建器
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Unauthorized",
        })
    }
    return next({ ctx: { ...ctx, auth: session } })
})