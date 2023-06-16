import { FastifyRequest } from "fastify";
import { ITipoOcorrenciaService } from "../interfaces/services/ITipoOcorrenciaService";
import { tipoOcorrService } from "../service/TipoOcorrenciaService";
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";

export class TipoOcorrenciaController extends BaseController{

    private tipoOcorrService: ITipoOcorrenciaService;
    /**
     *
     */
    constructor(tipoOcorrService: ITipoOcorrenciaService) {
        super();
        this.tipoOcorrService = tipoOcorrService;
    }

    public async ResgatarTipoOcorrencia(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.tipoOcorrService.getTipoOcorrencia(filtro)
    
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
            result = await this.tipoOcorrService.getTipoOcorrencias(filtro)
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
            
            result = await this.tipoOcorrService.createTipoOcorrencia(filtro)
    
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

            result = await this.tipoOcorrService.updateTipoOcorrencia(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }


}


export const tipoOcorrController = new TipoOcorrenciaController(
    tipoOcorrService
);

