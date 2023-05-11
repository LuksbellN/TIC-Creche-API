import { ICategoriaRepository } from "../interfaces/repositories/ICategoriaRepository";
import { Categoria } from "../model/categoria";

export class CategoriaRepository implements ICategoriaRepository{

    //TODO: Implementar conexão e acessar banco de dados
    getCategoria(id: number): Categoria {
        throw new Error("Method not implemented.");
    }

}