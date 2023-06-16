import { IUsuarioRepository } from "../interfaces/repositories/IUsuarioRepository";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";

export class UsuarioRepository implements IUsuarioRepository {
    
    
    public async getUsuarios(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;
        const atributoOrdenacao = filtro.ordenacao[0];
        const ordem = filtro.ordenacao[1];

        try {
            const result = await prisma.usuario.findMany({
                where: {
                    userName: filtro.consulta ? {
                        contains: filtro.consulta
                    } : undefined
                },
                orderBy: {
                  [atributoOrdenacao]: ordem,
                },
              });

            resp.data = result;
            resp.sucesso = true;
            return resp;
        } catch (error) {
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }
    
    
    async getUsuarioById(filtro: { id: number; }): Promise<RespostaApi> {
        let resp = new RespostaApi();
        try {
            let user = await prisma.usuario.findUnique({
                where: {
                    id: filtro.id
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



    async createUser(filtro: any): Promise<any> {
        let resp = new RespostaApi();

        try {
            
            let usuario = await prisma.usuario.create({
                data: {
                    userName: filtro.userName,
                    email: filtro.email,
                    senha: filtro.senha,
                    id_departamento: filtro.id_departamento
                }
            })
            resp.data = usuario;
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

export const userRepository = new UsuarioRepository();