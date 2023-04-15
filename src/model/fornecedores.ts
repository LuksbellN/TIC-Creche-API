import { ContatoFornecedor } from "./contatoFornecedor"

export class Fornecedor{
    //#region Propriedades
    private id_fornecedores: number;
    private nome_fornecedores: string;
    private contatoFornecedor: ContatoFornecedor;
    //#endregion

    //#region Construtor
    constructor(id_fornecedores: number, nome_fornecedores: string, contatoFornecedor: ContatoFornecedor){
        this.id_fornecedores = id_fornecedores;
        this.nome_fornecedores = nome_fornecedores;
        this.contatoFornecedor = contatoFornecedor;
    }
    //#endregion

    //#region Gets
    getId(): number{ return this.id_fornecedores };
    getNome(): string{ return this.nome_fornecedores };
    //#endregion

    //#region Sets
    setNome(nome_fornecedores: string): void{
        this.nome_fornecedores = nome_fornecedores;
    }
    setContatoFornecedor(contatoFornecedor: ContatoFornecedor){
        if(!contatoFornecedor.ValidarContato()) return `Contato inválido`;
        this.contatoFornecedor = contatoFornecedor;
    }
    //#endregion

    //#region Metodos 
    toString(): string{
        return ` O id dos fornecedores é: ${this.id_fornecedores} \n O nome dos fornecedores é: ${this.nome_fornecedores}`
    }
    //#endregion
}