import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./controllers/userController";
import { Authenticate } from "./controllers/Authenticate";
import z from "zod"


const app = fastify();
app.register(require("@fastify/cors"));
const userController = new UserController();
const authenticate = new Authenticate();

app.post("/create/user", userController.create);
app.get("/find/user", userController.find);
app.post("/auth",authenticate.auth)
app.post("/send",authenticate.send)
// app.get("/query",)

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log("Server HTTP on http://localhost:3333"));
