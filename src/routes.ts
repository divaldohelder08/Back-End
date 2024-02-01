import fastify from "fastify";
import { Authenticate } from "./controllers/Authenticate";
import { Filias } from "./controllers/Filias";
import { Motorista } from "./controllers/Motorista";

const app = fastify();
app.register(require("@fastify/cors"));
const filias = new Filias();
const motorista = new Motorista();
const authenticate = new Authenticate();

// Motorista
app.post("/auth/motorista", authenticate.Motorista);

app.get("/filias/find", filias.find);
app.get("/filias/form/find", filias.form);
app.post("/motorista/confirm", motorista.confirm);
app.get("/recolha/:motoristaId", motorista.recolha);

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log(`🔥 HTTP server running at http://localhost:3333`))
  .catch((error) => console.error("aconteceu algum erro: %d", error));
