import RespostaApi from "../../model/respostaApi";

export interface IFornecedorService{

    getFornecedor(filtro: {id: number}): Promise<RespostaApi>;
    getFornecedors(filtro: any): Promise<RespostaApi>;
    createFornecedor(filtro: any): Promise<RespostaApi>;
    updateFornecedor(filtro: any): Promise<RespostaApi>;
}