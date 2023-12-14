import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Prisma } from "../Database/Client";
import { Gerador } from "../lib";
// Spell:ignore codigo
export class Authenticate {
  async Motorista(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      email: z.string(),
      senha: z.string(),
    });
    const { email, senha } = info.parse(request.body);
    console.log("Chamada motorista");
    const ifExist = await Prisma.motorista.findUnique({
      where: {
        email,
      },
    });
    //  || !(await compare(senha, ifExist.senha))
    if (!ifExist) {
      return reply.status(401).send({
        mensagem: "Usuário não encontrado",
      });
    }

    await Prisma.motorista.update({
      where: {
        email,
        senha,
      },
      data: {
        codigo: Gerador(),
      },
    });
    const { id, nome, email: mail, avatar, createdAt, filialId } = ifExist;
    reply.status(200).send({
      mensagem: "Usuário encontrado com sucesso",
      user: { id, nome, avatar, mail, createdAt, filialId },
      //@ts-ignore
      token: jwt.sign({ id: ifExist.id }, process.env.PRIVATE_KEY, {
        expiresIn: 60, // 1 min
        //expiresIn: "7d", // 7 dia
      }),
    });
  }
}
