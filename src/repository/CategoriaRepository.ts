import { ICategoriaRepository } from "../interfaces/repositories/ICategoriaRepository";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";

export class CategoriaRepository implements ICategoriaRepository{

    //TODO: Implementar conexão e acessar banco de dados
    public async getCategoria(filtro: {id: number}): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try{
            const result = await prisma.categoria.findUnique({
                where: {
                  id: filtro.id
                }
              })
        
              resp.data = result;
              resp.sucesso = true;
              return resp;
        } catch(error) {
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }

    public async getCategorias(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;
        const atributoOrdenacao = filtro.ordenacao[0];
        const ordem = filtro.ordenacao[1];

        try{
            const result = await prisma.categoria.findMany({
                where: {
                    nome_categoria: filtro.consulta ? {
                        contains: filtro.consulta
                      } : undefined
                },
                orderBy: {
                  [atributoOrdenacao]: ordem
                }
              })
        
              resp.data = result;
              resp.sucesso = true;
              return resp;
        } catch(error) {
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }

    public async createCategoria(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try{
            const result = await prisma.categoria.create({
                data: {
                    nome_categoria: filtro.nome_categoria 
                }
              })
        
              resp.data = result;
              resp.sucesso = true;
              return resp;
        } catch(error) {
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }

    public async updateCategoria(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try{
            const result = await prisma.categoria.update({
                where: {
                    id: filtro.id
                },
                data: {
                    nome_categoria: filtro.nome_categoria 
                }
              })
        
              resp.data = result;
              resp.sucesso = true;
              return resp;
        } catch(error) {
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }
}


export const catRepository = new CategoriaRepository();