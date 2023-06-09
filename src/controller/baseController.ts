import { FastifyRequest } from "fastify";
import { z } from "zod";

export default class BaseController {



  protected listaDepartamentos(): { [key: number]: string } {
    return {
      1: "cozinha",
      2: "escritorio",
      3: "sala de aula"
    }
  }

  // Resgata o payload de patrimonio da query
  protected resgatarPatrimonioQuery(request: FastifyRequest): any {
    const querySchema = z.object({
      tipo: z.union([z.string(), z.undefined()]),
      categoria: z.union([z.string(), z.undefined()]),
      departamento: z.union([z.string(), z.undefined()]),
      data_inicio: z.union([z.string(), z.undefined()]),
      data_fim: z.union([z.string(), z.undefined()]),
      ordenacao: z.union([z.string(), z.undefined()]),
      consulta: z.union([z.string(), z.undefined()])
    });

    const { 
      tipo, 
      categoria, 
      departamento, 
      data_inicio, 
      data_fim, 
      ordenacao,
      consulta } = querySchema.parse(request.query)

    let filtro: any = {};

    if (tipo) {
      filtro.tipo = tipo.split('-');
    } else {
      filtro.tipo = []
    }

    if (categoria) {
      filtro.categoria = Number(categoria);
    }

    if (departamento) {
      filtro.departamento = Number(departamento);
    }

    if (data_inicio) {
      filtro.data_inicio = new Date(Date.parse(data_inicio));
    }

    if (data_fim) {
      filtro.data_fim = new Date(Date.parse(data_fim));
    }


    // &ordenacao=nome-asc ou &ordenacao=estado-desc ou ....
    if (ordenacao) {
      filtro.ordenacao = ordenacao.split('-');
    } else {
      filtro.ordenacao = [];
    }

    if (consulta) {
      filtro.consulta = consulta;
    }

    return filtro;
  }

  // Resgata payload de categoria da query
  protected resgatarCategoriaQuery(request: FastifyRequest): any {
    const querySchema = z.object({
      ordenacao: z.union([z.string(), z.undefined()]),
      consulta: z.union([z.string(), z.undefined()])
    });

    const { 
      ordenacao,
      consulta } = querySchema.parse(request.query)

    let filtro: any = {};

    // &ordenacao=nome-asc ou &ordenacao=estado-desc ou ....
    if (ordenacao) {
      filtro.ordenacao = ordenacao.split('-');
    }

    if (consulta) {
      filtro.consulta = consulta;
    }

    return filtro;
  }

  // Resgata payload id dos params
  protected resgatarIdParam(request: FastifyRequest): {id: number}{
    const patSchema = z.object({
      id: z.string()
    })
    const { id } = patSchema.parse(request.params)
    
    return {
      id: parseInt(id)
    }
  }

  // Resgata o payload de patrimonio do body
  protected resgatarPatrimonioBody(request: FastifyRequest): any {
    const patSchema = z.object({
      tipo: z.union([z.string(), z.undefined()]),
      nome: z.union([z.string(), z.undefined()]),
      id_fornecedor: z.union([z.string(), z.undefined()]),
      id_categoria: z.union([z.string(), z.undefined()]),
      id_departamento: z.union([z.string(), z.undefined()]),
      data_aquisicao: z.union([z.string(), z.undefined()]),
      estado: z.union([z.string(), z.undefined()]),
      imagem_url: z.union([z.string(), z.undefined()]),
      valor: z.union([z.string(), z.undefined()]),
      placa: z.union([z.string(), z.undefined()]),
      nome_doador: z.union([z.string(), z.undefined()]),
      telefone: z.union([z.string(), z.undefined()]),
      id_pat_prefeitura: z.union([z.string(), z.undefined()]),
      id_pat_adquirido: z.union([z.string(), z.undefined()]),
      id_pat_doacao: z.union([z.string(), z.undefined()])
    });


    const filtroPat = patSchema.parse(request.body)

    let filtro: any = {};

    if (filtroPat.tipo) {
      filtro.tipo = filtroPat.tipo
    }

    if (filtroPat.nome) {
      filtro.nome = filtroPat.nome
    }

    if (filtroPat.id_categoria) {
      filtro.id_categoria = Number(filtroPat.id_categoria);
    }

    if (filtroPat.id_fornecedor) {
      filtro.id_fornecedor = Number(filtroPat.id_fornecedor);
    }

    if (filtroPat.id_departamento) {
      filtro.id_departamento = Number(filtroPat.id_departamento);
    }

    if (filtroPat.data_aquisicao) {
      filtro.data_aquisicao = new Date(Date.parse(filtroPat.data_aquisicao));
    }
    if (filtroPat.estado) {
      filtro.estado = Number(filtroPat.estado);
    }
    if (filtroPat.imagem_url) {
      filtro.imagem_url = filtroPat.imagem_url;
    }
    if (filtroPat.valor) {
      filtro.valor = Number(filtroPat.valor);
    }
    if (filtroPat.placa) {
      filtro.placa = filtroPat.placa;
    }
    if (filtroPat.nome_doador) {
      filtro.nome_doador = filtroPat.nome_doador;
    }
    if (filtroPat.telefone) {
      filtro.telefone = filtroPat.telefone;
    }

    if (filtroPat.id_pat_prefeitura) {
      filtro.id_pat_prefeitura = Number(filtroPat.id_pat_prefeitura);
    }
    if (filtroPat.id_pat_adquirido) {
      filtro.id_pat_adquirido = Number(filtroPat.id_pat_adquirido);
    }
    if (filtroPat.id_pat_doacao) {
      filtro.id_pat_doacao = Number(filtroPat.id_pat_doacao);
    }

    return filtro;

  }

  // Resgata payload de Categoria do body
  protected resgatarCategoriaBody(request: FastifyRequest): any {
    const patSchema = z.object({
      nome_categoria: z.union([z.string(), z.undefined()])
    });


    const { nome_categoria } = patSchema.parse(request.body)

    let filtro: any = {};

    if (nome_categoria) {
      filtro.nome_categoria = nome_categoria
    }

    return filtro;
  }

  // Resgata arquivo upload
  protected async resgatarArquivoUpload(request: FastifyRequest){
    return await request.file({
      limits:{
          fileSize: 5_242_880, //5mb
      }
  })
  }
}