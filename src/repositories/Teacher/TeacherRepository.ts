import { Docente } from "../../classes/Docente/Docente";
import { Pessoa } from "../../classes/Pessoa/Pessoa";
import { BaseDatabase } from "../../database/BaseDatabase";
import { ITeacherRepository } from "../ITeacherRepository";

export class TeacherRepository implements ITeacherRepository {
    constructor(private BaseDatabase: BaseDatabase) { }

    async create(teacher: Pessoa): Promise<void> {
        await this.BaseDatabase.connection("labesystem_docente").insert(teacher);
    }

    async find(column: string, data: string): Promise<Pessoa[]> {
        if (column && data) {
            const result: Pessoa[] = await this.BaseDatabase.connection("labesystem_docente").select().where(column, "=", data);
            return result;
        }
        else {
            const result: Pessoa[] = await this.BaseDatabase.connection("labesystem_docente").select();
            return result;
        }
    }

    async get(teachers: Pessoa[]): Promise<Docente[]> {
        const result = Promise.all(teachers.map(async (item) => {
            const response = await this.BaseDatabase.connection("labesystem_docente_especialidade")
                .select("labesystem_especialidade.nome")
                .join("labesystem_especialidade", "labesystem_docente_especialidade.especialidade_id", "=", "labesystem_especialidade.id")
                .where({ docente_id: item.id })
            const especialidades = response.map((item) => item.nome);
            return { ...item, especialidades };
        }));
        return result;
    }

    async update(whereColumn: string, dataWhere: string, updateColumn: string, dataColumn: string): Promise<void> {
        await this.BaseDatabase.connection("labesystem_docente").where(whereColumn, dataWhere).update(updateColumn, dataColumn);
    }
}