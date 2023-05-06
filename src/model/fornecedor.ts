import { ContatoFornecedor } from "./contatoFornecedor"

export class Fornecedor{
    //#region Propriedades
    private id_fornecedor: number;
    private nome_fornecedor: string;
    private contatoFornecedor: ContatoFornecedor;
    //#endregion

    //#region Construtor
    constructor(id_fornecedor: number, nome_fornecedor: string, contatoFornecedor: ContatoFornecedor){
        this.id_fornecedor = id_fornecedor;
        this.nome_fornecedor = nome_fornecedor;
        this.contatoFornecedor = contatoFornecedor;
    }
    //#endregion

    //#region Gets
    getId(): number{ return this.id_fornecedor };
    getNome(): string{ return this.nome_fornecedor };
    //#endregion

    //#region Sets
    setNome(nome_fornecedores: string): void{
        this.nome_fornecedor = nome_fornecedores;
    }
    setContatoFornecedor(contatoFornecedor: ContatoFornecedor){
        if(!contatoFornecedor.ValidarContato()) return `Contato inválido`;
        this.contatoFornecedor = contatoFornecedor;
    }
    //#endregion

    //#region Metodos 
    toString(): string{
        return ` O id dos fornecedores é: ${this.id_fornecedor} \n O nome dos fornecedores é: ${this.nome_fornecedor}`
    }
    //#endregion
}