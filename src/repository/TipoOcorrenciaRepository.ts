import { ITipoOcorrenciaRepository } from "../interfaces/repositories/ITipoOcorrenciaRepository";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";

export class TipoOcorrenciaRepository implements ITipoOcorrenciaRepository {

    //TODO: Implementar conexão e acessar banco de dados
    public async getTipoOcorrencia(filtro: { id: number }): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try {
            const result = await prisma.tiposOcorrencia.findUnique({
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

    public async getTipoOcorrencias(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;
        const atributoOrdenacao = filtro.ordenacao[0];
        const ordem = filtro.ordenacao[1];

        try {
            const result = await prisma.tiposOcorrencia.findMany({
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

    public async createTipoOcorrencia(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try {
            const result = await prisma.tiposOcorrencia.create({
                data: {
                    nome: filtro.nome
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

    public async updateTipoOcorrencia(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try {
            const result = await prisma.tiposOcorrencia.update({
                where: {
                    id: filtro.id
                },
                data: {
                    nome: filtro.nome,
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

export const tipoOcorrRepository = new TipoOcorrenciaRepository();