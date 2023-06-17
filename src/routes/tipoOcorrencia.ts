import { FastifyInstance } from 'fastify'
import { tipoOcorrController } from '../controller/tipoOcorrenciaController';
import RespostaApi from '../model/respostaApi';


export async function tipoOcorrenciaRoutes(app: FastifyInstance) {
  const tipoOcorrenciaController = tipoOcorrController;
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de tipos de ocorrencias conforme filtros
  app.get('/api/ocorrenciatipo', async (request, reply) => {
    const result: RespostaApi = await tipoOcorrenciaController.ListagemTipoOcorrencia(request);
    reply.send(result)
  })

  // Resgatar tipo ocorrencia pelo ID
  app.get('/api/ocorrenciatipo/:id', async (request, reply) => {
    const result: RespostaApi = await tipoOcorrenciaController.ResgatarTipoOcorrencia(request);
    reply.send(result)
  })

  // Criar tipo ocorrencia
  app.post('/api/ocorrenciatipo', async (request, reply) => {
    const result: RespostaApi = await tipoOcorrenciaController.CadastrarTipoOcorrencia(request);
    reply.send(result)
  })

  // Atualizar N campos de um tipo ocorrencia
  app.patch('/api/ocorrenciatipo/:id', async (request, reply) => {
    const result: RespostaApi = await tipoOcorrenciaController.AtualizarTipoOcorrencia(request);
    reply.send(result)
  })
}