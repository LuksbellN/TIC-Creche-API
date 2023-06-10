import RespostaApi from "../../model/respostaApi";

export interface IOcorrenciaService{

    getOcorrencia(filtro: {id: number}): Promise<RespostaApi>;
    getOcorrencias(filtro: any): Promise<RespostaApi>;
    createOcorrencia(filtro: any): Promise<RespostaApi>;
    updateOcorrencia(filtro: any): Promise<RespostaApi>;
}