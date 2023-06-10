import { FastifyInstance, FastifyRequest } from "fastify";
import { IUsuarioService } from "../interfaces/services/IUsuarioService";
import { UsuarioService } from "../service/UsuarioService";
import { z } from "zod";
import { Usuario } from "../model/usuario";
import { Departamento } from "../model/departamento";
import BaseController from "./baseController";
import { IDepartamentoService } from "../interfaces/services/IDepartamentoService";
import { DepartamentoService } from "../service/DepartamentoService";
import RespostaApi from "../model/respostaApi";

export class LoginController extends BaseController {

    private usuarioService: IUsuarioService
    private departamentoService: IDepartamentoService
    private readonly app: FastifyInstance

    constructor(app: FastifyInstance) {
        super();
        this.app = app;
        this.usuarioService = new UsuarioService()
        this.departamentoService = new DepartamentoService()
    }

    public async Registrar(request: FastifyRequest): Promise<RespostaApi> {

        let result = new RespostaApi;
        try{

            const userSchema = z.object({
                email: z.string(),
                userName: z.string(),
                senha: z.string(),
                id_departamento: z.string()
            })
            

            const userInfo = userSchema.parse(request.body)
            const { data } = await this.departamentoService.getDepartamento({id: parseInt(userInfo.id_departamento)})
            const dpto = new Departamento(data.id_departamento, data.nome_departamento);
            result.data = await this.usuarioService.registrarUsuario(new Usuario(null, userInfo.userName, userInfo.email, userInfo.senha, dpto))
    
    
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error
            return result;
        }
    }

    public async Login(request: FastifyRequest) {
        try {
            const loginSchema = z.object({
                email: z.string(),
                senha: z.string()
            })

            const loginInfo = loginSchema.parse(request.body)
            const result = await this.usuarioService.login(loginInfo.email, loginInfo.senha)
            if (result.sucesso) {
                const token = this.app.jwt.sign({
                    name: result.data.userName,
                    departamento: result.data.id_departamento
                }, {
                    sub: result.data.id.toString(),
                    expiresIn: '30 days'
                })
                result.data = token;
                return result
            }

            return result;
        } catch (error) {
            console.log(error)
            return error
        }
    }

}

