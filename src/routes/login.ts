import { FastifyInstance } from "fastify";
import { LoginController } from "../controller/loginController";

export async function loginRoutes(app: FastifyInstance) {
    const loginController = new LoginController(app)
    app.post('/login', async (request) => {
        const token = loginController.Login(request);

        return token
    })
}