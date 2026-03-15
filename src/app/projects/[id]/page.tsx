'use client'

import { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Modal,
  Table,
  Box,
  Group
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAppStore, type Project } from '../../../store'
import { useParams, useRouter } from 'next/navigation'

export default function AdminProjectDetailPage() {
  const params = useParams()
  const projectId = params?.id as string
  const router = useRouter()
  const { projects, deleteProject } = useAppStore()

  const [entryModalOpened, setEntryModalOpened] = useState(false)
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal }
  ] = useDisclosure(false)

  const [deleting, setDeleting] = useState(false)

  const project = projects.find((p: Project) => p.id === projectId)

  const confirmDelete = async () => {
    setDeleting(true)
    closeDeleteModal()
    await new Promise((resolve) => setTimeout(resolve, 800))
    deleteProject(projectId)
    setDeleting(false)
    router.push('/admin/projects' as any)
  }

  if (!project)
    return (
      <Container py="xl">
        <Text>案件が見つかりません</Text>
      </Container>
    )

  const tableStyles = {
    th: {
      backgroundColor: '#E7F5FF',
      color: '#1A1A1A',
      fontSize: '14px',
      fontWeight: 600,
      padding: '16px',
      width: '200px',
      border: '1px solid #DEDEDE'
    },
    td: {
      color: '#1A1A1A',
      fontSize: '14px',
      padding: '16px',
      border: '1px solid #DEDEDE'
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
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        centered
        padding="xl"
        size="sm"
      >
        <Stack align="center" gap="xl">
          <Text fz="md" fw={500} c="#1A1A1A" ta="center">
            この案件を削除します。よろしいですか？
          </Text>
          <Group justify="center" grow w="100%">
            <Button
              variant="outline"
              color="gray"
              onClick={closeDeleteModal}
              h={40}
            >
              いいえ
            </Button>
            <Button bg="red" onClick={confirmDelete} h={40}>
              はい
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack gap={40} maw={800} mx="auto">
        <Box style={{ position: 'relative' }}>
          <Title ta="center" fw={700} fz={24} c="#1A1A1A">
            案件詳細
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

        <Table withTableBorder withColumnBorders styles={tableStyles}>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>案件名</Table.Th>
              <Table.Td>{project.title}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>概要</Table.Th>
              <Table.Td style={{ whiteSpace: 'pre-wrap' }}>
                {project.detail}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>必要なスキル</Table.Th>
              <Table.Td>{project.skills.join(', ')}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>募集締切</Table.Th>
              <Table.Td>{project.deadline}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>単価</Table.Th>
              <Table.Td>{project.unit_price.toLocaleString()} 円</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>

        <Stack gap={16}>
          <Button
            bg="blue"
            h={48}
            fw={600}
            onClick={() =>
              router.push(`/admin/projects/${projectId}/edit` as any)
            }
          >
            編集する
          </Button>
          <Button
            bg="blue"
            h={48}
            fw={600}
            onClick={() => setEntryModalOpened(true)}
          >
            この案件のエントリー一覧を見る
          </Button>
          <Button
            bg="red"
            h={48}
            fw={600}
            onClick={openDeleteModal}
            loading={deleting}
          >
            この案件を削除する
          </Button>
        </Stack>
      </Stack>

      <Modal
        opened={entryModalOpened}
        onClose={() => setEntryModalOpened(false)}
        title="エントリー者一覧"
        centered
        size="lg"
      >
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>氏名</Table.Th>
              <Table.Th>エントリー日</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>テスト 太郎</Table.Td>
              <Table.Td>2026/02/23</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Button
          fullWidth
          mt="xl"
          bg="blue"
          onClick={() => setEntryModalOpened(false)}
        >
          閉じる
        </Button>
      </Modal>
    </Container>
  )
}
