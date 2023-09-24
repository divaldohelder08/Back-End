import { FastifyRequest,FastifyReply } from 'fastify';
import { z } from 'zod';
import { Prisma } from '../../Database/Client';

export class FindStokeby_id {
  async handle(request:FastifyRequest, reply:FastifyReply)  {
    const info = z.object({
      id:z.string()
    })

    const { id } = info.parse(request.params)
    

    return await Prisma.stoke.findMany({
      where: {
        id,
      },
    })
  }
}