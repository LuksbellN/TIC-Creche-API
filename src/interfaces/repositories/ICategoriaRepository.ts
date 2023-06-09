import RespostaApi from "../../model/respostaApi";

export interface ICategoriaRepository{
    getCategoria(filtro: {id: number}): Promise<RespostaApi>;
    createCategoria(filtro: any): Promise<RespostaApi>;
    getCategorias(filtro: any): Promise<RespostaApi>;
}