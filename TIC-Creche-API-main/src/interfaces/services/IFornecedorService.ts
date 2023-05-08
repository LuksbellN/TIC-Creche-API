import { Fornecedor } from "../../model/fornecedor";

export interface IFornecedorService{

    getFornecedor(id: number): Fornecedor;

}