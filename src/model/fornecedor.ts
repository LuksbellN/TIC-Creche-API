
export class Fornecedor{
    //#region Propriedades
    private id_fornecedor: number;
    private nome_fornecedor: string;
    private documento: string | null;
    //#endregion

    //#region Construtor
    constructor(id_fornecedor: number, nome_fornecedor: string, documento: string | null){
        this.id_fornecedor = id_fornecedor;
        this.nome_fornecedor = nome_fornecedor;
        this.documento = documento;
    }
    //#endregion

    //#region Gets
    getId(): number{ return this.id_fornecedor };
    getNome(): string{ return this.nome_fornecedor };
    getDocumento(): string | null{ return this.documento };
    //#endregion

    //#region Sets
    setNome(nome_fornecedores: string): void{
        this.nome_fornecedor = nome_fornecedores;
    }
    setDocumento(documento: string){
        this.documento = documento;
    }
    //#endregion

    //#region Metodos 
    toString(): string{
        return ` O id dos fornecedores é: ${this.id_fornecedor} \n O nome dos fornecedores é: ${this.nome_fornecedor}`
    }
    //#endregion
}