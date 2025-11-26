// 引入 zod 用于验证输入数据
import { z } from 'zod';
// 从初始化文件导入基础 tools
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';

// 创建主路由器，定义所有可用的 API
export const appRouter = createTRPCRouter({
    getUsers: protectedProcedure.query(({ ctx }) => {

        return prisma.user.findMany({
            where: {
                id: ctx.auth.user.id
            }
        });
    })
});

// 导出路由器的类型定义（重要！用于客户端类型推断）
export type AppRouter = typeof appRouter;
