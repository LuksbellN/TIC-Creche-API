import { IPatrimonioService } from "../interfaces/services/IPatrimonioService";
import { PatrimonioService } from "../service/PatrimonioService";
import { Patrimonio } from "../model/patrimonio";
import { FastifyRequest } from "fastify/types/request";
import { z } from 'zod';
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";

export class patrimonioController extends BaseController{

    private patService: IPatrimonioService;
    /**
     *
     */
    constructor() {
        super();
        this.patService = new PatrimonioService(); 
    }

    public async ListagemPatrimonios(request: FastifyRequest): Promise<RespostaApi>{
        try{
            const filtro = super.resgatarFiltroPat(request)
            const result = await this.patService.getPatrimonios(filtro)
            return result;
        } catch(error) {
            console.log("erro: ", error)
            return {
                sucesso: false,
                error: "Erro ao obter a lista de patrimônios",
                data: null
              };
        }

    }


}

