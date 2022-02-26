import { Docente } from "../classes/Docente/Docente";
import { Pessoa } from "../classes/Pessoa/Pessoa";

export interface ITeacherRepository {
    find(column: string, data: string): Promise<Pessoa[]>;
    create(teacher: Pessoa): Promise<void>;
    get(students: Pessoa[]): Promise<Docente[]>;
    update(whereColumn: string, dataWhere: string, updateColumn: string, dataColumn: string): Promise<void>;
}