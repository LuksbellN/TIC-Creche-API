export class Origem{
    //#region Propriedades
    private id_origem: number;
    private desc_origem: string;
    //#endregion

    //#region Construtor
    constructor(id_origem: number, desc_origem: string){
        this.id_origem = id_origem
        this.desc_origem = desc_origem
    }
    //#endregion

    //#region Gets
    getId(): number{ return this.id_origem };
    getDescOrigem(): string{ return this.desc_origem };
    //#endregion

    //#region Sets
    setDescOrigem(desc_origem: string): void | string{
        //Checar desc origem no banco de dados (desc_origem será UK)
        this.desc_origem = desc_origem;
    }
    //#endregion

    //#region Metodos
    toString(): string{
        return ` O id da origem é: ${this.id_origem} \n O nome da origem é: ${this.desc_origem}`
    }
    //#endregion
}