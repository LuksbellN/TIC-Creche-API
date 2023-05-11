import { Categoria } from "../model/categoria";
import { ICategoriaService } from "../interfaces/services/ICategoriaService";
import { ICategoriaRepository } from "../interfaces/repositories/ICategoriaRepository";

export class CategoriaService implements ICategoriaService{
    private catRepository: ICategoriaRepository;

    constructor(catRepository: ICategoriaRepository) {
        this.catRepository = catRepository;
    }

    public getCategoria(id: number): Categoria{

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return this.catRepository.getCategoria(id);
    }

}