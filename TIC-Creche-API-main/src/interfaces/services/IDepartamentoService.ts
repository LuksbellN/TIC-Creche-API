import { Departamento } from "../../model/departamento";

export interface IDepartamentoService{

    getDepartamento(id: number): Departamento;

}