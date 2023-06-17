import { FastifyInstance } from "fastify";
import { UploadController } from "../controller/uploadController";

const uploadController = new UploadController();

export async function uploadRoutes(app: FastifyInstance) {
    app.addHook('preHandler', async (request) => {
        await request.jwtVerify();
      })
      
    app.post('/api/upload', async (request, reply) => {
        return uploadController.uploadImg(request, reply);
    })
}