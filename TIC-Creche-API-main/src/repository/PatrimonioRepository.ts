import { IPatrimonioRepository } from "../interfaces/repositories/IPatrimonioRepository";
import { Patrimonio } from "../model/patrimonio";

export class PatrimonioRepository implements IPatrimonioRepository{

    //TODO: Implementar conexão e acessar banco de dados
    getPatrimonio(id: number): Patrimonio {
        throw new Error("Method not implemented.");
    }

}