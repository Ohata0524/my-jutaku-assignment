'use client'

import {
  Container,
  Title,
  Table,
  Button,
  Group,
  Stack,
  Box,
  Text
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store'

export default function MyEntriesPage() {
  const router = useRouter()
  const { projects } = useAppStore()

  const enteredProjects = projects

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

  const rows = enteredProjects.map((project) => (
    <Table.Tr key={project.id}>
      <Table.Td>{project.created_at}</Table.Td>
      <Table.Td fw={500}>{project.title}</Table.Td>
      <Table.Td>{project.unit_price.toLocaleString()} 円</Table.Td>
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
      <Stack gap={40} maw={1000} mx="auto">
        <Box style={{ position: 'relative' }}>
          <Title ta="center" fw={700} fz={24} c="#1A1A1A">
            エントリー済み一覧
          </Title>
          <Button
            variant="filled"
            color="blue"
            size="xs"
            onClick={() => router.push('/projects' as any)}
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

        <Table.ScrollContainer minWidth={600}>
          <Table
            verticalSpacing="md"
            withTableBorder={false}
            styles={tableStyles}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>エントリー日</Table.Th>
                <Table.Th>案件名</Table.Th>
                <Table.Th>単価</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={3}>
                    <Text ta="center" py="xl" c="dimmed">
                      エントリー済みの案件はありません
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Stack>
    </Container>
  )
}
