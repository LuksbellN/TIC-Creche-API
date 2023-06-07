import { Categoria } from "./categoria";
import { Departamento } from "./departamento";
import { Fornecedor } from "./fornecedor";

export class Patrimonio{
    //#region Propriedades
    private id: number;
    private nome: string;
    private departamento: Departamento;
    private categoria: Categoria;
    private estado: number;
    private fornecedor: Fornecedor;
    private data_aquisicao: Date;
    private imagem_url: string | null;
    //#endregion

    //#region Contrutor
    constructor(id: number, nome: string,
        departamento: Departamento, categoria: Categoria,
        estado: number, fornecedor: Fornecedor,
        data_aquisicao: Date, imagem_url: string | null) {
        
            this.id = id;
            this.nome = nome;
            this.departamento = departamento;
            this.categoria = categoria;
            this.estado = estado;
            this.fornecedor = fornecedor;
            this.data_aquisicao = data_aquisicao;
            this.imagem_url = imagem_url; 
    }
    //#endregion

    //#region Gets
    getNome(): string{ return this.nome };
    getDepartamento(): Departamento{ return this.departamento };
    getCategoria(): Categoria{ return this.categoria };
    getEstado(): number{ return this.estado };
    getFornecedor(): Fornecedor{ return this.fornecedor };
    getDataAquisicao(): Date{ return this.data_aquisicao };
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
    setEstado(value: number): void | string{
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
            \n Data de aquisição: ${this.data_aquisicao.toDateString}`
    }
    //#endregion
}

