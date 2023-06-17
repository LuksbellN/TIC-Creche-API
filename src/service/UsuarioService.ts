import { IUsuarioService } from "../interfaces/services/IUsuarioService";
import { IUsuarioRepository } from "../interfaces/repositories/IUsuarioRepository";
import { userRepository } from "../repository/UsuarioRepository";
import RespostaApi from "../model/respostaApi";

import bcrypt from 'bcrypt';

export class UsuarioService implements IUsuarioService {
    private userRepository: IUsuarioRepository;

    constructor(userRepository: IUsuarioRepository) {
        this.userRepository = userRepository;
    }

    async getUsuarios(filtro: any): Promise<RespostaApi> {
        const userPropriedades = this.getUserPropriedades();

        const propriedadeOrdenacao = filtro.ordenacao[0];
        const direcaoOrdenacao = filtro.ordenacao[1];
        const ordenacaoValida =
            userPropriedades.includes(propriedadeOrdenacao) &&
            (direcaoOrdenacao === "asc" || direcaoOrdenacao === "desc");
        if (!ordenacaoValida) {
            // Caso a ordenação não seja válida, aplica a ordenação padrão por data de aquisição descendente
            filtro.ordenacao = ["id", "desc"];
        }

        return await this.userRepository.getUsuarios(filtro);
    }

    async login(email: string, senha: string): Promise<RespostaApi> {
        const resp: RespostaApi = new RespostaApi();
        try {
            const usuario: RespostaApi = await this.userRepository.getUsuarioByEmail(email);

            if (!usuario.data) {
                resp.sucesso = false;
                resp.error = "Usuário não encontrado";
                return resp;
            }

            const senhaCorreta: boolean = await bcrypt.compare(senha, usuario.data.senha);

            if (!senhaCorreta) {
                resp.sucesso = false;
                resp.error = "Senha incorreta";
                return resp;
            }

            resp.sucesso = true;
            resp.data = usuario.data;
            return resp;
        } catch (error) {
            console.log(error)
            resp.sucesso = false;
            resp.error = error;
            return resp;
        }
    }
    async registrarUsuario(filtro: any): Promise<any> {
        let resp = new RespostaApi();
        let usuario = await this.userRepository.getUsuarioByEmail(filtro.email);

        if (!usuario.data) {
            //Encriptar senha e atribuir ao objeto user
            const saltRounds = 10;
            const plainPassword = filtro.senha;

            try {
                const hash: string = await bcrypt.hash(plainPassword, saltRounds);
                filtro.senha = hash;

                resp = await this.userRepository.createUser(filtro);

                return resp;
            } catch (error) {
                resp.error = error;
                return resp;
            }

        } else {
            resp.sucesso = false;
            resp.error = "Email já existente"
            return resp
        }
    }

    public async getUsuario(filtro: { id: number }): Promise<RespostaApi> {
        return await this.userRepository.getUsuarioById(filtro);
    }

    public async updateUsuario(filtro: any): Promise<RespostaApi> {

        return await this.userRepository.updateUsuario(filtro);
    }

    public async deleteUsuario(filtro: {id: number}): Promise<RespostaApi> {

        return await this.userRepository.deleteUsuario(filtro);
    }

    // TODO melhorar - reflection 
    private getUserPropriedades(): string[] {
        const propriedadesUsuario: string[] = ['id', 'userName', 'email'];

        return [...propriedadesUsuario];
    }
}


export const userService = new UsuarioService(
    userRepository
)