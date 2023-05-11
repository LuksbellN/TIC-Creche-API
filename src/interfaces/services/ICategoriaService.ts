import { Categoria } from "../../model/categoria";

export interface ICategoriaService{

    getCategoria(id: number): Categoria;

}