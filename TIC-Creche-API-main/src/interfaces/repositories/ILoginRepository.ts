import { Usuario } from "../../model/usuario";

export interface ILoginRepository{
    getUsuario(id: number): Usuario;
}