import { FastifyInstance, FastifyRequest } from 'fastify'
import { patrimonioController } from '../controller/patrimonioController';
import RespostaApi from '../model/respostaApi';


export async function patrimonioRoutes(app: FastifyInstance) {
  const patController = new patrimonioController()
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de patrimônios conforme filtros
  app.get('/patrimonio', async (request, reply) => {
    const result: RespostaApi = await patController.ListagemPatrimonios(request);
    reply.send(result)
  })

  // Resgatar Patrimônio pelo ID
  app.get('/patrimonio/:id', async (request, reply) => {
    const result: RespostaApi = await patController.ResgatarPatrimonio(request);
    reply.send(result)
  })

  // Criar Patrimônio
  app.post('/patrimonio', async (request, reply) => {
    const result: RespostaApi = await patController.CadastrarPatrimonio(request);
    reply.send(result)
  })

  // Atualizar N campos de um patrimônio
  app.patch('/patrimonio/:id', async (request, reply) => {
    const result: RespostaApi = await patController.AtualizarPatrimonio(request);
    reply.send(result)
  })

  // Deletar Patrimônio
  app.delete('/patrimonio/:id', async (request, reply) => {
    const result: RespostaApi = await patController.DeletarPatrimonio(request);
    reply.send(result)
  })
}