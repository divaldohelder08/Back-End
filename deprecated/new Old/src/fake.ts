     import fastify, { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
const app = fastify();

app.register(require("@fastify/cors"));

app.get("/take", (_, reply: FastifyReply) => {
  reply.send({
    areas: [
      {
        area: "Informática",
        turmas: {
          10: ["IG10C",],
          11: ["IG11A", "IG11C"],
        },
      },
      {
        area: "Eletricidade",
        turmas: {
          10: ["EL10A", "EL10D"],
          11: ["EL11B", "EL11C"],
        },
      },
      {
        area: "Mecânica",
        turmas: {
          12: ["MC12A", "MC12C"],
        },
      },
      {
        area: "Construção civil",
        turmas:{
          10: ["CV10A", "CV10B"],
          12: ["CV12B"],
        },
      },
    ],
  });
});



app.post("/auth",(Request:FastifyRequest,reply:FastifyReply)=>{
    reply.status(200).send({
      mensagem: "Usuário encontrado com sucesso",
      user: {
        id: "45sdfsdf@#43",
        avatar: "https://github.com/divaldohelder08.png",
        nome: "Divaldo Hélder",
        email: "divaldohelder08@gmail.com",
      },
      //@ts-ignore
      token: jwt.sign({ id: "45sdfsdf@#43" }, process.env.PRIVATE_KEY, {
        //expiresIn: 600 //10 min
        expiresIn: 60, // 1 min
        //expiresIn: "7d", // 7 dia
      }),
    });
})
app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log("Server HTTP on http://localhost:3333"));
