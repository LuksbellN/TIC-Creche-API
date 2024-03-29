import { Departamento } from "./departamento"

export class Usuario {
    //#region Propriedades
    private id_usuario : number | null;
    private userName : string;
    private email : string;
    private senha : string;
    private departamento : Departamento;
    //#endregion

    //#region Construtor
    constructor(id_usuario : number | null, userName : string, email : string,
        senha : string , departamento : Departamento){
        this.id_usuario = id_usuario;
        this.userName = userName;
        this.email = email;
        this.senha =  senha;
        this.departamento = departamento;
    }

    //#endregion

    //#region Gets
    getId(): number | null{ return this.id_usuario };
    getUserName(): string{ return this.userName };
    getEmail(): string{ return this.email };
    getDepartamento(): Departamento  { return this.departamento };
    getSenha(): string { return this.senha }
    getIdDepartamento(): number { return this.departamento.getId()}
    //#endregion

    //#region Sets
    setUserName(userName: string): void | string{
        let success: boolean = this.ValidarUserName(userName);
        if(success){
            this.userName = userName;
        } else{
            return "Username inválido";
        }
    }

    setEmail(email: string): void | string{
        let success: boolean = false;
        // Validação de email de login no banco de dados(email é UK)
        if(success) this.email = email;
    }

    setDepartamento(dpto: Departamento): void | string{
        let success: boolean = dpto.ValidarDepartamento();
        if(success){
            this.departamento = dpto;
        } else {
            return "Departamento inválido"
        }
    }

    setSenha(senha: string): void {
        this.senha = senha;
    }

    //#endregion

    //#region Métodos

    ValidarUserName(userName: string): boolean{
        // Validação de nome de usuário no banco de dados
        return true;
    }

    toString(): string{
        return ` O id do usuário é: ${this.id_usuario} \n O userName é: ${this.userName}
            \n Email: ${this.email}`;
    }

    //#endregion
}