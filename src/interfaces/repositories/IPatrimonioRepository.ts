import { Patrimonio } from "../../model/patrimonio";
import RespostaApi from "../../model/respostaApi";

export interface IPatrimonioRepository{
    getPatrimonio(id: number): Patrimonio;
    getPatrimonios(filtro: any): Promise<RespostaApi>;
}