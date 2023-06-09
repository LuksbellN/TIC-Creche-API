import { FastifyRequest } from "fastify";
import { ICategoriaService } from "../interfaces/services/ICategoriaService";
import { CategoriaService } from "../service/CategoriaService";
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";

export class CategoriaController extends BaseController{

    private catService: ICategoriaService;
    /**
     *
     */
    constructor() {
        super();
        this.catService = new CategoriaService(); 
    }

    public async ResgatarCategoria(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.catService.getCategoria(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }

    public async ListagemCategoria(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{
            const filtro = super.resgatarPatrimonioQuery(request)
            result = await this.catService.getCategorias(filtro)
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }

    }

    public async CadastrarCategoria(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarPatrimonioBody(request)
            
            result = await this.catService.createCategoria(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }
    
    public async AtualizarCategoria(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtroid = super.resgatarIdParam(request)

            const filtroPat = super.resgatarPatrimonioBody(request)
            
            const filtro = {...filtroid, ...filtroPat}

            result = await this.catService.updateCategoria(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }

    public async DeletarCategoria(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.catService.deleteCategoria(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }


}

