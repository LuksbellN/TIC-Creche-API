export class TipoOcorrencia {
    //#region Propriedades
    private id : number
    private nome : string
    //#endregion

    //#region Construtor
    constructor(id : number, nome : string){
        this.id = id
        this.nome = nome
    }
    //#endregion

    //#region Gets
    getId(): number{ return this.id };
    getNome(): string{ return this.nome };
    //#endregion

    //#region Sets
    setNome(nome: string): void | string{
        // Checar no banco de dados (nome+dpto será UK)
        this.nome = nome
    }

    //#endregion 

    //#region Metodos
    ValidarTipoOcorrencia(): boolean {
        return this.id != null && this.nome != null;
    }

    toString(): string{
        return ` O id do Tipo Ocorrencia é: ${this.id} \n O nome do Tipo Ocorrencia é: ${this.nome}`
    }
    //#endregion
}