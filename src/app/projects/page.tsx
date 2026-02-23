'use client'

import { Container, Grid, Card, Text, Badge, Button, Group, Title } from '@mantine/core'
import { useAppStore } from '../../store'
import Link from 'next/link'

export default function UserProjectListPage() {
  const { projects } = useAppStore()

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>案件一覧</Title>
      </Group>

      <Grid>
        {projects.length === 0 ? (
          <Text c="dimmed" ta="center" w="100%">表示できる案件がありません。管理画面から作成してください。</Text>
        ) : (
          projects.map((project) => (
            <Grid.Col key={project.id} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="xs" c="dimmed">{project.created_at}</Text>
                <Text fw={500} size="lg" mt="md">{project.title}</Text>
                <Text size="sm" c="dimmed" mt="xs" lineClamp={2}>
                  {project.detail}
                </Text>
                
                <Group gap={5} mt="md">
                  {project.skills.map(skill => (
                    <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
                  ))}
                </Group>

                <Button fullWidth mt="md" radius="md" component={Link} href={`/projects/${project.id}` as any}>
                  詳細を見る
                </Button>
              </Card>
            </Grid.Col>
          ))
        )}
      </Grid>
    </Container>
  )
}

