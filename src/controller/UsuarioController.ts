import { FastifyRequest } from "fastify";
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";
import { IUsuarioService } from "../interfaces/services/IUsuarioService";
import { userService } from "../service/UsuarioService";
import { IDepartamentoService } from "../interfaces/services/IDepartamentoService";
import { depService } from "../service/DepartamentoService";

export class UsuarioController extends BaseController{

    private userService: IUsuarioService;
    private depService: IDepartamentoService;
    /**
     *
     */
    constructor(userService: IUsuarioService, depService: IDepartamentoService) {
        super();
        this.userService = userService;
        this.depService = depService;
    }

    public async ResgatarUsuario(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.userService.getUsuario(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }

    public async DeletarUsuario(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtro = super.resgatarIdParam(request)
            
            result = await this.userService.deleteUsuario(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }

    public async Registrar(request: FastifyRequest): Promise<RespostaApi> {

        let result = new RespostaApi;
        try{

            const filtro = super.resgatarUserBody(request)

            const { data } = await this.depService.getDepartamento({id: filtro.id_departamento})
            if(!data) {
                result.error = 'Departamento inexistente'
                return result
            }
            result = await this.userService.registrarUsuario(filtro)
    
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error
            return result;
        }
    }

    public async ResgatarUsuarios(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{
            const filtro = super.resgatarQueryPadrao(request)
            result = await this.userService.getUsuarios(filtro)
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }

    }

    public async AtualizarUsuario(request: FastifyRequest): Promise<RespostaApi>{
        let result = new RespostaApi;
        try{

            const filtroid = super.resgatarIdParam(request)

            const filtroUser = super.resgatarUserBody(request)
            
            const filtro = {...filtroid, ...filtroUser}

            result = await this.userService.updateUsuario(filtro)
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }
    
}

export const userController = new UsuarioController(
    userService,
    depService
);

