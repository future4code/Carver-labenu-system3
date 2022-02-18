44
import { TurmaData } from "../../classes/Turma/Turma";
import { BaseDatabase } from "../../database/BaseDatabase";
import { IClassRepository } from "../IClassRepository";

export class ClassRepository implements IClassRepository {
    constructor(private BaseDatabase: BaseDatabase) {
    }
    async find(id: string): Promise<TurmaData[]> {
        const result = await this.BaseDatabase.connection("labesystem_turma").select().where({ id });
        const response = result.map((item): TurmaData => {
            return {
                id: item.data,
                nome: item.nome,
                modulo: item.modulo
            }
        });
        return response;
    }
}