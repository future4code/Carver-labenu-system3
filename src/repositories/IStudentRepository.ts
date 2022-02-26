import { Estudante } from "../classes/Estudante/Estudante";
import { Pessoa } from "../classes/Pessoa/Pessoa";

export interface IStudentRepository {
    create(student: Pessoa): Promise<void>;
    find(column: string, data: string): Promise<Estudante[]>;
    get(students: Pessoa[]): Promise<Estudante[]>;
    update(whereColumn: string, dataWhere: string, updateColumn: string, dataColumn: string): Promise<void>;
}