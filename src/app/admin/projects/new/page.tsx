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
  Group
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
      created_at: new Date().toLocaleDateString('ja-JP')
    }

    addProject(newProject)
    setLoading(false)
    router.push('/admin/projects' as any)
  }

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="xl">
        新規案件作成
      </Title>
      <Paper withBorder p="xl" radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label="案件名"
              required
              {...register('title')}
              error={errors.title?.message}
            />
            <Textarea
              label="概要"
              required
              {...register('detail')}
              error={errors.detail?.message}
              minRows={4}
            />

            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  label="必要なスキル"
                  placeholder="スキルを選択してください"
                  data={[
                    'React',
                    'Next.js',
                    'TypeScript',
                    'Supabase',
                    'Node.js',
                    'AWS'
                  ]}
                  {...field}
                  error={errors.skills?.message}
                  searchable
                />
              )}
            />

            <Controller
              name="unit_price"
              control={control}
              render={({ field }) => (
                <NumberInput
                  label="単価"
                  required
                  {...field}
                  error={errors.unit_price?.message}
                  thousandSeparator
                />
              )}
            />

            <TextInput
              label="募集締切日"
              type="date"
              required
              {...register('deadline')}
              error={errors.deadline?.message}
            />

            <Group justify="flex-end" mt="xl">
              <Button variant="outline" onClick={() => router.back()}>
                戻る
              </Button>
              <Button type="submit" loading={loading}>
                作成する
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
