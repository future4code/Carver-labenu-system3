import crypto from "crypto";

export class Pessoa {
    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public data_nasc: Date | string,
        public turma_id: string,
    ) {}
}