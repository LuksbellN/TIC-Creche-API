import { IOcorrenciaRepository } from "../interfaces/repositories/IOcorrenciaRepository";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";

export class OcorrenciaRepository implements IOcorrenciaRepository {

    //TODO: Implementar conexão e acessar banco de dados
    public async getOcorrencia(filtro: { id: number }): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try {
            const result = await prisma.ocorrencia.findUnique({
                where: {
                    id: filtro.id
                }
            })

            resp.data = result;
            resp.sucesso = true;
            return resp;
        } catch (error) {
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }

    public async getOcorrencias(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;
        const atributoOrdenacao = filtro.ordenacao[0];
        const ordem = filtro.ordenacao[1];

        try {
            const result = await prisma.ocorrencia.findMany({
                where: {
                    nome: filtro.consulta ? {
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
        } catch (error) {
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }

    public async createOcorrencia(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try {
            const result = await prisma.ocorrencia.create({
                data: {
                    nome: filtro.nome,
                    id_tipo_ocorrencia: filtro.id_tipo_ocorrencia
                }
            })

            resp.data = result;
            resp.sucesso = true;
            return resp;
        } catch (error) {
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }

    public async updateOcorrencia(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try {
            const result = await prisma.ocorrencia.update({
                where: {
                    id: filtro.id,
                },
                data: {
                    nome: filtro.nome,
                    id_tipo_ocorrencia: filtro.id_tipo_ocorrencia
                }
            })

            resp.data = result;
            resp.sucesso = true;
            return resp;

        } catch (error) {
            resp.sucesso = false;
            resp.error = error;
            return resp
        }
    }



}