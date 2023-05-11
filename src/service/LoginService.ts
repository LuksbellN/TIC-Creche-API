import { Usuario } from "../model/usuario";
import { ILoginService } from "../interfaces/services/ILoginService";
import { ILoginRepository } from "../interfaces/repositories/ILoginRepository";

export class LoginService implements ILoginService{
    private userRepository: ILoginRepository;

    constructor(userRepository: ILoginRepository) {
        this.userRepository = userRepository;
    }

    public getUsuario(id: number): Usuario{

        //Qualquer lógica ou validação necessária deve ser implementada nessa camada de serviços

        return this.userRepository.getUsuario(id);
    }

}