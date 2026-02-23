'use client'

import { useState, useEffect } from 'react'
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
  Group,
  Text
} from '@mantine/core'
import {
  projectSchema,
  type ProjectFormValues
} from '../../../../../schema/projectSchema'
import { useAppStore, type Project } from '../../../../../store'
import { useParams, useRouter } from 'next/navigation'

export default function AdminProjectEditPage() {
  const params = useParams()
  const projectId = params?.projectId as string
  const { projects, updateProject } = useAppStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // 編集対象の案件を取得
  const project = projects.find((p: Project) => p.id === projectId)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema)
  })

  // 案件データが取得できたらフォームの初期値をセット
  useEffect(() => {
    if (project) {
      reset(project)
    }
  }, [project, reset])

  const onSubmit = async (data: ProjectFormValues) => {
    if (!project) {
      return
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      updateProject({
        ...data,
        id: projectId,
        created_at: project.created_at // ここで ! や ? を使わないのがポイント
      })

      router.push('/admin/projects' as any)
    } finally {
      setLoading(false)
    }
  }

  // 案件が見つからない場合のガード（表示用）
  if (!project) {
    return (
      <Container py="xl">
        <Text>案件が見つかりません</Text>
      </Container>
    )
  }

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="xl">
        案件編集
      </Title>
      <Paper withBorder p="xl" radius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label="案件名"
              {...register('title')}
              error={errors.title?.message}
            />
            <Textarea
              label="概要"
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
                  {...field}
                  error={errors.unit_price?.message}
                  thousandSeparator
                />
              )}
            />

            <TextInput
              label="募集締切日"
              type="date"
              {...register('deadline')}
              error={errors.deadline?.message}
            />

            <Group justify="flex-end" mt="xl">
              <Button
                variant="outline"
                onClick={() => router.push('/admin/projects' as any)}
              >
                戻る
              </Button>
              <Button type="submit" loading={loading} color="orange">
                更新する
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
