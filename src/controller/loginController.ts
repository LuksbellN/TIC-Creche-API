import { FastifyInstance, FastifyRequest } from "fastify";
import { IUsuarioService } from "../interfaces/services/IUsuarioService";
import { userService } from "../service/UsuarioService";
import { z } from "zod";
import BaseController from "./baseController";
import { FastifyJWT } from '@fastify/jwt';
import RespostaApi from "../model/respostaApi";


export class LoginController extends BaseController {

  private usuarioService: IUsuarioService
  private readonly app: FastifyInstance

  constructor(app: FastifyInstance) {
    super();
    this.app = app;
    this.usuarioService = userService
  }

  public async Login(request: FastifyRequest): Promise<RespostaApi> {
    let resp = new RespostaApi();
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
          expiresIn: '14 days'
        })
        result.data = token;
        return result
      }
      result.sucesso = false;
      return result;
    } catch (error) {
      resp.error = error;
      resp.sucesso = false;
      return resp;
    }
  }
}
