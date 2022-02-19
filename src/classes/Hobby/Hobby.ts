import crypto from "crypto";

export class Hobby {
    constructor(public id: string, public nome: string) {
        if (!id) {
            this.id = crypto.randomUUID();
        }
    }
}

export class HobbyStudent {
    constructor(public id: string, public estudante_id: string, public hobby_id: string) {
        if (!id) {
            this.id = crypto.randomUUID();
        }
    }
}