import { IFornecedorRepository } from "../interfaces/repositories/IFornecedorRepository";
import { Fornecedor } from "../model/fornecedor";

export class FornecedorRepository implements IFornecedorRepository{

    //TODO: Implementar conexão e acessar banco de dados
    getFornecedor(id: number): Fornecedor {
        throw new Error("Method not implemented.");
    }

}