import RespostaApi from "../../model/respostaApi";

export interface ICategoriaService{

    getCategoria(filtro: {id: number}): Promise<RespostaApi>;
    getCategorias(filtro: any): Promise<RespostaApi>;
    createCategoria(filtro: any): Promise<RespostaApi>;
}