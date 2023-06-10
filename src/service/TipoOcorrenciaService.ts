import { ITipoOcorrenciaService } from "../interfaces/services/ITipoOcorrenciaService";
import { ITipoOcorrenciaRepository } from "../interfaces/repositories/ITipoOcorrenciaRepository";
import { TipoOcorrenciaRepository } from "../repository/TipoOcorrenciaRepository";
import RespostaApi from "../model/respostaApi";

export class TipoOcorrenciaService implements ITipoOcorrenciaService {
    private catRepository: ITipoOcorrenciaRepository;

    constructor() {
        this.catRepository = new TipoOcorrenciaRepository();
    }

    public async getTipoOcorrencia(filtro: { id: number }): Promise<RespostaApi> {

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return await this.catRepository.getTipoOcorrencia(filtro);
    }

    public async getTipoOcorrencias(filtro: any): Promise<RespostaApi> {

        const forPropriedades = this.getForPropriedades();

        const propriedadeOrdenacao = filtro.ordenacao[0];
        const direcaoOrdenacao = filtro.ordenacao[1];
        const ordenacaoValida =
            forPropriedades.includes(propriedadeOrdenacao) &&
            (direcaoOrdenacao === "asc" || direcaoOrdenacao === "desc");
        if (!ordenacaoValida) {
            // Caso a ordenação não seja válida, aplica a ordenação padrão por data de aquisição descendente
            filtro.ordenacao = ["nome", "asc"];
        }

        return await this.catRepository.getTipoOcorrencias(filtro);
    }

    public async createTipoOcorrencia(filtro: any): Promise<RespostaApi> {

        return await this.catRepository.createTipoOcorrencia(filtro);
    }

    public async updateTipoOcorrencia(filtro: any): Promise<RespostaApi> {

        return await this.catRepository.updateTipoOcorrencia(filtro);
    }

    // TODO melhorar - reflection 
    private getForPropriedades(): string[] {
        const propriedadesPatrimonio: string[] = ['id', 'nome', 'documento'];

        return [...propriedadesPatrimonio];
    }

}