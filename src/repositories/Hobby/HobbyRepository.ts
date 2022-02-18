import { Hobby, HobbyStudent } from "../../classes/Hobby/Hobby";
import { BaseDatabase } from "../../database/BaseDatabase";
import { IHobbyRepository } from "../IHobbyRepository";

export class HobbyRepository implements IHobbyRepository {
    constructor(private BaseDatabase: BaseDatabase) { }

    async find(nome: string): Promise<Hobby[]> {
        const result = await this.BaseDatabase.connection("labesystem_hobby").select().where({ nome });
        const response = result.map((item): Hobby => {
            return {
                id: item.id,
                nome: item.nome
            }
        });
        return response;
    }

    async add(hobbies: string[], student_id: string): Promise<void> {
        for (let i = 0; i < hobbies.length; i++) {
            const hobbyAlreadyExists = await this.find(hobbies[i]);
            if (!hobbyAlreadyExists.length) {
                const hobby = new Hobby("", hobbies[i]);
                const hobbyStudent = new HobbyStudent("", student_id, hobby.id);

                await this.BaseDatabase.connection("labesystem_hobby").insert(hobby);
                await this.BaseDatabase.connection("labesystem_estudante_hobby").insert(hobbyStudent);
            } else {
                const hobbyStudent = new HobbyStudent("", student_id, hobbyAlreadyExists[0].id);
                await this.BaseDatabase.connection("labesystem_estudante_hobby").insert(hobbyStudent);
            }
        }       
    }
}