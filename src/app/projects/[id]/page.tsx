'use client'

import { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Badge,
  Button,
  Group,
  Paper,
  Stack,
  Divider
} from '@mantine/core'
import { useAppStore } from '../../../store'
import { useParams, useRouter } from 'next/navigation'

export default function ProjectDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  const { projects, addEntry, userEntries } = useAppStore()
  const [loading, setLoading] = useState(false)

  const project = projects.find((p) => p.id === id)
  const isEntered = userEntries.includes(id)

  const handleEntry = async () => {
    setLoading(true)
    try {
      // 2度押し防止のための処理
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addEntry(id)
      alert('エントリーしました！')
    } finally {
      setLoading(false)
    }
  }

  if (!project)
    return (
      <Container py="xl">
        <Text>案件が見つかりません</Text>
      </Container>
    )

  return (
    <Container size="sm" py="xl">
      <Paper withBorder p="xl" radius="md" shadow="sm">
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            案件作成日: {project.created_at}
          </Text>
          <Title order={2}>{project.title}</Title>

          <Divider />

          <section>
            <Text fw={700} mb={5}>
              詳細
            </Text>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{project.detail}</Text>
          </section>

          <section>
            <Text fw={700} mb={5}>
              必要なスキル
            </Text>
            <Group gap={5}>
              {project.skills.map((skill) => (
                <Badge key={skill} variant="filled">
                  {skill}
                </Badge>
              ))}
            </Group>
          </section>

          <Group grow mt="xl">
            <Text fw={700}>単価: {project.unit_price.toLocaleString()}円</Text>
            <Text fw={700}>募集締切日: {project.deadline}</Text>
          </Group>

          <Stack mt="xl">
            <Button
              size="lg"
              fullWidth
              onClick={handleEntry}
              loading={loading}
              disabled={isEntered}
              color={isEntered ? 'gray' : 'blue'}
            >
              {isEntered ? 'エントリー済み' : 'この案件にエントリーする'}
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              戻る
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}
