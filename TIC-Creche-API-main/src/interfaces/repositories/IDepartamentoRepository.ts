import { Departamento } from "../../model/departamento";

export interface IDepartamentoRepository{
    getDepartamento(id: number): Departamento;
}