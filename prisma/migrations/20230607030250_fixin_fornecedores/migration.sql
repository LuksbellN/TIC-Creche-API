/*
  Warnings:

  - You are about to drop the column `nome_categoria` on the `Fornecedor` table. All the data in the column will be lost.
  - Added the required column `nome_fornecedor` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_fornecedor" TEXT NOT NULL,
    "documento" TEXT
);
INSERT INTO "new_Fornecedor" ("documento", "id") SELECT "documento", "id" FROM "Fornecedor";
DROP TABLE "Fornecedor";
ALTER TABLE "new_Fornecedor" RENAME TO "Fornecedor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
