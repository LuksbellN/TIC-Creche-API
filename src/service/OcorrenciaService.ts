import { IOcorrenciaService } from "../interfaces/services/IOcorrenciaService";
import { IOcorrenciaRepository } from "../interfaces/repositories/IOcorrenciaRepository";
import { ocorrRepository } from "../repository/OcorrenciaRepository";
import RespostaApi from "../model/respostaApi";

export class OcorrenciaService implements IOcorrenciaService {
    private ocorrRepository: IOcorrenciaRepository;

    constructor(ocorrRepository: IOcorrenciaRepository) {
        this.ocorrRepository = ocorrRepository;
    }

    public async getOcorrencia(filtro: { id: number }): Promise<RespostaApi> {

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return await this.ocorrRepository.getOcorrencia(filtro);
    }

    public async getOcorrencias(filtro: any): Promise<RespostaApi> {

        const forPropriedades = this.getOcorrPropriedades();

        const propriedadeOrdenacao = filtro.ordenacao[0];
        const direcaoOrdenacao = filtro.ordenacao[1];
        const ordenacaoValida =
            forPropriedades.includes(propriedadeOrdenacao) &&
            (direcaoOrdenacao === "asc" || direcaoOrdenacao === "desc");
        if (!ordenacaoValida) {
            // Caso a ordenação não seja válida, aplica a ordenação padrão por data de aquisição descendente
            filtro.ordenacao = ["nome", "asc"];
        }

        return await this.ocorrRepository.getOcorrencias(filtro);
    }

    public async createOcorrencia(filtro: any): Promise<RespostaApi> {

        return await this.ocorrRepository.createOcorrencia(filtro);
    }

    public async updateOcorrencia(filtro: any): Promise<RespostaApi> {

        return await this.ocorrRepository.updateOcorrencia(filtro);
    }

    // TODO melhorar - reflection 
    private getOcorrPropriedades(): string[] {
        const propriedadesOcorrencia: string[] = ['id', 'nome', 'id_tipo_ocorrencia'];

        return [...propriedadesOcorrencia];
    }

}

export const ocorrService = new OcorrenciaService(
    ocorrRepository
)