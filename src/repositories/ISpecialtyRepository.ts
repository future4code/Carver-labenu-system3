import { Especialidade } from "../classes/Especialidade/Especialidade";

export interface ISpecialtyRepository  {
    add(specialty: string[], teacher_id: string): Promise<void>;
    find(params: string): Promise<Especialidade[]>;
}
