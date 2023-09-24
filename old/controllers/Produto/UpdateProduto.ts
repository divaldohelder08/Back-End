import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../../Database/Client"

export class UpdateProduto {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      id: z.string(),
      nome: z.string(),
      price: z.number(),
      image:z.string()
    })

    const { id, nome, price, image } = info.parse(request.body)

    await Prisma.produto.update({
      data: {
        nome,
        price,
        image,
      },
      where: {
        id,
      },
    })

    return reply.status(201).send()
  }
}
