import { Patrimonio } from "../model/patrimonio";
import { IPatrimonioService } from "../interfaces/services/IPatrimonioService";
import { IPatrimonioRepository } from "../interfaces/repositories/IPatrimonioRepository";
import { PatrimonioRepository } from "../repository/PatrimonioRepository";
import { Categoria } from "../model/categoria";
import { Departamento } from "../model/departamento";
import { Fornecedor } from "../model/fornecedor";
import RespostaApi from "../model/respostaApi";

export class PatrimonioService implements IPatrimonioService{
    private patRepository: IPatrimonioRepository;

    constructor() {
        this.patRepository = new PatrimonioRepository();
    }

    public getPatrimonio(id: number): Patrimonio {

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return this.patRepository.getPatrimonio(id);
    }

    public async getPatrimonios(filtroPat: any): Promise<RespostaApi> {

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços
        const tipoPref = filtroPat.tipo.includes('pref')
        const tipoDoa = filtroPat.tipo.includes('doa')
        const tipoAdq = filtroPat.tipo.includes('adq')

        const result = await this.patRepository.getPatrimonios(filtroPat);
        try {
            result.data = result.data.map((patrimonio: any) => {
                const pat: any =  {...new Patrimonio(
                            patrimonio.id,
                            patrimonio.nome,
                            new Departamento(patrimonio.departamento.id, patrimonio.departamento.nome_departamento),
                            new Categoria(patrimonio.categoria.id, patrimonio.categoria.nome_categoria),
                            patrimonio.estado,
                            new Fornecedor(patrimonio.fornecedor.id, patrimonio.fornecedor.nome_fornecedor, patrimonio.fornecedor.documento),
                            patrimonio.dataAquisicao,
                            patrimonio.imagem_url
                        )
                    };
    
                    if(!tipoAdq && !tipoPref && !tipoDoa) {
                        pat.valor = patrimonio.PatrimoniosPref?.length > 0 ? patrimonio.PatrimoniosPref[0].valor : (patrimonio.PatrimoniosAdquirido?.length > 0 ? patrimonio.PatrimoniosAdquirido[0].valor : '-' ) 
                        pat.nomeDoador = patrimonio.PatrimoniosDoacao?.length > 0 ? patrimonio.PatrimoniosDoacao[0].nome_doador : '-'
                        pat.telefone = patrimonio.PatrimoniosDoacao?.length > 0 ? patrimonio.PatrimoniosDoacao[0].telefone : '-'
                        pat.placa = patrimonio.PatrimoniosPref?.length > 0 ? patrimonio.PatrimoniosPref[0].placa : '-'
                    } else {
                        if(tipoAdq || tipoPref) {
                            pat.valor = patrimonio.PatrimoniosPref?.length > 0 ? patrimonio.PatrimoniosPref[0].valor : (patrimonio.PatrimoniosAdquirido?.length > 0 ? patrimonio.PatrimoniosAdquirido[0].valor : '-' ) 
                        }
                        if(tipoDoa) {
                            pat.nomeDoador = patrimonio.PatrimoniosDoacao?.length > 0 ? patrimonio.PatrimoniosDoacao[0].nome_doador : '-'
                            pat.telefone = patrimonio.PatrimoniosDoacao?.length > 0 ? patrimonio.PatrimoniosDoacao[0].telefone : '-'
                        }
                        if(tipoPref) {
                            pat.placa = patrimonio.PatrimoniosPref?.length > 0 ? patrimonio.PatrimoniosPref[0].placa : '-'
                        }
                    }
                    return pat;
              })
              result.sucesso = true;
              return result
        } catch(error) {
            console.log(error)
            result.sucesso = false;
            result.error = error;
            return result;
        }
    }

}