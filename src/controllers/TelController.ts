import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { Prisma } from "../Database/Client"

export class TelController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      telefone: z.string().length(9),
      id: z.string(),
    })
    const { telefone, id } = info.parse(request.body)

    await Prisma.tels.create({
      data: {
        telefone,
        funcionario: {
          connect: {
            id,
          },
        },
      },
    })
    return reply
      .status(201)
      .send({ erro: false, mensage: "Telefone vinculado com sucesso" })
  }
  async find(request: FastifyRequest, reply: FastifyReply) {
    return await Prisma.tels.findMany({
      select: {
        funcionario_id: false,
      },
    })
  }
  async findbyid(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      userId: z.string(),
    })
    const {} = info.parse(request.body)
    await Prisma.tels.findMany({
      include: {
        funcionario: true,
      },
    })
  }
}
