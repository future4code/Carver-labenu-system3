import { TurmaData } from "../classes/Turma/Turma";

export interface IClassRepository {
    find(turma_id: string): Promise<TurmaData[]>;
}