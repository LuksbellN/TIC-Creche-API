import { FastifyRequest } from "fastify";
import { IFornecedorService } from "../interfaces/services/IFornecedorService";
import { forService } from "../service/FornecedorService";
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";

export class FornecedorController extends BaseController{

    private forService: IFornecedorService;
    /**
     *
     */
    constructor(forService: IFornecedorService) {
        super();
        this.forService = forService;
    }

    public async ResgatarFornecedor(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.forService.getFornecedor(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }

    public async ListagemFornecedor(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{
            const filtro = super.resgatarQueryPadrao(request)
            result = await this.forService.getFornecedores(filtro)
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }

    }

    public async CadastrarFornecedor(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarFornecedorBody(request)
            
            result = await this.forService.createFornecedor(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }
    
    public async AtualizarFornecedor(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtroid = super.resgatarIdParam(request)

            const filtroCat = super.resgatarFornecedorBody(request)
            
            const filtro = {...filtroid, ...filtroCat}

            result = await this.forService.updateFornecedor(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }
}

export const forController = new FornecedorController(
    forService
);

