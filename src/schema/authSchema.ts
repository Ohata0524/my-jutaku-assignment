import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'メールアドレスは必須です').email('正しい形式で入力してください'),
  password: z.string().min(1, 'パスワードは必須です'),
})

export const registerSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().min(1, 'メールアドレスは必須です').email('正しい形式で入力してください'),
  password: z.string()
    .min(8, '8文字以上で入力してください')
    .regex(/[a-zA-Z]/, '英字を含めてください')
    .regex(/[0-9]/, '数字を含めてください'),
  passwordConfirm: z.string().min(1, '確認用パスワードを入力してください'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'パスワードが一致しません',
  path: ['passwordConfirm'],
})
