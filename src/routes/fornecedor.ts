import { FastifyInstance } from 'fastify'
import { forController } from '../controller/fornecedorController';
import RespostaApi from '../model/respostaApi';


export async function fornecedorRoutes(app: FastifyInstance) {
  const fornecedorController = forController;
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de fornecedors conforme filtros
  app.get('/api/fornecedor', async (request, reply) => {
    const result: RespostaApi = await fornecedorController.ListagemFornecedor(request);
    reply.send(result)
  })

  // Resgatar fornecedor pelo ID
  app.get('/api/fornecedor/:id', async (request, reply) => {
    const result: RespostaApi = await fornecedorController.ResgatarFornecedor(request);
    reply.send(result)
  })

  // Criar fornecedor
  app.post('/api/fornecedor', async (request, reply) => {
    const result: RespostaApi = await fornecedorController.CadastrarFornecedor(request);
    reply.send(result)
  })

  // Atualizar N campos de um fornecedor
  app.patch('/api/fornecedor/:id', async (request, reply) => {
    const result: RespostaApi = await fornecedorController.AtualizarFornecedor(request);
    reply.send(result)
  })


}