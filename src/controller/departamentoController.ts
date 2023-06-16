import { FastifyRequest } from "fastify";
import { IDepartamentoService } from "../interfaces/services/IDepartamentoService";
import { depService } from "../service/DepartamentoService";
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";

export class DepartamentoController extends BaseController{

    private catService: IDepartamentoService;
    /**
     *
     */
    constructor(depService: IDepartamentoService) {
        super();
        this.catService = depService; 
    }

    public async ResgatarDepartamento(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.catService.getDepartamento(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }

    public async ListagemDepartamento(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{
            const filtro = super.resgatarQueryPadrao(request)
            result = await this.catService.getDepartamentos(filtro)
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }

    }

    public async CadastrarDepartamento(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarDepartamentoBody(request)
            
            result = await this.catService.createDepartamento(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }
    
    public async AtualizarDepartamento(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtroid = super.resgatarIdParam(request)

            const filtroCat = super.resgatarDepartamentoBody(request)
            
            const filtro = {...filtroid, ...filtroCat}

            result = await this.catService.updateDepartamento(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }
}

export const depController = new DepartamentoController(
    depService
);

