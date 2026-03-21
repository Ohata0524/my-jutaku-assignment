import { PrismaClient } from "@prisma/client";

declare global {
	var globalPrisma: any; // 型を any にして、一時的に厳格な型チェックを回避します
}

export const prisma = globalThis.globalPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalThis.globalPrisma = prisma;
}
