import { Categoria } from "../../model/categoria";

export interface ICategoriaRepository{
    getCategoria(id: number): Categoria;
}