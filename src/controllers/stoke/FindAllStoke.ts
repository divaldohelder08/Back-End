import { Prisma } from "../../Database/Client"

export class FindAllStoke {
  async handle() {
    return await Prisma.stoke.findMany({
      include: {
        produto: true,
      },
    })
  }
}
