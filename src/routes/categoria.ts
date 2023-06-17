import { FastifyInstance } from 'fastify'
import { catController } from '../controller/categoriaController';
import RespostaApi from '../model/respostaApi';


export async function categoriaRoutes(app: FastifyInstance) {
  const categoriaController = catController
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de categorias conforme filtros
  app.get('/api/categoria', async (request, reply) => {
    const result: RespostaApi = await categoriaController.ListagemCategoria(request);
    reply.send(result)
  })

  // Resgatar categoria pelo ID
  app.get('/api/categoria/:id', async (request, reply) => {
    const result: RespostaApi = await categoriaController.ResgatarCategoria(request);
    reply.send(result)
  })

  // Criar categoria
  app.post('/api/categoria', async (request, reply) => {
    const result: RespostaApi = await categoriaController.CadastrarCategoria(request);
    reply.send(result)
  })

  // Atualizar N campos de um categoria
  app.patch('/api/categoria/:id', async (request, reply) => {
    const result: RespostaApi = await categoriaController.AtualizarCategoria(request);
    reply.send(result)
  })


}