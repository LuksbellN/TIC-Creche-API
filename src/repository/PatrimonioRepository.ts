import { IPatrimonioRepository } from "../interfaces/repositories/IPatrimonioRepository";
import { prisma } from "../lib/prisma";
import RespostaApi from "../model/respostaApi";


export class PatrimonioRepository implements IPatrimonioRepository {

  private readonly sqlpadrao: string = "SELECT * FROM Patrimonio";

  constructor() {

  }

  public async createPatrimonio(filtroPat: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {

      let patrimonio = await prisma.patrimonio.create({
        data: {
          nome: filtroPat.nome,
          data_aquisicao: filtroPat.data_aquisicao,
          estado: filtroPat.estado,
          id_departamento: filtroPat.id_departamento,
          id_categoria: filtroPat.id_categoria,
          id_fornecedor: filtroPat.id_fornecedor,
          imagem_url: filtroPat.imagem_url ?? '',
        }
      })

      filtroPat.id = patrimonio.id;
      let res = new RespostaApi;
      if (filtroPat.tipo === "pref") {
        res = await this.addPatPrefeitura(filtroPat)
      } else if (filtroPat.tipo === "adq") {
        res = await this.addPatAdquirido(filtroPat)
      } else if (filtroPat.tipo === "doa") {
        res = await this.addPatDoacao(filtroPat)
      }


      resp.data = {
        ...patrimonio,
        patTipo: { ...res }
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
          // data_aquisicao: {
          //   gte: filtro.data_inicio ? filtro.data_inicio : undefined,
          //   lte: filtro.data_fim ? new filtro.data_fim : undefined
          // },
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
      const result = await prisma.patrimonio.findUnique({
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

      let respAux: any = {}

      if (result) {
        if (result.PatrimoniosAdquirido?.length > 0) {
          respAux.valor = result.PatrimoniosAdquirido[0]?.valor
        } else if(result.PatrimoniosPref?.length > 0) {
          respAux.valor = result.PatrimoniosPref[0]?.valor
          respAux.placa = result.PatrimoniosPref[0]?.placa
        } else if(result.PatrimoniosDoacao?.length > 0) {
          respAux.nome_doador = result.PatrimoniosDoacao[0]?.nome_doador
          respAux.telefone = result.PatrimoniosDoacao[0]?.telefone
        }

      }

      resp.data = {
        ...result,
        ...respAux
      };
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
      const pat = await this.getPatrimonio({ id: filtroPat.id });
      const patrimonio = await prisma.patrimonio.update({
        where: {
          id: filtroPat.id
        },
        data: {
          nome: filtroPat.nome,
          data_aquisicao: filtroPat.data_aquisicao,
          estado: filtroPat.estado,
          id_departamento: filtroPat.id_departamento,
          id_categoria: filtroPat.id_categoria,
          id_fornecedor: filtroPat.id_fornecedor,
          imagem_url: filtroPat.imagem_url ?? ''
        }
      });

      let res = new RespostaApi();

      if (filtroPat.tipo === "pref") {
        const campos = {
          valor: filtroPat.valor,
          placa: filtroPat.placa
        };
        res = await this.updatePatPrefeitura(pat.data.PatrimoniosPref[0].id_pat_prefeitura, campos);
      } else if (filtroPat.tipo === "adq") {

        res = await this.updatePatAdquirido(pat.data.PatrimoniosAdquirido[0].id_pat_adquirido, filtroPat.valor);
      } else if (filtroPat.tipo === "doa") {
        const campos = {
          nome_doador: filtroPat.nome_doador,
          telefon: filtroPat.telefone
        };
        res = await this.updatePatDoacao(pat.data.PatrimoniosDoacao[0].id_pat_doacao, campos);
      }


      resp.data = {
        tipo: filtroPat.tipo,
        nome: patrimonio.nome,
        data_aquisicao: patrimonio.data_aquisicao,
        imagem_url: patrimonio.imagem_url,
        id_departamento: patrimonio.id_departamento,
        id_categoria: patrimonio.id_categoria,
        id_fornecedor: patrimonio.id_fornecedor,
        estado: patrimonio.estado,
        ...res.data
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
      if (pat.data.PatrimoniosPref?.length > 0) {
        await prisma.pat_prefeitura.delete({
          where: {
            id_patrimonio: pat.data.id
          }
        })
      } else if (pat.data.PatrimoniosAdquirido?.length > 0) {
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

      const patrimonioDoa = await prisma.pat_doacao.create({
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
      resp.sucesso = false;
      resp.error = error;
      return resp;
    }
  }

  private async updatePatPrefeitura(idPatPrefeitura: number, campos: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {
      let patrimonioPref = await prisma.pat_prefeitura.update({
        where: {
          id_pat_prefeitura: idPatPrefeitura
        },
        data: campos
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

  private async updatePatAdquirido(idPatAdq: number, valor: number): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {
      let patrimonioAdq = await prisma.pat_adquirido.update({
        where: {
          id_pat_adquirido: idPatAdq
        },
        data: {
          valor: valor
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
  private async updatePatDoacao(idPatDoacao: number, campos: any): Promise<RespostaApi> {
    let resp = new RespostaApi();

    try {

      let patrimonioDoa = await prisma.pat_doacao.update({
        where: {
          id_pat_doacao: idPatDoacao
        },
        data: campos
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


export const patRepository = new PatrimonioRepository();