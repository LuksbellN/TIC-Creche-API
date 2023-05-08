import { Fornecedor } from "../../model/fornecedor";

export interface IFornecedorRepository{
    getFornecedor(id: number): Fornecedor;
}