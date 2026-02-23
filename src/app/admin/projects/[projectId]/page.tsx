'use client'

import { useState } from 'react'
import { Container, Title, Text, Badge, Button, Group, Paper, Stack, Divider, Modal, Table } from '@mantine/core'
import { useAppStore, type Project } from '../../../../store' 
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminProjectDetailPage() {
  const params = useParams()
  const projectId = params?.projectId as string
  const router = useRouter()
  const { projects, deleteProject } = useAppStore()
  const [modalOpened, setModalOpened] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const project = projects.find((p: Project) => p.id === projectId)

  const handleDelete = async () => {
    if (!confirm('この案件を削除してもよろしいですか？')) return
    setDeleting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    deleteProject(projectId)
    setDeleting(false)
    router.push('/admin/projects' as any)
  }

  if (!project) return <Container py="xl"><Text>案件が見つかりません</Text></Container>

  return (
    <Container size="sm" py="xl">
      <Paper withBorder p="xl" radius="md">
        <Stack gap="md">
          <Title order={2}>{project.title} (詳細)</Title>
          <Divider />
          <Text fw={700}>案件概要</Text>
          <Text style={{ whiteSpace: 'pre-wrap' }}>{project.detail}</Text>
          
          <Group grow>
            <div><Text fw={700}>単価</Text><Text>{project.unit_price.toLocaleString()}円</Text></div>
            <div><Text fw={700}>募集締切</Text><Text>{project.deadline}</Text></div>
          </Group>

          <Stack mt="xl">
            <Button component={Link} href={`/admin/projects/${projectId}/edit` as any} color="orange">編集する</Button>
            <Button variant="outline" onClick={() => setModalOpened(true)}>エントリー一覧を見る</Button>
            <Button color="red" variant="light" onClick={handleDelete} loading={deleting}>削除する</Button>
            <Button variant="subtle" onClick={() => router.back()}>戻る</Button>
          </Stack>
        </Stack>
      </Paper>

      {/* エントリー者一覧モーダル */}
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="エントリー者一覧" size="lg">
        <Table>
          <Table.Thead><Table.Tr><Table.Th>氏名</Table.Th><Table.Th>エントリー日</Table.Th></Table.Tr></Table.Thead>
          <Table.Tbody>
            <Table.Tr><Table.Td>テスト 太郎</Table.Td><Table.Td>2026/02/23</Table.Td></Table.Tr>
          
          </Table.Tbody>
        </Table>
        <Button fullWidth mt="md" onClick={() => setModalOpened(false)}>閉じる</Button>
      </Modal>
    </Container>
  )
}
