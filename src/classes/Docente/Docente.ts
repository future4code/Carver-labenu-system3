import { Pessoa } from "../Pessoa/Pessoa";
import crypto from "crypto";

export class Docente extends Pessoa {
    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public data_nasc: Date | string,
        public turma_id: string,
        public especialidades?: string[]) {
        super(id, nome, email, data_nasc, turma_id);
        this.especialidades = especialidades
        if (!id) {
            this.id = crypto.randomUUID();
        }
    }
}