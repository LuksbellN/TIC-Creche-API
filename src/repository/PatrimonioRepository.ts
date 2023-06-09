import { IPatrimonioRepository } from "../interfaces/repositories/IPatrimonioRepository";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";

export class PatrimonioRepository implements IPatrimonioRepository {

  constructor() {

  }

  public async createPatrimonio(filtroPat: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {

      let patrimonio = await prisma.patrimonio.create({
        data: {
          nome: filtroPat.nome,
          dataAquisicao: filtroPat.dataAquisicao,
          estado: filtroPat.estado,
          id_departamento: filtroPat.id_departamento,
          id_categoria: filtroPat.id_categoria,
          id_fornecedor: filtroPat.id_fornecedor,
          imagem_url: filtroPat.imagem_url ?? '',
        }
      })

      filtroPat.id = patrimonio.id;
      let res = {}

      if (filtroPat.tipo === "pref") {
        res = await this.addPatPrefeitura(filtroPat)
      } else if (filtroPat.tipo === "adq") {
        res = await this.addPatAdquirido(filtroPat)
      } else if (filtroPat.tipo === "dpa") {
        res = await this.addPatDoacao(filtroPat)
      }


      resp.data = {
        id: patrimonio.id,
        tipo: filtroPat.tipo,
        nome: patrimonio.nome,
        dataAquisicao: patrimonio.dataAquisicao,
        imagem_url: patrimonio.imagem_url,
        id_departamento: patrimonio.id_departamento,
        id_categoria: patrimonio.id_categoria,
        id_fornecedor: patrimonio.id_fornecedor,
        estado: patrimonio.estado,
        ...res
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

  public async getPatrimonios(filtro: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    const tipoPref = filtro.tipo.includes('pref');
    const tipoDoa = filtro.tipo.includes('doa');
    const tipoAdq = filtro.tipo.includes('adq');
    const consulta = filtro.consulta;
    const atributoOrdenacao = filtro.ordenacao[0];
    const ordem = filtro.ordenacao[1];

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
          [atributoOrdenacao]: ordem
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


  public async getPatrimonio(filtro: { id: number }): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {
      const result = await prisma.patrimonio.findUniqueOrThrow({
        where: {
          id: filtro.id
        },
        include: {
          PatrimoniosAdquirido: true,
          PatrimoniosDoacao: true,
          PatrimoniosPref: true,
          Patrimonio_ocorrencias: true
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

  public async updatePatrimonio(filtroPat: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {
      
      let patrimonio = await prisma.patrimonio.update({
        where: {
          id: filtroPat.id
        },
        data: {
          nome: filtroPat.nome,
          dataAquisicao: filtroPat.dataAquisicao,
          estado: filtroPat.estado,
          id_departamento: filtroPat.id_departamento,
          id_categoria: filtroPat.id_categoria,
          id_fornecedor: filtroPat.id_fornecedor,
          imagem_url: filtroPat.imagem_url ?? '',
        }
      })

      let res = {}

      if (filtroPat.tipo === "pref") {
        res = await this.updatePatPrefeitura(filtroPat)
      } else if (filtroPat.tipo === "adq") {
        res = await this.updatePatAdquirido(filtroPat)
      } else if (filtroPat.tipo === "dpa") {
        res = await this.updatePatDoacao(filtroPat)
      }


      resp.data = {
        tipo: filtroPat.tipo,
        nome: patrimonio.nome,
        dataAquisicao: patrimonio.dataAquisicao,
        imagem_url: patrimonio.imagem_url,
        id_departamento: patrimonio.id_departamento,
        id_categoria: patrimonio.id_categoria,
        id_fornecedor: patrimonio.id_fornecedor,
        estado: patrimonio.estado,
        ...res
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

  public async deletePatrimonio(filtro: { id: number }): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {
      // Resgata os dados do patrimonio 
      const pat = await this.getPatrimonio(filtro);

      // Deleta as ocorrencias vinculadas a esse patrimonio
      await prisma.patrimonio_ocorrencia.deleteMany({
        where: {
          id_patrimonio: filtro.id
        }
      })

      // Deleta o patrimonio do tipo especificado
      if(pat.data.PatrimoniosPref?.length > 0) {
        await prisma.pat_prefeitura.delete({
          where: {
            id_patrimonio: pat.data.id
          }
        })
      } else if(pat.data.PatrimoniosAdquirido?.length > 0) {
        await prisma.pat_adquirido.delete({
          where: {
            id_patrimonio: pat.data.id
          }
        })
      } else {
        await prisma.pat_doacao.delete({
          where: {
            id_patrimonio: pat.data.id
          }
        })
      }

      // Deleta o patrimonio
      const result = await prisma.patrimonio.delete({
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

  public async addPatPrefeitura(filtroPat: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {

      let patrimonioPref = await prisma.pat_prefeitura.create({
        data: {
          id_patrimonio: filtroPat.id,
          valor: filtroPat.valor,
          placa: filtroPat.placa
        }
      })

      resp.data = {
        id_pat_prefeitura: patrimonioPref.id_pat_prefeitura,
        valor: patrimonioPref.valor,
        placa: patrimonioPref.placa
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

  public async addPatAdquirido(filtroPat: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {

      let patrimonioAdq = await prisma.pat_adquirido.create({
        data: {
          id_patrimonio: filtroPat.id,
          valor: filtroPat.valor
        }
      })

      resp.data = {
        id_pat_prefeitura: patrimonioAdq.id_pat_adquirido,
        valor: patrimonioAdq.valor
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
  public async addPatDoacao(filtroPat: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {

      let patrimonioDoa = await prisma.pat_doacao.create({
        data: {
          id_patrimonio: filtroPat.id,
          nome_doador: filtroPat.nome_doador,
          telefone: filtroPat.telefone
        }
      })

      resp.data = {
        id_pat_doacao: patrimonioDoa.id_pat_doacao,
        nome_doador: patrimonioDoa.nome_doador,
        placa: patrimonioDoa.telefone
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

  private async updatePatPrefeitura(filtroPat: any): Promise<RespostaApi>{
    let resp = new RespostaApi();

    try {

      let patrimonioPref = await prisma.pat_prefeitura.update({
        where: {
          id_pat_prefeitura: filtroPat.id_pat_prefeitura
        },
        data: {
          valor: filtroPat.valor,
          placa: filtroPat.placa
        }
      })

      resp.data = {
        valor: patrimonioPref.valor,
        placa: patrimonioPref.placa
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
  private async updatePatAdquirido(filtroPat: any): Promise<RespostaApi>{
    let resp = new RespostaApi();

    try {

      let patrimonioAdq = await prisma.pat_adquirido.update({
        where: {
          id_pat_adquirido: filtroPat.id_pat_adquirido
        },
        data: {
          valor: filtroPat.valor
        }
      })

      resp.data = {
        valor: patrimonioAdq.valor
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
  private async updatePatDoacao(filtroPat: any): Promise<RespostaApi>{
    let resp = new RespostaApi();

    try {

      let patrimonioDoa = await prisma.pat_doacao.update({
        where: {
          id_pat_doacao: filtroPat.id_pat_doacao
        },
        data: {
          nome_doador: filtroPat.nome_doador,
          telefone: filtroPat.telefone
        }
      })

      resp.data = {
        nome_doador: patrimonioDoa.nome_doador,
        telefone: patrimonioDoa.telefone
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
}