import { Categoria } from "./categoria";
import { Departamento } from "./departamento";
import { Fornecedor } from "./fornecedores";
import { Origem } from "./origem";
import { Patrimonio } from "./patrimonio";

class PatAdquirido extends Patrimonio{
    //#region Propriedades
    private valor: number;
    //#endregion

    //#region Construtor
    constructor(id_patrimonio: number, nome: string,
        departamento: Departamento, categoria: Categoria,
        estado: string, fornecedor: Fornecedor,
        data_aquisicao: Date, origem: Origem, valor: number, 
        imagem_url?: string){
            super(id_patrimonio, nome, departamento, 
                categoria, estado, fornecedor, 
                data_aquisicao, origem, imagem_url);
            this.valor = valor;
        } 
    //#endregion

    //#region Gets
    getValor(): number{ return this.valor };
    //#endregion

    //#region Sets
    setValor(valor: number): void | string {
        if(valor < 0) return "Valor inválido";
        this.valor = valor;
    }
    //#endregion

    //#region Metodos
    toString(): string {
        return `${super.toString()} \n Valor: R$${this.getValor().toFixed(2)}`;
    }
    //#endregion
}