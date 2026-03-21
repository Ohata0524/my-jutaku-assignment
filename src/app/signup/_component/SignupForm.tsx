'use client'

import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signup } from '@/serverActions/supabaseAuth'
import {
  Button,
  TextInput,
  PasswordInput,
  Title,
  Stack,
  Text,
  Container,
  Anchor,
  Paper
} from '@mantine/core'
import Link from 'next/link'

const signupSchema = z
  .object({
    name: z.string().min(1, { message: '名前は必須です' }),
    email: z.string().email({ message: '無効なメールアドレスです' }),
    password: z
      .string()
      .min(8, { message: '8文字以上で入力してください' })
      .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,}$/i, {
        message: '英数字を混在させてください'
      }),
    confirmPassword: z
      .string()
      .min(1, { message: '確認用パスワードは必須です' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword']
  })

type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  const onSignupSubmit = async (data: SignupFormData) => {
    await signup(data)
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
          新規登録
        </Title>

        <Paper
          withBorder
          radius="md"
          p={30}
          shadow="md"
          style={{ borderColor: '#DEDEDE' }}
        >
          <form onSubmit={handleSubmit(onSignupSubmit)}>
            <Stack gap={20}>
              <TextInput
                label="名前"
                placeholder="Your name"
                {...register('name')}
                error={errors.name?.message}
                styles={inputStyles}
              />
              <TextInput
                label="メールアドレス"
                placeholder="you@example.com"
                {...register('email')}
                error={errors.email?.message}
                styles={inputStyles}
              />
              <PasswordInput
                label="パスワード"
                placeholder="At least 8 characters"
                {...register('password')}
                error={errors.password?.message}
                styles={inputStyles}
              />
              <PasswordInput
                label="パスワード確認"
                placeholder="Confirm password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                styles={inputStyles}
              />

              <Button
                type="submit"
                fullWidth
                loading={isSubmitting}
                color="blue"
                h={48}
                fw={600}
                fz={16}
                lh="24px"
                style={{ marginTop: '10px' }}
              >
                登録
              </Button>
            </Stack>
          </form>
        </Paper>

        <Text ta="center" fz={14} lh="20px" c="#1A1A1A">
          既にアカウントをお持ちの方は
          <Anchor
            component={Link}
            href="/login"
            c="#1A1A1A"
            td="underline"
            fw={400}
          >
            こちら
          </Anchor>
        </Text>
      </Stack>
    </Container>
  )
}
