/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Produto_image_key" ON "Produto"("image");
