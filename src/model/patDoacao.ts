import { Categoria } from "./categoria";
import { Departamento } from "./departamento";
import { Fornecedor } from "./fornecedor";
import { Origem } from "./origem";
import { Patrimonio } from "./patrimonio";

class PatDoacao extends Patrimonio{
    //#region Propriedades
    private nomeDoador: string;
    //#endregion

    //#region Construtor
    constructor(id_patrimonio: number, nome: string,
        departamento: Departamento, categoria: Categoria,
        estado: string, fornecedor: Fornecedor,
        data_aquisicao: Date, origem: Origem, nomeDoador: string, 
        imagem_url?: string){
            super(id_patrimonio, nome, departamento, 
                categoria, estado, fornecedor, 
                data_aquisicao, origem, imagem_url);
            this.nomeDoador = nomeDoador;
        } 
    //#endregion

    //#region Gets
    getNomeDoador(): string{ return this.nomeDoador };
    //#endregion

    //#region Sets
    setNomeDoador(nomeDoador: string): void {
        this.nomeDoador = nomeDoador;
    }
    //#endregion

    //#region Metodos
    toString(): string {
        return `${super.toString()} \n Nome doador: ${this.getNomeDoador()}`;
    }
    //#endregion
}