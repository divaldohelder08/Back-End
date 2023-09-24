import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../../Database/Client"

export class FindProdutoby_id {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const Info = z.object({
      id: z.string(),
    })
    const { id } = Info.parse(request.params)

    return await Prisma.produto.findMany({
      where: {
        id,
      },
    })
    return id
  }
}
