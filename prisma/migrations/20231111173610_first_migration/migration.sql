-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('Recepcionista', 'Gerente', 'Limpeza');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Andamento', 'Finalizada', 'NFinalizada');

-- CreateTable
CREATE TABLE "Provincias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "codico" TEXT NOT NULL,

    CONSTRAINT "Provincias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cooperativas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "provinciaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cooperativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculos" (
    "id" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "cooperativaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motoristas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numeroBI" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "cooperativaId" TEXT NOT NULL,
    "veiculoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motoristas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numeroBI" TEXT NOT NULL,
    "cargo" "Cargo" NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "cooperativaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numeroBI" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "coordenadas" TEXT NOT NULL,
    "cooperativaId" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacto cliente" (
    "id" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "contacto cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacto funcionario" (
    "id" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "funcionarioId" TEXT NOT NULL,

    CONSTRAINT "contacto funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recolha" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clienteId" TEXT NOT NULL,
    "motoristaId" TEXT NOT NULL,

    CONSTRAINT "recolha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Provincias_nome_key" ON "Provincias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Provincias_codico_key" ON "Provincias"("codico");

-- CreateIndex
CREATE UNIQUE INDEX "Cooperativas_nome_key" ON "Cooperativas"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Cooperativas_endereco_key" ON "Cooperativas"("endereco");

-- CreateIndex
CREATE UNIQUE INDEX "Cooperativas_contacto_key" ON "Cooperativas"("contacto");

-- CreateIndex
CREATE UNIQUE INDEX "Cooperativas_email_key" ON "Cooperativas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculos_matricula_key" ON "Veiculos"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_numeroBI_key" ON "Motoristas"("numeroBI");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_numeroBI_key" ON "Funcionarios"("numeroBI");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_numeroBI_key" ON "Clientes"("numeroBI");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_coordenadas_key" ON "Clientes"("coordenadas");

-- CreateIndex
CREATE UNIQUE INDEX "contacto cliente_telefone_key" ON "contacto cliente"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "contacto funcionario_telefone_key" ON "contacto funcionario"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "recolha_nome_key" ON "recolha"("nome");

-- AddForeignKey
ALTER TABLE "Cooperativas" ADD CONSTRAINT "Cooperativas_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Veiculos" ADD CONSTRAINT "Veiculos_cooperativaId_fkey" FOREIGN KEY ("cooperativaId") REFERENCES "Cooperativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motoristas" ADD CONSTRAINT "Motoristas_cooperativaId_fkey" FOREIGN KEY ("cooperativaId") REFERENCES "Cooperativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motoristas" ADD CONSTRAINT "Motoristas_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionarios" ADD CONSTRAINT "Funcionarios_cooperativaId_fkey" FOREIGN KEY ("cooperativaId") REFERENCES "Cooperativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_cooperativaId_fkey" FOREIGN KEY ("cooperativaId") REFERENCES "Cooperativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacto cliente" ADD CONSTRAINT "contacto cliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacto funcionario" ADD CONSTRAINT "contacto funcionario_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recolha" ADD CONSTRAINT "recolha_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recolha" ADD CONSTRAINT "recolha_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motoristas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
