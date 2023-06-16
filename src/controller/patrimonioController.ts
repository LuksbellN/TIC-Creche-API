import { IPatrimonioService } from "../interfaces/services/IPatrimonioService";
import { patrimonioService } from "../service/PatrimonioService";
import { FastifyRequest } from "fastify/types/request";
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";

export class PatrimonioController extends BaseController{

    private patService: IPatrimonioService;
    
    constructor(patService: IPatrimonioService) {
        super();
        this.patService = patService; 
    }

    public async ResgatarPatrimonio(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;

            const filtro = super.resgatarIdParam(request)
            
            result = await this.patService.getPatrimonio(filtro)
    
            return result;

    }

    public async ListagemPatrimonios(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{
            const filtro = super.resgatarPatrimonioQuery(request)
            result = await this.patService.getPatrimonios(filtro)
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result;
        }

    }

    public async CadastrarPatrimonio(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarPatrimonioBody(request)
            
            result = await this.patService.createPatrimonio(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result;
        }
    }
    
    public async AtualizarPatrimonio(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtroid = super.resgatarIdParam(request)

            const filtroPat = super.resgatarPatrimonioBody(request)
            
            const filtro = {...filtroid, ...filtroPat}

            result = await this.patService.updatePatrimonio(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result;
        }
    }

    public async DeletarPatrimonio(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.patService.deletePatrimonio(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result;
        }
    }
}

export const patController = new PatrimonioController(
    patrimonioService
);