import { TurmaData } from "../classes/Turma/Turma";

export interface IClassRepository {
    find(column: string, argument: string, data: string | number): Promise<TurmaData[]>;
    get(teachers: TurmaData[]): Promise<any>;
    update(turma: string, modulo: number): Promise<void>;
}