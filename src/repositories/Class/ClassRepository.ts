import { TurmaData } from "../../classes/Turma/Turma";
import { BaseDatabase } from "../../database/BaseDatabase";
import { IClassRepository } from "../IClassRepository";

export class ClassRepository implements IClassRepository {
    constructor(private BaseDatabase: BaseDatabase) {
    }

    async create(turma: TurmaData): Promise<void> {
        await this.BaseDatabase.connection("labesystem_turma").insert(turma);
    }

    async find(column: string, argument: string, data: string | number): Promise<TurmaData[]> {
        const result = await this.BaseDatabase.connection("labesystem_turma").select().where(column, argument, data);
        const response = result.map((item): TurmaData => {
            return {
                id: item.id,
                nome: item.nome,
                modulo: item.modulo
            }
        });
        return response;
    }

    async get(teachers: TurmaData[]): Promise<any> {
        const result = Promise.all(teachers.map(async (item) => {
            const responseStudents = await this.BaseDatabase.connection("labesystem_estudante")
                .select("id" as "estudantes")
                .where({ turma_id: item.id });
            const responseTeachers = await this.BaseDatabase.connection("labesystem_docente").select("id").where({ turma_id: item.id});
            const estudantes = responseStudents.map((item) => item.id);
            const docentes = responseTeachers.map((item) => item.id);
            return { ...item, estudantes, docentes }
        }));
        return result;
    }

    async update(id: string, modulo: number): Promise<void> {
        await this.BaseDatabase.connection("labesystem_turma").where({ id }).update({ modulo });
    }
}