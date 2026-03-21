import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1, '案件名は必須です'),
  detail: z.string().min(1, '概要は必須です'),
  skills: z.array(z.string()).min(1, 'スキルを少なくとも一つ選択してください'),
  unit_price: z.number().min(1, '単価は必須です'),
  deadline: z.string().min(1, '募集締切日は必須です')
})

export type ProjectFormValues = z.infer<typeof projectSchema>
