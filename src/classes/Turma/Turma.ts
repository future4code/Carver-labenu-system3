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
        public docentes: string[],
        public estudantes: string[],
        public modulo: number = 0
    ) {
        super(id, nome, modulo);
        if (!id) {
            this.id = crypto.randomUUID();
        }
    }
}