import { IDepartamentoRepository } from "../interfaces/repositories/IDepartamentoRepository";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";

export class DepartamentoRepository implements IDepartamentoRepository{

    //TODO: Implementar conexão e acessar banco de dados
    public async getDepartamento(filtro: {id: number}): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try{
            const result = await prisma.departamento.findUnique({
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

    public async getDepartamentos(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;
        const atributoOrdenacao = filtro.ordenacao[0];
        const ordem = filtro.ordenacao[1];

        try{
            const result = await prisma.departamento.findMany({
                where: {
                    nome_departamento: filtro.consulta ? {
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

    public async createDepartamento(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try{
            const result = await prisma.departamento.create({
                data: {
                    nome_departamento: filtro.nome_departamento 
                }
              })
        
              resp.data = result;
              resp.sucesso = true;
              return resp;
        } catch(error) {
            console.log(error)
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }

    public async updateDepartamento(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try{
            const result = await prisma.departamento.update({
                where: {
                    id: filtro.id
                },
                data: {
                    nome_departamento: filtro.nome_departamento 
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

export const depRepository = new DepartamentoRepository();