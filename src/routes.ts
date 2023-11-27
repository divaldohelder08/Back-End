import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { Cooperativa } from "./controllers/Cooperativa";

const app = fastify();
app.register(require("@fastify/cors"));
const cooperativa = new Cooperativa();

app.get("/cooperativa/find", cooperativa.find);
app.get("/recolhas", (req: FastifyRequest, rep: FastifyReply) => {
  const obg = [
    {
      id: 1,
      data: "20/05/2005",
    },
    {
      id: 23456,
      data: "20/05/2005",
    },
    {
      id: 2,
      data: "20/05/2005",
    },
    {
      id: 3,
      data: "20/05/2005",
    },
    {
      id: 4,
      data: "20/05/2005",
    },
    {
      id: 5,
      data: "20/05/2005",
    },
    {
      id: 6,
      data: "20/05/2005",
    },
  ];
  rep.send(obg);
});
app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log("Server HTTP on http://localhost:3333"))
  .catch((error) => console.error("aconteceu algum erro: %d", error));
