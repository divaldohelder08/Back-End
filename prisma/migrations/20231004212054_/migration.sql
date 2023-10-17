-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ativo', 'pendente');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "username" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pendente',
    "auth" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");