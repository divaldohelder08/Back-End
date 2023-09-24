import { FastifyRequest,FastifyReply } from 'fastify';
import { z } from 'zod';
import { Prisma } from '../../Database/Client';

export class UpdateStoke {
  async handle(request:FastifyRequest, reply:FastifyReply)  {
    const info = z.object({
      id: z.string(),
      quant: z.number()
    })

    const { quant,id } = info.parse(request.body)

    await Prisma.stoke.update({
      data:{
        quant
      },
      where:{
        id
      }
    })
    return reply.status(201).send();
  }
}