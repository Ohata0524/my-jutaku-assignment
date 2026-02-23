'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput, PasswordInput, Button, Paper, Title, Container, Stack } from '@mantine/core'
import { loginSchema } from '../../../schema/authSchema' 
import { useRouter } from 'next/navigation'

export default function AdminSigninPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) 
      console.log('管理者ログイン:', data)
      router.push('/admin/projects' as any)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size={420} my={80}>
      <Title ta="center">管理者ログイン</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput label="メールアドレス" placeholder="admin@example.com" required {...register('email')} error={errors.email?.message as string} />
            <PasswordInput label="パスワード" placeholder="管理者用パスワード" required {...register('password')} error={errors.password?.message as string} />
            <Button type="submit" fullWidth loading={loading}>ログイン</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

