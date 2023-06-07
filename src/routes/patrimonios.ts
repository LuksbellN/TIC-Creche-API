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

  app.get('/patrimonio', async (request, reply) => {
    console.log('ole')
  })

  app.post('/memories', async (request) => {
  })

  app.put('/memories/:id', async (request, reply) => {
  })

  app.delete('/memories/:id', async (request, reply) => {
  })
}