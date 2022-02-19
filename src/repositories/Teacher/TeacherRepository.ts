import { Pessoa } from "../../classes/Pessoa/Pessoa";
import { TurmaData } from "../../classes/Turma/Turma";
import { BaseDatabase } from "../../database/BaseDatabase";
import { ITeacherRepository } from "../ITeacherRepository";

export class TeacherRepository implements ITeacherRepository {
    constructor (private BaseDatabse: BaseDatabase) {}

    async find(column: string, data: string): Promise<Pessoa[]> {
        const result: Pessoa[] = await this.BaseDatabse.connection("labesystem_docente").select().where(column, "=", data);
        return result;
    }

    async create(turma: TurmaData): Promise<void> {
        await this.BaseDatabse.connection("labesystem_turma").insert(turma);
    }
}