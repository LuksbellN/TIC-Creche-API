import { FastifyInstance } from "fastify";
import { LoginController } from "../controller/loginController";

export async function loginRoutes(app: FastifyInstance) {
    const loginController = new LoginController(app)
    app.post('/api/login', async (request) => {
        const result = loginController.Login(request);

        return result
    })
}