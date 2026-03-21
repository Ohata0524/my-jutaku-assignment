import { z } from "zod";
import { prisma } from "~/prisma/prismaClient";
import { adminProcedure, protectedProcedure, router } from "../trpc";

export const projectRouter = router({
	// 全案件取得（ログイン済みなら誰でも可、削除済みは除く）
	getAll: protectedProcedure.query(async () => {
		return await prisma.project.findMany({
			where: { deleted_at: null },
			orderBy: { created_at: "desc" },
		});
	}),

	// 案件詳細取得
	getById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input }) => {
			return await prisma.project.findUnique({
				where: { id: input.id },
				include: { user: { select: { name: true } } },
			});
		}),

	// 案件作成（管理者のみ）
	create: adminProcedure
		.input(
			z.object({
				title: z.string().min(1),
				detail: z.string().min(1),
				skills: z.string(),
				unit_price: z.number().int(),
				deadline: z.date(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			return await prisma.project.create({
				data: {
					...input,
					user_id: ctx.user.id, // 作成した管理者のID
				},
			});
		}),

	// 案件の論理削除（管理者のみ）
	delete: adminProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input }) => {
			return await prisma.project.update({
				where: { id: input.id },
				data: { deleted_at: new Date() },
			});
		}),
});