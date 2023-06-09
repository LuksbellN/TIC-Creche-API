import { Categoria } from "../model/categoria";
import { ICategoriaService } from "../interfaces/services/ICategoriaService";
import { ICategoriaRepository } from "../interfaces/repositories/ICategoriaRepository";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class CategoriaService implements ICategoriaService{
    private catRepository: ICategoriaRepository;

    constructor() {
        this.catRepository = new CategoriaRepository();
    }

    public getCategoria(id: number): Categoria{

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return this.catRepository.getCategoria(id);
    }

}