import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../../Database/Client"

export class CreatCategory {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      nome: z.string(),
      slug: z.string(),
      describe: z.string(),
    })
    const { nome, slug, describe } = info.parse(request.body)
    await Prisma.categoria.create({
      data: {
        nome,
        slug,
        describe,
      },
    })
    return reply.status(201).send()
  }
}
