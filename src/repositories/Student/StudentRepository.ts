import { response } from "express";
import { Estudante } from "../../classes/Estudante/Estudante";
import { Pessoa } from "../../classes/Pessoa/Pessoa";
import { BaseDatabase } from "../../database/BaseDatabase";
import { CustomError } from "../../services/CustomError";
import { IStudentRepository } from "../IStudentRepository";

export class StudentRepository implements IStudentRepository {
    constructor(
        private BaseDatabase: BaseDatabase
    ) { }

    async create(student: Pessoa): Promise<void> {
        await this.BaseDatabase.connection("labesystem_estudante").insert(student);
    }

    async find(column: string, data: string): Promise<Estudante[]> {
        const result = await this.BaseDatabase.connection("labesystem_estudante").select().where(column, "like", data)
        const response = result.map((item): Estudante => {
            return {
                id: item.id,
                nome: item.nome,
                email: item.email,
                data_nasc: item.data_nasc,
                turma_id: item.turma_id
            }
        })
        return response;
    }

    async get(students: Pessoa[]): Promise<Estudante[]> {
        const result = Promise.all(students.map(async (item) => {
            const response = await this.BaseDatabase.connection("labesystem_estudante_hobby")
                .select("labesystem_hobby.nome")
                .join("labesystem_hobby", "labesystem_estudante_hobby.hobby_id", "=", "labesystem_hobby.id")
                .where({ estudante_id: item.id })
            const hobbies = response.map((item) => item.nome);
            return { ...item, hobbies };
        }));
        return result;
    }

    async update(whereColumn: string, dataWhere: string, updateColumn: string, dataColumn: string): Promise<void> {
        await this.BaseDatabase.connection("labesystem_estudante").where(whereColumn, dataWhere).update(updateColumn, dataColumn);
    }
}