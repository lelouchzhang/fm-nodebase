import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const globalForPrisma = globalThis as typeof globalThis & {
    prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;



