import { Fornecedor } from "../model/fornecedor";
import { IFornecedorService } from "../interfaces/services/IFornecedorService";
import { IFornecedorRepository } from "../interfaces/repositories/IFornecedorRepository";

export class FornecedorService implements IFornecedorService{
    private fornRepository: IFornecedorRepository;

    constructor(fornRepository: IFornecedorRepository) {
        this.fornRepository = fornRepository;
    }

    public getFornecedor(id: number): Fornecedor{

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return this.fornRepository.getFornecedor(id);
    }

}