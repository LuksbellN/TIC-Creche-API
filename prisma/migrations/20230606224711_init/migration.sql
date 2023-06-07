-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "id_departamento" INTEGER NOT NULL,
    CONSTRAINT "Usuario_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "Departamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_departamento" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Patrimonio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataAquisicao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imagem_url" TEXT,
    "estado" INTEGER NOT NULL DEFAULT 5,
    "id_departamento" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    CONSTRAINT "Patrimonio_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "Departamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patrimonio_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patrimonio_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_categoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_categoria" TEXT NOT NULL,
    "documento" TEXT
);

-- CreateTable
CREATE TABLE "Pat_prefeitura" (
    "id_pat_prefeitura" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" REAL NOT NULL,
    "placa" TEXT NOT NULL,
    "id_patrimonio" INTEGER NOT NULL,
    CONSTRAINT "Pat_prefeitura_id_patrimonio_fkey" FOREIGN KEY ("id_patrimonio") REFERENCES "Patrimonio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pat_doacao" (
    "id_pat_doacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_doador" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "id_patrimonio" INTEGER NOT NULL,
    CONSTRAINT "Pat_doacao_id_patrimonio_fkey" FOREIGN KEY ("id_patrimonio") REFERENCES "Patrimonio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pat_adquirido" (
    "id_pat_adquirido" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" REAL NOT NULL,
    "id_patrimonio" INTEGER NOT NULL,
    CONSTRAINT "Pat_adquirido_id_patrimonio_fkey" FOREIGN KEY ("id_patrimonio") REFERENCES "Patrimonio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TiposOcorrencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "id_tipo_ocorrencia" INTEGER NOT NULL,
    CONSTRAINT "Ocorrencia_id_tipo_ocorrencia_fkey" FOREIGN KEY ("id_tipo_ocorrencia") REFERENCES "TiposOcorrencia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Patrimonio_ocorrencia" (
    "data_ocorrencia" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT NOT NULL,
    "id_patrimonio" INTEGER NOT NULL,
    "id_ocorrencia" INTEGER NOT NULL,

    PRIMARY KEY ("id_patrimonio", "id_ocorrencia"),
    CONSTRAINT "Patrimonio_ocorrencia_id_patrimonio_fkey" FOREIGN KEY ("id_patrimonio") REFERENCES "Patrimonio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Patrimonio_ocorrencia_id_ocorrencia_fkey" FOREIGN KEY ("id_ocorrencia") REFERENCES "Ocorrencia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Departamento_nome_departamento_key" ON "Departamento"("nome_departamento");
