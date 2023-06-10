import { FastifyInstance } from 'fastify'
import { OcorrenciaController } from '../controller/ocorrenciaController';
import RespostaApi from '../model/respostaApi';


export async function OcorrenciaRoutes(app: FastifyInstance) {
  const ocorrController = new OcorrenciaController()
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de os de ocorrencias conforme filtros
  app.get('/ocorrencia', async (request, reply) => {
    const result: RespostaApi = await ocorrController.ListagemOcorrencia(request);
    reply.send(result)
  })

  // Resgatar o ocorrencia pelo ID
  app.get('/ocorrencia/:id', async (request, reply) => {
    const result: RespostaApi = await ocorrController.ResgatarOcorrencia(request);
    reply.send(result)
  })

  // Criar o ocorrencia
  app.post('/ocorrencia', async (request, reply) => {
    const result: RespostaApi = await ocorrController.CadastrarOcorrencia(request);
    reply.send(result)
  })

  // Atualizar N campos de um o ocorrencia
  app.patch('/ocorrencia/:id', async (request, reply) => {
    const result: RespostaApi = await ocorrController.AtualizarOcorrencia(request);
    reply.send(result)
  })
}