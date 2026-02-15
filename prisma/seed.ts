import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.entry.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  // 1. ユーザー（3名）
  const admin = await prisma.user.create({
    data: { email: 'admin@example.com', password: 'password123', name: '管理者 太郎', role: Role.ADMIN },
  })
  const user1 = await prisma.user.create({
    data: { email: 'user1@example.com', password: 'password123', name: '佐藤 健太', role: Role.USER },
  })
  const user2 = await prisma.user.create({
    data: { email: 'user2@example.com', password: 'password123', name: '鈴木 一郎', role: Role.USER },
  })

  // 2. 案件（3件）
  const project1 = await prisma.project.create({
    data: {
      title: '次世代フロントエンド開発',
      detail: 'Next.jsを用いたプロジェクトです。',
      skills: 'React, Next.js',
      unitPrice: 800000,
      deadline: new Date('2026-03-31'),
      authorId: admin.id,
    },
  })
  const project2 = await prisma.project.create({
    data: {
      title: 'IoMTデバイス管理システム',
      detail: '医療機器のデータを可視化します。',
      skills: 'TypeScript, AWS',
      unitPrice: 950000,
      deadline: new Date('2026-04-15'),
      authorId: admin.id,
    },
  })
  const project3 = await prisma.project.create({
    data: {
      title: '住宅ローンシミュレーター',
      detail: 'Mantine UIを使用したUI刷新です。',
      skills: 'React, Mantine',
      unitPrice: 700000,
      deadline: new Date('2026-05-20'),
      authorId: admin.id,
    },
  })

  // 3. エントリー（3件）
  await prisma.entry.createMany({
    data: [
      { userId: user1.id, projectId: project1.id, status: '検討中' },
      { userId: user2.id, projectId: project1.id, status: '完了' },
      { userId: user1.id, projectId: project2.id, status: '検討中' },
    ],
  })

  console.log('3件ずつのサンプルデータを投入しました！')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })