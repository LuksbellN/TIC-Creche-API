/*
  Warnings:

  - A unique constraint covering the columns `[id_patrimonio]` on the table `Pat_adquirido` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_patrimonio]` on the table `Pat_doacao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_patrimonio]` on the table `Pat_prefeitura` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pat_adquirido_id_patrimonio_key" ON "Pat_adquirido"("id_patrimonio");

-- CreateIndex
CREATE UNIQUE INDEX "Pat_doacao_id_patrimonio_key" ON "Pat_doacao"("id_patrimonio");

-- CreateIndex
CREATE UNIQUE INDEX "Pat_prefeitura_id_patrimonio_key" ON "Pat_prefeitura"("id_patrimonio");
