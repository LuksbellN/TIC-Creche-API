import { ITipoOcorrenciaService } from "../interfaces/services/ITipoOcorrenciaService";
import { ITipoOcorrenciaRepository } from "../interfaces/repositories/ITipoOcorrenciaRepository";
import { tipoOcorrRepository } from "../repository/TipoOcorrenciaRepository";
import RespostaApi from "../model/respostaApi";

export class TipoOcorrenciaService implements ITipoOcorrenciaService {
    private tipoOcorrRepository: ITipoOcorrenciaRepository;

    constructor(tipoOcorrRepository: ITipoOcorrenciaRepository) {
        this.tipoOcorrRepository = tipoOcorrRepository;
    }

    public async getTipoOcorrencia(filtro: { id: number }): Promise<RespostaApi> {

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return await this.tipoOcorrRepository.getTipoOcorrencia(filtro);
    }

    public async getTipoOcorrencias(filtro: any): Promise<RespostaApi> {

        const forPropriedades = this.getTipoOcorrPropriedades();

        const propriedadeOrdenacao = filtro.ordenacao[0];
        const direcaoOrdenacao = filtro.ordenacao[1];
        const ordenacaoValida =
            forPropriedades.includes(propriedadeOrdenacao) &&
            (direcaoOrdenacao === "asc" || direcaoOrdenacao === "desc");
        if (!ordenacaoValida) {
            // Caso a ordenação não seja válida, aplica a ordenação padrão por data de aquisição descendente
            filtro.ordenacao = ["nome", "asc"];
        }

        return await this.tipoOcorrRepository.getTipoOcorrencias(filtro);
    }

    public async createTipoOcorrencia(filtro: any): Promise<RespostaApi> {

        return await this.tipoOcorrRepository.createTipoOcorrencia(filtro);
    }

    public async updateTipoOcorrencia(filtro: any): Promise<RespostaApi> {

        return await this.tipoOcorrRepository.updateTipoOcorrencia(filtro);
    }

    // TODO melhorar - reflection 
    private getTipoOcorrPropriedades(): string[] {
        const propriedadesTipoOcorrencia: string[] = ['id', 'nome'];

        return [...propriedadesTipoOcorrencia];
    }

}


export const tipoOcorrService = new TipoOcorrenciaService(
    tipoOcorrRepository
)