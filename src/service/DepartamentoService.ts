import { Departamento } from "../model/departamento";
import { IDepartamentoService } from "../interfaces/services/IDepartamentoService";
import { IDepartamentoRepository } from "../interfaces/repositories/IDepartamentoRepository";

export class DepartamentoService implements IDepartamentoService{
    private dptoRepository: IDepartamentoRepository;

    constructor(dptoRepository: IDepartamentoRepository) {
        this.dptoRepository = dptoRepository;
    }

    public getDepartamento(id: number): Departamento{

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return this.dptoRepository.getDepartamento(id);
    }

}