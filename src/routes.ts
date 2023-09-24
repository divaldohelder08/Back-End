import fastify from "fastify";
import { UserController } from "./controllers/userController";

const app = fastify();
app.register(require("@fastify/cors"));
const userController = new UserController();

app.post("/create/user", userController.create);
app.get("/find/user", userController.find);

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log("Server HTTP on http://localhost:3333"));
