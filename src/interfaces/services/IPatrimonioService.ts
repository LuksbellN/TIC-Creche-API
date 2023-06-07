import { FastifyRequest } from "fastify/types/request";
import { Patrimonio } from "../../model/patrimonio";

export interface IPatrimonioService{

    getPatrimonio(id: number): Patrimonio;
    getPatrimonios(filtroPat: any): Promise<Patrimonio[]>;
}