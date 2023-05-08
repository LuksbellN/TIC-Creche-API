import { ILoginRepository } from "../interfaces/repositories/ILoginRepository";
import { Usuario } from "../model/usuario";

export class UsuarioRepository implements ILoginRepository{

    //TODO: Implementar conexão e acessar banco de dados
    getUsuario(id: number): Usuario {
        throw new Error("Method not implemented.");
    }

}