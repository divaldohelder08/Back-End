import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../../Database/Client"

export class ConnectProductOnCategory {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      nome: z.string(),
      price: z.number(),
      id: z.string(),
    })
    const { nome, price, id } = info.parse(request.body)
    await Prisma.productCategory.create({
      data: {
        produto: {
          create: {
            nome,
            price,
          },
        },
        categoria: {
          connect: {
            id,
          },
        },
      },
    })
    return reply.status(201).send()
  }
}
