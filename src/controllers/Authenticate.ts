import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { Prisma } from "../Database/Client"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
// authenticate
export class Authenticate {
  async auth(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = info.parse(request.body)
    const funcionario = await Prisma.funcionario.findUnique({
      where: {
        email,
      },
    })

    if (!funcionario || !(await compare(password, funcionario.password))) {
      reply
        .status(400)
        .send({ erro: true, mensagem: "Senha ou email não encontrado" })
      return
    }
    const { id } = funcionario
    reply.status(200).send({
      erro: false,
      mensagem: "Funcionario encontrado com sucesso",
      user: { id, email },
      //@ts-ignore
      token: jwt.sign({ id: funcionario.id }, process.env.PRIVATE_KEY, {
        //expiresIn: 600 //10 min
        expiresIn: 60, // 1 min
        //expiresIn: "7d", // 7 dia
      }),
    })
  }
}
