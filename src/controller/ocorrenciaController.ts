import { FastifyRequest } from "fastify";
import { IOcorrenciaService } from "../interfaces/services/IOcorrenciaService";
import { ocorrService } from "../service/OcorrenciaService";
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";

export class OcorrenciaController extends BaseController{

    private ocorrService: IOcorrenciaService;
    /**
     *
     */
    constructor(ocorrService: IOcorrenciaService) {
        super();
        this.ocorrService = ocorrService; 
    }

    public async ResgatarOcorrencia(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.ocorrService.getOcorrencia(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }

    public async ListagemOcorrencia(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{
            const filtro = super.resgatarQueryPadrao(request)
            result = await this.ocorrService.getOcorrencias(filtro)
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }

    }

    public async CadastrarOcorrencia(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarOcorrenciaBody(request)
            
            result = await this.ocorrService.createOcorrencia(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }
    
    public async AtualizarOcorrencia(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtroid = super.resgatarIdParam(request)

            const filtroCat = super.resgatarOcorrenciaBody(request)
            
            const filtro = {...filtroid, ...filtroCat}

            result = await this.ocorrService.updateOcorrencia(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }


}

export const ocorrController = new OcorrenciaController(
    ocorrService
);

