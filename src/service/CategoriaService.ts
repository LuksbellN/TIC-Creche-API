import { Categoria } from "../model/categoria";
import { ICategoriaService } from "../interfaces/services/ICategoriaService";
import { ICategoriaRepository } from "../interfaces/repositories/ICategoriaRepository";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import RespostaApi from "../model/respostaApi";

export class CategoriaService implements ICategoriaService{
    private catRepository: ICategoriaRepository;

    constructor() {
        this.catRepository = new CategoriaRepository();
    }
    
    public async getCategoria(filtro: {id: number}): Promise<RespostaApi>{

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return await this.catRepository.getCategoria(filtro);
    }

    public async getCategorias(filtro: any): Promise<RespostaApi>{

        if (!filtro.ordenacao) {
            let catPropriedades = Object.getOwnPropertyNames(Categoria.prototype).map(el => el.toLowerCase());

            // Verifica se há ou se é válido a ordenação recebida 
            if (!catPropriedades.includes(filtro.ordenacao[0]) ||
                !(filtro.ordenacao[1] === "asc" || filtro.ordenacao[1] === "desc")) {
                //Caso não, aplica a ordenação padrão por data de aquisição descendente
                filtro.ordenacao = ["nome", "asc"];
            }
        }

        return await this.catRepository.getCategorias(filtro);
    }

    public async createCategoria(filtro: any): Promise<RespostaApi>{

        return await this.catRepository.createCategoria(filtro);
    }
}