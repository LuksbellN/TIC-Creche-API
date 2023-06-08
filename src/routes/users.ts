import { FastifyInstance } from "fastify";
import { LoginController } from "../controller/loginController";

export async function usersRoutes(app: FastifyInstance) {
    const loginController = new LoginController(app)
    app.post('/register', async (request) => {
        const result = loginController.Registrar(request);

        return result
    })
}