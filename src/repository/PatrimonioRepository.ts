import { IPatrimonioRepository } from "../interfaces/repositories/IPatrimonioRepository";
import { Patrimonio } from "../model/patrimonio";
import { prisma } from "../lib/prisma";

export class PatrimonioRepository implements IPatrimonioRepository {

    constructor() {

    }
    async getPatrimonios(filtro: any): Promise<any[]> {
        const tipoPref = filtro.tipo.includes('pref');
        const tipoDoa = filtro.tipo.includes('doa');
        const tipoAdq = filtro.tipo.includes('adq');
        const consulta = filtro.consulta;
        console.log(tipoPref)
        console.log(tipoDoa)
        console.log(tipoAdq)
        console.log(consulta)

        const result = await prisma.patrimonio.findMany({
            where: {
                id_categoria: filtro.categoria,
                id_departamento: filtro.departamento,
                dataAquisicao: {
                  gte: filtro.data_inicio ? new Date(filtro.data_inicio) : undefined,
                  lte: filtro.data_fim ? new Date(filtro.data_fim) : undefined
                },
                OR: [
                  ...(tipoPref ? [
                    {
                      PatrimoniosPref: {
                        some: {}
                      }
                    }
                  ] : []),
                  ...(tipoDoa ? [
                    {
                      PatrimoniosDoacao: {
                        some: {}
                      }
                    }
                  ] : []),
                  ...(tipoAdq ? [
                    {
                      PatrimoniosAdquirido: {
                        some: {}
                      }
                    }
                  ] : [])
                ],
                nome: consulta ? {
                  contains: consulta
                } : undefined
              },
            include: {
                departamento: true,
                categoria: true,
                fornecedor: true,
                ...(tipoPref ? {
                    PatrimoniosPref: true
                } : {}),
                ...(tipoDoa ? {
                    PatrimoniosDoacao: true
                } : {}),
                ...(tipoAdq ? {
                    PatrimoniosAdquirido: true
                } : {})
            },
            orderBy: {
                dataAquisicao: 'desc'
            }
        });

        return result;
    }


    //TODO: Implementar conexão e acessar banco de dados
    getPatrimonio(id: number): Patrimonio {
        throw new Error("Method not implemented.");
    }

}