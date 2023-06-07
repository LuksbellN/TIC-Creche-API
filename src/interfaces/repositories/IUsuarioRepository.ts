import RespostaApi from "../../model/respostaApi";
import { Usuario } from "../../model/usuario";

export interface IUsuarioRepository{
    getUsuario(email: string, senha: string): Promise<RespostaApi>;
    getUsuarioByEmail(email: string): Promise<RespostaApi>;
    createUser(user: Usuario): Promise<RespostaApi>
}