-- CreateTable
CREATE TABLE "fun" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "fun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tels" (
    "id" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "funcionario_id" TEXT NOT NULL,

    CONSTRAINT "tels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stoke" (
    "id" TEXT NOT NULL,
    "quant" INTEGER NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "produto_id" TEXT NOT NULL,

    CONSTRAINT "Stoke_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "describe" TEXT,
    "slug" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_product" (
    "id" TEXT NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,

    CONSTRAINT "category_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "funcionario_id" TEXT NOT NULL,
    "entregue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vend_Prod" (
    "id" TEXT NOT NULL,
    "venda_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,

    CONSTRAINT "Vend_Prod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fun_email_key" ON "fun"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tels_telefone_key" ON "tels"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_nome_key" ON "Produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nome_key" ON "categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_slug_key" ON "categoria"("slug");

-- AddForeignKey
ALTER TABLE "tels" ADD CONSTRAINT "tels_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "fun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stoke" ADD CONSTRAINT "Stoke_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "fun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vend_Prod" ADD CONSTRAINT "Vend_Prod_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vend_Prod" ADD CONSTRAINT "Vend_Prod_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
