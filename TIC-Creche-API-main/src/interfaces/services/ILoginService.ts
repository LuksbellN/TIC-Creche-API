import { Usuario } from "../../model/usuario";

export interface ILoginService{

    getUsuario(id: number): Usuario;

}