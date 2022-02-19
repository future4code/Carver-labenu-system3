import { Pessoa } from "../classes/Pessoa/Pessoa";
import { TurmaData } from "../classes/Turma/Turma";

export interface ITeacherRepository {
    find(column: string, data: string): Promise<Pessoa[]>;
    create(turma: TurmaData): Promise<void>;
}