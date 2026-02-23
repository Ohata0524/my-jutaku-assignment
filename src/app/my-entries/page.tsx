'use client'

import { useState, useMemo } from 'react'
import { Container, Table, Title, Button, Group, Text, Paper } from '@mantine/core'
import { useAppStore, type Project } from '../../store'
import { useRouter } from 'next/navigation'

export default function MyEntriesPage() {
  const router = useRouter()
  const { projects, userEntries } = useAppStore()
  
  const [sortBy, setSortBy] = useState<'date' | 'price' | null>(null)
  const [reverse, setReverse] = useState(false)

  const enteredProjects = useMemo(() => {
    const list = projects.filter((p: Project) => userEntries.includes(p.id))
    
    if (!sortBy) return list

    return [...list].sort((a: Project, b: Project) => {
      if (sortBy === 'date') {
        return reverse 
          ? b.created_at.localeCompare(a.created_at) 
          : a.created_at.localeCompare(b.created_at)
      }
      if (sortBy === 'price') {
        return reverse ? b.unit_price - a.unit_price : a.unit_price - b.unit_price
      }
      return 0
    })
  }, [projects, userEntries, sortBy, reverse])

  const handleSort = (field: 'date' | 'price') => {
    if (sortBy === field) {
      setReverse(!reverse)
    } else {
      setSortBy(field)
      setReverse(false)
    }
  }

  return (
    <Container size="md" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>エントリー済み一覧</Title>
        <Button variant="outline" onClick={() => router.back()}>戻る</Button>
      </Group>

      <Paper withBorder p="md" radius="md">
        {enteredProjects.length === 0 ? (
          <Text ta="center" py="xl" c="dimmed">エントリーした案件はまだありません。</Text>
        ) : (
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>案件名</Table.Th>
                <Table.Th 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => handleSort('date')}
                >
                  エントリー日 {sortBy === 'date' && (reverse ? '▼' : '▲')}
                </Table.Th>
                <Table.Th 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => handleSort('price')}
                >
                  単価 {sortBy === 'price' && (reverse ? '▼' : '▲')}
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {enteredProjects.map((project: Project) => (
                <Table.Tr key={project.id}>
                  <Table.Td fw={500}>{project.title}</Table.Td>
                  <Table.Td>{project.created_at}</Table.Td>
                  <Table.Td>{project.unit_price.toLocaleString()}円</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Paper>
    </Container>
  )
}



