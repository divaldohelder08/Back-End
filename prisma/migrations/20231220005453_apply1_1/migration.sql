-- CreateTable
CREATE TABLE "auth_links_admin" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_links_admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_links_admin_code_key" ON "auth_links_admin"("code");

-- AddForeignKey
ALTER TABLE "auth_links_admin" ADD CONSTRAINT "auth_links_admin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
