import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Prisma } from "../Database/Client";
// Spell:ignore endereco,codigo
export class Motorista {
  async recolha(req: FastifyRequest, rep: FastifyReply) {
    const info = z.object({
      motoristaId: z.string(),
    });

    const { motoristaId } = info.parse(req.params);
    return await Prisma.recolha.findMany({
      where: {
        motoristaId,
      },
      select: {
        id: true,
        cliente: {
          select: {
            id: true,
            nome: true,
            avatar: true,
            coordenadas: true,
            endereco: true,
            email: true,
            contacto: {
              select: {
                telefone: true,
              },
            },
          },
        },
        motorista: {
          select: {
            id: true,
            avatar: true,
          },
        },
        createdAt: true,
      },
    });
  }
  async confirm(req: FastifyRequest, rep: FastifyReply) {
    const info = z.object({
      codigo: z.string().length(6, "Código invalido"),
      email: z.string().email("Código invalido"),
    });

    const { codigo, email } = info.parse(req.body);

    const respo= await Prisma.motorista.findUnique({
      where: {
        email,
        codigo,
      },
    });

    if(respo===null || respo===undefined){
      rep.send("Código invalido").status(500);
    }else{
      await Prisma.motorista.update({
         where:{
          email,
          codigo
        },
        data:{
          codigo:null
        }
       
      })
      rep.send(respo)
    }
  }
}
