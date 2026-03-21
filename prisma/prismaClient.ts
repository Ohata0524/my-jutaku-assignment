import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: process.env.POSTGRES_URL
  })
}

declare global {
  var globalPrisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.globalPrisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  globalThis.globalPrisma = prisma
}
