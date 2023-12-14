-- DropForeignKey
ALTER TABLE "Clientes" DROP CONSTRAINT "Clientes_filialId_fkey";

-- DropForeignKey
ALTER TABLE "Contacto das cooperativas" DROP CONSTRAINT "Contacto das cooperativas_filialId_fkey";

-- DropForeignKey
ALTER TABLE "Contacto dos Clientes" DROP CONSTRAINT "Contacto dos Clientes_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Funcionarios" DROP CONSTRAINT "Funcionarios_filialId_fkey";

-- DropForeignKey
ALTER TABLE "Motoristas" DROP CONSTRAINT "Motoristas_filialId_fkey";

-- DropForeignKey
ALTER TABLE "Recolhas" DROP CONSTRAINT "Recolhas_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Recolhas" DROP CONSTRAINT "Recolhas_motoristaId_fkey";

-- AddForeignKey
ALTER TABLE "Funcionarios" ADD CONSTRAINT "Funcionarios_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motoristas" ADD CONSTRAINT "Motoristas_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto dos Clientes" ADD CONSTRAINT "Contacto dos Clientes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto das cooperativas" ADD CONSTRAINT "Contacto das cooperativas_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolhas" ADD CONSTRAINT "Recolhas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recolhas" ADD CONSTRAINT "Recolhas_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "Motoristas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
