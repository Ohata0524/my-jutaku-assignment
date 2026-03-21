import { PrismaClient } from '@prisma/client'

declare global {
  // グローバル変数の衝突を避けるための定義
  var globalPrisma: PrismaClient | undefined
}

// 他のファイルが import { prisma } で読み込めるよう、名前付きエクスポートにします
export const prisma = globalThis.globalPrisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.globalPrisma = prisma
}
