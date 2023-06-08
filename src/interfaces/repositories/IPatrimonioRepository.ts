import RespostaApi from "../../model/respostaApi";

export interface IPatrimonioRepository{
    getPatrimonio(filtro: {id: number}): Promise<RespostaApi>;
    getPatrimonios(filtro: any): Promise<RespostaApi>;
    createPatrimonio(filtroPat: any): Promise<RespostaApi>;
    updatePatrimonio(filtroPat: any): Promise<RespostaApi>;
    deletePatrimonio(filtro: {id: number}): Promise<RespostaApi>;
}