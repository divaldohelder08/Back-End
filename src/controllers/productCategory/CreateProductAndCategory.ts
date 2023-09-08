import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../../Database/Client"

export class CreateProductAndCategory {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      nome: z.string(),
      price: z.number(),
      id: z.string(),
      slug: z.string(),
      describe: z.string(),
      Cnome: z.string(),
    })
    const { nome, price, slug, Cnome, describe } = info.parse(request.body)
    await Prisma.productCategory.create({
      data: {
        produto: {
          create: {
            nome,
            price,
          },
        },
        categoria: {
          create: {
            nome: Cnome,
            slug,
            describe,
          },
        },
      },
    })
    return reply.status(201).send()
  }
}
