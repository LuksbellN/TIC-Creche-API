import { Categoria } from "./categoria";
import { Departamento } from "./departamento";
import { Fornecedor } from "./fornecedor";
import { Origem } from "./origem";

export class Patrimonio{
    //#region Propriedades
    private id_patrimonio: number;
    private nome: string;
    private departamento: Departamento;
    private categoria: Categoria;
    private estado: string;
    private fornecedor: Fornecedor;
    private data_aquisicao: Date;
    private origem: Origem;
    private imagem_url: string | null;
    //#endregion

    //#region Contrutor
    constructor(id_patrimonio: number, nome: string,
        departamento: Departamento, categoria: Categoria,
        estado: string, fornecedor: Fornecedor,
        data_aquisicao: Date, origem: Origem, imagem_url?: string) {
        
            this.id_patrimonio = id_patrimonio;
            this.nome = nome;
            this.departamento = departamento;
            this.categoria = categoria;
            this.estado = estado;
            this.fornecedor = fornecedor;
            this.data_aquisicao = data_aquisicao;
            this.origem = origem;
            this.imagem_url = imagem_url != null ? imagem_url : null; 
    }
    //#endregion

    //#region Gets
    getNome(): string{ return this.nome };
    getDepartamento(): Departamento{ return this.departamento };
    getCategoria(): Categoria{ return this.categoria };
    getEstado(): string{ return this.estado };
    getFornecedor(): Fornecedor{ return this.fornecedor };
    getDataAquisicao(): Date{ return this.data_aquisicao };
    getOrigem(): Origem{ return this.origem };
    getImagemUrl(): string | null{ return this.imagem_url };
    //#endregion

    //#region Sets
    setNome(nome: string): void | string{
        //Validar nome // if() return "Nome inválido"
        this.nome = nome;
    }
    setDepartamento(dpto: Departamento): void | string{
        if(!dpto.ValidarDepartamento()) return "Departamento inválido";
        this.departamento = dpto;
    }
    setCategoria(categoria: Categoria): void | string{
        //Validar categoria //if() return "Categoria inválida";
        this.categoria = categoria;
    }
    setEstado(value: string): void | string{
        // Validar estado // if() return "Estado inválido"
        this.estado = value;
    }
    setFornecedor(fornecedor: Fornecedor): void | string{
        // Valdiar fornecedor // if() return "Fornecedor inválido"
        this.fornecedor = fornecedor;
    }
    setDataAquisicao(data: Date): void{
        this.data_aquisicao = data;
    }
    setOrigem(origem: Origem): void | string{
        // Validar origem // if() return "Origem inválida"
        this.origem = origem;
    }
    setImagemUrl(imgUrl: string): void | string{
        // Checar se é uma url válida e se está salva no sistema //if() return "Imagem url inválida"
        this.imagem_url = imgUrl;
    }
    //#endregion

    //#region Metodos

    SalvarImagem(img: File): string{
        // Salvar imagem no servidor ou outro serviço
        let url: string = "{{url}}";
        this.imagem_url = url;
        return url;
    }

    toString(): string{
        return ` O nome do patrimonio é: ${this.nome} 
            \n O departamento do patrimônio é: ${this.departamento.toString()}
            \n O fornecedor do patrimonio é: ${this.fornecedor.toString()} 
            \n Data de aquisição: ${this.data_aquisicao.toDateString} 
            \n Origem: ${this.origem.toString()}`
    }
    //#endregion
}

