import { FastifyReply, FastifyRequest } from "fastify"
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { number, string } from "zod"

type TokenPayload = {
  id: string
  iat: number
  exp: number
}

export function AuthMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
  next: NextFunction
) {
  const { authorization } = request.headers
  if (!authorization) {
    return reply.status(401).send({ erro: true, mensagem: "token ñ enviado" })
  }
  const [, token] = authorization.split(" ")
  try {
    // @ts-ignore
    const decode = verify(token, process.env.PRIVATE_KEY)
    // @ts-ignore
    const { id } = decode as TokenPayload

    request.userId = id
    next() // Chame next() sem argumentos para prosseguir sem erro
  } catch (error) {
    return reply.status(401).send({ erro: true, mensagem: "token invalido" })
  }
}
