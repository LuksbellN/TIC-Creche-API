import { IUsuarioRepository } from "../interfaces/repositories/IUsuarioRepository";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";
import { Usuario } from "../model/usuario";

export class UsuarioRepository implements IUsuarioRepository {



    async createUser(user: Usuario): Promise<any> {
        let resp = new RespostaApi();

        try {
            
            let usuario = await prisma.usuario.create({
                data: {
                    userName: user.getUserName(),
                    email: user.getEmail(),
                    senha: user.getSenha(),
                    id_departamento: user.getIdDepartamento()
                }
            })
            resp.data = {
                name: usuario.userName,
                email: usuario.email,
                dpto: usuario.id_departamento
            };
            resp.sucesso = true;
            return resp;
        } catch (error) {
            resp.data = null;
            resp.sucesso = false;
            resp.error = error;
            return resp;
        }
    }


    async getUsuarioByEmail(email: string): Promise<any> {
        let resp = new RespostaApi();
        try {
            let user = await prisma.usuario.findUnique({
                where: {
                    email
                }
            })
            resp.data = user;
            resp.sucesso = true;
            return resp;
        } catch (error) {
            resp.data = null;
            resp.sucesso = false;
            resp.error = error;
            return resp;
        }
    }

    //TODO: Implementar conexão e acessar banco de dados
    async getUsuario(email: string, senha: string): Promise<RespostaApi> {
        let resp = new RespostaApi();
        try {
            let user = await prisma.usuario.findFirstOrThrow({
                where: {
                    email,
                    senha
                }
            })
            resp.data = user;
            resp.sucesso = true;
            return resp;
        } catch (error) {
            resp.data = null;
            resp.sucesso = false;
            resp.error = error;
            return resp;
        }
    }

}