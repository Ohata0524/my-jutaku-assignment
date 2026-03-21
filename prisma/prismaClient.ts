import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // ビルド時（環境変数が空の時）にエラーで止まらないよう、フォールバックURLを設定します
  const connectionUrl =
    process.env.POSTGRES_URL ||
    'postgresql://postgres:postgres@localhost:5432/postgres'

  return new PrismaClient({
    datasources: {
      db: {
        url: connectionUrl
      }
    }
  })
}

declare global {
  var globalPrisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.globalPrisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.globalPrisma = prisma
}
