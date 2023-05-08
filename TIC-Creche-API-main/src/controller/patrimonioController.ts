import { IPatrimonioService } from "../interfaces/services/IPatrimonioService";


export class patrimonioController{

    private patService: IPatrimonioService;

    /**
     *
     */
    constructor(patService: IPatrimonioService) {
        this.patService = patService; 
    }


    public static index(request, reply){
        let str: string = `Patrimonios`;
        reply.send(str);
    }

    public details(request, reply){
        const pat = this.patService.getPatrimonio(request.params.id)
        reply.send(pat);
    }
}

