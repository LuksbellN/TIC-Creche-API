import { ICategoriaService } from "../interfaces/services/ICategoriaService";
import { ICategoriaRepository } from "../interfaces/repositories/ICategoriaRepository";
import { catRepository } from "../repository/CategoriaRepository";
import RespostaApi from "../model/respostaApi";

export class CategoriaService implements ICategoriaService {
    private catRepository: ICategoriaRepository;

    constructor(catRepository: ICategoriaRepository) {
        this.catRepository = catRepository;
    }

    public async getCategoria(filtro: { id: number }): Promise<RespostaApi> {

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return await this.catRepository.getCategoria(filtro);
    }

    public async getCategorias(filtro: any): Promise<RespostaApi> {

        const CatPropriedades = this.getCatPropriedades();

        const propriedadeOrdenacao = filtro.ordenacao[0];
        const direcaoOrdenacao = filtro.ordenacao[1];
        const ordenacaoValida =
            CatPropriedades.includes(propriedadeOrdenacao) &&
            (direcaoOrdenacao === "asc" || direcaoOrdenacao === "desc");
        if (!ordenacaoValida) {
            // Caso a ordenação não seja válida, aplica a ordenação padrão por data de aquisição descendente
            filtro.ordenacao = ["nome_categoria", "asc"];
        }

        return await this.catRepository.getCategorias(filtro);
    }

    public async createCategoria(filtro: any): Promise<RespostaApi> {

        return await this.catRepository.createCategoria(filtro);
    }

    public async updateCategoria(filtro: any): Promise<RespostaApi> {

        return await this.catRepository.updateCategoria(filtro);
    }

    // TODO melhorar - reflection 
    private getCatPropriedades(): string[] {
        const propriedadesCategoria: string[] = ['id', 'nome_categoria'];

        return [...propriedadesCategoria];
    }

}

export const catService = new CategoriaService(
    catRepository
);