import { FastifyInstance } from 'fastify'
import { CategoriaController } from '../controller/categoriaController';
import RespostaApi from '../model/respostaApi';


export async function categoriaRoutes(app: FastifyInstance) {
  const catController = new CategoriaController()
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de categorias conforme filtros
  app.get('/categoria', async (request, reply) => {
    const result: RespostaApi = await catController.ListagemCategoria(request);
    reply.send(result)
  })

  // Resgatar categoria pelo ID
  app.get('/categoria/:id', async (request, reply) => {
    const result: RespostaApi = await catController.ResgatarCategoria(request);
    reply.send(result)
  })

  // Criar categoria
  app.post('/categoria', async (request, reply) => {
    const result: RespostaApi = await catController.CadastrarCategoria(request);
    reply.send(result)
  })

  // Atualizar N campos de um categoria
  app.patch('/categoria/:id', async (request, reply) => {
    const result: RespostaApi = await catController.AtualizarCategoria(request);
    reply.send(result)
  })

  // Deletar categoria
  app.delete('/categoria/:id', async (request, reply) => {
    const result: RespostaApi = await catController.DeletarCategoria(request);
    reply.send(result)
  })
}