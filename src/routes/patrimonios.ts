import { FastifyInstance, FastifyRequest } from 'fastify'
import { patController } from '../controller/patrimonioController';
import RespostaApi from '../model/respostaApi';


export async function patrimonioRoutes(app: FastifyInstance) {
  const patrimonioController = patController

  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de patrimônios conforme filtros
  app.get('/api/patrimonio', async (request, reply) => {
    const result: RespostaApi = await patrimonioController.ListagemPatrimonios(request);
    reply.send(result)
  })

  // Resgatar Patrimônio pelo ID
  app.get('/api/patrimonio/:id', async (request, reply) => {
    const result: RespostaApi = await patrimonioController.ResgatarPatrimonio(request);
    reply.send(result)
  })

  // Criar Patrimônio
  app.post('/api/patrimonio', async (request, reply) => {
    const result: RespostaApi = await patrimonioController.CadastrarPatrimonio(request);
    reply.send(result)
  })

  // Atualizar N campos de um patrimônio
  app.put('/api/patrimonio/:id', async (request, reply) => {
    const result: RespostaApi = await patrimonioController.AtualizarPatrimonio(request);
    reply.send(result)
  })

  // Deletar Patrimônio
  app.delete('/api/patrimonio/:id', async (request, reply) => {
    const result: RespostaApi = await patrimonioController.DeletarPatrimonio(request);
    reply.send(result)
  })
}