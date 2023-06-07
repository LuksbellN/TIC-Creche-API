import { FastifyInstance, FastifyRequest } from "fastify";
import { IUsuarioService } from "../interfaces/services/IUsuarioService";
import { UsuarioService } from "../service/UsuarioService";
import { z } from "zod";
import { Usuario } from "../model/usuario";
import { Departamento } from "../model/departamento";
import BaseController from "./baseController";

export class LoginController extends BaseController {

    private usuarioService: IUsuarioService
    private readonly app: FastifyInstance

    constructor(app: FastifyInstance) {
        super();
        this.app = app;
        this.usuarioService = new UsuarioService()
    }

    public async Registrar(request: FastifyRequest) {

        try{

            const userSchema = z.object({
                email: z.string(),
                userName: z.string(),
                senha: z.string(),
                id_departamento: z.string()
            })
    
            const userInfo = userSchema.parse(request.body)
            const dpto = new Departamento(parseInt(userInfo.id_departamento), super.listaDepartamentos()[parseInt(userInfo.id_departamento)])
            const result = await this.usuarioService.registrarUsuario(new Usuario(null, userInfo.userName, userInfo.email, userInfo.senha, dpto))
    
    
            return result;
        } catch(error) {
            console.log(error)
            return error
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

