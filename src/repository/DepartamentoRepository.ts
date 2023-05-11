import { IDepartamentoRepository } from "../interfaces/repositories/IDepartamentoRepository";
import { Departamento } from "../model/departamento";

export class DepartamentoRepository implements IDepartamentoRepository{

    //TODO: Implementar conexão e acessar banco de dados
    getDepartamento(id: number): Departamento {
        throw new Error("Method not implemented.");
    }

}