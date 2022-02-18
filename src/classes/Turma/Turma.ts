import crypto from "crypto";

export class TurmaData {
    constructor(
        public id: string,
        public nome: string,
        public modulo: number
    ) {
        if (!id) {
            this.id = crypto.randomUUID();
        }
    }
}

export class Turma extends TurmaData {
    constructor(
        public id: string,
        public nome: string,
        public modulo: number,
        public estudantes: string[],
        public docentes: string[],
    ) {
        super(id, nome, modulo);
        if (!id) {
            this.id = crypto.randomUUID();
        }
    }
}