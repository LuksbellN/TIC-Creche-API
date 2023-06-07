import { FastifyInstance, FastifyRequest } from 'fastify'
import { patrimonioController } from '../controller/patrimonioController';
import { Patrimonio } from '../model/patrimonio';

export async function patrimonioRoutes(app: FastifyInstance) {
  const patController = new patrimonioController()

  // app.addHook('preHandler', async (request) => {
  //   await request.jwtVerify();
  // })
  app.get('/patrimonios', async (request) => {
    const patrimonios: Patrimonio[] | null = await patController.ListagemPatrimonios(request);
    console.log(patrimonios)
    return patrimonios;
  })

  app.get('/patrimonio', async (request, reply) => {

    // const paramsSchema = z.object({
    //   id: z.number()
    // });

    // const { id } = paramsSchema.parse(request.params);

    // const memory = await prisma.patrimonio.findFirst({
    //   where: {
    //     id
    //   }
    // })

    // if (!memory?.isPublic && memory?.userId !== request.user.sub) {
    //   return reply.status(401).send()
    // }

    // return memory;
  })

  app.post('/memories', async (request) => {
    // const bodySchema = z.object({
    //   content: z.string(),
    //   coverUrl: z.string(),
    //   isPublic: z.coerce.boolean().default(false)
    // });

    // const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    // const memory = await prisma.memory.create({
    //   data: {
    //     content,
    //     coverUrl,
    //     isPublic,
    //     userId: request.user.sub
    //   }
    // })

    // return memory;

  })

  app.put('/memories/:id', async (request, reply) => {

    // const paramsSchema = z.object({
    //   id: z.string().uuid()
    // });

    // const { id } = paramsSchema.parse(request.params);

    // const bodySchema = z.object({
    //   content: z.string(),
    //   coverUrl: z.string(),
    //   isPublic: z.coerce.boolean().default(false)
    // });

    // const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    // let memory = await prisma.memory.findFirstOrThrow({
    //   where: {
    //     id
    //   }
    // })

    // if(memory?.userId !== request.user.sub) {
    //   return reply.status(401).send()
    // }

    // memory = await prisma.memory.update({
    //   where: {
    //     id
    //   },
    //   data: {
    //     content,
    //     coverUrl,
    //     isPublic
    //   }
    // })

    // return memory;
  })

  app.delete('/memories/:id', async (request, reply) => {
    // const paramsSchema = z.object({
    //   id: z.string().uuid()
    // });

    // const { id } = paramsSchema.parse(request.params);

    // let memory = await prisma.memory.findFirstOrThrow({
    //   where: {
    //     id
    //   }
    // })

    // if(memory?.userId !== request.user.sub) {
    //   return reply.status(401).send()
    // }

    // await prisma.memory.delete({
    //   where: {
    //     id
    //   }
    // })
  })
}