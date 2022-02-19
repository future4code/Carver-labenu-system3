import { BaseDatabase } from "../BaseDatabase";
import turmas from "./turmas.json";
import estudantes from "./estudantes.json";
import docente from "./docente.json"

class Table {
    constructor(public BaseDatabase: BaseDatabase) { }

    async create(): Promise<void> {
        try {
            await this.BaseDatabase.connection.raw(`
            CREATE TABLE labesystem_turma (
                id VARCHAR(255) PRIMARY KEY,
                nome VARCHAR(255),
                modulo VARCHAR(255) DEFAULT 0
            );
           
            CREATE TABLE labesystem_estudante (
                id VARCHAR(255) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                data_nasc DATE NOT NULL,
                turma_id VARCHAR(255) NOT NULL, FOREIGN KEY (turma_id) REFERENCES labesystem_turma(id)
            );

            CREATE TABLE labesystem_hobby (
                id VARCHAR(255) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL UNIQUE
            );

            CREATE TABLE labesystem_estudante_hobby (
                id VARCHAR(255) PRIMARY KEY,
                estudante_id VARCHAR(255) NOT NULL, FOREIGN KEY (estudante_id) REFERENCES labesystem_estudante(id),
                hobby_id VARCHAR(255) NOT NULL, FOREIGN KEY (hobby_id) REFERENCES labesystem_hobby(id)
            );

            CREATE TABLE labesystem_docente (
                id VARCHAR(255) PRIMARY KEY,
                nome VARCHAR(255),
                email VARCHAR(255) NOT NULL UNIQUE,
                data_nasc DATE NOT NULL,
                turma_id VARCHAR(255) NOT NULL, FOREIGN KEY (turma_id) REFERENCES labesystem_turma(id)
            );
            
            CREATE TABLE labesystem_especialidade (
                id VARCHAR(255) PRIMARY KEY,
                nome VARCHAR(255) NOT NULL UNIQUE
            );

            CREATE TABLE labesystem_docente_especialidade (
                id VARCHAR(255) PRIMARY KEY,
                docente_id VARCHAR(255), FOREIGN KEY (docente_id) REFERENCES labesystem_docente(id),
                especialidade_id VARCHAR(255), FOREIGN KEY (especialidade_id) REFERENCES labesystem_especialidade(id)
            );
            `);
            console.log("Tabelas criadas.")
        } catch (err: any) {
            console.log(err.messsage || err.sqlMessage)
        }
    }

    async populate(): Promise<void> {
        try {
            await this.BaseDatabase.connection.insert(turmas).into("labesystem_turma");
            await this.BaseDatabase.connection.insert(estudantes).into("labesystem_estudante");
            await this.BaseDatabase.connection.insert(docente).into("labesystem_docente");
            
            console.log("Tabelas populadas.")
        }
        catch (err: any) {
            console.log(err.message || err.sqlMessage);
        }
    }

    closeConnection() {
        this.BaseDatabase.connection.destroy();
    }
}


const db = new BaseDatabase()
const migrations = new Table(db);
migrations.create().then(() => migrations.populate()).finally(() => migrations.closeConnection());

