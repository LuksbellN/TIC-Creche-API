export class Fornecedor{
    private id_fornecedores: number
    private nome_fornecedores: string

    constructor(id_fornecedores: number, nome_fornecedores: string){
        this.id_fornecedores = id_fornecedores
        this.nome_fornecedores = nome_fornecedores
    }

    setId(id_fornecedores: number){
        this.id_fornecedores = id_fornecedores
    }

    getId(): number{
        return this.id_fornecedores
    }

    setnome(nome_fornecedores: string){
        this.nome_fornecedores = nome_fornecedores
    }

    getnome(): string{
        return this.nome_fornecedores
    }

    toString(): string{
        return ` O id dos fornecedores é: ${this.id_fornecedores} \n O nome dos fornecedores é: ${this.nome_fornecedores}`
    }
}