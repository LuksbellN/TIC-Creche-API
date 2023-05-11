import { FastifyInstance } from "fastify";
import { patrimonioController } from "./controller/patrimonioController";
import { categoriaController } from "./controller/categoriaController";

export async function appHouse (app: FastifyInstance) {

app.get("/hello/:id",  (request, reply) => {
    const dados: any = request.params;
    let str: string = `Seu id é ${dados.id}`;
    reply.send(str);
})


app.get('/patrimonio', patrimonioController.index);
app.get('/categoria', categoriaController.index);
}