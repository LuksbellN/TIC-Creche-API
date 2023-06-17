import RespostaApi from "../../model/respostaApi";

export interface IUsuarioRepository{
    getUsuario(email: string, senha: string): Promise<RespostaApi>;
    getUsuarios(filtro: any): Promise<RespostaApi>;
    getUsuarioById(filtro: {id: number}): Promise<RespostaApi>;
    getUsuarioByEmail(email: string): Promise<RespostaApi>;
    createUser(filtro: any): Promise<RespostaApi>;
    updateUsuario(filtro: any): Promise<RespostaApi>;
    deleteUsuario(filtro: {id: number}): Promise<RespostaApi>;
}