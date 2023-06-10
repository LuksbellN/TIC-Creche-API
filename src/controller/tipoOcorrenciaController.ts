import { FastifyRequest } from "fastify";
import { ITipoOcorrenciaService } from "../interfaces/services/ITipoOcorrenciaService";
import { TipoOcorrenciaService } from "../service/TipoOcorrenciaService";
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";

export class TipoOcorrenciaController extends BaseController{

    private forService: ITipoOcorrenciaService;
    /**
     *
     */
    constructor() {
        super();
        this.forService = new TipoOcorrenciaService(); 
    }

    public async ResgatarTipoOcorrencia(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.forService.getTipoOcorrencia(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }

    public async ListagemTipoOcorrencia(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{
            const filtro = super.resgatarQueryPadrao(request)
            result = await this.forService.getTipoOcorrencias(filtro)
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }

    }

    public async CadastrarTipoOcorrencia(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarTipoOcorrenciaBody(request)
            
            result = await this.forService.createTipoOcorrencia(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }
    
    public async AtualizarTipoOcorrencia(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtroid = super.resgatarIdParam(request)

            const filtroCat = super.resgatarTipoOcorrenciaBody(request)
            
            const filtro = {...filtroid, ...filtroCat}

            result = await this.forService.updateTipoOcorrencia(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }


}

