'use client'

import { useState } from 'react'
import { Container, Table, Group, Title, Button, Text, Paper, Badge, ActionIcon } from '@mantine/core'
import { useAppStore, type Project } from '../../../store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminProjectListPage() {
  const { projects, deleteProject } = useAppStore()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm('本当に削除しますか？')) return
    setDeletingId(id) // ローディング開始
    await new Promise(resolve => setTimeout(resolve, 800)) 
    deleteProject(id)
    setDeletingId(null)
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>案件一覧（管理者）</Title>
        <Button component={Link} href="/admin/projects/new" color="blue">
          新規案件作成
        </Button>
      </Group>

      <Paper withBorder p="md" radius="md">
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>作成日</Table.Th>
              <Table.Th>案件名</Table.Th>
              <Table.Th>必要なスキル</Table.Th>
              <Table.Th>操作</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {projects.map((project: Project) => (
              <Table.Tr key={project.id}>
                <Table.Td>{project.created_at}</Table.Td>
                <Table.Td fw={500}>{project.title}</Table.Td>
                <Table.Td>
                  <Group gap={5}>
                    {project.skills.map(s => <Badge key={s} variant="outline" size="sm">{s}</Badge>)}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Button variant="light" size="xs" component={Link} href={`/admin/projects/${project.id}` as any}>詳細</Button>
                    <Button variant="light" color="orange" size="xs" component={Link} href={`/admin/projects/${project.id}/edit` as any}>編集</Button>
                    <Button 
                      variant="light" 
                      color="red" 
                      size="xs" 
                      onClick={() => handleDelete(project.id)}
                      loading={deletingId === project.id}
                    >
                      削除
                    </Button>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Container>
  )
}
