import { IPatrimonioRepository } from "../interfaces/repositories/IPatrimonioRepository";
import { Patrimonio } from "../model/patrimonio";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";

export class PatrimonioRepository implements IPatrimonioRepository {

  constructor() {

  }
  async getPatrimonios(filtro: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    const tipoPref = filtro.tipo.includes('pref');
    const tipoDoa = filtro.tipo.includes('doa');
    const tipoAdq = filtro.tipo.includes('adq');
    const consulta = filtro.consulta;

    try {

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
      resp.data = result;
      resp.sucesso = true;
      return resp;
    } catch (error) {
      resp.sucesso = false;
      resp.error = error;
      return resp
    }
  }


  //TODO: Implementar conexão e acessar banco de dados
  getPatrimonio(id: number): Patrimonio {
    throw new Error("Method not implemented.");
  }

}