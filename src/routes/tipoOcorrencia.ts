import { FastifyInstance } from 'fastify'
import { TipoOcorrenciaController } from '../controller/tipoOcorrenciaController';
import RespostaApi from '../model/respostaApi';


export async function tipoOcorrenciaRoutes(app: FastifyInstance) {
  const fornController = new TipoOcorrenciaController()
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de tipos de ocorrencias conforme filtros
  app.get('/ocorrenciatipo', async (request, reply) => {
    const result: RespostaApi = await fornController.ListagemTipoOcorrencia(request);
    reply.send(result)
  })

  // Resgatar tipo ocorrencia pelo ID
  app.get('/ocorrenciatipo/:id', async (request, reply) => {
    const result: RespostaApi = await fornController.ResgatarTipoOcorrencia(request);
    reply.send(result)
  })

  // Criar tipo ocorrencia
  app.post('/ocorrenciatipo', async (request, reply) => {
    const result: RespostaApi = await fornController.CadastrarTipoOcorrencia(request);
    reply.send(result)
  })

  // Atualizar N campos de um tipo ocorrencia
  app.patch('/ocorrenciatipo/:id', async (request, reply) => {
    const result: RespostaApi = await fornController.AtualizarTipoOcorrencia(request);
    reply.send(result)
  })


}