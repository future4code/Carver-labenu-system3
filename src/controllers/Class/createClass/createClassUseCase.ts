import { IStudentRepository } from "../../../repositories/IStudentRepository";
import { CustomError } from "../../../services/CustomError";
import { IClassRepository } from "../../../repositories/IClassRepository";
import { Turma, TurmaData } from "../../../classes/Turma/Turma";
import { ITeacherRepository } from "../../../repositories/ITeacherRepository";

export class CreateClassUseCase {
    constructor(
        private IStudentRepository: IStudentRepository,
        private IClassRepository: IClassRepository,
        private ITeacherRepository: ITeacherRepository) { }

    async execute(turma: Turma): Promise<void> {
        if (typeof turma.nome !== "string" ||
            !Array.isArray(turma.docentes) ||
            !turma.docentes.length ||
            !Array.isArray(turma.estudantes) ||
            !turma.estudantes.length) {
            throw new CustomError(422, "Parâmetros insuficientes ou inválidos.");
        }
        const classAlreadyExists = await this.IClassRepository.find("nome", "=", turma.nome);
        if (classAlreadyExists.length) {
            throw new CustomError(409, "Nome já utilizado.")
        }

        const listStudents: string[] = [];
        for (let i = 0; i < turma.estudantes.length; i++) {
            const response = await this.IStudentRepository.find("id", turma.estudantes[i]);
            if (!response.length) {
                throw new CustomError(422, `Estudante ID '${turma.estudantes[i]}' não está matriculado.`)
            } else {
                if (!listStudents.includes(turma.estudantes[i])) {
                    listStudents.push(turma.estudantes[i])
                } else {
                    throw new CustomError(409, `Estudante ID '${turma.estudantes[i]}' duplicado.`);
                }
            }
        }

        const listTeachers: string[] = [];
        for (let i = 0; i < turma.docentes.length; i++) {
            const response = await await this.ITeacherRepository.find("id", turma.docentes[0]);
            if (!response.length) {
                throw new CustomError(422, `Docente ID '${turma.docentes[i]}' não está matriculado.`)
            } else {
                if (!listTeachers.includes(turma.docentes[i])) {
                    listTeachers.push(turma.docentes[i])
                } else {
                    throw new CustomError(409, `Docente ID '${turma.docentes[i]}' duplicado.`);
                }
            }
        }

        const newClass = new TurmaData(turma.id, turma.nome, turma.modulo);
        await this.ITeacherRepository.create(newClass);
    }
}