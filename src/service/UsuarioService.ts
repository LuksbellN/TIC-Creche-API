import { Usuario } from "../model/usuario";
import { IUsuarioService } from "../interfaces/services/IUsuarioService";
import { IUsuarioRepository } from "../interfaces/repositories/IUsuarioRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import RespostaApi from "../model/respostaApi";

import bcrypt from 'bcrypt';

export class UsuarioService implements IUsuarioService {
    private userRepository: IUsuarioRepository;

    constructor() {
        this.userRepository = new UsuarioRepository()
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
    async registrarUsuario(user: Usuario): Promise<any> {
        let resp = new RespostaApi();
        let usuario = await this.userRepository.getUsuarioByEmail(user.getEmail());

        if (!usuario.data) {
            //Encriptar senha e atribuir ao objeto user
            const saltRounds = 10;
            const plainPassword = user.getSenha();

            try {
                const hash: string = await bcrypt.hash(plainPassword, saltRounds);
                user.setSenha(hash);

                resp = await this.userRepository.createUser(user);

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

    public getUsuario(id: number): Usuario {
        throw new Error("Method not implemented.");
    }

}