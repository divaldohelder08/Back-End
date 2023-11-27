-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('Andamento', 'Finalizada', 'NFinalizada');

-- CreateEnum
CREATE TYPE "TimeEnum" AS ENUM ('On', 'Chuva', 'Noite', 'Feriado', 'Brecha');

-- CreateTable
CREATE TABLE "Cooperativas" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "endereco" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "status" "TimeEnum" NOT NULL DEFAULT 'On',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cooperativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cooperativaId" TEXT NOT NULL,

    CONSTRAINT "Funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motoristas" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "numeroBI" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,
    "localizacao" TEXT NOT NULL,
    "cooperativaId" TEXT NOT NULL,
    "veiculoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motoristas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculos" (
    "id" TEXT NOT NULL,
    "modelo" VARCHAR(40) NOT NULL,
    "matricula" VARCHAR(15) NOT NULL,
    "cooperativaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(250) NOT NULL,
    "numeroBI" TEXT NOT NULL,
    "avatar" TEXT,
    "endereco" TEXT NOT NULL,
    "coordenadas" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cooperativaId" TEXT NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto dos Clientes" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contacto dos Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto das cooperativas" (
    "id" TEXT NOT NULL,
    "cooperativaId" TEXT NOT NULL,
    "telefone" VARCHAR(9) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contacto das cooperativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recolha" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "motoristaId" TEXT NOT NULL,
    "status" "StatusEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recolha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cooperativas_nome_key" ON "Cooperativas"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Cooperativas_endereco_key" ON "Cooperativas"("endereco");

-- CreateIndex
CREATE UNIQUE INDEX "Cooperativas_localizacao_key" ON "Cooperativas"("localizacao");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_email_key" ON "Funcionarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_cooperativaId_key" ON "Funcionarios"("cooperativaId");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_email_key" ON "Motoristas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_telefone_key" ON "Motoristas"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_numeroBI_key" ON "Motoristas"("numeroBI");

-- CreateIndex
CREATE UNIQUE INDEX "Motoristas_veiculoId_key" ON "Motoristas"("veiculoId");

-- CreateIndex
CREATE UNIQUE INDEX "Veiculos_matricula_key" ON "Veiculos"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_numeroBI_key" ON "Clientes"("numeroBI");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_coordenadas_key" ON "Clientes"("coordenadas");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto dos Clientes_telefone_key" ON "Contacto dos Clientes"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Contacto das cooperativas_telefone_key" ON "Contacto das cooperativas"("telefone");

-- AddForeignKey
ALTER TABLE "Funcionarios" ADD CONSTRAINT "Funcionarios_cooperativaId_fkey" FOREIGN KEY ("cooperativaId") REFERENCES "Cooperativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motoristas" ADD CONSTRAINT "Motoristas_cooperativaId_fkey" FOREIGN KEY ("cooperativaId") REFERENCES "Cooperativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motoristas" ADD CONSTRAINT "Motoristas_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Veiculos" ADD CONSTRAINT "Veiculos_cooperativaId_fkey" FOREIGN KEY ("cooperativaId") REFERENCES "Cooperativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_cooperativaId_fkey" FOREIGN KEY ("cooperativaId") REFERENCES "Cooperativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto dos Clientes" ADD CONSTRAINT "Contacto dos Clientes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto das cooperativas" ADD CONSTRAINT "Contacto das cooperativas_cooperativaId_fkey" FOREIGN KEY ("cooperativaId") REFERENCES "Cooperativas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolha" ADD CONSTRAINT "Recolha_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolha" ADD CONSTRAINT "Recolha_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motoristas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;