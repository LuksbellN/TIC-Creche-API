import { FastifyInstance } from 'fastify'
import { DepartamentoController } from '../controller/departamentoController';
import RespostaApi from '../model/respostaApi';


export async function departamentoRoutes(app: FastifyInstance) {
  const depController = new DepartamentoController()
  
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  })

  // Resgatar a listagem de departamentos conforme filtros
  app.get('/departamento', async (request, reply) => {
    const result: RespostaApi = await depController.ListagemDepartamento(request);
    reply.send(result)
  })

  // Resgatar departamento pelo ID
  app.get('/departamento/:id', async (request, reply) => {
    const result: RespostaApi = await depController.ResgatarDepartamento(request);
    reply.send(result)
  })

  // Criar departamento
  app.post('/departamento', async (request, reply) => {
    const result: RespostaApi = await depController.CadastrarDepartamento(request);
    reply.send(result)
  })

  // Atualizar N campos de um departamento
  app.patch('/departamento/:id', async (request, reply) => {
    const result: RespostaApi = await depController.AtualizarDepartamento(request);
    reply.send(result)
  })


}