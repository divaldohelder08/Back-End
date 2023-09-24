import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { Prisma } from "../Database/Client"

export class CatController {
  async find(request: FastifyRequest, reply: FastifyReply) {
    return await Prisma.stoke.findMany()
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      id: z.string(),
    })

    const { id } = info.parse(request.params)
    await Prisma.categoria.delete({
      where: {
        id,
      },
    })
    return reply
      .status(204)
      .send({ erro: false, mensagem: "categoria deletado com sucesso" })
  }
}