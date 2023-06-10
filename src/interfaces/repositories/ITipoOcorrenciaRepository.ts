import RespostaApi from "../../model/respostaApi";

export interface ITipoOcorrenciaRepository{
    getTipoOcorrencia(filtro: {id: number}): Promise<RespostaApi>;
    getTipoOcorrencias(filtro: any): Promise<RespostaApi>;
    createTipoOcorrencia(filtro: any): Promise<RespostaApi>;
    updateTipoOcorrencia(filtro: any): Promise<RespostaApi>;
}