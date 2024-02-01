//conexão com o prisma clientr
import { PrismaClient } from "@prisma/client"

//estanciar o prisma client
const Prisma = new PrismaClient()

//exportar o prisma
export { Prisma }
