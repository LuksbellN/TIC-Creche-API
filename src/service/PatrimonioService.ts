import { Patrimonio } from "../model/patrimonio";
import RespostaApi from "../model/respostaApi";
import { PatAdquirido } from "../model/patAdquirido";
import { PatDoacao } from "../model/patDoacao";
import { PatPrefeitura } from "../model/patPrefeitura";
import { IPatrimonioService } from "../interfaces/services/IPatrimonioService";
import { IPatrimonioRepository } from "../interfaces/repositories/IPatrimonioRepository";
import { PatrimonioRepository } from "../repository/PatrimonioRepository";
import { Categoria } from "../model/categoria";
import { Departamento } from "../model/departamento";
import { Fornecedor } from "../model/fornecedor";

export class PatrimonioService implements IPatrimonioService {
    private patRepository: IPatrimonioRepository;

    constructor() {
        this.patRepository = new PatrimonioRepository();
    }

    public async createPatrimonio(filtroPat: any): Promise<RespostaApi> {
        const result: RespostaApi = await this.patRepository.createPatrimonio(filtroPat)
        return result;
    }

    public async getPatrimonio(filtro: { id: number }): Promise<RespostaApi> {
        return await this.patRepository.getPatrimonio(filtro);
    }
    public async deletePatrimonio(filtro: { id: number }): Promise<RespostaApi> {
        return await this.patRepository.deletePatrimonio(filtro);
    }

    public async updatePatrimonio(filtroPat: any): Promise<RespostaApi> {
        return await this.patRepository.updatePatrimonio(filtroPat);
    }

    public async getPatrimonios(filtroPat: any): Promise<RespostaApi> {



        const tipoPref = filtroPat.tipo.includes('pref')
        const tipoDoa = filtroPat.tipo.includes('doa')
        const tipoAdq = filtroPat.tipo.includes('adq')

        const patPropriedades = this.getPatPropriedades();

        const propriedadeOrdenacao = filtroPat.ordenacao[0];
        const direcaoOrdenacao = filtroPat.ordenacao[1];
        console.log(patPropriedades)
        const ordenacaoValida =
            patPropriedades.includes(propriedadeOrdenacao) &&
            (direcaoOrdenacao === "asc" || direcaoOrdenacao === "desc");
        if (!ordenacaoValida) {
            // Caso a ordenação não seja válida, aplica a ordenação padrão por data de aquisição descendente
            filtroPat.ordenacao = ["data_aquisicao", "desc"];
        }

        const result = await this.patRepository.getPatrimonios(filtroPat);
        try {
            result.data = result.data.map((patrimonio: any) => {
                const pat: any = {
                    ...new Patrimonio(
                        patrimonio.id,
                        patrimonio.nome,
                        new Departamento(patrimonio.departamento.id, patrimonio.departamento.nome_departamento),
                        new Categoria(patrimonio.categoria.id, patrimonio.categoria.nome_categoria),
                        patrimonio.estado,
                        new Fornecedor(patrimonio.fornecedor.id, patrimonio.fornecedor.nome_fornecedor, patrimonio.fornecedor.documento),
                        patrimonio.data_aquisicao,
                        patrimonio.imagem_url
                    )
                };

                if (!tipoAdq && !tipoPref && !tipoDoa) {
                    pat.valor = patrimonio.PatrimoniosPref?.length > 0 ?
                        patrimonio.PatrimoniosPref[0].valor :
                        (patrimonio.PatrimoniosAdquirido?.length > 0 ?
                            patrimonio.PatrimoniosAdquirido[0].valor : '-');

                    pat.nomeDoador = patrimonio.PatrimoniosDoacao?.length > 0 ? ~
                        patrimonio.PatrimoniosDoacao[0].nome_doador : '-';

                    pat.telefone = patrimonio.PatrimoniosDoacao?.length > 0 ?
                        patrimonio.PatrimoniosDoacao[0].telefone : '-';

                    pat.placa = patrimonio.PatrimoniosPref?.length > 0 ?
                        patrimonio.PatrimoniosPref[0].placa : '-';
                } else {
                    if (tipoAdq || tipoPref) {
                        pat.valor = patrimonio.PatrimoniosPref?.length > 0 ?
                            patrimonio.PatrimoniosPref[0].valor :
                            (patrimonio.PatrimoniosAdquirido?.length > 0 ?
                                patrimonio.PatrimoniosAdquirido[0].valor : '-');
                    }
                    if (tipoDoa) {
                        pat.nomeDoador = patrimonio.PatrimoniosDoacao?.length > 0 ?
                            patrimonio.PatrimoniosDoacao[0].nome_doador : '-';
                        pat.telefone = patrimonio.PatrimoniosDoacao?.length > 0 ?
                            patrimonio.PatrimoniosDoacao[0].telefone : '-';
                    }
                    if (tipoPref) {
                        pat.placa = patrimonio.PatrimoniosPref?.length > 0 ?
                            patrimonio.PatrimoniosPref[0].placa : '-';
                    }
                }
                return pat;
            })
            result.sucesso = true;
            return result
        } catch (error) {
            result.sucesso = false;
            result.error = error;
            return result;
        }

    }

    // TODO melhorar - reflection 
    private getPatPropriedades(): string[] {
        const propriedadesPatrimonio: string[] = ['id', 'nome', 'departamento', 'categoria', 'estado', 'fornecedor', 'data_aquisicao', 'imagem_url'];
        const propriedadesPatAdquirido: string[] = ['id_pat_adquirido', 'valor'];
        const propriedadesPatDoacao: string[] = ['id_pat_doacao', 'nome_doador', 'telefone'];
        const propriedadesPatPrefeitura: string[] = ['id_pat_prefeitura', 'valor', 'placa'];

        return [...propriedadesPatrimonio, ...propriedadesPatAdquirido, ...propriedadesPatDoacao, ...propriedadesPatPrefeitura];
    }

}