'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Stack
} from '@mantine/core'
import { registerSchema } from '../../schema/authSchema'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('登録データ:', data)
      router.push('/login' as any)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">新規登録</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label="お名前"
              placeholder="山田 太郎"
              required
              {...register('name')}
              error={errors.name?.message as string}
            />
            <TextInput
              label="メールアドレス"
              placeholder="example@mail.com"
              required
              {...register('email')}
              error={errors.email?.message as string}
            />
            <PasswordInput
              label="パスワード"
              placeholder="8文字以上の英数字"
              required
              {...register('password')}
              error={errors.password?.message as string}
            />
            <PasswordInput
              label="パスワード（確認）"
              placeholder="もう一度入力してください"
              required
              {...register('passwordConfirm')}
              error={errors.passwordConfirm?.message as string}
            />
            <Button type="submit" fullWidth mt="xl" loading={loading}>
              登録
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
