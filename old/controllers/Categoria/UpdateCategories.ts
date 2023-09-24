import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../../Database/Client"

export class UpdateCategories {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      nome: z.string(),
      describe: z.string(),
      slug: z.string(),
      id: z.string(),
    })
    const { nome, describe, slug, id } = info.parse(request.body)

    await Prisma.categoria.update({
      data: {
        nome,
        describe,
        slug,
      },
      where: {
        id,
      },
    })

    return reply.status(201).send()
  }
}
