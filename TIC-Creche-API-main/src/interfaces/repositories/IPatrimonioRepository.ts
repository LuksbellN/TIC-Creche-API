import { Patrimonio } from "../../model/patrimonio";

export interface IPatrimonioRepository{
    getPatrimonio(id: number): Patrimonio;
}