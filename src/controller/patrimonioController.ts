import { IPatrimonioService } from "../interfaces/services/IPatrimonioService";
import { PatrimonioService } from "../service/PatrimonioService";
import { FastifyRequest } from "fastify/types/request";
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

    public async ResgatarPatrimonio(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarPatrimonioParam(request)
            
            result = await this.patService.getPatrimonio(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false
            return result
        }
    }

    public async ListagemPatrimonios(request: FastifyRequest): Promise<RespostaApi>{
        try{
            const filtro = super.resgatarPatrimonioQuery(request)
            const result = await this.patService.getPatrimonios(filtro)
            return result;
        } catch(error) {
            return {
                sucesso: false,
                error: "Erro ao obter a lista de patrimônios",
                data: null
              };
        }

    }

    public async CadastrarPatrimonio(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarPatrimonioBody(request)
            
            result = await this.patService.createPatrimonio(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false
            return result
        }
    }
    
    public async AtualizarPatrimonio(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtroid = super.resgatarPatrimonioParam(request)

            const filtroPat = super.resgatarPatrimonioBody(request)
            
            const filtro = {...filtroid, ...filtroPat}

            result = await this.patService.updatePatrimonio(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false
            return result
        }
    }

    public async DeletarPatrimonio(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarPatrimonioParam(request)
            
            result = await this.patService.deletePatrimonio(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false
            return result
        }
    }



}

