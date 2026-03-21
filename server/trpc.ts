import { initTRPC, TRPCError } from "@trpc/server";
import { prisma } from "~/prisma/prismaClient";

// Contextの型定義（後ほど作成する context.ts と合わせる）
export type Context = {
	user: { id: string; role: "USER" | "ADMIN" } | null;
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// 【認可】ログイン済みであることを要求する
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.user) {
		throw new TRPCError({ code: "UNAUTHORIZED", message: "ログインが必要です" });
	}
	return next({ ctx: { user: ctx.user } });
});

// 【認可】管理者ロールであることを要求する
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
	if (ctx.user.role !== "ADMIN") {
		throw new TRPCError({ code: "FORBIDDEN", message: "管理者権限が必要です" });
	}
	return next({ ctx });
});