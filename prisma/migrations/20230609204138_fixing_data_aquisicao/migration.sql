/*
  Warnings:

  - You are about to drop the column `dataAquisicao` on the `Patrimonio` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patrimonio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "data_aquisicao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imagem_url" TEXT,
    "estado" INTEGER NOT NULL DEFAULT 5,
    "id_departamento" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    CONSTRAINT "Patrimonio_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "Departamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patrimonio_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patrimonio_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patrimonio" ("estado", "id", "id_categoria", "id_departamento", "id_fornecedor", "imagem_url", "nome") SELECT "estado", "id", "id_categoria", "id_departamento", "id_fornecedor", "imagem_url", "nome" FROM "Patrimonio";
DROP TABLE "Patrimonio";
ALTER TABLE "new_Patrimonio" RENAME TO "Patrimonio";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
