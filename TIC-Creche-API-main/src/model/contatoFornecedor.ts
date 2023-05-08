export class ContatoFornecedor{
    //#region Propriedades
    private id_contato: number;
    private telefone: string;
    private email: string;
    //#endregion

    //#region Construtor
    constructor(id_contato: number, telefone: string, email: string) {
        this.id_contato = id_contato;
        this.telefone = telefone;
        this.email = email;
    }
    //#endregion

    //#region Gets
    getId(): number{ return this.id_contato };
    getTelefone(): string{ return this.telefone };
    getEmail(): string{return this.email };
    //#endregion

    //#region Sets
    setTelefone(telefone: string){
        //Verificar se o telefone é valido if(!ValidarComRegex(telefone)) --Implementar no fururo
        this.telefone = telefone;
    }

    setEmail(email: string){
        //Verificar se o email é valido //if(!ValidarComRegex(email)) --Implementar no fururo
        //Verificar se existe user com esse email no banco //sessionStorage.getItem("userName") -- Implementar no futuro
        this.email = email;
    }
    //#endregion

    //#region Metodos
    public ValidarContato(): boolean{
        // Implementar lógica de validação de telefone e email
        return true;
    }

    toString(): string{
        return `O telefone é: ${this.telefone} \n Email: ${this.email}`;
    }
    //#endregion
}