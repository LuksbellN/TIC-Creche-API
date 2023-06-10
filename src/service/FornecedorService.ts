import { IFornecedorService } from "../interfaces/services/IFornecedorService";
import { IFornecedorRepository } from "../interfaces/repositories/IFornecedorRepository";
import { FornecedorRepository } from "../repository/FornecedorRepository";
import RespostaApi from "../model/respostaApi";

export class FornecedorService implements IFornecedorService {
    private forRepository: IFornecedorRepository;

    constructor() {
        this.forRepository = new FornecedorRepository();
    }

    public async getFornecedor(filtro: { id: number }): Promise<RespostaApi> {

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return await this.forRepository.getFornecedor(filtro);
    }

    public async getFornecedors(filtro: any): Promise<RespostaApi> {

        const forPropriedades = this.getForPropriedades();

        const propriedadeOrdenacao = filtro.ordenacao[0];
        const direcaoOrdenacao = filtro.ordenacao[1];
        const ordenacaoValida =
            forPropriedades.includes(propriedadeOrdenacao) &&
            (direcaoOrdenacao === "asc" || direcaoOrdenacao === "desc");
        if (!ordenacaoValida) {
            // Caso a ordenação não seja válida, aplica a ordenação padrão por data de aquisição descendente
            filtro.ordenacao = ["nome_fornecedor", "asc"];
        }

        return await this.forRepository.getFornecedors(filtro);
    }

    public async createFornecedor(filtro: any): Promise<RespostaApi> {

        return await this.forRepository.createFornecedor(filtro);
    }

    public async updateFornecedor(filtro: any): Promise<RespostaApi> {

        return await this.forRepository.updateFornecedor(filtro);
    }

    // TODO melhorar - reflection 
    private getForPropriedades(): string[] {
        const propriedadesFornecedor: string[] = ['id', 'nome_fornecedor', 'documento'];

        return [...propriedadesFornecedor];
    }

}