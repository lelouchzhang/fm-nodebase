import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
    prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || undefined,
} as any);

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;



