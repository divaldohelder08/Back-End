import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Prisma } from "../db/Client";

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

  async form() {
    return await Prisma.filial.findMany({
      select: {
        nome: true,
      },
    });
  }

  async Motorista(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      filialId: z.string(),
      nome: z.string().max(150, "Max 100").min(1, "Min 1"),
      email: z.string().email(),
      telefone: z.string().max(9, "max 9").min(9, "min 9"),
      numeroBI: z.string().min(1, "Min 1"),
      nascimento: z.string().datetime(),
      //veiculo
      matricula: z.string().max(15, "Max 100").min(1, "Min 1"),
    });

    const { filialId, nome, email, telefone, numeroBI, nascimento, matricula } =
      info.parse(request.body);

    return await Prisma.motorista.create({
      data: {
        nome,
        email,
        telefone,
        numeroBI,
        nascimento,
        matricula,
        filialId,
      },
    });
  }

  async Cliente(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      filialId: z.string(),
      nome: z.string().max(150, "Max 100").min(1, "Min 1"),
      email: z.string().email(),
      numeroBI: z.string().min(1, "Min 1"),
      telefone: z.string().max(9, "max 9").min(9, "min 9"),
      telefone1: z.string().max(9, "max 9").min(9, "min 9"),
      endereco: z.string(),
      coordenadas: z.string(),
      nascimento: z.string().datetime(),
    });

    const {
      filialId,
      nome,
      email,
      numeroBI,
      telefone,
      telefone1,
      endereco,
      coordenadas,
      nascimento,
    } = info.parse(request.body);

    return await Prisma.cliente.create({
      data: {
        nome,
        email,
        numeroBI,
        nascimento,
        filialId,
        coordenadas,
        endereco,
        contacto: {
          create: [
            {
              telefone,
            },
            {
              telefone: telefone1,
            },
          ],
        },
      },
    });
  }
}
