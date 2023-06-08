import RespostaApi from "../../model/respostaApi";

export interface IPatrimonioService{

    getPatrimonio(filtro: {id: number}): Promise<RespostaApi>;
    getPatrimonios(filtroPat: any): Promise<RespostaApi>;
    updatePatrimonio(filtroPat: any): Promise<RespostaApi>;
    createPatrimonio(filtroPat: any): Promise<RespostaApi>;
    deletePatrimonio(filtro: {id: number}): Promise<RespostaApi>;
}