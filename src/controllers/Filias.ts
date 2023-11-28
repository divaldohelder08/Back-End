import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Prisma } from "../Database/Client";

export class Filias {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      nome: z.string().max(100, "Max 100").min(1, "Min 1"),
      endereco: z.string(),
      localizacao: z.string(),
      telefone: z.string().max(9, "max 9").min(9, "min 9"),
      telefone2: z.string().max(9, "max 9").min(9, "min 9"),
    });

    const { nome, endereco, localizacao, telefone, telefone2 } = info.parse(
      request.body
    );

    return await Prisma.filial.create({
      data: {
        nome,
        endereco,
        localizacao,
        contacto: {
          create: [
            {
              telefone,
            },
            {
              telefone: telefone2,
            },
          ],
        },
      },
    });
  }

  async status(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      id: z.string(),
      status: z.enum(["On", "Chuva", "Noite", "Feriado", "Brecha"]),
    });

    const { id, status } = info.parse(request.body);

    return await Prisma.filial.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });
  }

  async find() {
    return await Prisma.filial.findMany();
  }

  async Motorista(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      cooperativaId: z.string(),
      nome: z.string().max(150, "Max 100").min(1, "Min 1"),
      email: z.string().email(),
      telefone: z.string().max(9, "max 9").min(9, "min 9"),
      numeroBI: z.string().min(1, "Min 1"),
      nascimento: z.string().datetime(),
      localizacao: z.string(),
      //veicolo
      modelo: z.string().max(40, "Max 100").min(1, "Min 1"),
      matricula: z.string().max(15, "Max 100").min(1, "Min 1"),
    });

    const {
      cooperativaId,
      nome,
      email,
      telefone,
      numeroBI,
      nascimento,
      localizacao,
      modelo,
      matricula,
    } = info.parse(request.body);

    //     return await Prisma.motorista.create({
    //       data: {
    //         nome,
    //         email,
    //         telefone,
    //         numeroBI,
    //         localizacao,
    //         nascimento,
    //         cooperativaId,
    // }
    //     });

    //  String
    // veiculoId     String      @unique
  }
}
