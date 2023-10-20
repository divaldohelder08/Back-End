import fastify, { FastifyReply } from "fastify";
const app = fastify();
app.register(require("@fastify/cors"));

app.get("/take", (_, reply: FastifyReply) => {
  reply.send({
    area: {
      Informática: {
        10: ["IG10C", "IG11A", "IG12A"],
        11: ["IG11A", "IG11C"],
      },
      Eletricidade: {
        10: ["EL10A", "EL10D"],
        11: ["EL11B", "EL11C"],
      },
      Mecânica: {
        10: ["MC10A", "IG11A"],
        11: ["MC11B", "IG11A"],
        12: ["MC12A", "MC12C"],
      },
      "Construção civil": {
        10: ["CV10A", "CV10B"],
        11: ["CV11A", "CV11B"],
        12: ["CV12B"],
      },
    },
  });
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log("Server HTTP on http://localhost:3333"));
