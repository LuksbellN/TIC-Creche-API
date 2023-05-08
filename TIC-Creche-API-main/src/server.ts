import Fastify from 'fastify';
import cors from '@fastify/cors';
import { patrimonioController } from './controller/patrimonioController';
import { categoriaController } from './controller/categoriaController';

const app = Fastify()

export default app;

app.register(cors)

app.get("/index", () => {
	return "Hello World"
})
app.listen({
    port: 3333,
})
.then( () => {
    console.log('Http Server running')
})


app.get('/patrimonio', patrimonioController.index);
app.get('/categoria', categoriaController.index);