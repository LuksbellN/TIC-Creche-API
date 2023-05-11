import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appHouse } from './routes';

const app = Fastify()

app.register(cors)

app.get("/hello", () => {
	return "Hello World"
})
app.listen({
    port: 3333,
})
.then( () => {
    console.log('Http Server running')
})

appHouse(app);