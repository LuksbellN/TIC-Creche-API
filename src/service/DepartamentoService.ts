import { IDepartamentoService } from "../interfaces/services/IDepartamentoService";
import { IDepartamentoRepository } from "../interfaces/repositories/IDepartamentoRepository";
import { DepartamentoRepository } from "../repository/DepartamentoRepository";
import RespostaApi from "../model/respostaApi";

export class DepartamentoService implements IDepartamentoService {
    private depRepository: IDepartamentoRepository;

    constructor() {
        this.depRepository = new DepartamentoRepository();
    }

    public async getDepartamento(filtro: { id: number }): Promise<RespostaApi> {

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return await this.depRepository.getDepartamento(filtro);
    }

    public async getDepartamentos(filtro: any): Promise<RespostaApi> {

        const DepPropriedades = this.getDepPropriedades();

        const propriedadeOrdenacao = filtro.ordenacao[0];
        const direcaoOrdenacao = filtro.ordenacao[1];
        const ordenacaoValida =
            DepPropriedades.includes(propriedadeOrdenacao) &&
            (direcaoOrdenacao === "asc" || direcaoOrdenacao === "desc");
        if (!ordenacaoValida) {
            // Caso a ordenação não seja válida, aplica a ordenação padrão por data de aquisição descendente
            filtro.ordenacao = ["nome_departamento", "asc"];
        }

        return await this.depRepository.getDepartamentos(filtro);
    }

    public async createDepartamento(filtro: any): Promise<RespostaApi> {

        return await this.depRepository.createDepartamento(filtro);
    }

    public async updateDepartamento(filtro: any): Promise<RespostaApi> {

        return await this.depRepository.updateDepartamento(filtro);
    }

    // TODO melhorar - reflection 
    private getDepPropriedades(): string[] {
        const propriedadesDepartamento: string[] = ['id', 'nome_departamento'];

        return [...propriedadesDepartamento];
    }

}