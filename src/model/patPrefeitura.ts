import { Categoria } from "./categoria";
import { Departamento } from "./departamento";
import { Fornecedor } from "./fornecedor";
import { Patrimonio } from "./patrimonio";

export class PatPrefeitura extends Patrimonio{
    //#region Propriedades
    private valor: number;
    private placa: string;
    //#endregion

    //#region Construtor
    constructor(id_patrimonio: number, nome: string,
        departamento: Departamento, categoria: Categoria,
        estado: number, fornecedor: Fornecedor,
        dataAquisicao: Date, valor: number, 
        placa: string, imagem_url: string | null){
            super(id_patrimonio, nome, departamento, 
                categoria, estado, fornecedor, 
                dataAquisicao, imagem_url);
            this.valor = valor;
            this.placa = placa;
        } 
    //#endregion

    //#region Gets
    getValor(): number{ return this.valor };
    getPlaca(): string{ return this.placa };
    //#endregion

    //#region Sets
    setValor(valor: number): void | string {
        if(valor < 0) return "Valor inválido";
        this.valor = valor;
    }
    setPlaca(placa: string): void | string {
        //Verificar placa // if() return "Placa inválido";
        this.placa = this.placa;
    }
    //#endregion

    //#region Metodos
    toString(): string {
        return `${super.toString()} \n Valor: R$${this.getValor().toFixed(2)} \n Placa: ${this.getPlaca()}`;
    }
    //#endregion
}