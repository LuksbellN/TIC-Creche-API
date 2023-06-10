import RespostaApi from "../../model/respostaApi";

export interface IDepartamentoService{

    getDepartamento(filtro: {id: number}): Promise<RespostaApi>;
    getDepartamentos(filtro: any): Promise<RespostaApi>;
    createDepartamento(filtro: any): Promise<RespostaApi>;
    updateDepartamento(filtro: any): Promise<RespostaApi>;
}