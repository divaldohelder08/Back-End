import { createId } from "@paralleldrive/cuid2";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Prisma } from "../db/Client";
import { env } from "../env";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { resend } from "../mail/client";
import { AuthenticationMagicLinkTemplate } from "../mail/templates/Admin";

export class Admin {
  async authenticate(req: FastifyRequest, rep: FastifyReply) {
    const info = z.object({
      email: z.string().email(),
    });
    const { email } = info.parse(req.body);

    const adminFromEmail = await Prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (!adminFromEmail) {
      throw new UnauthorizedError();
    }

    const authLinkCode = createId();

    await Prisma.authLinksAdmin.create({
      data: {
        adminId: adminFromEmail.id,
        code: authLinkCode,
      },
    });

    const authLink = new URL("/auth-links/authenticate", env.API_BASE_URL);

    authLink.searchParams.set("code", authLinkCode);
    authLink.searchParams.set("redirect", env.AUTH_REDIRECT_URL);

    await resend.emails.send({
      from: "Mukumbo <naoresponda@fala.dev>",
      to: email,
      subject: "Mukumbo Link para login",
      react: AuthenticationMagicLinkTemplate({
        userEmail: email,
        authLink: authLink.toString(),
      }),
    });
  }
}
