import { FastifyRequest } from "fastify/types/request";
import { Patrimonio } from "../../model/patrimonio";
import RespostaApi from "../../model/respostaApi";

export interface IPatrimonioService{

    getPatrimonio(id: number): Patrimonio;
    getPatrimonios(filtroPat: any): Promise<RespostaApi>;
    createPatrimonio(filtroPat: any): Promise<RespostaApi>
}