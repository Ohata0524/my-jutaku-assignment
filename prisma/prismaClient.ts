import { PrismaClient } from "@prisma/client";

declare global {
	var globalPrisma: undefined | PrismaClient;
}

export const prisma = globalThis.globalPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalThis.globalPrisma = prisma;
}
