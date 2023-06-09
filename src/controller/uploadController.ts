import { randomUUID } from "crypto";
import { extname, resolve } from "path";
import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import BaseController from "./baseController";
import RespostaApi from "../model/respostaApi";

export class UploadController extends BaseController{

    private pump: any;

    constructor() {
        super();
        this.pump = promisify(pipeline)
    }

    public async uploadImg(request: FastifyRequest, reply: FastifyReply) {
        let result = new RespostaApi;
        try{
            const upload = await super.resgatarArquivoUpload(request);

            if(!upload) {
                return reply.status(400).send()
            }
            
            const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
            const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)
    
            if(!isValidFileFormat){
                return reply.status(400).send()
            }
    
            const fileId = randomUUID();
            const ext = extname(upload.filename)
            const fileName = fileId.concat(ext)
    
            const writeStream = createWriteStream(
                resolve(__dirname, '../../uploads', fileName)
            )
    
            await this.pump(upload.file, writeStream)
    
            const fullUrl = request.protocol.concat('://').concat(request.hostname);
            const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();
            
            result.data = fileUrl;
            result.sucesso = true;
            return result;
        } catch(error) {
            result.sucesso = false;
            result.error = error;
            return result
        }
    }
}