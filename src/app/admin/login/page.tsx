'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Container,
  Stack,
  Paper
} from '@mantine/core'
import { loginSchema } from '@/schema/authSchema'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
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
      console.log('管理者ログイン試行:', data)
    } finally {
      setLoading(false)
    }
  }

  const inputStyles = {
    label: {
      color: '#1A1A1A',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      marginBottom: '8px'
    },
    input: {
      fontSize: '14px',
      lineHeight: '20px',
      color: '#1A1A1A',
      borderColor: '#DEDEDE',
      height: '40px',
      '&::placeholder': {
        color: '#808080'
      }
    }
  }

  return (
    <Container
      fluid
      h="100vh"
      p={0}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
      }}
    >
      <Stack gap={20} w={400}>
        <Title
          ta="center"
          fw={700}
          fz={24}
          lh="32px"
          c="#1A1A1A"
          style={{ marginBottom: '10px' }}
        >
          管理者ログイン
        </Title>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          style={{ borderColor: '#DEDEDE' }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                label="メールアドレス"
                placeholder="you@example.com"
                required
                {...register('email')}
                error={errors.email?.message as string}
                styles={inputStyles}
              />
              <PasswordInput
                label="パスワード"
                placeholder="Your password"
                required
                {...register('password')}
                error={errors.password?.message as string}
                styles={inputStyles}
              />
              <Button
                type="submit"
                fullWidth
                loading={loading}
                bg="blue"
                h={48}
                fw={600}
                fz={16}
                lh="24px"
                style={{ marginTop: '10px' }}
              >
                ログイン
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  )
}
