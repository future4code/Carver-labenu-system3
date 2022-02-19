import crypto from "crypto";

export class Especialidade {
    constructor(public id: string, public nome: string) {
        if (!id) {
            this.id = crypto.randomUUID();
        }
    }
}

export class EspecialidadeTeacher {
    constructor(public id: string, public docente_id: string, public especialidade_id: string) {
        if (!id) {
            this.id = crypto.randomUUID();
        }
    }
}