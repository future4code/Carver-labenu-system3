import { Pessoa } from "../Pessoa/Pessoa";
import crypto from "crypto";

export class Estudante extends Pessoa {
    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public data_nasc: Date | string,
        public turma_id: string,
        public hobbies?: string[]) {
        super(id, nome, email, data_nasc, turma_id);
        this.hobbies = hobbies
        if (!id) {
            this.id = crypto.randomUUID();
        }
    }
}
