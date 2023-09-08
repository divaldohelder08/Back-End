import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../../Database/Client"

export class CreatStokeAndProduto {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      quant: z.number(),
      nome: z.string(),
      price: z.number(),
      image: z.string(),
    })

    const { nome, price, quant, image } = info.parse(request.body)

    await Prisma.stoke.create({
      data: {
        produto: {
          create: {
            nome,
            price,
            image,
          },
        },
        quant,
      },
    })

    return reply.status(201).send()
  }
}
