import { Prisma, PrismaClient } from "@prisma/client"
import fastify, { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { FunController } from "./controllers/FunController"
import { AuthMiddleware } from "./middlewares/auth"
import { Authenticate } from "./controllers/Authenticate"
import { TelController } from "./controllers/TelController"
import multer from "fastify-multer" // or import multer from 'fastify-multer'
import multerMiddleware from "./middlewares/Image"

const app = fastify()

const prisma = new PrismaClient()

app.register(require("@fastify/cors"))
/**
 * Autentificar
 */

const authenticate = new Authenticate()

app.post("/auth", authenticate.auth)

/**
 * Controller do funcionario
 */
const funController = new FunController()

app.post("/create/funcionario", funController.create)

app.get("/find/funcionario", { preHandler: AuthMiddleware }, funController.find)
app.get("/find/funcionario/:id", funController.findbyid)
app.put("/update/funcionario", funController.update)
app.delete("/delete/funcionario", funController.delete)

/**
 * Controller do telefone
 */

const telController = new TelController()

app.post("/create/telefone", telController.create)
app.get("/find/telefone", telController.find)

/**
 * Controller de imagm
 */

app.post(
  "/profile",
  { preHandler: multerMiddleware.single("image") },
  async (request, reply) => {
    //@ts-ignore
    if (!request.file) {
      console.log("upload ñ realizado")
      return reply
        .status(400)
        .send({ erro: true, mensagem: "Upload ñ realizado" })
    }
    // request.file is the `avatar` file
    // request.body will hold the text fields, if there were any
    console.log("uploadrealizado")

    return reply.status(200).send({ erro: false, mensagem: "SUCCESS" })
  }
)
// // Importando o middleware multerMiddleware
// // import multerMiddleware from "./middlewares/uploadImage";

// // app.post(
// //   "/upload-image",
// //   {
// //     // Usando preHandler diretamente na rota
// //     preHandler: [multerMiddleware.single("image")]
// //   },
// //   async (request: FastifyRequest, reply: FastifyReply) => {
// //     return reply.status(200).send({
// //       menssage: "Upload feito com sucesso", // Corrigindo "Uploado" para "Upload"
// //       error: false,
// //     });
// //   }
// // );

// import { CreatFuncinariowhiteTell } from "./controllers/Funcionario/CreatFuncinariowhiteTell"
//import  CreatFuncinariowhiteTell from "./controllers/Funcionario/CreatFuncinariowhiteTell"
// import { FindAllFuncionarios } from "./controllers/Funcionario/FindAllFuncionarios"
// import { CreatTel } from "./controllers/Telefone/CreatTel"
// import { FindTel } from "./controllers/Telefone/FindTel"
// import { FindFuncionarioby_id } from "./controllers/Funcionario/FindFuncionarioby_id"
// import { DeleteFuncionario } from "./controllers/Funcionario/DeleteFuncionario"
// import { DeleteTel } from "./controllers/Telefone/DeleteTel"
// import { UpdateTel } from "./controllers/Telefone/UpdateTel"
// import { UpdateFuncionario } from "./controllers/Funcionario/UpdateFuncionario"
// import { FindAllProduto } from "./controllers/Produto/FindAllProduto"
// import { DeleteProduto } from "./controllers/Produto/DeleteProduto"
// import { UpdateProduto } from "./controllers/Produto/UpdateProduto"
// import { FindProdutoby_id } from "./controllers/Produto/FindProdutoby_id"
// import { CreatStokeAndProduto } from "./controllers/stoke/CreatStokeAndProduto"
// import { FindAllStoke } from "./controllers/stoke/FindAllStoke"
// import { FindStokeby_id } from "./controllers/stoke/FindStokeby_id"
// import { UpdateStoke } from "./controllers/stoke/UpdateStoke"
// import { DeleteStoke } from "./controllers/stoke/DeleteStoke"
// import { FindAllCategoria } from "./controllers/Categoria/FindAllCategoria"
// import { UpdateCategories } from "./controllers/Categoria/UpdateCategories"
// import { DeleteCategorie } from "./controllers/Categoria/DeleteCategorie"
// import { Authenticate } from "./controllers/Authenticate"

//const creatFuncinariowhiteTell = new CreatFuncinariowhiteTell()
// const findAllFuncionarios = new FindAllFuncionarios()
// const creatTel = new CreatTel()
// const findTel = new FindTel()
// const findFuncionarioby_id = new FindFuncionarioby_id()
// const deleteFuncionario = new DeleteFuncionario()
// const deleteTel = new DeleteTel()
// const updateTel = new UpdateTel()
// const updateFuncionario = new UpdateFuncionario()
// const findAllProduto = new FindAllProduto()
// const deleteProduto = new DeleteProduto()
// const updateProduto = new UpdateProduto()
// const findProdutoby_id = new FindProdutoby_id()
// const creatStokeAndProduto = new CreatStokeAndProduto()
// const findAllStoke = new FindAllStoke()
// const findStokeby_id = new FindStokeby_id()
// const updateStoke = new UpdateStoke()
// const deleteStoke = new DeleteStoke()
// const findAllCategoria = new FindAllCategoria()
// const updateCategories = new UpdateCategories()
// const deleteCategorie = new DeleteCategorie()
// const authenticate = new Authenticate()

// //Telefone
// app.post("/Creat/Telefone", creatTel.handle)
// app.get("/Find/Telefone", findTel.handle)
// app.delete("/Delete/Telefone/:id", deleteTel.handle)
// app.put("/Update/Telefone/", updateTel.handle)

// // //Funcionario
//app.post("/Creat/Funcionario", creatFuncinariowhiteTell.handle)
// app.get("/Find/Funcionario", findAllFuncionarios.handle)
// app.get("/Find/Funcionario/:id", findFuncionarioby_id.handle)
// app.delete("/Delete/Funcionario/:id", deleteFuncionario.handle)
// app.put("/Update/Funcionario", updateFuncionario.handle)

// //Produto
// app.get("/Find/Produto", findAllProduto.handle)
// app.delete("/Delete/Produto/:id", deleteProduto.handle)
// app.put("/Update/Produto", updateProduto.handle)
// app.get("/Find/Produto/:id", findProdutoby_id.handle)

// //stoke
// app.post("/Creat/StokeAndProduto", creatStokeAndProduto.handle)
// app.get("/Find/Stoke", findAllStoke.handle)
// app.get("/Find/Stoke/:id", findStokeby_id.handle)
// app.put("/Update/Stoke", updateStoke.handle)
// app.delete("/Delete/Stoke/:id", deleteStoke.handle)

// //categoria
// app.get("/Find/Categories", findAllCategoria.handle)
// app.put("/Update/Categories", updateCategories.handle)
// app.delete("/Delete/Categories/:id", deleteCategorie.handle)

// //login test
// app.get("/authenticate", authenticate.handle)
app.get("/authenticate1", async (request, reply) => {
  const tels = prisma.tels.findMany()
  return reply.send({
    erro: false,
    mensagem: "Listar usuários",
    token: jwt.sign(tels, "JISKDFSDF245SD7F1S5DF41SCSDCVSDF43R34WE54C"),
  })
})

app.post("/login", async (request, reply) => {
  const info = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = info.parse(request.body)

  const funcionario = await prisma.funcionario.findUnique({
    where: {
      email,
    },
  })

  if (!funcionario || !(await bcrypt.compare(password, funcionario.password))) {
    reply
      .status(400)
      .send({ mensagem: "Senha ou email não encontrado", login: false })
    return
  }
  var token = jwt.sign(
    { id: 1 },
    "JISKDFSDF245SD7F1S5DF41SCSDCVSDF43R34WE54C@DSF",
    {
      //expiresIn: 600 //10 min
      //expiresIn: 60 //1 min
      expiresIn: "7d", // 7 dia
    }
  )

  reply.status(200).send({ mensagem: "funcionario encontrado", login: true })
})

//upload image
app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log("Server HTTP on"))
