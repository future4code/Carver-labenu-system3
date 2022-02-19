import { TurmaData } from "../../classes/Turma/Turma";
import { BaseDatabase } from "../../database/BaseDatabase";
import { IClassRepository } from "../IClassRepository";
import { Pessoa } from "../../classes/Pessoa/Pessoa";

export class ClassRepository implements IClassRepository {
    constructor(private BaseDatabase: BaseDatabase) {
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
            const response = await this.BaseDatabase.connection("labesystem_estudante").select("id" as "estudantes").where({ turma_id: item.id })
            const estudantes = response.map((item) => item.id);
            return { ...item, estudantes }
        }));
        return result;
    }

    async update(id: string, modulo: number): Promise<void> {
        const result = await this.BaseDatabase.connection("labesystem_turma").where({ id }).update({ modulo });
    }
}