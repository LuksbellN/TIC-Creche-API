import { Patrimonio } from "../model/patrimonio";
import { IPatrimonioService } from "../interfaces/services/IPatrimonioService";
import { IPatrimonioRepository } from "../interfaces/repositories/IPatrimonioRepository";

export class PatrimonioService implements IPatrimonioService{
    private patRepository: IPatrimonioRepository;

    constructor(patRepository: IPatrimonioRepository) {
        this.patRepository = patRepository;
    }

    public getPatrimonio(id: number): Patrimonio {

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return this.patRepository.getPatrimonio(id);
    }

}