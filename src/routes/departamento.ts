import { FastifyInstance } from 'fastify'
import { depController } from '../controller/departamentoController';
import RespostaApi from '../model/respostaApi';


export async function departamentoRoutes(app: FastifyInstance) {
  const departamentoController = depController;
  
  // app.addHook('preHandler', async (request) => {
  //   await request.jwtVerify();
  // })

  // Resgatar a listagem de departamentos conforme filtros
  app.get('/api/departamento', async (request, reply) => {
    const result: RespostaApi = await departamentoController.ListagemDepartamento(request);
    reply.send(result)
  })

  // Resgatar departamento pelo ID
  app.get('/api/departamento/:id', async (request, reply) => {
    const result: RespostaApi = await departamentoController.ResgatarDepartamento(request);
    reply.send(result)
  })

  // Criar departamento
  app.post('/api/departamento', async (request, reply) => {
    const result: RespostaApi = await departamentoController.CadastrarDepartamento(request);
    reply.send(result)
  })

  // Atualizar N campos de um departamento
  app.patch('/api/departamento/:id', async (request, reply) => {
    const result: RespostaApi = await departamentoController.AtualizarDepartamento(request);
    reply.send(result)
  })


}