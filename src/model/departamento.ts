export class Departamento {
    //#region Propriedades
    private id_dpto : number
    private nome_dpto : string
    //#endregion

    //#region Construtor
    constructor(id_dpto : number, nome_dpto : string){
        this.id_dpto = id_dpto
        this.nome_dpto = nome_dpto
    }
    //#endregion

    //#region Gets
    getId(): number{ return this.id_dpto };
    getNome(): string{ return this.nome_dpto };
    //#endregion

    //#region Sets
    setNome(nome_dpto: string): void | string{
        // Checar no banco de dados (nome+dpto será UK)
        this.nome_dpto = nome_dpto
    }

    //#endregion 

    //#region Metodos
    ValidarDepartamento(): boolean {
        return this.id_dpto != null && this.nome_dpto != null;
    }

    toString(): string{
        return ` O id do Departamento é: ${this.id_dpto} \n O nome do Departamento é: ${this.nome_dpto}`
    }
    //#endregion
}