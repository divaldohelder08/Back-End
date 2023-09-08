import { Prisma } from "../../Database/Client"

export class FindAllProduto {
  async handle() {
    return await Prisma.produto.findMany()
  }
}
