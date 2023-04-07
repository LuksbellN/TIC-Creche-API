import { AccessToken } from "./accessToken";
import { Departamento } from "./departamento"

export class Usuario {
    private id_usuario : number;
    private nome_usuario : string;
    private email : string;
    private senha : string;
    private departamento : Departamento;
    private acessToken : AccessToken;

    constructor(id_usuario : number, nome_usuario : string, email : string,
        senha : string , departamento : Departamento, acessToken : AccessToken){
        this.id_usuario = id_usuario;
        this.nome_usuario = nome_usuario;
        this.email = email;
        this.senha =  senha;
        this.acessToken = acessToken;
        this.departamento = departamento;
    }
}