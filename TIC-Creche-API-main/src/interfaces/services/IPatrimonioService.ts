import { Patrimonio } from "../../model/patrimonio";

export interface IPatrimonioService{

    getPatrimonio(id: number): Patrimonio;

}