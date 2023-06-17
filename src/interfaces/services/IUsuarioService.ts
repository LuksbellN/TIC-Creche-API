import RespostaApi from "../../model/respostaApi";
import { Usuario } from "../../model/usuario";

export interface IUsuarioService{

    getUsuario(filtro : {id: number}): Promise<RespostaApi>;
    getUsuarios(filtro : any): Promise<RespostaApi>;
    registrarUsuario(filtro: any): Promise<RespostaApi>;
    login(email: string, senha: string): Promise<RespostaApi>;
    updateUsuario(filtro: any): Promise<RespostaApi>; 
    deleteUsuario(filtro: {id: number}): Promise<RespostaApi>;
}