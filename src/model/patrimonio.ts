import { Categoria } from "./categoria";
import { Departamento } from "./departamento";
import { Fornecedor } from "./fornecedores";

export class Patrimonio{
    private id_patrimonio: number;
    private nome: string;
    private departamento: Departamento;
    private categoria: Categoria;
    private estado: boolean;
    private fornecedor: Fornecedor;
    private data_aquisicao: Date;
    private imagem_url: string | null;


    constructor(id_patrimonio: number, nome: string,
        departamento: Departamento, categoria: Categoria,
        estado: boolean, fornecedor: Fornecedor,
        data_aquisicao: Date, imagem_url: string) {
        
            this.id_patrimonio = id_patrimonio;
            this.nome = nome;
            this.departamento = departamento;
            this.categoria = categoria;
            this.estado = estado;
            this.fornecedor = fornecedor
            this.data_aquisicao = data_aquisicao;
            this.imagem_url = imagem_url != null ? imagem_url : null; 
    }

}