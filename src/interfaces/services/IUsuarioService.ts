import RespostaApi from "../../model/respostaApi";
import { Usuario } from "../../model/usuario";

export interface IUsuarioService{

    getUsuario(id: number): Usuario;
    registrarUsuario(user: Usuario): Promise<RespostaApi>
    login(email: string, senha: string): Promise<RespostaApi>
}