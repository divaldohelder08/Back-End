import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../../Database/Client"

export class DeleteStoke {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      id: z.string(),
    })

    const { id } = info.parse(request.params)

    await Prisma.stoke.delete({
      where: {
        id,
      },
    })
    return reply.status(201).send()
  }
}
