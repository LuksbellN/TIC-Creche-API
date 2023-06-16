import { FastifyInstance } from "fastify";
import { userController } from "../controller/UsuarioController";

export async function usersRoutes(app: FastifyInstance) {
    const usuarioController = userController

    app.addHook('preHandler', async (request) => {
        await request.jwtVerify();
    })

    app.post('/api/usuario', async (request) => {
        const result = usuarioController.Registrar(request);

        return result
    })
    app.get('/api/usuario/:id', async (request) => {
        const result = usuarioController.ResgatarUsuario(request);

        return result
    })
    app.get('/api/usuario', async (request) => {
        const result = usuarioController.ResgatarUsuarios(request);

        return result
    })

    app.get('/api/verifytoken', (request) => {
        return {
            sucesso: true,
            statusCode: 200
        };
    })
}