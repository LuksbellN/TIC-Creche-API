import { FastifyInstance } from 'fastify'
import { ocorrController } from '../controller/ocorrenciaController';
import RespostaApi from '../model/respostaApi';


export async function OcorrenciaRoutes(app: FastifyInstance) {
  const ocorrenciaController = ocorrController;
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de os de ocorrencias conforme filtros
  app.get('/api/ocorrencia', async (request, reply) => {
    const result: RespostaApi = await ocorrenciaController.ListagemOcorrencia(request);
    reply.send(result)
  })

  // Resgatar o ocorrencia pelo ID
  app.get('/api/ocorrencia/:id', async (request, reply) => {
    const result: RespostaApi = await ocorrenciaController.ResgatarOcorrencia(request);
    reply.send(result)
  })

  // Criar o ocorrencia
  app.post('/api/ocorrencia', async (request, reply) => {
    const result: RespostaApi = await ocorrenciaController.CadastrarOcorrencia(request);
    reply.send(result)
  })

  // Atualizar N campos de um o ocorrencia
  app.patch('/api/ocorrencia/:id', async (request, reply) => {
    const result: RespostaApi = await ocorrenciaController.AtualizarOcorrencia(request);
    reply.send(result)
  })
}