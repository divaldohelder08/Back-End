    import { FastifyReply, FastifyRequest } from "fastify"
    import { z } from "zod"
    import { Prisma } from "../Database/Client"
    import bcrypt from "bcryptjs"

    export class FunController {
      async create(request: FastifyRequest, reply: FastifyReply) {
        const info = z.object({
          nome: z.string(),
          email: z.string().email(),
          nascimento: z.string().datetime(),
          telefone: z.string().length(9),
          password: z.string(),
        })

        const { nome, email, nascimento, telefone, password } = info.parse(
          request.body
        )

        const funcionario = await Prisma.funcionario.findUnique({
          where: {
            email,
          },
        })

        if (funcionario) {
          return reply.status(409).send({
            erro: true,
            mensagem: "funcionario já cadastrado com esse email",
          })
        }

        await Prisma.funcionario.create({
          data: {
            tels: {
              create: {
                telefone,
              },
            },
            nome,
            email,
            nascimento,
            password: await bcrypt.hash(password, 8),
          },
        })

        return reply
          .status(201)
          .send({ erro: false, mensagem: "funcionario cadastrado com sucesso" })
      }
      async find() {
        return await Prisma.funcionario.findMany()
      }
      async findbyid(request: FastifyRequest, reply: FastifyReply) {
        const info = z.object({
          id: z.string(),
        })
        const { id } = info.parse(request.params)

        const funcio = await Prisma.funcionario.findUnique({
          where: {
            id,
          },
        })

        if (!funcio) {
          return reply
            .status(404)
            .send({ erro: true, mensagem: "funcionario não encontrado" })
        }

        return funcio
      }

      async delete(request: FastifyRequest, reply: FastifyReply) {
        const info = z.object({
          id: z.string(),
        })
        const { id } = info.parse(request.params)

        await Prisma.funcionario.delete({
          where: {
            id,
          },
        })

        return reply
          .status(204)
          .send({ erro: false, mensagem: "Funcionario deletado com sucesso" })
      }

      async update(request: FastifyRequest, reply: FastifyReply) {
        const info = z.object({
          id: z.string(),
          nome: z.string(),
          email: z.string().email(),
          nascimento: z.string().datetime(),
          password: z.string(),
        })

        const { id, nome, nascimento, email, password } = info.parse(request.body)

        await Prisma.funcionario.update({
          data: {
            nome,
            email,
            nascimento,
            password: await bcrypt.hash(password, 8),
          },
          where: {
            id,
          },
        })
        return reply
          .status(201)
          .send({ erro: false, mensagem: "Funcionario actualizado com sucesso" })
      }
    }
