import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { Resend } from "resend";
import { z } from "zod";
import { Prisma } from "../Database/Client";

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      nome: z.string(),
      email: z.string().email(),
      username: z.string(),
      password: z.string(),
    });

    const { email, nome, password, username } = info.parse(request.body);

    const ifExist = await Prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (ifExist) {
      return reply.status(409).send({
        mensagem: "funcionario já cadastrado com esse email",
      });
    }

    const resend = new Resend(process.env.RESEND);

    await resend
      .sendEmail({
        from: "Acme <onboarding@resend.dev>",
        reply_to: "divaldohelder08@gmail.com",
        to: ["delivered@resend.dev"],
        subject: "Hello World",
        html: "<p>Congrats on sending your <strong>first email It works!</strong>!</p><hr /><p style='color:#898989;font-size:12px;'>2261 Market Street #5039 - San Francisco, CA 94114</p>",
        text: "isso funciona",
      })
      .then((data) => {
        console.log(data);
      })
      .catch((Error) => {
        console.error(Error);
        return reply.status(409).send({
          mensagem:
            "Aconteceu um erro ao enviar o email, porfavor tente novamente mais tarde",
        });
      });

    return await Prisma.user.create({
      data: {
        nome,
        username,
        email,
        password: await hash(password, 8),
      },
    });
  }

  async find(request: FastifyRequest, reply: FastifyReply) {
    return await Prisma.user.findMany();
  }
  async delete(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      id: z.string(),
    });
    const { id } = info.parse(request.params);

    return await Prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async password(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      id: z.string(),
      password: z.string(),
    });

    const { id, password } = info.parse(request.body);

    return await Prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
  async avatar(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      id: z.string(),
      avatar: z.string(),
    });

    const { id, avatar } = info.parse(request.body);

    return await Prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar,
      },
    });
  }
  async name(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      id: z.string(),
      nome: z.string(),
    });

    const { id, nome } = info.parse(request.body);

    return await Prisma.user.update({
      where: {
        id,
      },
      data: {
        nome,
      },
    });
  }
}
