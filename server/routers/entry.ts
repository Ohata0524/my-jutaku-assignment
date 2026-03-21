import { z } from "zod";
import { prisma } from "~/prisma/prismaClient";
import { adminProcedure, protectedProcedure, router } from "../trpc";

export const entryRouter = router({
	// 案件へのエントリー（ユーザーのみ、重複応募禁止）
	create: protectedProcedure
		.input(z.object({ projectId: z.string() }))
		.mutation(async ({ input, ctx }) => {
			return await prisma.entry.create({
				data: {
					project_id: input.projectId,
					user_id: ctx.user.id,
					status: "PENDING",
				},
			});
		}),

	// 管理者用：全エントリー一覧取得
	getAllForAdmin: adminProcedure.query(async () => {
		return await prisma.entry.findMany({
			include: {
				user: { select: { name: true, email: true } },
				project: { select: { title: true } },
			},
			orderBy: { created_at: "desc" },
		});
	}),

	// 管理者用：ステータス更新（承認・お見送り）
	updateStatus: adminProcedure
		.input(
			z.object({
				id: z.string(),
				status: z.enum(["APPROVED", "REJECTED"]),
			}),
		)
		.mutation(async ({ input }) => {
			return await prisma.entry.update({
				where: { id: input.id },
				data: { status: input.status },
			});
		}),
});