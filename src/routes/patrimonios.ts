import { FastifyInstance, FastifyRequest } from 'fastify'
import { patrimonioController } from '../controller/patrimonioController';
import RespostaApi from '../model/respostaApi';


export async function patrimonioRoutes(app: FastifyInstance) {
  const patController = new patrimonioController()
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  app.get('/patrimonios', async (request) => {
    const result: RespostaApi = await patController.ListagemPatrimonios(request);
    return result;
  })

  app.get('/patrimonio/:id', async (request, reply) => {
    const result: RespostaApi = await patController.ResgatarPatrimonio(request);
    return result
  })

  app.post('/patrimonio', async (request) => {
    const result: RespostaApi = await patController.CadastrarPatrimonio(request);
    return result
  })

  app.put('/patrimonio/:id', async (request, reply) => {
    const result: RespostaApi = await patController.AtualizarPatrimonio(request);
    return result
  })

  app.delete('/patrimonio/:id', async (request, reply) => {
    const result: RespostaApi = await patController.DeletarPatrimonio(request);
    return result
  })
}