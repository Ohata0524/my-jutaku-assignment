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
import { loginSchema } from '../../schema/authSchema'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      // 2度押し防止のための処理
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('ログイン成功:', data)
      // ログイン成功後、案件一覧へ遷移
      router.push('/projects' as any)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">ログイン</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label="メールアドレス"
              placeholder="you@example.com"
              required
              {...register('email')}
              error={errors.email?.message as string}
            />
            <PasswordInput
              label="パスワード"
              placeholder="Your password"
              required
              {...register('password')}
              error={errors.password?.message as string}
            />
            <Button type="submit" fullWidth loading={loading}>
              ログイン
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
