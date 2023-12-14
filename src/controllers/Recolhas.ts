import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Prisma } from "../Database/Client";

export class Recolhas {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const info = z.object({
      clienteId: z.string(),
      motoristaId: z.string(),
      descricao: z.string(),
    });

    const { clienteId, motoristaId, descricao } = info.parse(req.body);

    return await Prisma.recolha.create({
      data: {
        clienteId,
        motoristaId,
        descricao,
      },
    });
  }
}
