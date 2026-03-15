'use client'

import { useState } from 'react'
import {
  Container,
  Table,
  Group,
  Title,
  Button,
  Stack,
  Box,
  Modal,
  Text
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAppStore, type Project } from './../../store'
import { useRouter } from 'next/navigation'

export default function AdminProjectListPage() {
  const { projects, deleteProject } = useAppStore()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  )
  const router = useRouter()

  const [opened, { open, close }] = useDisclosure(false)

  const openDeleteModal = (id: string) => {
    setSelectedProjectId(id)
    open()
  }

  const confirmDelete = async () => {
    if (!selectedProjectId) return

    setDeletingId(selectedProjectId)
    close()

    await new Promise((resolve) => setTimeout(resolve, 800))
    deleteProject(selectedProjectId)
    setDeletingId(null)
    setSelectedProjectId(null)
  }

  const tableStyles = {
    thead: {
      backgroundColor: '#E7F5FF'
    },
    th: {
      color: '#1A1A1A',
      fontSize: '14px',
      fontWeight: 600,
      padding: '16px',
      borderBottom: '1px solid #DEDEDE',
      textAlign: 'center' as const
    },
    td: {
      color: '#1A1A1A',
      fontSize: '14px',
      padding: '16px',
      borderBottom: '1px solid #DEDEDE',
      verticalAlign: 'middle' as const,
      textAlign: 'center' as const
    }
  }

  const rows = projects.map((project: Project) => (
    <Table.Tr key={project.id}>
      <Table.Td>{project.created_at}</Table.Td>
      <Table.Td fw={500}>{project.title}</Table.Td>
      <Table.Td
        style={{
          maxWidth: '250px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {project.detail}
      </Table.Td>
      <Table.Td>{project.skills.join(', ')}</Table.Td>
      <Table.Td>
        <Group gap="xs" justify="center">
          <Button
            size="xs"
            onClick={() => router.push(`/admin/projects/${project.id}` as any)}
            bg="blue"
            h={32}
            px={15}
          >
            詳細
          </Button>
          <Button
            size="xs"
            onClick={() =>
              router.push(`/admin/projects/${project.id}/edit` as any)
            }
            bg="blue"
            h={32}
            px={15}
          >
            編集
          </Button>
          <Button
            size="xs"
            color="red"
            onClick={() => openDeleteModal(project.id)}
            loading={deletingId === project.id}
            h={32}
            px={15}
          >
            削除
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Container
      fluid
      py={115}
      px={115}
      bg="#FFFFFF"
      style={{ minHeight: '100vh' }}
    >
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={true}
        padding="xl"
        size="sm"
      >
        <Stack align="center" gap="xl">
          <Text fz="md" fw={500} c="#1A1A1A" ta="center">
            この案件を削除します。よろしいですか？
          </Text>
          <Group justify="center" grow w="100%">
            <Button variant="outline" color="gray" onClick={close} h={40}>
              いいえ
            </Button>
            <Button bg="red" onClick={confirmDelete} h={40}>
              はい
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack gap={40}>
        <Title ta="center" fw={700} fz={24} c="#1A1A1A">
          案件一覧
        </Title>

        <Group justify="flex-end">
          <Button
            onClick={() => router.push('/admin/projects/new' as any)}
            bg="blue"
            h={40}
            fw={600}
          >
            新規案件作成
          </Button>
        </Group>

        <Table.ScrollContainer minWidth={1000}>
          <Table
            verticalSpacing="md"
            withTableBorder={false}
            styles={tableStyles}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>案件作成日</Table.Th>
                <Table.Th>案件名</Table.Th>
                <Table.Th>概要</Table.Th>
                <Table.Th>必要なスキル</Table.Th>
                <Table.Th>操作</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Stack>
    </Container>
  )
}
