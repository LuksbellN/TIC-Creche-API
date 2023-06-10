import { FastifyInstance } from 'fastify'
import { FornecedorController } from '../controller/fornecedorController';
import RespostaApi from '../model/respostaApi';


export async function fornecedorRoutes(app: FastifyInstance) {
  const fornController = new FornecedorController()
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de fornecedors conforme filtros
  app.get('/fornecedor', async (request, reply) => {
    const result: RespostaApi = await fornController.ListagemFornecedor(request);
    reply.send(result)
  })

  // Resgatar fornecedor pelo ID
  app.get('/fornecedor/:id', async (request, reply) => {
    const result: RespostaApi = await fornController.ResgatarFornecedor(request);
    reply.send(result)
  })

  // Criar fornecedor
  app.post('/fornecedor', async (request, reply) => {
    const result: RespostaApi = await fornController.CadastrarFornecedor(request);
    reply.send(result)
  })

  // Atualizar N campos de um fornecedor
  app.patch('/fornecedor/:id', async (request, reply) => {
    const result: RespostaApi = await fornController.AtualizarFornecedor(request);
    reply.send(result)
  })


}