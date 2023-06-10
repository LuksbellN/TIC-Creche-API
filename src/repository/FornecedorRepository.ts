import { IFornecedorRepository } from "../interfaces/repositories/IFornecedorRepository";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";

export class FornecedorRepository implements IFornecedorRepository {

    //TODO: Implementar conexão e acessar banco de dados
    public async getFornecedor(filtro: { id: number }): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try {
            const result = await prisma.fornecedor.findUniqueOrThrow({
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

    public async getFornecedors(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;
        const atributoOrdenacao = filtro.ordenacao[0];
        const ordem = filtro.ordenacao[1];

        try {
            const result = await prisma.fornecedor.findMany({
                where: {
                    nome_fornecedor: filtro.consulta ? {
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

    public async createFornecedor(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try {
            console.log(filtro)

            const result = await prisma.fornecedor.create({
                data: {
                    nome_fornecedor: filtro.nome_fornecedor,
                    documento: filtro.documento
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

    public async updateFornecedor(filtro: any): Promise<RespostaApi> {
        let resp = new RespostaApi;

        try {
            const result = await prisma.fornecedor.update({
                where: {
                    id: filtro.id
                },
                data: {
                    nome_fornecedor: filtro.nome_fornecedor,
                    documento: filtro.documento
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