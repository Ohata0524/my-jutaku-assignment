'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Container,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Stack,
  Title,
  Paper,
  MultiSelect,
  Box
} from '@mantine/core'
import {
  projectSchema,
  type ProjectFormValues
} from '../../../../schema/projectSchema'
import { useAppStore } from '../../../../store'
import { useRouter } from 'next/navigation'

export default function AdminNewProjectPage() {
  const [loading, setLoading] = useState(false)
  const { addProject } = useAppStore()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { skills: [], unit_price: 0 }
  })

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newProject = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toLocaleDateString('ja-JP').replace(/\//g, '-')
    }

    addProject(newProject)
    setLoading(false)
    router.push('/admin/projects' as any)
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
      py={115}
      px={115}
      bg="#FFFFFF"
      style={{ minHeight: '100vh' }}
    >
      <Stack gap={40} maw={600} mx="auto">
        <Box style={{ position: 'relative' }}>
          <Title ta="center" fw={700} fz={24} c="#1A1A1A">
            新規案件作成
          </Title>
          <Button
            variant="filled"
            color="blue"
            size="xs"
            onClick={() => router.push('/admin/projects' as any)}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            h={32}
            px={20}
          >
            戻る
          </Button>
        </Box>

        <Paper
          withBorder
          p={40}
          radius="md"
          shadow="sm"
          style={{ borderColor: '#DEDEDE' }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                label="案件名"
                placeholder="開発マッチングアプリ作成依頼"
                required
                {...register('title')}
                error={errors.title?.message}
                styles={inputStyles}
              />
              <Textarea
                label="概要"
                placeholder="アプリ開発したい人と開発してほしい人をマッチングし、雇用を促進したい"
                required
                {...register('detail')}
                error={errors.detail?.message}
                minRows={4}
                styles={{
                  ...inputStyles,
                  input: {
                    ...inputStyles.input,
                    height: 'auto',
                    minHeight: '100px'
                  }
                }}
              />

              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    label="必要なスキル"
                    placeholder="Next.js, Supabase, TypeScript"
                    data={[
                      'React',
                      'Next.js',
                      'TypeScript',
                      'Supabase',
                      'Node.js',
                      'AWS',
                      'Mantine'
                    ]}
                    {...field}
                    error={errors.skills?.message}
                    styles={{
                      ...inputStyles,
                      input: {
                        ...inputStyles.input,
                        height: 'auto',
                        minHeight: '40px'
                      }
                    }}
                  />
                )}
              />

              <TextInput
                label="募集締切日"
                type="date"
                required
                {...register('deadline')}
                error={errors.deadline?.message}
                styles={inputStyles}
              />

              <Controller
                name="unit_price"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="単価"
                    placeholder="300000"
                    required
                    {...field}
                    error={errors.unit_price?.message}
                    thousandSeparator
                    styles={inputStyles}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                loading={loading}
                bg="blue"
                h={48}
                fw={600}
                fz={16}
                mt={20}
              >
                登録
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  )
}
