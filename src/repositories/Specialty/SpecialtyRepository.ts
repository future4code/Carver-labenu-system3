import { Especialidade, EspecialidadeTeacher } from "../../classes/Especialidade/Especialidade";
import { BaseDatabase } from "../../database/BaseDatabase";
import { ISpecialtyRepository } from "../ISpecialtyRepository";

export class SpecialtyRepository implements ISpecialtyRepository {
    constructor(private BaseDatabase: BaseDatabase) { }

    async find(nome: string): Promise<Especialidade[]> {
        const result = await this.BaseDatabase.connection("labesystem_especialidade").select().where({ nome });
        const response = result.map((item): Especialidade => {
            return {
                id: item.id,
                nome: item.nome
            }
        });
        return response;
    }

    async add(especilidades: string[], docente_id: string): Promise<void> {
        for (let i = 0; i < especilidades.length; i++) {
            const specialtyAlreadyExists = await this.find(especilidades[i]);
            if (specialtyAlreadyExists.length) {
                const teachersSpecialty = new EspecialidadeTeacher("", docente_id, specialtyAlreadyExists[0].id);
                await this.BaseDatabase.connection("labesystem_docente_especialidade").insert(teachersSpecialty);
            }
            else {
                const specialty = new Especialidade("", especilidades[i]);
                const teachersSpecialty = new EspecialidadeTeacher("", docente_id, specialty.id);
                await this.BaseDatabase.connection("labesystem_especialidade").insert(specialty);
                await this.BaseDatabase.connection("labesystem_docente_especialidade").insert(teachersSpecialty);

            }
        }
    }
}