import { compare, } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Prisma } from "../Database/Client";
import jwt from "jsonwebtoken"
export class Authenticate {
  async auth(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      email: z.string(),
      password: z.string(),
    });
    const { email, password } = info.parse(request.body);

    const ifExist = await Prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!ifExist || !(await compare(password, ifExist.password))) {
      return reply.status(401).send({
        mensagem: "Usuário não encontrado",
      });
    }

    reply.status(200).send({
      erro: false,
      mensagem: "Usuário encontrado com sucesso",
      user: ifExist,
      //@ts-ignore
      token: jwt.sign({ id: ifExist.id }, process.env.PRIVATE_KEY, {
        //expiresIn: 600 //10 min
        expiresIn: 60, // 1 min
        //expiresIn: "7d", // 7 dia
      }),
    });
  }
  async send(request: FastifyRequest, reply: FastifyReply){
    const info=z.object({
      email:z.string().email()
    })
    const { email }= info.parse(request.body)


    
    console.log(email)
    return 
  }
}
