import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { z } from "zod";
import { Prisma } from "../db/Client";

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
        mensagem: "usuário já cadastrado com esse email",
      });
    }

    const resend = new Resend(process.env.RESEND);

    //@ts-ignore
    const token = jwt.sign({ email, username }, process.env.PRIVATE_KEY, {
      expiresIn: "1h",
    }); // O token expira em 1 hora

    await resend
      .sendEmail({
        from: "Acme <onboarding@resend.dev>",
        reply_to: "divaldohelder08@gmail.com",
        to: ["delivered@resend.dev", email],
        subject: "Confirmação de E-mail",
        html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <table cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"><tr><td align="center" style="padding: 20px;"><h1 style="color: #333;">Confirmação de E-mail</h1><p style="font-size: 16px; color: #333;">Prezado(a) <strong>${nome}</strong>,<br><br> Agradecemos a sua solicitação de cadastramento em nosso site!<br><br>Para que possamos liberar o seu cadastramento em nosso sistema, solicitamos a confirmação do e-mail clicando no link abaixo:<br><br><a href="http://seusite.com/confirmacao?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Clique aqui para confirmar</a><br><br>Esta mensagem foi enviada a você pela empresa xxxx.<br>Você está recebendo este e-mail porque está cadastrado em nosso banco de dados.</p><p style="color: #898989; font-size: 12px; margin-top: 20px;">Vila Alice Makarenko - Luanda, AO</p></td></tr></table></body>`,
      })
      .then(async (data) => {
        try {
          // Criação do usuário após o e-mail ser enviado com sucesso
          await Prisma.user.create({
            data: {
              nome,
              username,
              email,
              password: await hash(password, 8),
            },
          });

          // Responda com sucesso após a criação do usuário
          reply.status(201).send({
            mensagem: "Usuário criado com sucesso e e-mail enviado.",
          });
        } catch (error) {
          // Erro na criação do usuário
          console.error("Erro na criação do usuário:", error);
          reply.status(500).send({
            mensagem:
              "Aconteceu um erro ao criar o usuário após o e-mail ter sido enviado.",
          });
        }
      })
      .catch((Error) => {
        console.error(Error);
        return reply.status(409).send({
          mensagem:
            "Aconteceu um erro ao enviar o email, por favor tente novamente mais tarde",
        });
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
  async confirm(request: FastifyRequest, reply: FastifyReply) {
    const info = z.object({
      token: z.string(),
    });

    try {
      const { token } = info.parse(request.query);
      //@ts-ignore
      jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
        if (err) {
          console.error("Erro ao verificar o token:", err);
          return reply
            .status(401)
            .send({ error: "Token inválido ou expirado." });
        }

        //  const email = decoded.email
        //@ts-ignore
        const { email, username } = decoded;

        if (
          !(await Prisma.user.findUnique({
            where: {
              email,
              username,
            },
          }))
        ) {
          reply.status(200).send({
            message: "E-mail confirmado com sucesso.",
          });
        }

        await Prisma.user.update({
          where: {
            email,
            username,
          },
          data: {
            status: "ativo",
          },
        });
        // responda com sucesso
        reply
          .status(200)
          .send({ message: "E-mail confirmado com sucesso.", username, email });
      });
    } catch (error) {
      console.error("Erro ao confirmar o e-mail:", error);
      reply
        .status(500)
        .send({ error: "Ocorreu um erro ao confirmar o e-mail." });
    }
  }
}
