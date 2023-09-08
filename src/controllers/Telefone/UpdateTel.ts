import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../../Database/Client"

export class UpdateTel {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      id: z.string(),
      telefone: z.string().length(9),
      funcionario_id: z.string(),
    })
    const { id, telefone, funcionario_id } = info.parse(request.body)

    await Prisma.tels.update({
      data: {
        telefone,
        funcionario_id
      },
      where:{
        id
      }
    })


    return reply.status(201).send()
  }
}
