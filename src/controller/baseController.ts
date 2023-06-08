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

  // Resgata o payload da query
  protected resgatarPatrimonioQuery(request: FastifyRequest): any {
    const querySchema = z.object({
      tipo: z.union([z.string(), z.undefined()]),
      categoria: z.union([z.string(), z.undefined()]),
      departamento: z.union([z.string(), z.undefined()]),
      data_inicio: z.union([z.string(), z.undefined()]),
      data_fim: z.union([z.string(), z.undefined()]),
      consulta: z.union([z.string(), z.undefined()])
    });

    const { 
      tipo, 
      categoria, 
      departamento, 
      data_inicio, 
      data_fim, 
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

    if (consulta) {
      filtro.consulta = consulta;
    }

    return filtro;
    // return {
    //     tipo: tipo ? tipo.split('-') : [],
    //     categoria: categoria ? parseInt(categoria) : 0,
    //     departamento: departamento ? parseInt(departamento) : 0,
    //     data_inicio:  new Date(Date.parse(data_inicio)),
    //     data_fim: new Date(Date.parse(data_fim))
    // }

  }

  // Resgata payload id dos params
  protected resgatarPatrimonioParam(request: FastifyRequest): {id: number}{
    const patSchema = z.object({
      id: z.string()
    })
    const { id } = patSchema.parse(request.params)
    
    return {
      id: parseInt(id)
    }
  }

  // Resgata o payload do body
  protected resgatarPatrimonioBody(request: FastifyRequest): any {
    const patSchema = z.object({
      tipo: z.union([z.string(), z.undefined()]),
      nome: z.union([z.string(), z.undefined()]),
      id_fornecedor: z.union([z.string(), z.undefined()]),
      id_categoria: z.union([z.string(), z.undefined()]),
      id_departamento: z.union([z.string(), z.undefined()]),
      dataAquisicao: z.union([z.string(), z.undefined()]),
      estado: z.union([z.string(), z.undefined()]),
      imagem_url: z.union([z.string(), z.undefined()]),
      valor: z.union([z.string(), z.undefined()]),
      placa: z.union([z.string(), z.undefined()]),
      nomeDoador: z.union([z.string(), z.undefined()]),
      telefone: z.union([z.string(), z.undefined()]),
      id_pat_prefeitura: z.union([z.string(), z.undefined()]),
      id_pat_adquirido: z.union([z.string(), z.undefined()]),
      id_pat_doacao: z.union([z.string(), z.undefined()])
    });


    const {
      tipo,
      nome,
      id_fornecedor,
      id_categoria,
      id_departamento,
      dataAquisicao,
      estado,
      imagem_url,
      valor,
      placa,
      nomeDoador,
      telefone,
      id_pat_prefeitura,
      id_pat_adquirido,
      id_pat_doacao } = patSchema.parse(request.body)

    let filtro: any = {};

    if (tipo) {
      filtro.tipo = tipo
    }

    if (nome) {
      filtro.nome = nome
    }

    if (id_categoria) {
      filtro.id_categoria = Number(id_categoria);
    }

    if (id_fornecedor) {
      filtro.id_fornecedor = Number(id_fornecedor);
    }

    if (id_departamento) {
      filtro.id_departamento = Number(id_departamento);
    }

    if (dataAquisicao) {
      filtro.dataAquisicao = new Date(Date.parse(dataAquisicao));
    }
    if (estado) {
      filtro.estado = Number(estado);
    }
    if (imagem_url) {
      filtro.imagem_url = imagem_url;
    }
    if (valor) {
      filtro.valor = Number(valor);
    }
    if (placa) {
      filtro.placa = placa;
    }
    if (nomeDoador) {
      filtro.nomeDoador = nomeDoador;
    }
    if (telefone) {
      filtro.telefone = telefone;
    }

    if (id_pat_prefeitura) {
      filtro.id_pat_prefeitura = Number(id_pat_prefeitura);
    }
    if (id_pat_adquirido) {
      filtro.id_pat_adquirido = Number(id_pat_adquirido);
    }
    if (id_pat_doacao) {
      filtro.id_pat_doacao = Number(id_pat_doacao);
    }

    return filtro;

  }
}