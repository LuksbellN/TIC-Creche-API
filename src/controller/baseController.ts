import { FastifyRequest } from "fastify";
import { z } from "zod";

export default class BaseController {



    protected listaDepartamentos(): {[key: number]: string} {
        return {
            1: "cozinha",
            2: "escritorio",
            3: "sala de aula"
        }
    }

    protected resgatarFiltroPat(request: FastifyRequest): any {
        const querySchema = z.object({
            tipo: z.union([z.string(), z.undefined()]),
            categoria: z.union([z.string(), z.undefined()]),
            departamento: z.union([z.string(), z.undefined()]),
            data_inicio: z.union([z.string(), z.undefined()]),
            data_fim: z.union([z.string(), z.undefined()]),
            consulta: z.union([z.string(), z.undefined()])
          });
        
        const { tipo, categoria, departamento, data_inicio, data_fim, consulta } = querySchema.parse(request.query)

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
}