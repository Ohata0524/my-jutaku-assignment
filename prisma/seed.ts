import { PrismaClient, Role, EntryStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.entry.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  // 1. ユーザーの作成
  const user1 = await prisma.user.create({
    data: {
      id: "cmlx73ims0000d0p5ulfqvlbl",
      email: "admin@example.com",
      password: "password", 
      name: "管理者 太郎",
      role: Role.ADMIN,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: "user@example.com",
      password: "password",
      name: "開発 翼",
      role: Role.USER,
    },
  })

  // 2. 案件の作成
await prisma.project.create({
  data: {
    title: "次世代フロントエンド開発",
    detail: "Next.jsを用いたプロジェクトです。",
    skills: "React, Next.js",
    unit_price: 800000,
    deadline: new Date("2026-03-31T00:00:00.000Z"),
    user_id: user1.id, 
  },
})

  // 3. エントリーの作成（サンプル）
  const project = await prisma.project.findFirst()
  if (project) {
    await prisma.entry.create({
      data: {
        status: EntryStatus.PENDING, 
        user_id: user2.id, 
        project_id: project.id, 
      },
    })
  }

  console.log("シードデータの投入が完了しました")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

